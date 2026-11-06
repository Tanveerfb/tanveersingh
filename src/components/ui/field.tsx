"use client";

import { useEffect, useId, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/class-names";

const CONTROL = "relative block w-full text-ink placeholder:text-ink-quiet";
const REST = "rounded-balloon border-3 border-ink bg-white px-5 py-3.25 shadow-cel-sm transition-[scale,box-shadow] duration-(--duration-balloon) ease-snap focus:scale-[1.015] focus:shadow-balloon-focus focus:outline-none";
// A transparent border, not padding: scrolled text is clipped at the border, so long text can
// never run into the jagged teeth.
const SHOUT = "border-x-26 border-y-20 border-transparent bg-transparent focus:outline-none";
const THINK = "cursor-not-allowed rounded-balloon border-3 border-dashed border-ink bg-thought px-5 py-3.25 text-ink-soft";

type FieldState = "rest" | "shout" | "think";

function controlClass(state: FieldState): string {
  return cn(CONTROL, state === "rest" && REST, state === "shout" && SHOUT, state === "think" && THINK);
}

type FrameProps = {
  id: string;
  label: string;
  /** Beside the label, for what the label can't say: "while sending". */
  labelNote?: string;
  state: FieldState;
  error?: string;
  errorId: string;
  children: ReactNode;
};

/**
 * The balloon around a control. A rest field is a speech balloon, an error a jagged shout with
 * the reason in a narration box, and a disabled field a dashed thought balloon. The control keeps
 * its place in the tree across states, so it never loses focus when an error appears.
 */
function BalloonFrame({ id, label, labelNote, state, error, errorId, children }: FrameProps) {
  return (
    <div className="grid min-w-0 content-start gap-2.5">
      <label
        htmlFor={id}
        className="justify-self-start -rotate-[1.5deg] border-2 border-ink bg-paper px-2.25 pt-1.25 pb-0.75 font-display text-base/none tracking-cel text-on-paper shadow-cel-xs"
      >
        {label}
        {labelNote && <small className="ml-1.5 font-body text-xs/none font-semibold tracking-normal text-ink-soft">{labelNote}</small>}
      </label>
      <div
        className={cn(
          "relative",
          state === "rest" && "balloon-tail mb-3.5",
          state === "shout" && "mb-2 drop-shadow-[3px_3px_0_var(--color-ink)] focus-within:drop-shadow-[4px_4px_0_var(--color-gold)]",
          state === "think" && "thought-tail mb-4.5",
        )}
      >
        {state === "shout" && (
          <>
            <span className="clip-shout absolute inset-0 bg-alarm" aria-hidden="true" />
            <span className="clip-shout absolute inset-x-1.25 inset-y-1 bg-white" aria-hidden="true" />
          </>
        )}
        {children}
      </div>
      {error && (
        <span
          id={errorId}
          className="flex items-center gap-2 justify-self-start border-2 border-ink bg-narration px-2.5 py-1.5 text-sm/tight font-semibold text-ink"
        >
          <span className="grid size-5 flex-none place-items-center border-2 border-ink bg-alarm text-caption/none font-extrabold text-on-alarm" aria-hidden="true">
            !
          </span>
          {error}
        </span>
      )}
    </div>
  );
}

type FieldExtras = { label: string; labelNote?: string; error?: string };

function fieldState(error: string | undefined, disabled: boolean | undefined): FieldState {
  if (disabled) return "think";
  return error ? "shout" : "rest";
}

/** A single-line speech-balloon field. */
export function InputField({ label, labelNote, error, id, disabled, className, ...props }: ComponentProps<"input"> & FieldExtras) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  const state = fieldState(error, disabled);
  return (
    <BalloonFrame id={fieldId} label={label} labelNote={labelNote} state={state} error={error} errorId={errorId}>
      <input
        id={fieldId}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(controlClass(state), className)}
        {...props}
      />
    </BalloonFrame>
  );
}

/** A multi-line speech-balloon field. Counts characters when it has a `maxLength`. */
export function TextareaField({
  label,
  labelNote,
  error,
  id,
  disabled,
  maxLength,
  defaultValue,
  onInput,
  className,
  ...props
}: ComponentProps<"textarea"> & FieldExtras) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  const countId = `${fieldId}-count`;
  const state = fieldState(error, disabled);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [length, setLength] = useState(String(defaultValue ?? "").length);

  // A form reset clears the text without an input event.
  useEffect(() => {
    const form = ref.current?.form;
    if (!form) return;
    const onReset = () => setLength(String(defaultValue ?? "").length);
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [defaultValue]);

  const describedBy = [error && errorId, maxLength && countId].filter(Boolean).join(" ") || undefined;

  return (
    <BalloonFrame id={fieldId} label={label} labelNote={labelNote} state={state} error={error} errorId={errorId}>
      <textarea
        ref={ref}
        id={fieldId}
        disabled={disabled}
        maxLength={maxLength}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onInput={(event) => {
          setLength(event.currentTarget.value.length);
          onInput?.(event);
        }}
        className={cn(
          controlClass(state),
          "min-h-30",
          state === "rest" && "resize-y rounded-balloon-lg pb-7.5",
          state === "shout" && "resize-none",
          state === "shout" && maxLength !== undefined && "border-b-38",
          state === "think" && "resize-none",
          className,
        )}
        {...props}
      />
      {maxLength && (
        <span
          id={countId}
          className={cn(
            "pointer-events-none absolute bg-white px-1 font-mono text-xs/none text-ink-soft",
            state === "shout" ? "right-6.5 bottom-5" : "right-4.5 bottom-2.25",
          )}
        >
          {length} / {maxLength}
        </span>
      )}
    </BalloonFrame>
  );
}
