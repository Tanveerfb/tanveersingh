"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--panel)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          boxShadow: "0 0 20px var(--glow-soft)",
        },
        success: {
          style: {
            borderColor: "var(--success)",
            boxShadow: "0 0 20px rgba(0, 255, 112, 0.3)",
          },
          iconTheme: {
            primary: "var(--success)",
            secondary: "var(--panel)",
          },
        },
        error: {
          style: {
            borderColor: "#ff3860",
            boxShadow: "0 0 20px rgba(255, 56, 96, 0.3)",
          },
          iconTheme: {
            primary: "#ff3860",
            secondary: "var(--panel)",
          },
        },
      }}
    />
  );
}
