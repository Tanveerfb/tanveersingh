"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField, TextareaField } from "@/components/ui/field";
import { CONTACT_FORM } from "@/content/contact";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/class-names";
import { MESSAGE_MAX_LENGTH } from "@/schemas/contact-schema";
import { sendEnquiry, type ContactState } from "./contact-action";

const INITIAL_STATE: ContactState = { status: "idle" };
const { fields } = CONTACT_FORM;

/** Charge to send: hold the button to charge a bigger beam, release to fire. A click also sends. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendEnquiry, INITIAL_STATE);
  const toast = useToast();
  const [charging, setCharging] = useState(false);
  const charged = useRef(false);
  const [shot, setShot] = useState<{ run: number; big: boolean } | null>(null);

  useEffect(() => {
    if (state.status === "sent") {
      toast({ title: CONTACT_FORM.sentTitle, message: CONTACT_FORM.sentMessage(state.sentTo ?? "") });
      setShot((current) => ({ run: (current?.run ?? 0) + 1, big: charged.current }));
    }
    if (state.status === "failed") toast({ title: CONTACT_FORM.failedTitle, message: CONTACT_FORM.failedMessage, tone: "error" });
    charged.current = false;
  }, [state, toast]);

  return (
    <form action={formAction} noValidate className="relative grid gap-4">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <InputField name="name" label={fields.name.label} placeholder={fields.name.placeholder} autoComplete="name" defaultValue={state.values?.name} error={state.errors?.name} disabled={pending} />
      <InputField name="email" type="email" label={fields.email.label} placeholder={fields.email.placeholder} autoComplete="email" defaultValue={state.values?.email} error={state.errors?.email} disabled={pending} />
      <TextareaField
        name="message"
        rows={4}
        maxLength={MESSAGE_MAX_LENGTH}
        label={fields.message.label}
        placeholder={fields.message.placeholder}
        defaultValue={state.values?.message}
        error={state.errors?.message}
        disabled={pending}
      />
      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          variant="secondary"
          loading={pending}
          className="relative touch-none overflow-hidden select-none"
          onPointerDown={() => setCharging(true)}
          onPointerUp={() => setCharging(false)}
          onPointerLeave={() => {
            setCharging(false);
            charged.current = false;
          }}
        >
          <span
            onTransitionEnd={() => {
              if (charging) charged.current = true;
            }}
            className={cn(
              "absolute inset-x-0 bottom-0 h-1.5 origin-left bg-ki",
              charging ? "scale-x-100 transition-[scale] duration-(--duration-burst) ease-linear" : "scale-x-0",
            )}
            aria-hidden="true"
          />
          {pending ? CONTACT_FORM.sending : CONTACT_FORM.send}
        </Button>
        <p className="m-0 text-sm text-muted">{CONTACT_FORM.sendHint}</p>
      </div>
      {shot && (
        <span
          key={shot.run}
          className={cn("beam-bands pointer-events-none absolute inset-x-0 top-1/2 origin-left -translate-y-1/2 animate-fire rounded-r-[30px] border-4 border-ink opacity-0", shot.big ? "h-20" : "h-8.5")}
          aria-hidden="true"
        />
      )}
    </form>
  );
}
