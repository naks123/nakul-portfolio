"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Marks [data-reveal] elements visible as they scroll into view. Mounted once
   in the layout; re-runs on navigation so each new page gets observed. The
   hiding itself is CSS-only under .motion-ok, so this does nothing visible
   for visitors with reduced motion or without JavaScript. */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // The app loaded, so cancel the layout's "bundle never arrived" failsafe.
    clearTimeout((window as unknown as { __motionFailsafe?: number }).__motionFailsafe);

    const pending = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");

    if (!("IntersectionObserver" in window)) {
      pending.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
