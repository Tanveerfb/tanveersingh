"use server";

import { serverEnv } from "@/lib/server-env";
import { contactSchema, type ContactEnquiry } from "@/schemas/contact-schema";

export type ContactState = {
  status: "idle" | "invalid" | "sent" | "failed";
  /** What was typed, so a failed send doesn't lose it when the form resets. */
  values?: Partial<ContactEnquiry>;
  errors?: Partial<Record<keyof ContactEnquiry, string>>;
  sentTo?: string;
};

const DISCORD_TIMEOUT_MS = 8000;

async function postToDiscord(webhookUrl: string, { name, email, message }: ContactEnquiry): Promise<boolean> {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(DISCORD_TIMEOUT_MS),
    body: JSON.stringify({
      // Visitor text must never ping anyone in the channel.
      allowed_mentions: { parse: [] },
      embeds: [{ title: "New enquiry from the portfolio", description: message, fields: [{ name: "Name", value: name }, { name: "Email", value: email }] }],
    }),
  });
  return response.ok;
}

/** Sends a contact-form enquiry to Discord. The webhook URL stays on the server. */
export async function sendEnquiry(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // The hidden field only a bot fills in. It gets a normal reply and nothing is sent.
  if (formData.get("company")) return { status: "sent", sentTo: values.email };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactEnquiry;
      errors[field] ??= issue.message;
    }
    return { status: "invalid", values, errors };
  }

  const webhookUrl = serverEnv.DISCORD_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("Contact form: DISCORD_CONTACT_WEBHOOK_URL is not set");
    return { status: "failed", values };
  }

  try {
    const delivered = await postToDiscord(webhookUrl, parsed.data);
    if (delivered) return { status: "sent", sentTo: parsed.data.email };
    console.error("Contact form: Discord refused the message");
  } catch (error) {
    console.error("Contact form: could not reach Discord", error);
  }
  return { status: "failed", values };
}
