"use client";

/**
 * Sidebar — barre latérale fixe éditoriale : rail d'icônes à gauche, pastille
 * d'accent bleu sur l'item actif, tooltips au survol, logo en haut,
 * À propos + bascule de thème en bas.
 * Affichée à partir de `lg` ; en deçà, c'est la BottomNav qui prend le relais.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import GameIcon from "@/components/GameIcon";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FOCUS_RING } from "@/lib/a11y";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const TOP: NavItem[] = [
  { href: "/", label: "Accueil", icon: "home" },
  { href: "/outils", label: "Outils", icon: "clipboard-list" },
  { href: "/parcours", label: "Parcours", icon: "compass" },
  { href: "/ressources", label: "Aide", icon: "heart-handshake" },
  { href: "/contribuer", label: "Contribuer", icon: "heart" },
];

const BOTTOM: NavItem[] = [{ href: "/a-propos", label: "À propos", icon: "info" }];

function SidebarLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${FOCUS_RING} ${
        active
          ? "bg-accent-soft text-accent"
          : "text-muted hover:bg-surface-2 hover:text-foreground"
      }`}
    >
      <GameIcon name={item.icon} size={20} strokeWidth={1.75} aria-hidden />
      {/* Tooltip (le nom accessible reste porté par aria-label) */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-sm text-background opacity-0 transition-opacity group-hover:opacity-100"
      >
        {item.label}
      </span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href.includes("#")) return false; // liens d'ancre : pas d'état actif
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col items-center border-r border-border bg-card/95 py-6 backdrop-blur-sm lg:flex"
    >
      <Link href="/" aria-label="Peer to Peer — accueil" className={`rounded-md ${FOCUS_RING}`}>
        <Logo size={32} showWordmark={false} />
      </Link>

      <div className="mt-8 flex flex-1 flex-col items-center justify-between">
        <ul className="flex flex-col items-center gap-3">
          {TOP.map((item) => (
            <li key={item.href}>
              <SidebarLink item={item} active={isActive(item.href)} />
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-3">
          {BOTTOM.map((item) => (
            <SidebarLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
