import { profile } from "@/content/profile";

/* Brand marks from simple-icons (24x24), mail from Material Symbols. */
const ICONS = {
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  devpost:
    "M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853Z",
  mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
} as const;

const links = [
  { key: "github", label: "GitHub", href: profile.github },
  { key: "linkedin", label: "LinkedIn", href: profile.linkedin },
  { key: "devpost", label: "Devpost", href: profile.devpost },
  { key: "mail", label: "Email", href: `mailto:${profile.email}` },
] as const;

const LINK_CLASS = {
  // Hero: each icon in a round outlined button.
  circle:
    "flex size-12 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-(--duration-hover) hover:border-line-strong hover:bg-surface hover:text-ink",
  // Footer: bare icons.
  plain: "block text-ink-muted transition-colors duration-(--duration-hover) hover:text-ink",
} as const;

export default function SocialLinks({
  size = 20,
  variant = "plain",
  githubPreview,
}: {
  size?: number;
  variant?: keyof typeof LINK_CLASS;
  /** Shown as a hover/focus card on the GitHub icon. Desktop only: touch
      devices have no hover, so there the icon is just a link. */
  githubPreview?: React.ReactNode;
}) {
  return (
    <ul className={`flex items-center ${variant === "circle" ? "gap-3" : "gap-5"}`}>
      {links.map(({ key, label, href }) => {
        const preview = key === "github" ? githubPreview : null;

        return (
          <li key={key} className={preview ? "group relative" : undefined}>
            <a
              href={href}
              aria-label={label}
              title={preview ? undefined : label}
              {...(key === "mail"
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className={LINK_CLASS[variant]}
            >
              <svg
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                width={size}
                height={size}
                fill="currentColor"
              >
                <path d={ICONS[key]} />
              </svg>
            </a>

            {preview ? (
              // pt-3 (not margin) bridges the gap, so moving the pointer from
              // the icon into the card doesn't cross dead space and close it.
              <div className="invisible absolute top-full left-0 z-30 hidden pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 md:block">
                {preview}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
