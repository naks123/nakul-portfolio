import ContributionGraph from "@/components/ContributionGraph";
import { profile } from "@/content/profile";
import { getContributions, getRecentPushes, relativeDate } from "@/lib/github";

export default async function GitHubActivity() {
  const [contributions, pushes] = await Promise.all([
    getContributions(profile.githubUser),
    getRecentPushes(profile.githubUser),
  ]);

  // Nothing to show if GitHub is unreachable; the section just disappears.
  if (!contributions && pushes.length === 0) return null;

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xs uppercase tracking-widest text-soft">
          On GitHub
        </h2>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-soft underline underline-offset-4 transition-colors duration-150 hover:text-ink"
        >
          @{profile.githubUser}
        </a>
      </div>

      {contributions ? (
        <div className="mt-4 rounded-lg border border-line bg-surf p-5">
          <ContributionGraph data={contributions} />
        </div>
      ) : null}

      {pushes.length > 0 ? (
        <ul className="mt-4">
          {pushes.map((push) => (
            <li
              key={push.repo}
              className="flex items-baseline justify-between gap-4 border-t border-line py-3 text-sm"
            >
              <a
                href={`https://github.com/${push.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate font-medium text-ink hover:underline"
              >
                {push.repo.split("/")[1] ?? push.repo}
              </a>
              <span className="shrink-0 text-xs text-soft">
                {push.commits > 0
                  ? `${push.commits} commit${push.commits === 1 ? "" : "s"} · `
                  : ""}
                {relativeDate(push.date)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
