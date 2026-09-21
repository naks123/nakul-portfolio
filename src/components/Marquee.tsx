"use client";

import { useState } from "react";

function Asterisk() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[0.7em] shrink-0 text-accent-yellow"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
    >
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
    </svg>
  );
}

/* The list renders twice so the loop is seamless; the copy is aria-hidden so
   screen readers hear it once. Auto-motion can be paused (hover, or the
   button, which also covers touch and keyboard). CSS in globals.css turns
   the whole thing into a static, swipeable row under reduced motion. */
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const [paused, setPaused] = useState(false);

  const row = (hidden: boolean) => (
    <ul className="marquee-copy flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-8 pr-8 text-lead font-medium whitespace-nowrap text-ink"
        >
          {item}
          <Asterisk />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label={label}
      data-paused={paused ? "true" : "false"}
      className="relative border-y border-line"
    >
      <div className="marquee py-7">
        <div className="marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? `Play ${label.toLowerCase()} scroll` : `Pause ${label.toLowerCase()} scroll`}
        className="marquee-toggle absolute top-1/2 right-(--space-gutter) size-9 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-bg text-ink-muted transition-colors duration-(--duration-hover) hover:border-ink hover:text-ink"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
          {paused ? (
            <path d="M7 4.5v15l13-7.5z" />
          ) : (
            <path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" />
          )}
        </svg>
      </button>
    </section>
  );
}
