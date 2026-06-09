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

## Identité visuelle (obligatoire) — « Peer to Peer » / charte **Lagune (teal)**

Système **doux et chaleureux** (santé / rétablissement) : grille modulaire (bento) à **cartes
arrondies espacées**, **ombres douces teintées teal**, fond **cream** + bandes **pastel**, accent
**teal**. Les lois :

1. **Arrondis doux + ombres douces** — rayons `--radius-sm:12px` / `--radius:16px` / `--radius-lg:24px`
   (cartes) / `--radius-pill:999px` (boutons, badges, chips). **Pas de reset carré.** Ombres
   `--shadow` / `--shadow-sm` (teintées teal, `rgba(22,41,44,…)`) au survol des cartes (léger lift
   `translateY(-4px)`). Bordures **hairline 1px** (`--border` → `--line-strong` au survol).
2. **Bento à GOUTTIÈRE** — `.bento { gap:18px }` : les cartes arrondies/ombrées sont espacées (≠
   ancienne grille sans gouttière).
3. **Fond cream + bandes pastel, encre plum** — neutre : clair fond `#F6F5F1` (cream), carte
   `#ffffff`, filet `#E3E7E3`, texte `#16292C` (plum) ; sombre fond `#0F1E20`, carte `#16292C`,
   texte `#F1F4F3` (inversibles). **Accent teal** : `--accent` `#0E747A` (clair, **assombri pour
   l'AA**) / `#5FC4C9` (sombre) = marque, nav active, eyebrows, liens, glyphes, chiffres, **fills de
   bouton** ; `--on-accent` cream (clair) / plum (sombre). **`--accent-bright` `#1E9AA0` = teal de
   marque DÉCORATIF only** (blobs), **jamais sous du texte** (contraste insuffisant). **Pastels** :
   lavande `#D7ECEC` (`--tile-lavender`), pêche `#FBE6CE` (`--tile-peach` = `box--soft`), sauge
   `#DAE8EC` (`--tile-sage`) en bandes alternées ; rose `#F39191` (`--tile-rose`) décoratif (blobs).
   `box--tint` = gris doux ; hero/footer **plum** (`box--fill`, `.footer-plum`). **Pas de jaune.**
   Texte sur tuile = plum `--ink-pastel`. **`info`/`success` = accent** ; `--warning` = **gris-teal
   neutre** ; **exception santé mentale** `--danger` = **rouge** (crise). Jamais de `#000`/`#fff` en
   dur → tokens. Compat : `*-orange/-blue`→accent, `*-yellow`→warning, `*-red`→danger.
4. **Typo** — `Inter Tight` (titres **et** corps, `--font-inter-tight`) + `DM Mono` (eyebrows / méta
   / chiffres, `--font-dm-mono`). Titres **serrés** (poids 700, `letter-spacing:-0.04em`). Logo :
   **mascotte** (carré arrondi teal à visage cream + joues pêche) via `<Logo>`.
5. **Icônes** — lucide-react uniquement via `<GameIcon>` (trait fin) ; glyphe teal. **Zéro emoji.**
6. **Mode sombre** — via `next-themes` (classe `.dark`), clair par défaut ; variante **teal sombre**
   dérivée (pas de mode clair-only).
7. **Mouvement lent et sobre** — `animate-slide-up` discrètes, décor `animate-float` lent, blobs
   statiques floutés ; `prefers-reduced-motion` respecté.

Vocabulaire (globals.css) : `.card` (filet hairline, arrondi, ombre au survol), `.card-accent` (filet teal gauche),
`.btn-primary` (pilule, **aplat teal** + ombre), `.btn-secondary`/`.btn-ghost` (pilule fantôme),
`.eyebrow` (mono + tiret teal), `.ichip`(/`--line`), `.badge`, `.chip`/`.is-on`, `.stat`/`.n`/`.l`, `.tlink`,
`GameIcon`, `ThemeToggle`. **Accueil** : classes scopées `.home-lg` (hero, `.band`/`.band-lav`/`.band-peach`,
`.entry`, `.hstep`, `.way`, `.support-card`, `.preview`). **Navigation** : `Sidebar` (rail, desktop) +
`MobileTopBar` + **`BottomNav`** (onglets, seule nav mobile) ; **PWA** installable (`manifest.ts`,
`public/sw.js`, `InstallBanner`). Mise en page **Bento** (`src/components/layout/Bento.tsx`). Wrapper : `PageWrapper`.

## Accessibilité

Cible **WCAG 2.2 AA** : navigation clavier complète, `aria-live` pour scores/progression, focus
visible (anneau teal `--ring`), info jamais portée par la seule couleur. L'accent teal de marque
(`--accent-bright`) ne porte **jamais** de texte (contraste insuffisant) ; le teal **texte/fill**
(`--accent`) est assombri pour l'AA.

## Commandes

- `npm run dev` — serveur de dev
- `npm run build` / `npm run lint` / `npm run typecheck`
- `npm test` — Vitest (scoring pur + utilitaires)
