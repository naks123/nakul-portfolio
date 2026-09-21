import SplitWords from "@/components/SplitWords";

export default function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-[clamp(4rem,10vw,7.5rem)] pb-[clamp(3rem,7vw,5rem)]">
      <h1 data-reveal="words" className="text-display font-medium">
        <SplitWords text={title} />
      </h1>
      {children}
    </header>
  );
}
