export type Tone = "yellow" | "red" | "blue";

export const TONES: Tone[] = ["yellow", "red", "blue"];

/* Full class strings so Tailwind can find them statically. */
const GLOW: Record<Tone, string> = {
  yellow: "from-accent-yellow",
  red: "from-accent-red",
  blue: "from-accent-blue",
};

/** Small abstract visual for cards: a soft orb in one accent color. */
export default function AccentMark({ tone }: { tone: Tone }) {
  return (
    <span
      aria-hidden="true"
      className="relative block size-11 shrink-0 rounded-full border border-line bg-surface-2"
    >
      <span
        className={`absolute inset-1.5 rounded-full bg-radial-[at_35%_30%] ${GLOW[tone]} to-transparent to-70%`}
      />
    </span>
  );
}
