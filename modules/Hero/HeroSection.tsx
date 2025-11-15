"use client";

import type { JSX } from "react";
import { useEffect, useMemo, useRef } from "react";
import IdentityEngineer from "@/modules/Identity/IdentityEngineer";
import IdentityCreator from "@/modules/Identity/IdentityCreator";

const ROLE_CHIPS = ["ENGINEER_MK-II", "CREATOR_ARCHETYPE", "SYSTEM_OPERATOR"];

export default function HeroSection(): JSX.Element {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const rolesRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) {
      return undefined;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!titleRef.current || !rolesRef.current) {
        return;
      }

      const { innerWidth, innerHeight } = window;
      const offsetX = (event.clientX / innerWidth - 0.5) * 16;
      const offsetY = (event.clientY / innerHeight - 0.5) * 10;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (titleRef.current) {
          titleRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        }
        if (rolesRef.current) {
          rolesRef.current.style.transform = `translate3d(${offsetX * 0.6}px, ${
            offsetY * 0.6
          }px, 0)`;
        }
      });
    };

    const resetTransforms = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (titleRef.current) {
        titleRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      if (rolesRef.current) {
        rolesRef.current.style.transform = "translate3d(0, 0, 0)";
      }
    };

    heroElement.addEventListener("mousemove", handleMouseMove);
    heroElement.addEventListener("mouseleave", resetTransforms);

    return () => {
      heroElement.removeEventListener("mousemove", handleMouseMove);
      heroElement.removeEventListener("mouseleave", resetTransforms);
      resetTransforms();
    };
  }, []);

  const roleChips = useMemo(
    () =>
      ROLE_CHIPS.map((role) => (
        <div key={role} className="role-chip holo-focus">
          {role}
        </div>
      )),
    []
  );

  return (
    <div ref={heroRef} className="hero-container">
      <div ref={titleRef} className="hero-title holo-flicker holo-focus">
        <h1 className="name">
          TANVEER <span>SINGH</span>
        </h1>
      </div>

      <div ref={rolesRef} className="hero-roles">
        {roleChips}
      </div>

      <div className="hero-id-panels">
        <IdentityEngineer />
        <IdentityCreator />
      </div>
    </div>
  );
}
