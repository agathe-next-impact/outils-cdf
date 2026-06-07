import GameIcon from "@/components/GameIcon";

type MaxWidth = "md" | "lg" | "2xl" | "4xl";

const MAX_WIDTH: Record<MaxWidth, string> = {
  md: "max-w-md",
  lg: "max-w-lg",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
};

interface PageWrapperProps {
  children: React.ReactNode;
  maxWidth?: MaxWidth;
  /** Icônes décoratives flottantes (clés GameIcon). */
  decor?: string[];
}

export function PageWrapper({ children, maxWidth = "2xl", decor }: PageWrapperProps) {
  return (
    <main
      id="contenu"
      tabIndex={-1}
      className="relative min-h-[calc(100vh-80px)] overflow-hidden px-4 py-12 focus:outline-none"
    >
      {decor?.[0] ? (
        <GameIcon
          name={decor[0]}
          size={120}
          className="pointer-events-none absolute -left-6 top-24 text-muted/30 animate-float select-none"
        />
      ) : null}
      {decor?.[1] ? (
        <GameIcon
          name={decor[1]}
          size={96}
          className="pointer-events-none absolute right-2 bottom-16 text-muted/30 animate-float select-none"
        />
      ) : null}
      <div className={`relative mx-auto ${MAX_WIDTH[maxWidth]}`}>{children}</div>
    </main>
  );
}
