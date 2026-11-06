/** Approved contact copy. Never add his phone number, personal email or birthday. Owner, 2026-11-06. */

export const CONTACT = {
  kicker: "連絡 · Contact",
  title: "Get in touch",
  reach: [
    { label: "Email", value: "hello@tinkertogether.studio", href: "mailto:hello@tinkertogether.studio" },
    { label: "LinkedIn", value: "linkedin.com/in/tanveerfb", href: "https://www.linkedin.com/in/tanveerfb" },
    { label: "GitHub", value: "github.com/Tanveerfb", href: "https://github.com/Tanveerfb" },
  ],
};

export const CONTACT_FORM = {
  fields: {
    name: { label: "Name", placeholder: "Your name", error: "Enter your name" },
    email: { label: "Email", placeholder: "you@example.com", error: "Enter an email address like name@example.com" },
    message: { label: "Message", placeholder: "What do you need?", error: "Tell me a little about what you need" },
  },
  send: "Send message",
  sendHint: "Hold to charge it up",
  sending: "Sending",
  sentTitle: "TRANSMISSION SENT",
  sentMessage: (email: string) => `Message sent. I'll reply to ${email}.`,
  failedTitle: "SIGNAL LOST",
  failedMessage: "Message not sent. Try again in a moment, or email hello@tinkertogether.studio.",
};
