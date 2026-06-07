"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { ToolsMegaMenu } from "./ToolsMegaMenu";
import { FOCUS_RING } from "@/lib/a11y";
import type { MegaMenuCategory } from "@/data/catalog";
import type { PathwaySummary } from "@/data/pathways";

interface NavLink {
  href: string;
  label: string;
}

const LINKS: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/ressources", label: "Ressources" },
  { href: "/contribuer", label: "Contribuer" },
  { href: "/a-propos", label: "À propos" },
];

export function Header({
  menu,
  pathways,
}: {
  menu: MegaMenuCategory[];
  pathways: PathwaySummary[];
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" aria-label="Peer to Peer — accueil" className={`text-lg ${FOCUS_RING}`}>
          <Logo size={22} />
        </Link>
        <div className="flex items-center gap-1">
          {LINKS.map((link, i) => (
            <Fragment key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${FOCUS_RING} ${
                  isActive(link.href) ? "bg-accent text-white" : "text-muted hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
              {/* Le mégamenu « Outils » s'insère juste après « Accueil ». */}
              {i === 0 ? <ToolsMegaMenu menu={menu} pathways={pathways} /> : null}
            </Fragment>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
