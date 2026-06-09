import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * Primitif de mise en page « Bento » (charte Lagune) — grille modulaire à
 * GOUTTIÈRE : les tuiles sont espacées (gap 18px, comme `.bento`), chacune
 * posée avec son filet hairline et ses angles arrondis.
 *
 * NB : `.card` est du CSS non-layered (il l'emporte sur les utilitaires Tailwind),
 * d'où le `style` inline pour les fonds colorés des tuiles `accent`/`soft`.
 */

/** Conteneur de grille : 1 col (mobile) → 2 (sm) → 3 (lg), avec gouttière. */
export function BentoGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {children}
    </div>
  );
}

/* Classes littérales (Tailwind doit les voir telles quelles dans la source). */
const SPAN: Record<1 | 2 | 3, string> = {
  1: "lg:col-span-1",
  2: "sm:col-span-2 lg:col-span-2",
  3: "sm:col-span-2 lg:col-span-3",
};

/** Renvoie les classes d'empan (largeur + hauteur) pour une tuile clic­able (`<Link>`…). */
export function bentoSpan(span: 1 | 2 | 3 = 1, tall = false): string {
  return `${SPAN[span]}${tall ? " lg:row-span-2" : ""}`;
}

export type BentoTone = "plain" | "accent" | "soft";

type BentoBoxProps = {
  children: ReactNode;
  /** Colonnes occupées en desktop (1–3). */
  span?: 1 | 2 | 3;
  /** Occupe deux rangées (tuile vedette haute). */
  tall?: boolean;
  /** Habillage : neutre (.card), `accent` (fond accent, texte clair) ou `soft` (fond accent doux). */
  tone?: BentoTone;
  /** Rang dans la grille → décalage d'animation d'entrée. */
  index?: number;
  as?: ElementType;
} & Omit<HTMLAttributes<HTMLElement>, "style" | "color">;

/** Tuile Bento : `.card` + empan + habillage optionnels, avec entrée en cascade. */
export function BentoBox({
  children,
  span = 1,
  tall = false,
  tone = "plain",
  index = 0,
  as: Tag = "div",
  className = "",
  ...rest
}: BentoBoxProps) {
  const toneStyle: CSSProperties | undefined =
    tone === "accent"
      ? { background: "var(--accent)", borderColor: "transparent" }
      : tone === "soft"
        ? { background: "var(--accent-soft)", borderColor: "transparent" }
        : undefined;

  return (
    <Tag
      {...rest}
      className={`card animate-slide-up ${bentoSpan(span, tall)} ${
        tone === "accent" ? "text-on-accent" : ""
      } ${className}`}
      style={{ animationDelay: `${index * 0.06}s`, ...toneStyle }}
    >
      {children}
    </Tag>
  );
}
