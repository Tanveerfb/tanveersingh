"use client";

import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function HologramNavbar(): JSX.Element {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      setCompact(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeHref = useMemo(() => pathname ?? "/", [pathname]);

  const navClassName = ["holo-navbar", compact ? "compact" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClassName} aria-label="Primary">
      <div className="nav-inner">
        {NAV_ITEMS.map((item) => {
          const isActive =
            activeHref === item.href || activeHref.startsWith(`${item.href}/`);
          const itemClassName = ["nav-item", isActive ? "active" : ""]
            .filter(Boolean)
            .join(" ");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={itemClassName}
              aria-current={isActive ? "page" : undefined}
              prefetch
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
