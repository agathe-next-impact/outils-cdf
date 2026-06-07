"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";

interface NavLink {
  href: string;
  label: string;
  activeClass: string;
}

const LINKS: NavLink[] = [
  { href: "/", label: "Accueil", activeClass: "bg-blue text-white" },
  { href: "/ressources", label: "Ressources", activeClass: "bg-red text-white" },
  { href: "/a-propos", label: "À propos", activeClass: "bg-yellow text-black" },
];

export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-black/20 bg-white">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className={`flex items-center gap-2 font-heading text-lg font-black uppercase tracking-tight ${FOCUS_RING}`}
        >
          <GameIcon name="sparkles" size={22} className="text-blue" />
          Comme des Fous
        </Link>
        <div className="flex items-center gap-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`px-3 py-1 text-sm font-bold uppercase tracking-wide transition-colors ${FOCUS_RING} ${
                isActive(link.href) ? link.activeClass : "hover:text-blue"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
