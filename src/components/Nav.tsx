"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import { pillClass } from "@/components/Pill";
import { navigation } from "@/content/navigation";
import { profile } from "@/content/profile";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/75 backdrop-blur-md">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
        <Link href="/" className="text-lg font-medium tracking-tight text-ink">
          {profile.name}
        </Link>

        {/* Phones: wraps to its own row under the name and Contact pill. */}
        <nav aria-label="Main" className="order-last w-full sm:order-none sm:w-auto">
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {navigation.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`text-[0.9375rem] transition-colors duration-(--duration-hover) hover:text-ink ${
                      active
                        ? "text-ink underline decoration-accent-yellow decoration-2 underline-offset-8"
                        : "text-ink-muted"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <a href={`mailto:${profile.email}`} className={pillClass("solid", "sm")}>
          Contact
        </a>
      </Container>
    </header>
  );
}
