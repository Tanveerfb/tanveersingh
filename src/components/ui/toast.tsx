"use client";

import { Toast as RadixToast } from "radix-ui";
import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/class-names";

type ToastInput = {
  /** The readout heading, in capitals: "TRANSMISSION SENT". */
  title: string;
  message: string;
  tone?: "success" | "error";
};

type ToastItem = ToastInput & { id: number };

export type ShowToast = (toast: ToastInput) => void;

export const ToastContext = createContext<ShowToast | null>(null);

let nextId = 0;

/** The scouter alert. Sits above the capsule dock; errors announce assertively. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback<ShowToast>((toast) => {
    nextId += 1;
    const id = nextId;
    setToasts((current) => [...current, { ...toast, id }]);
  }, []);

  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      <RadixToast.Provider swipeDirection="right" label="Notification">
        {children}
        {toasts.map((toast) => (
          <RadixToast.Root
            key={toast.id}
            type={toast.tone === "error" ? "foreground" : "background"}
            duration={toast.tone === "error" ? 8000 : 5000}
            onOpenChange={(open) => {
              if (!open) setToasts((current) => current.filter((item) => item.id !== toast.id));
            }}
            className={cn(
              "toast-face relative grid gap-1 border-3 border-l-10 border-ink py-2.5 pr-10 pl-3.5 font-mono text-sm text-lens-text shadow-cel-sm",
              "data-[state=open]:animate-toast-in data-[state=closed]:animate-fade-out",
              "data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=cancel]:translate-x-0",
              toast.tone === "error" ? "border-l-alarm" : "border-l-lens",
            )}
          >
            <RadixToast.Title className="tracking-readout text-white">{toast.title}</RadixToast.Title>
            <RadixToast.Description>{toast.message}</RadixToast.Description>
            <RadixToast.Close aria-label="Close" className="absolute top-1.5 right-1.5 grid size-7 place-items-center text-lens-text hover:text-white">
              <span aria-hidden="true">✕</span>
            </RadixToast.Close>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="fixed right-2.5 bottom-[calc(var(--spacing-nav)+28px)] z-50 m-0 grid w-[min(calc(100vw-20px),var(--container-toast))] list-none gap-2.5 p-0" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
