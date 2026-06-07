import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FOCUS_RING } from "@/lib/a11y";

/**
 * Fine barre haute mobile (< lg) : uniquement la marque + la bascule de thème.
 * La navigation, elle, passe exclusivement par la BottomNav. Respecte la
 * safe-area du haut (encoche). Sur desktop, c'est la Sidebar qui prend le relais.
 */
export function MobileTopBar() {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur-sm"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <Link
        href="/"
        aria-label="Peer to Peer — accueil"
        className={`flex h-14 items-center text-lg ${FOCUS_RING}`}
      >
        <Logo size={22} />
      </Link>
      <ThemeToggle />
    </header>
  );
}
