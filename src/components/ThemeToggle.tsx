"use client";

/**
 * ThemeToggle — bascule clair/sombre (next-themes).
 * État non monté → Eclipse + cursor-wait (évite le flash d'hydratation).
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
      <button className="p-2 text-black cursor-wait" aria-label="Chargement du thème">
        <span className="sr-only">Chargement du thème</span>
        <Eclipse size={20} aria-hidden />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 text-black transition-colors hover:text-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue"
      aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
    >
      {theme === "dark" ? <Sun size={20} aria-hidden /> : <Moon size={20} aria-hidden />}
    </button>
  );
}
