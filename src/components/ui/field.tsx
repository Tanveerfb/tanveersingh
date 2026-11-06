"use client";

import { useEffect, useId, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/class-names";

type FieldState = "rest" | "error" | "disabled";

const CONTROL_STATES: Record<FieldState, string> = {
  rest: "border-ink bg-paper text-ink",
  error: "border-alarm bg-paper text-ink",
  disabled: "field-disabled cursor-not-allowed border-dashed border-ink text-ink-soft",
};

function controlClass(state: FieldState): string {
  return cn("block w-full border-3 px-3.5 py-3 [color-scheme:light] placeholder:text-ink-quiet focus:outline-none", CONTROL_STATES[state]);
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
 * The caption panel: a square manga panel on paper with a caption tab joined on top. Its shadow
 * is a strip of speed lines, which turns gold on focus and red on error.
 */
function CaptionFrame({ id, label, labelNote, state, error, errorId, children }: FrameProps) {
  return (
    <div className="group/field grid min-w-0 content-start">
      <label
        htmlFor={id}
        className={cn(
          "relative z-10 justify-self-start px-3 pt-1.5 pb-1 font-display text-base/none tracking-cel transition-colors duration-(--duration-press)",
          state === "rest" && "bg-ink text-paper group-focus-within/field:bg-gold group-focus-within/field:text-on-gold",
          state === "error" && "bg-alarm text-on-alarm",
          state === "disabled" && "bg-ink-soft text-white",
        )}
      >
        {label}
        {labelNote && <small className="ml-1.5 font-body text-xs/none font-semibold tracking-normal">{labelNote}</small>}
      </label>
      <div className={cn("relative isolate", state !== "disabled" && "speed-shadow mr-2 mb-2", state === "error" && "speed-shadow-alarm")}>{children}</div>
      {error && (
        <span
          id={errorId}
          className="mt-1.5 flex items-center gap-2 justify-self-start border-2 border-ink bg-narration px-2.5 py-1.5 text-sm/tight font-semibold text-ink"
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
  if (disabled) return "disabled";
  return error ? "error" : "rest";
}

/** A single-line caption-panel field. */
export function InputField({ label, labelNote, error, id, disabled, className, ...props }: ComponentProps<"input"> & FieldExtras) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  const state = fieldState(error, disabled);
  return (
    <CaptionFrame id={fieldId} label={label} labelNote={labelNote} state={state} error={error} errorId={errorId}>
      <input
        id={fieldId}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(controlClass(state), className)}
        {...props}
      />
    </CaptionFrame>
  );
}

/** A multi-line caption-panel field. Counts characters below it when it has a `maxLength`. */
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
    <div className="grid min-w-0 content-start gap-1">
      <CaptionFrame id={fieldId} label={label} labelNote={labelNote} state={state} error={error} errorId={errorId}>
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
          className={cn(controlClass(state), "min-h-30", state === "disabled" ? "resize-none" : "resize-y", className)}
          {...props}
        />
      </CaptionFrame>
      {maxLength !== undefined && (
        <span id={countId} className="justify-self-end font-mono text-xs/none text-muted">
          {length} / {maxLength}
        </span>
      )}
    </div>
  );
}
