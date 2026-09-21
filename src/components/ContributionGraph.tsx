import type { Contributions } from "@/lib/github";

// Full class strings so Tailwind can find them statically.
const LEVEL = ["bg-gh-0", "bg-gh-1", "bg-gh-2", "bg-gh-3", "bg-gh-4"];
const SIZE = {
  md: { cell: "h-[10px] w-[10px]", label: "w-[10px]" },
  sm: { cell: "h-[8px] w-[8px]", label: "w-[8px]" },
} as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* One label per column where a new month starts, skipping any that would
   crowd the previous label (the partial first month usually does). */
function monthLabels(weeks: Contributions["weeks"]): string[] {
  let lastMonth = -1;
  let lastIndex = -10;
  return weeks.map((week, i) => {
    const first = week.find(Boolean);
    if (!first) return "";
    const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
    if (month === lastMonth) return "";
    lastMonth = month;
    if (i - lastIndex < 3) return "";
    lastIndex = i;
    return MONTHS[month];
  });
}

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

export default function ContributionGraph({
  data,
  size = "md",
}: {
  data: Contributions;
  size?: keyof typeof SIZE;
}) {
  const labels = monthLabels(data.weeks);
  const { cell, label: labelWidth } = SIZE[size];

  return (
    <figure>
      {/* Mobile: row-reverse makes the overflow start scrolled to the newest week. */}
      <div className="flex flex-row-reverse overflow-x-auto pb-2 sm:flex-row">
        <div className="shrink-0">
          <div className="mb-1.5 flex gap-[2px] text-[10px] leading-none text-ink-subtle">
            {labels.map((label, i) => (
              <span key={i} className={`${labelWidth} overflow-visible whitespace-nowrap`}>
                {label}
              </span>
            ))}
          </div>

          <div
            className="flex gap-[2px]"
            role="img"
            aria-label={`${plural(data.total, "contribution")} in the last year`}
          >
            {data.weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[2px]">
                {week.map((day, j) => (
                  <div
                    key={j}
                    title={day ? `${plural(day.count, "contribution")} on ${day.date}` : undefined}
                    className={`${cell} rounded-[2px] ${
                      day ? LEVEL[Math.min(day.level, 4)] : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
        <span>{plural(data.total, "contribution")} in the last year</span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          Less
          {LEVEL.map((cls) => (
            <span key={cls} className={`${cell} rounded-[2px] ${cls}`} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
