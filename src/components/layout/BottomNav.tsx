"use client";

/**
 * BottomNav — barre d'onglets fixe en bas d'écran, SEULE navigation en mobile
 * (en deçà de `lg`). Reprend les destinations principales de la Sidebar.
 * Respecte la safe-area (encoche / barre gestuelle) et `prefers-reduced-motion`.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const ITEMS: NavItem[] = [
  { href: "/", label: "Accueil", icon: "home" },
  { href: "/outils", label: "Outils", icon: "clipboard-list" },
  { href: "/parcours", label: "Parcours", icon: "compass" },
  { href: "/ressources", label: "Ressources", icon: "heart-handshake" },
  { href: "/contribuer", label: "Contribuer", icon: "heart" },
];

export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href.includes("#")) return false; // liens d'ancre : pas d'état actif
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 px-1 pb-1.5 pt-2 text-[0.68rem] font-medium transition-colors ${FOCUS_RING} ${
                  active ? "text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-[4px] transition-colors ${
                    active ? "bg-surface-2 text-accent" : ""
                  }`}
                >
                  <GameIcon name={item.icon} size={20} strokeWidth={1.75} aria-hidden />
                </span>
                <span className="leading-none">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
