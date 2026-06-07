"use client";

/**
 * Mégamenu « Outils » — présente le catalogue groupé par catégorie.
 * Accessibilité (WCAG 2.2 AA) :
 *  - bouton déclencheur avec aria-haspopup / aria-expanded / aria-controls ;
 *  - ouverture au survol SOURIS uniquement (filtre pointerType, pas de conflit tactile) ;
 *  - clic = ouvrir/fermer (clavier + tactile) ; Échap referme et rend le focus ;
 *  - fermeture au clic extérieur, à la perte de focus, et à la navigation ;
 *  - panneau toujours rendu (SSR) mais masqué via `hidden` quand fermé.
 * Charte « Minimalisme éditorial chaleureux » : surfaces douces, couleurs
 * thémées et apaisées, accent terracotta pour l'état actif, GameIcon, slide-up.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";
import type { MegaMenuCategory } from "@/data/catalog";
import type { PathwaySummary } from "@/data/pathways";

export function ToolsMegaMenu({
  menu,
  pathways,
}: {
  menu: MegaMenuCategory[];
  pathways: PathwaySummary[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active =
    pathname.startsWith("/outils") || pathname.startsWith("/categories");

  // Referme à chaque navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Referme au clic en dehors du mégamenu.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Nettoyage du timer de fermeture différée.
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return; // pas d'ouverture au survol tactile
    clearCloseTimer();
    setOpen(true);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(e.relatedTarget as Node | null)
    ) {
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="tools-megamenu"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 px-3 py-1 text-sm font-semibold tracking-wide transition-colors ${FOCUS_RING} ${
          active ? "bg-surface-2 text-accent" : "hover:text-accent"
        }`}
      >
        Outils
        <GameIcon name={open ? "chevron-up" : "chevron-down"} size={14} aria-hidden />
      </button>

      <div
        id="tools-megamenu"
        hidden={!open}
        className="absolute left-0 right-0 top-full z-40 max-h-[calc(100vh-3.5rem)] overflow-y-auto border-b border-border bg-card animate-slide-up"
      >
        <div className="mx-auto max-w-5xl px-4 py-6">
          {/* Parcours par objectif */}
          {pathways.length > 0 ? (
            <div className="mb-5 border-b border-border pb-5">
              <p className="mb-2 font-heading text-base font-semibold tracking-tight">
                Parcours par objectif
              </p>
              <div className="flex flex-wrap gap-2">
                {pathways.map((p) => (
                  <Link
                    key={p.id}
                    href={`/parcours/${p.id}`}
                    className={`inline-flex items-center gap-2 border border-border px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent ${FOCUS_RING}`}
                  >
                    <GameIcon name={p.iconName} size={16} className="text-accent" aria-hidden />
                    {p.goal}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid gap-6 md:grid-cols-3">
            {menu.map((cat) => (
              <div key={cat.key}>
                <Link
                  href={`/categories/${cat.key}`}
                  className={`group mb-2 flex items-center gap-2 ${FOCUS_RING}`}
                >
                  <GameIcon
                    name={cat.iconName}
                    size={22}
                    className="text-accent"
                  />
                  <span className="font-heading text-base font-semibold tracking-tight group-hover:text-accent">
                    {cat.label}
                  </span>
                </Link>
                <p className="mb-3 text-xs text-muted">{cat.description}</p>
                <ul className="flex flex-col gap-0.5">
                  {cat.tools.map((tool) =>
                    tool.available ? (
                      <li key={tool.slug}>
                        <Link
                          href={`/outils/${tool.slug}`}
                          className={`flex items-center gap-2 px-1 py-1 text-sm transition-colors hover:text-accent ${FOCUS_RING}`}
                        >
                          <GameIcon
                            name={tool.iconName}
                            size={18}
                            className="text-accent"
                          />
                          <span>{tool.label}</span>
                        </Link>
                      </li>
                    ) : (
                      <li key={tool.slug}>
                        <span className="flex items-center gap-2 px-1 py-1 text-sm text-muted">
                          <GameIcon name={tool.iconName} size={18} className="text-muted" />
                          <span>{tool.label}</span>
                          <span className="ml-auto border border-border px-1 text-[10px] font-semibold tracking-wide">
                            Bientôt
                          </span>
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <Link
              href="/"
              className={`inline-flex items-center gap-1 text-sm font-semibold tracking-wide text-accent transition-colors hover:text-accent ${FOCUS_RING}`}
            >
              Tous les outils <GameIcon name="arrow-right" size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
