import GameIcon from "@/components/GameIcon";
import { Halo } from "@/components/layout/Halo";

type MaxWidth = "md" | "lg" | "2xl" | "4xl" | "full";

const MAX_WIDTH: Record<MaxWidth, string> = {
  md: "max-w-md",
  lg: "max-w-lg",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  full: "max-w-none", // pleine largeur de page (bento dashboard) — reste responsive
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
      className="relative min-h-[calc(100vh-80px)] overflow-hidden px-4 py-12 focus:outline-none sm:px-6 lg:px-8"
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
      {/* Halos décoratifs ambiants (myrtille / framboise), légèrement mouvants. */}
      <Halo color="myrtille" size={460} delay={0} style={{ right: -170, top: 16 }} />
      <Halo color="framboise" size={360} delay={-8} duration={23} style={{ left: -140, bottom: 64 }} />
      <div className={`relative z-10 mx-auto ${MAX_WIDTH[maxWidth]}`}>{children}</div>
    </main>
  );
}
