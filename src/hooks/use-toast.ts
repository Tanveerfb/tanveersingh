"use client";

import { useContext } from "react";
import { ToastContext, type ShowToast } from "@/components/ui/toast";

/** Shows a scouter alert. Needs a `ToastProvider` above it. */
export function useToast(): ShowToast {
  const show = useContext(ToastContext);
  if (!show) throw new Error("useToast needs a ToastProvider above it");
  return show;
}
