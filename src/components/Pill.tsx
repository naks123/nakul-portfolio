import Link from "next/link";

type Variant = "solid" | "outline";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap transition-colors duration-(--duration-hover) ease-out-soft";

const VARIANT: Record<Variant, string> = {
  solid: "bg-ink text-bg hover:bg-accent-yellow",
  outline: "border border-line-strong text-ink hover:border-ink hover:bg-surface-2",
};

const SIZE = {
  md: "px-6 py-3 text-[0.9375rem]",
  sm: "px-4 py-2 text-sm",
} as const;

export function pillClass(variant: Variant = "solid", size: keyof typeof SIZE = "md") {
  return `${BASE} ${VARIANT[variant]} ${SIZE[size]}`;
}

/** Internal route → next/link; anything else (mailto:, files, external) → <a>. */
export default function Pill({
  href,
  children,
  variant = "solid",
  size = "md",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: keyof typeof SIZE;
  external?: boolean;
}) {
  const className = pillClass(variant, size);

  if (href.startsWith("/") && !external) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
