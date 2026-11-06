import "server-only";
import { z } from "zod";
import { parseEnv } from "@/lib/env";

/** Server-only environment. Never import this from a client component. */
const serverEnvSchema = z.object({
  // Discord webhook that receives contact-form enquiries. Optional so previews build
  // without it: unset, the form shows its "not sent" message and logs why.
  DISCORD_CONTACT_WEBHOOK_URL: z.url().optional(),
});

export const serverEnv = parseEnv(
  serverEnvSchema,
  { DISCORD_CONTACT_WEBHOOK_URL: process.env.DISCORD_CONTACT_WEBHOOK_URL },
  "server",
);
