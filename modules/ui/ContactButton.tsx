"use client";

import type { JSX } from "react";

interface ContactButtonProps {
  label: string;
}

export default function ContactButton({
  label,
}: ContactButtonProps): JSX.Element {
  return (
    <button className="contact-btn duke-hover duke-stagger">{label}</button>
  );
}
