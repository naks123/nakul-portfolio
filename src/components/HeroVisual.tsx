"use client";

import { useEffect, useRef, useState } from "react";
import { startRing } from "@/lib/heroRing";

/* The hero's animated element. Server-renders the CSS blobs (`fallback`), then
   crossfades to the WebGL ring once it's running. If WebGL isn't available,
   or the GPU context is lost, the blobs simply stay. */
export default function HeroVisual({ fallback }: { fallback: React.ReactNode }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ringReady, setRingReady] = useState(false);
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    if (!canvas.current) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const showBlobs = () => {
      setRingReady(false);
      setShowFallback(true);
    };

    const stop = startRing(canvas.current, { still, maxFps: coarse ? 30 : 60 }, showBlobs);
    if (!stop) {
      showBlobs();
      return;
    }

    setRingReady(true);
    // Unmount the blobs after the crossfade so their animation stops too.
    const done = setTimeout(() => setShowFallback(false), 1400);

    return () => {
      clearTimeout(done);
      stop();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[28rem] lg:max-w-[38rem]"
    >
      {showFallback ? (
        <div
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out-soft ${
            ringReady ? "opacity-0" : "opacity-100"
          }`}
        >
          {fallback}
        </div>
      ) : null}
      <canvas
        ref={canvas}
        className={`absolute inset-0 size-full transition-opacity duration-[1200ms] ease-out-soft ${
          ringReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
