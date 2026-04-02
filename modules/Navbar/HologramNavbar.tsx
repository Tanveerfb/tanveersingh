"use client";

import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import GradientText from "@/components/GradientText";
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
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function HologramNavbar(): JSX.Element {
  const pathname = usePathname();
  const { user } = useAuth();
  const [compact, setCompact] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setMobileOpen(false);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth > 640) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeHref = useMemo(() => pathname ?? "/", [pathname]);

  const navClassName = ["holo-navbar", compact ? "compact" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClassName} aria-label="Primary">
      <div className="nav-inner">
        <button
          type="button"
          className={["nav-toggle", mobileOpen ? "is-open" : ""]
            .filter(Boolean)
            .join(" ")}
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="nav-toggle-bars" aria-hidden>
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </span>
        </button>

        <div className="nav-brand-mobile" aria-hidden>
          <GradientText animationSpeed={10}>Tanveer Singh</GradientText>
        </div>

        <div className="nav-links">
          {NAV_ITEMS.map((item) => {
            const isActive =
              activeHref === item.href ||
              activeHref.startsWith(`${item.href}/`);
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
              prefetch
            >
              Admin
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            key="mobile-nav"
            className="nav-mobile-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="menu"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                activeHref === item.href ||
                activeHref.startsWith(`${item.href}/`);
              const itemClassName = ["nav-item", isActive ? "active" : ""]
                .filter(Boolean)
                .join(" ");

              return (
                <>
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    className={itemClassName}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    prefetch
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                </>
              );
            })}
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
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
