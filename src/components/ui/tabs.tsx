"use client";

import { Tabs as RadixTabs } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/class-names";

export const Tabs = RadixTabs.Root;

/** The ink tabs' rail. Scrolls sideways on a phone; arrow keys move between tabs. */
export function TabsList({ className, ...props }: ComponentProps<typeof RadixTabs.List>) {
  return <RadixTabs.List className={cn("flex overflow-x-auto border-b-3 border-ink [scrollbar-width:none]", className)} {...props} />;
}

export function TabsTrigger({ surface = "night", className, ...props }: ComponentProps<typeof RadixTabs.Trigger> & { surface?: "night" | "paper" }) {
  return (
    <RadixTabs.Trigger
      className={cn(
        "border-3 border-b-0 border-transparent bg-transparent px-3.5 pt-2.5 pb-2 font-display text-cel-tab tracking-cel whitespace-nowrap focus-visible:-outline-offset-3",
        surface === "night" ? "text-muted hover:text-paper" : "text-ink-soft hover:text-ink",
        "data-[state=active]:border-ink data-[state=active]:bg-gold data-[state=active]:text-on-gold",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: ComponentProps<typeof RadixTabs.Content>) {
  return <RadixTabs.Content className={cn("mt-3 text-body-sm text-muted", className)} {...props} />;
}
