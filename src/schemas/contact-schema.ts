import { z } from "zod";
import { CONTACT_FORM } from "@/content/contact";

export const MESSAGE_MAX_LENGTH = 1000;

const { fields } = CONTACT_FORM;

/** A contact-form enquiry, checked on the server before anything goes to Discord. */
export const contactSchema = z.object({
  name: z.string().trim().min(1, fields.name.error).max(120, fields.name.error),
  email: z.email(fields.email.error).max(200, fields.email.error),
  message: z.string().trim().min(1, fields.message.error).max(MESSAGE_MAX_LENGTH, fields.message.error),
});

export type ContactEnquiry = z.infer<typeof contactSchema>;
