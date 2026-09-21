import Link from "next/link";
import Container from "@/components/Container";
import SocialLinks from "@/components/SocialLinks";
import { navigation } from "@/content/navigation";
import { profile } from "@/content/profile";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-surface">
      <Container className="pt-20 pb-10 sm:pt-24">
        <div className="grid gap-14 md:grid-cols-2">
          <div className="grid content-start gap-5 sm:grid-cols-[7rem_1fr]">
            <p className="text-label text-ink-subtle uppercase">/ Pages</p>
            <ul className="flex flex-col gap-1">
              {navigation.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-h3 font-medium uppercase transition-colors duration-(--duration-hover) hover:text-ink-muted"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid content-start gap-5 sm:grid-cols-[7rem_1fr]">
            <p className="text-label text-ink-subtle uppercase">/ Social</p>
            <SocialLinks size={24} />
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 text-label text-ink-subtle uppercase">
          <span>
            © {year} {profile.name}
          </span>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-(--duration-hover) hover:text-ink"
          >
            Resume ↗
          </a>
        </div>
      </Container>
    </footer>
  );
}
