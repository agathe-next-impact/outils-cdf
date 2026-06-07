# Peer to Peer — Boîte à outils (plateforme en libre accès)

Plateforme web **100 % front** (Next.js App Router) d'outils psychosociaux d'auto-observation
et de soutien au rétablissement. **Aucun backend, compte, ni base de données.**

Produit **Peer to Peer**, édité et porté par la société **Next Impact**. Gratuit et en libre
accès ; une **contribution à prix libre** (page `/contribuer`, lien de paiement hébergé par un
tiers) est proposée sans jamais conditionner l'accès aux outils.

## Règles produit (NON négociables)

1. **Accès libre, sans compte, sans espace privé.** Aucune authentification, aucun profil.
2. **Persistance de session uniquement.** L'état vit dans `sessionStorage` (clé `p2p-session`)
   via Zustand `persist`. Il survit au rafraîchissement et à la navigation, et est effacé à la
   fermeture de l'onglet. **Aucune donnée n'est jamais envoyée sur le réseau** (pas de `fetch`
   de saisies, pas d'analytics sur le contenu).
3. **Garde-fous éthiques toujours présents :** ces outils ne posent **aucun diagnostic** et ne
   remplacent pas un professionnel. Afficher `DisclaimerBanner` + `CrisisResources` (3114, 15,
   112, SOS Amitié pour la France). Ton **non culpabilisant**, liberté de non-réponse et d'arrêt.
4. **Export local** (PDF via impression / Markdown / JSON) = seul moyen de conserver une trace.

## Architecture

- **3 moteurs data-driven** dans `src/engines/` : `scored` (questionnaires), `wizard` (parcours),
  `worksheet` (carnets) + `composite` (hybrides). Aucun moteur ne connaît un outil précis.
- **Ajouter un outil = écrire `src/data/tools/<slug>/{definition.ts, content.ts}`** (typé), puis
  l'enregistrer dans `src/engines/registry.ts`. On ne réécrit jamais la logique d'un moteur.
- Route dynamique `app/outils/[slug]/page.tsx` → `ToolHost` aiguille vers le bon moteur.
- Export : chaque définition expose `serialize(state) → NeutralDocument` (pivot MD/JSON/PDF),
  voir `src/lib/export/`.
- Alias d'import : `@/*` → `./src/*`. L'`app/` est à la racine.

## Identité visuelle (obligatoire) — « Peer to Peer »

Système **« smart home dashboard »** (sombre-first, plat, grands rayons), partagé avec Next Impact.
Source de vérité : `design-system/DESIGN_SYSTEM.md`. Les 7 lois :

1. **Profondeur douce** — angles **arrondis** (`--radius`/`--radius-lg`) et ombres **basses et
   discrètes** (`--shadow-sm`/`--shadow`). Jamais d'ombre dure ni d'élévation tape-à-l'œil ;
   ne pas réintroduire l'ancien reset `* { border-radius:0; box-shadow:none }`.
2. **Calme avant tout** — espace négatif généreux, faible densité, une idée par bloc ; aucune
   saturation criarde, aucun aplat de couleur vive sur de grandes surfaces.
3. **Palette gris + accent rose, sur base neutre** — base **gris** : clair fond **blanc `#ffffff`**,
   texte `#111827` (gray-900), cartes blanches, bordures `#e5e7eb` (gray-200), secondaire `#4b5563`
   (gray-600) ; sombre fond `#030712` (gray-950), texte blanc, cartes `#111827` (gray-900), bordures
   `#1f2937` (gray-800), secondaire `#9ca3af` (gray-400) — fond/texte inversibles selon le thème.
   Accent **rose** : `--accent` clair `#db2777` (pink-600) / sombre `#f9a8d4` (pink-300) = marque +
   action primaire ; `--accent-ink` = texte posé sur un aplat d'accent (blanc en clair, `#111827` en
   sombre) ; `--accent-strong` clair `#9d174d` (pink-800) / sombre `#fbcfe8` (appui/emphase). **`info`
   et `success` = accent** (pas de bleu ni de vert), distingués par **icône + libellé**, jamais la
   couleur seule. `--warning` = **ambre** (`#fbbf24` clair / `#fcd34d` sombre, **fond uniquement**,
   jamais en texte sur blanc). `--danger` = **rouge** (`#dc2626` clair / `#f87171` sombre). Toutes les
   paires vérifiées WCAG AA dans les deux thèmes. Jamais de `#000`/`#fff` en dur pour du contenu thémé →
   `text-foreground`/`bg-background`/tokens. ⚠️ **Contraste** : l'**ambre (`warning`) ne sert jamais au
   corps de texte** (réservé fonds/accents) ; le rose (`accent`) reste AA en texte dans les deux thèmes ;
   le corps reste en `text-foreground`/`text-muted`. Compat : `bg-orange`→accent, `bg-yellow`→warning,
   `bg-red`→danger, `bg-blue`→info.
4. **Typo** — `Inter` (titres **et** corps, variable `--font-inter`) + `JetBrains Mono`
   (`--font-jetbrains-mono`) pour le code/mono. **Plus de serif `Newsreader` ni d'`Open Sans`.** Titres
   en casse normale (`font-semibold`, `tracking` léger), jamais `uppercase`/`font-black`. Logo : carré
   rose + wordmark via `<Logo>` (`src/components/Logo.tsx`).
5. **Icônes** — lucide-react uniquement via `<GameIcon>` (trait fin). **Zéro emoji.**
6. **Mode sombre** — via `next-themes` (classe `.dark`), inversion **gris** (sombre-first côté template)
   de `--background`/`--foreground`/`--card-bg` + variantes sombres de toute la palette sémantique.
7. **Mouvement lent** — entrées `animate-slide-up` douces et décalées ; décor `animate-float` lent ;
   célébrations **discrètes** (`animate-bounce-in` + `<Confetti>` sobre) ; `prefers-reduced-motion` respecté.

Composants : `.card` (douce, arrondie, ombre basse), `.card-accent` (filet accent à gauche),
`.btn-primary` (rose, appui rose foncé), `.btn-secondary` (fantôme bordé accent), `GameIcon`, `ThemeToggle`.
Pas de `DecodeText`. **Navigation : barre latérale fixe** sur desktop via
`src/components/layout/Sidebar.tsx` (rail d'icônes + pastille d'accent sur l'onglet actif + tooltips) ;
`Header` en repli mobile. Mise en page **Bento** conservée (`src/components/layout/Bento.tsx`).
Wrapper de page : `min-h-[calc(100vh-80px)] px-4 py-12` + `max-w-* mx-auto`.

## Accessibilité

Cible **WCAG 2.2 AA** : navigation clavier complète, `aria-live` pour scores/progression, focus
visible (anneau rose `--ring` qui suit l'arrondi), info jamais portée par la seule couleur.

## Commandes

- `npm run dev` — serveur de dev
- `npm run build` / `npm run lint` / `npm run typecheck`
- `npm test` — Vitest (scoring pur + utilitaires)
