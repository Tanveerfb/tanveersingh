"use client";

import type { JSX, ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps): JSX.Element {
  return (
    <div className="page-shell">
      <div className="page-shell-inner">{children}</div>
      <div className="page-shell-footer">&gt; Module operational.</div>
    </div>
  );
}
