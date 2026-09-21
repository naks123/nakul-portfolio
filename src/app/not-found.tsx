import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        Page not found
      </h1>
      <p className="mt-3 text-soft">
        That page doesn&apos;t exist.{" "}
        <Link
          href="/"
          className="underline underline-offset-4 transition-colors duration-150 hover:text-ink"
        >
          Back home
        </Link>
        .
      </p>
    </div>
  );
}
