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

Système **SWISS / international** : grille modulaire (bento) à **filets hairline très discrets**,
**tout carré**, **zéro ombre**, gris + accent **bleu profond**. Les lois :

1. **Tout est carré, zéro ombre** — reset global `* { border-radius: 0 !important }` ; tous les rayons
   (`--radius*`/`--radius-pill`) = **0**. Bordures **hairline 1px très discrètes** (`--border` →
   `--line-strong` au survol). **Aucune `box-shadow`** : séparation par contraste de surface + filet.
3. **Base gris + blanc, palette Adobe en surfaces** — neutre : clair fond `#f6f5f3`, carte `#ffffff`
   (blanc), filet `#e6e3dc`, texte `#2b2a27` ; sombre fond `#161513`, carte `#211f1b`, texte `#f1eee8`
   (inversibles). **Accent rose** `--accent` `#a05f5d` (clair, assombri pour l'AA) / `#d0a3a2` (sombre)
   = marque, nav active, eyebrows, liens, glyphes d'icône, chiffres clés — **usage parcimonieux** ;
   `--on-accent` blanc (clair) / foncé (sombre). **Couleurs limitées** (sur base gris/blanc) : **rose
   `#c99d9c`** (`--tile-rose`, `box--accent` vedette) et **crème `#f2ebdc`** (`--tile-cream`, `box--soft`)
   en dominantes ; **gris-bleu `#a4b1b7`** (`--tile-blue`, `box--second`) **TRÈS parcimonieusement (1 tuile)**.
   `box--tint` = gris neutre ; hero gris foncé (`box--fill`). **Pas de jaune.** Texte sur tuile = gris foncé
   `--ink-pastel`. **`info`/`success` = accent** ; `--warning` = **gris neutre** ; **exception santé mentale**
   `--danger` = **rouge** (crise). Jamais de `#000`/`#fff` en dur → tokens.
   Jamais de `#000`/`#fff` en dur → tokens. Compat : `*-orange/-blue`→accent, `*-yellow`→warning, `*-red`→danger.
4. **Typo** — `Instrument Sans` (titres/nombres/marque, `--font-instrument`) + `Hanken Grotesk`
   (corps/UI, `--font-hanken`). Titres en casse normale. Logo : carré bleu + point clair via `<Logo>`.
5. **Icônes** — lucide-react uniquement via `<GameIcon>` (trait fin) ; glyphe bleu dans `.ichip`
   (fond gris). **Zéro emoji.**
6. **Mode sombre** — via `next-themes` (classe `.dark`), clair par défaut.
7. **Mouvement lent et sobre** — `animate-slide-up` discrètes, décor `animate-float` lent ;
   `prefers-reduced-motion` respecté.

Vocabulaire (globals.css) : `.card` (filet hairline discret, carré, 0 ombre), `.card-accent` (filet bleu gauche),
`.btn-primary` (carré, aplat **encre**), `.btn-secondary` (carré fantôme),
`.eyebrow`, `.ichip`(/`--line`), `.badge`, `.chip`/`.is-on`, `.stat`/`.n`/`.l`, `.tlink`,
`GameIcon`, `ThemeToggle`. **Navigation** : `Sidebar` (rail, desktop) + `MobileTopBar` + **`BottomNav`**
(onglets, seule nav mobile) ; **PWA** installable (`manifest.ts`, `public/sw.js`, `InstallBanner`).
Mise en page **Bento** (`src/components/layout/Bento.tsx`). Wrapper : `PageWrapper`.

## Accessibilité

Cible **WCAG 2.2 AA** : navigation clavier complète, `aria-live` pour scores/progression, focus
visible (anneau vermillon `--ring`), info jamais portée par la seule couleur.

## Commandes

- `npm run dev` — serveur de dev
- `npm run build` / `npm run lint` / `npm run typecheck`
- `npm test` — Vitest (scoring pur + utilitaires)
