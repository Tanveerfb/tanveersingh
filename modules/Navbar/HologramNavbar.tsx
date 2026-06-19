"use client";

import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function HologramNavbar(): JSX.Element {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMobileOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeHref = useMemo(() => pathname ?? "/", [pathname]);

  function isActive(item: NavItem): boolean {
    if (item.href === "/") return activeHref === "/";
    return activeHref === item.href || activeHref.startsWith(`${item.href}/`);
  }

  function navClass(item: NavItem): string {
    return ["nav-item", isActive(item) ? "active" : ""].filter(Boolean).join(" ");
  }

  return (
    <nav className="holo-navbar" aria-label="Primary">
      <div className="nav-inner">
        <Link href="/" className="nav-brand" aria-label="Tanveer Singh — Home">
          TANVEER SINGH
        </Link>

        <div className="nav-links" role="list">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navClass(item)}
              aria-current={isActive(item) ? "page" : undefined}
              prefetch
              role="listitem"
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/admin"
              className={[
                "nav-item",
                "nav-item--admin",
                activeHref.startsWith("/admin") ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={activeHref.startsWith("/admin") ? "page" : undefined}
              prefetch
              role="listitem"
            >
              Admin
            </Link>
          )}
        </div>

        <button
          type="button"
          className={["nav-toggle", mobileOpen ? "is-open" : ""]
            .filter(Boolean)
            .join(" ")}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="nav-toggle-bars" aria-hidden>
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            className="nav-mobile-panel"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            role="menu"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={`m-${item.href}`}
                href={item.href}
                className={navClass(item)}
                aria-current={isActive(item) ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
                prefetch
                role="menuitem"
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/admin"
                className={[
                  "nav-item",
                  "nav-item--admin",
                  activeHref.startsWith("/admin") ? "active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={
                  activeHref.startsWith("/admin") ? "page" : undefined
                }
                onClick={() => setMobileOpen(false)}
                prefetch
                role="menuitem"
              >
                Admin
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
