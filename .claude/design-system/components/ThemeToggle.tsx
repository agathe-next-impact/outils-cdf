"use client";

/**
 * ThemeToggle — bascule clair/sombre (next-themes).
 * État non monté → Eclipse + cursor-wait (évite le flash d'hydratation).
 * À placer typiquement à l'extrémité droite de la barre de navigation.
 */
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Eclipse } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 text-black cursor-wait">
        <span className="sr-only">Chargement du thème</span>
        <Eclipse size={20} />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 text-black transition-colors"
      aria-label="Changer le thème"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
