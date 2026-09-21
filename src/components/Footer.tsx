import SocialLinks from "@/components/SocialLinks";
import { profile } from "@/content/profile";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-8 text-xs text-soft sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {profile.name}
        </span>
        <div className="flex items-center gap-5">
          <SocialLinks size={16} />
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
