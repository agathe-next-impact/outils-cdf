"use client";

import { useCallback } from "react";
import { useSessionStore } from "./sessionStore";

/**
 * Lit/écrit le slice d'état d'un outil. Le typage est porté par l'appelant
 * (chaque moteur connaît la forme de son état). Renvoie `undefined` tant
 * qu'aucune donnée n'a été saisie.
 */
export function useToolSlice<T>(slug: string): [T | undefined, (next: T) => void] {
  const stored = useSessionStore((s) => s.tools[slug]) as T | undefined;
  const setToolState = useSessionStore((s) => s.setToolState);
  const set = useCallback((next: T) => setToolState(slug, next), [slug, setToolState]);
  return [stored, set];
}

/** Lecture impérative (hors rendu) du slice d'un outil. */
export function readToolSlice<T>(slug: string): T | undefined {
  return useSessionStore.getState().tools[slug] as T | undefined;
}
