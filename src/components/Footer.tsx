import { profile } from "@/content/profile";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-8 text-xs text-soft sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {profile.name}
        </span>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            className="transition-colors duration-150 hover:text-ink"
            href={`mailto:${profile.email}`}
          >
            Email
          </a>
          <a
            className="transition-colors duration-150 hover:text-ink"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="transition-colors duration-150 hover:text-ink"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="transition-colors duration-150 hover:text-ink"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
