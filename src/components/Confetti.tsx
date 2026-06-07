"use client";

/**
 * Confetti — pluie de 50 particules carrées aux couleurs de la palette.
 * À monter ponctuellement lors d'une célébration (synthèse, résultat) puis démonter.
 * Respecte prefers-reduced-motion (ne rend rien si l'utilisateur l'a demandé).
 */
import { useEffect, useState } from "react";

const COLORS = ["#000000", "#f5c400", "#d63a3a", "#3a6ed6", "#ffffff"];

interface Particle {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
}

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const items: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      size: Math.random() * 8 + 4,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}
