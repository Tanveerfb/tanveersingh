"use client";

import { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "@/theme/ThemeContext";
import { triggerReboot } from "@/modules/Intro/IntroSequence";

interface MenuItem {
  label: string;
  href: string;
}

interface NavbarProps {
  brand: string;
  menu: MenuItem[];
  themeToggleLabel: string;
  rebootLabel: string;
}

export default function Navbar({
  brand,
  menu,
  themeToggleLabel,
  rebootLabel,
}: NavbarProps) {
  const { theme, setTheme } = useContext(ThemeContext);
  const themes = ["cyberpunk", "genshin", "starrail"];

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length] ?? themes[0];
    setTheme(nextTheme);
  };

  return (
    <nav className="navbar">
      <div id="nav-inner" className="container nav-inner">
        <div id="nav-left" className="nav-left">
          {brand}
        </div>
        <div id="nav-right" className="nav-right">
          {menu.map((item) => (
            <Link key={item.href} className="nav-link" href={item.href}>
              {item.label}
            </Link>
          ))}
          <button type="button" onClick={cycleTheme}>
            {themeToggleLabel}
          </button>
          <button type="button" onClick={triggerReboot}>
            {rebootLabel}
          </button>
        </div>
      </div>
    </nav>
  );
}
