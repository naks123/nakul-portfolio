import Container from "@/components/Container";
import Pill from "@/components/Pill";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-8 py-(--space-section)">
      <p className="text-label text-ink-subtle uppercase">Error 404</p>
      <h1 className="text-display font-medium">Page not found</h1>
      <Pill href="/" variant="outline">
        ← Back home
      </Pill>
    </Container>
  );
}
