import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  /** Says what to do next. */
  message: string;
  action?: ReactNode;
};

/** The blank page: an undrawn manga page, with the silence lettered on it. */
export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="grid justify-items-center gap-2.5 border-4 border-ink bg-paper p-5.5 text-center [&_:focus-visible]:outline-ink">
      <span className="sfx-lettering font-jp text-sfx font-black text-white" aria-hidden="true">
        シーン
      </span>
      <b className="font-display text-2xl/none font-normal tracking-cel text-ink">{title}</b>
      <p className="m-0 max-w-[32ch] text-body-sm text-ink-soft">{message}</p>
      {action}
    </div>
  );
}
