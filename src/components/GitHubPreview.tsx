import ContributionGraph from "@/components/ContributionGraph";
import { profile } from "@/content/profile";
import { getContributions, getRecentPushes, relativeDate } from "@/lib/github";

/* Contents of the hover card on the GitHub icon. Renders nothing if GitHub
   is unreachable, so the icon simply behaves as a plain link. */
export default async function GitHubPreview() {
  const [contributions, pushes] = await Promise.all([
    getContributions(profile.githubUser),
    getRecentPushes(profile.githubUser, 3),
  ]);

  if (!contributions) return null;

  return (
    <div className="w-max rounded-lg border border-line bg-bg p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="mb-3 flex items-baseline justify-between gap-6 text-xs">
        <span className="font-medium text-ink">@{profile.githubUser}</span>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-soft underline underline-offset-4 transition-colors duration-150 hover:text-ink"
        >
          View profile ↗
        </a>
      </div>

      <ContributionGraph data={contributions} size="sm" />

      {pushes.length > 0 ? (
        <ul className="mt-3 border-t border-line pt-2 text-xs">
          {pushes.map((push) => (
            <li
              key={push.repo}
              className="flex items-baseline justify-between gap-6 py-1"
            >
              <a
                href={`https://github.com/${push.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink hover:underline"
              >
                {push.repo.split("/")[1] ?? push.repo}
              </a>
              <span className="text-soft">{relativeDate(push.date)}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
