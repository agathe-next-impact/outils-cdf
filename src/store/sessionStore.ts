/**
 * Store de session unique (Zustand) — persistance sessionStorage.
 *
 * - Une seule clé `cdf-session` ; un slice d'état par slug d'outil.
 * - sessionStorage : survit au rafraîchissement et à la navigation, effacé à la
 *   fermeture de l'onglet. AUCUNE donnée n'est envoyée sur le réseau.
 * - `skipHydration: true` : on ne lit jamais sessionStorage au rendu serveur ;
 *   la réhydratation se fait côté client (voir hydration.ts).
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_COUNTRY } from "@/content/crisis-resources";

interface SessionStore {
  /** slug → état runtime de l'outil (forme dépendant du moteur). */
  tools: Record<string, unknown>;
  /** slug → consentement léger donné (aucune donnée personnelle). */
  consents: Record<string, boolean>;
  /** Pays pour les ressources de crise (préférence d'affichage). */
  country: string;

  getToolState: (slug: string) => unknown;
  setToolState: (slug: string, state: unknown) => void;
  resetTool: (slug: string) => void;
  resetAll: () => void;
  hasData: (slug: string) => boolean;

  setConsent: (slug: string, value: boolean) => void;
  hasConsent: (slug: string) => boolean;

  setCountry: (country: string) => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      tools: {},
      consents: {},
      country: DEFAULT_COUNTRY,

      getToolState: (slug) => get().tools[slug],
      setToolState: (slug, state) =>
        set((s) => ({ tools: { ...s.tools, [slug]: state } })),
      resetTool: (slug) =>
        set((s) => {
          const tools = { ...s.tools };
          delete tools[slug];
          const consents = { ...s.consents };
          delete consents[slug];
          return { tools, consents };
        }),
      resetAll: () => set({ tools: {}, consents: {} }),
      hasData: (slug) => {
        const v = get().tools[slug];
        return v !== undefined && v !== null;
      },

      setConsent: (slug, value) =>
        set((s) => ({ consents: { ...s.consents, [slug]: value } })),
      hasConsent: (slug) => get().consents[slug] === true,

      setCountry: (country) => set({ country }),
    }),
    {
      name: "cdf-session",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
      partialize: (s) => ({
        tools: s.tools,
        consents: s.consents,
        country: s.country,
      }),
    }
  )
);

/** Liste des slugs ayant des données en session (pour le catalogue / reset global). */
export function slugsWithData(): string[] {
  const { tools } = useSessionStore.getState();
  return Object.keys(tools).filter((slug) => {
    const v = tools[slug];
    return v !== undefined && v !== null;
  });
}
