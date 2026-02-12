export function BadgeSectionTitle({
  text,
  variant = "default",
}: {
  text: string;
  variant?: "default" | "inverse";
  eyebrowVariant?: "center" | "start" | "end";
}) {
  const isInverse = variant === "inverse";
  const styles = isInverse
    ? "bg-white/10 border-white/20 text-accent"
    : "border-primary/20 bg-primary/5 text-primary";

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-md border px-3 py-1 text-xs font-semibold tracking-wide ${styles}`}
    >
      <span className="size-2 rounded-full bg-accent" />
      {text}
    </span>
  );
}
