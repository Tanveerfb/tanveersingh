"use client";

import type { JSX } from "react";

interface ContactInputProps {
  type?: string;
  placeholder?: string;
}

export default function ContactInput({
  type = "text",
  placeholder,
}: ContactInputProps): JSX.Element {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="contact-input duke-stagger"
    />
  );
}
