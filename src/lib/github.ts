export type ContributionDay = { date: string; count: number; level: number };
export type Contributions = { total: number; weeks: (ContributionDay | null)[][] };
export type PushSummary = { repo: string; commits: number; date: string };

/* Both endpoints are public and unauthenticated. Every failure path returns
   null/[] so a rate limit or outage degrades the section instead of the build. */
const REVALIDATE = 3600;

export async function getContributions(
  user: string,
): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return null;

    const json = await res.json();
    const days: ContributionDay[] = json?.contributions ?? [];
    if (!days.length) return null;

    // Bucket into calendar weeks, each a 7-slot column indexed by weekday.
    const weeks: (ContributionDay | null)[][] = [];
    let column: (ContributionDay | null)[] = Array(7).fill(null);

    for (const day of days) {
      const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
      column[weekday] = day;
      if (weekday === 6) {
        weeks.push(column);
        column = Array(7).fill(null);
      }
    }
    if (column.some(Boolean)) weeks.push(column);

    return { total: json?.total?.lastYear ?? 0, weeks };
  } catch {
    return null;
  }
}

export async function getRecentPushes(
  user: string,
  limit = 4,
): Promise<PushSummary[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/events/public?per_page=100`,
      {
        next: { revalidate: REVALIDATE },
        headers: { Accept: "application/vnd.github+json" },
      },
    );
    if (!res.ok) return [];

    const events = await res.json();
    if (!Array.isArray(events)) return [];

    // Collapse multiple pushes to the same repo into one row.
    const byRepo = new Map<string, PushSummary>();
    for (const e of events) {
      if (e?.type !== "PushEvent" || !e?.repo?.name) continue;
      const existing = byRepo.get(e.repo.name);
      const commits = e.payload?.size ?? 0;
      if (existing) {
        existing.commits += commits;
      } else {
        byRepo.set(e.repo.name, {
          repo: e.repo.name,
          commits,
          date: e.created_at,
        });
      }
    }

    return [...byRepo.values()]
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .slice(0, limit);
  } catch {
    return [];
  }
}

export function relativeDate(iso: string): string {
  const days = Math.floor((Date.now() - +new Date(iso)) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "last month" : `${months} months ago`;
}
