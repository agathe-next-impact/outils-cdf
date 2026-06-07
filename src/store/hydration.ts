"use client";

import { useEffect, useState } from "react";
import { useSessionStore } from "./sessionStore";

let started = false;

/**
 * Réhydrate le store depuis sessionStorage (une seule fois, côté client) et
 * indique quand c'est fait. Tant que `false`, afficher un squelette pour éviter
 * tout mismatch d'hydratation.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!started) {
      started = true;
      void useSessionStore.persist.rehydrate();
    }
    setHydrated(true);
  }, []);

  return hydrated;
}
