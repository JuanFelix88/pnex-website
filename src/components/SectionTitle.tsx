import { BadgeSectionTitle } from "./BadgeSectionTitle";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  eyebrowVariant = "center",
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  eyebrowVariant?: "center" | "start" | "end";
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow && eyebrowVariant === "center" && (
        <div className="w-full flex justify-center">
          <BadgeSectionTitle text={eyebrow} />
        </div>
      )}
      {eyebrow && eyebrowVariant === "start" && (
        <div className="w-full flex justify-start">
          <BadgeSectionTitle text={eyebrow} />
        </div>
      )}
      {eyebrow && eyebrowVariant === "end" && (
        <div className="w-full flex justify-end">
          <BadgeSectionTitle text={eyebrow} />
        </div>
      )}
      <h2 className="text-3xl font-semibold leading-tight sm:text-4xl text-balance text-primary">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-base text-text-muted sm:text-lg max-w-3xl text-balance">
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  );
}
