export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-page px-(--space-gutter) ${className}`}>
      {children}
    </div>
  );
}
