"use client";

import { Dialog as RadixDialog } from "radix-ui";
import type { ReactNode } from "react";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

type DialogContentProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

/**
 * The panel zoom: a manga panel zooms out of the page with a burst behind it. Backdrop click and
 * Escape close it; focus is trapped and returns to the trigger.
 */
export function DialogContent({ title, description, children }: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-ink/75 p-4 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in">
        <RadixDialog.Content className="relative w-full max-w-dialog data-[state=closed]:animate-panel-unzoom data-[state=open]:animate-panel-zoom [&_:focus-visible]:outline-ink">
          <span className="panel-burst pointer-events-none absolute -inset-15" aria-hidden="true" />
          <div className="relative border-4 border-ink bg-white p-4.5 text-ink shadow-cel-lg">
            <RadixDialog.Close aria-label="Close" className="absolute top-2 right-2 grid size-8.5 place-items-center border-2 border-current text-lg/none font-bold">
              <span aria-hidden="true">✕</span>
            </RadixDialog.Close>
            <RadixDialog.Title className="m-0 mb-2 pr-10 font-display text-cel-title tracking-cel">{title}</RadixDialog.Title>
            <RadixDialog.Description className="m-0 mb-3.5 text-body-sm">{description}</RadixDialog.Description>
            {children}
          </div>
        </RadixDialog.Content>
      </RadixDialog.Overlay>
    </RadixDialog.Portal>
  );
}
