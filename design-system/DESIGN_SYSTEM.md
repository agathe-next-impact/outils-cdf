# Charte UI/UX — « Comme des Fous » — Source de vérité

> Spécification **stricte et exhaustive** du système de design. C'est le document
> de référence : tout port, tout audit et toute nouvelle UI doivent s'y conformer
> au pixel près. En cas de doute, ce fichier fait foi.
>
> Stack de référence : **Next.js (App Router) + React 19 + Tailwind CSS v4 + next-themes + lucide-react**.

---

## 0. Les 7 lois non négociables

Ces règles définissent l'identité. Les enfreindre = hors charte, quel que soit le reste.

1. **Tout est carré.** `border-radius: 0 !important` est appliqué globalement à `*`.
   Les classes `rounded-*` peuvent rester dans le markup (no-op visuel) mais **rien**
   ne doit produire d'angle arrondi visible (même un `style` inline est écrasé par le `!important`).
2. **Aucune ombre.** `box-shadow: none !important` global. Pas de `shadow-*`, pas d'élévation.
   La profondeur se crée par la **couleur** et la **bordure**, jamais par l'ombre.
3. **Palette verrouillée :** noir, blanc, + 3 accents (jaune, rouge, bleu). Aucune autre couleur.
4. **Deux polices, deux rôles :** `Belanosima` (titres, UPPERCASE) / `Open Sans` (corps).
5. **Icônes = lucide-react uniquement.** Jamais d'emoji dans l'UI. Tout passe par `<GameIcon>`.
6. **Mode sombre obligatoire,** géré par `next-themes` (stratégie `class`), via inversion
   noir/blanc des variables `--background` / `--foreground`.
7. **Entrées animées :** les blocs apparaissent en `slide-up` décalé (`animationDelay` en cascade).
   Éléments décoratifs en `float`. Récompenses en `bounce-in` + confettis.

---

## 1. Couleurs (design tokens)

Définies en `oklch` dans `@theme inline`, avec équivalents hex (utilisés par le confetti).

| Token Tailwind | Variable / valeur | oklch | hex approx. | Rôle |
|---|---|---|---|---|
| `bg-yellow` / `text-yellow` | `--color-yellow` | `oklch(82.8% 0.189 84.429)` | `#f5c400` | Surbrillance, progression, badges, bouton secondaire, accent coin haut-gauche des cartes |
| `bg-red` / `text-red` | `--color-red` | `oklch(63.7% 0.237 25.331)` | `#d63a3a` | Action primaire, alerte/danger, accent coin bas-droite des cartes |
| `bg-blue` / `text-blue` | `--color-blue` | `oklch(62.3% 0.214 259.815)` | `#3a6ed6` | Info/secondaire, liens, textes d'état, hero « classement » |
| `bg-black` / `text-black` | `--foreground` | `#000` (clair) / `#fff` (sombre) | — | Texte & aplats neutres (**suit le thème**) |
| `bg-white` / `text-white` | `--background` | `#fff` (clair) / `#000` (sombre) | — | Fond (**suit le thème**) |

> ⚠️ **Piège majeur :** `black` et `white` sont des **alias inversibles**, pas des couleurs fixes.
> `text-black` = couleur de premier plan (noir en clair, **blanc** en sombre). `bg-white` = fond
> (blanc en clair, **noir** en sombre). Ne jamais coder `#000`/`#fff` en dur dans un composant :
> toujours passer par `text-black`/`bg-white`/`text-foreground`. Les 3 accents (jaune/rouge/bleu),
> eux, sont **fixes** dans les deux thèmes.

### Variables CSS

```css
:root  { --background:#ffffff; --foreground:#000000; --card-bg:#ffffff; }
.dark  { --background:#000000; --foreground:#ffffff; --card-bg:#111111; }
```

### Sémantique des accents (à respecter pour la cohérence)

- **Rouge** → action principale (`.btn-primary`), erreurs, zone de danger, rang #1.
- **Bleu** → information, liens, textes secondaires/d'état, pages « classement »/« connexion ».
- **Jaune** → progression, mise en avant ludique, badges/médailles, `.btn-secondary`, « hall of fame ».
- Opacités neutres autorisées : `text-black/20` (décor flottant), `border-black/20` (séparateurs),
  `text-black/60` (médaille argent).

---

## 2. Typographie

| Usage | Police | Variable | Réglages |
|---|---|---|---|
| Titres (`h1`, `.font-heading`) | **Belanosima** (400/600/700) | `--font-belanosima` → `--font-heading` | `uppercase`, `tracking-tight`, `leading-none` sur le hero |
| Corps (`body`, `.font-sans`) | **Open Sans** | `--font-open-sans` → `--font-sans` | défaut |
| Mono | system mono | `--font-mono` | rare |

Échelle de poids constatée : titres en `font-black` (900), accents en `font-bold` (700) /
`font-semibold` (600), corps en `font-medium` (500) / normal.

Tailles repères :
- Hero `<h1>` : taille fluide pilotée par la longueur du titre (`text-[9.5vw]` … `text-[3.5vw]`, voir §7).
- Titres de page : `text-3xl md:text-4xl` à `text-4xl md:text-5xl`, `font-black`.
- Titres de carte : `text-xl font-black`.
- Corps : `text-sm` / `text-base`.
- Méta/labels : `text-xs`, souvent `uppercase tracking-wide` en bleu.

---

## 3. Iconographie

- **100 % lucide-react.** Aucun emoji dans le rendu final.
- Tout passe par le composant **`GameIcon`** (`name` → mappe une string vers un composant lucide ;
  fallback : rend la string telle quelle, ce qui permet de migrer en douceur d'anciens emojis).
- Tailles usuelles : `48` (héros de section), `36` (carte), `24` (ligne), `16`–`20` (inline/badge),
  `12`–`14` (méta). `strokeWidth` par défaut de lucide.
- Décor : grandes icônes en `text-black/20` avec `animate-float`.

---

## 4. Composants (anatomie exacte)

### 4.1 `.card`
Bloc de contenu signature, avec **accents d'angle animés** (jaune haut-gauche, rouge bas-droite).

- Fond `--card-bg`, padding `1.5rem`, bordure `1px` à 15 % du premier plan.
- `::before` = équerre **jaune** en haut-gauche ; `::after` = équerre **rouge** en bas-droite,
  `0.75rem` → **`1.5rem` au survol** (les deux équerres grandissent).
- Au survol, le fond s'éclaircit légèrement (`color-mix … 3%`).
- Souvent combiné à une bordure colorée utilitaire (`border border-blue`, `border-red`, `border-black`).

### 4.2 Boutons
- **`.btn-primary`** : fond **rouge**, texte noir, `padding:14px 32px`, `font-weight:700`,
  `text-transform:uppercase`, `letter-spacing:1px`. Hover → `translateY(-3px)`, active → `-1px`.
- **`.btn-secondary`** : fond **jaune**, texte noir, mêmes dimensions/typo, hover `translateY(-3px)`.
- CTA pilule alternatif (accueil) : `bg-red text-black px-6 py-2 group-hover:scale-105`.
- Liens « tertiaires » : texte bleu, `font-semibold`, `hover:underline` ou changement de couleur.

### 4.3 Inputs / textarea
- `w-full px-4 py-3 border border-white focus:border-white focus:outline-none font-semibold bg-white placeholder:text-black transition-colors`
  (variante centrée pour pseudo : `px-5 py-3 text-center text-lg`).
- Bordures d'édition contextuelles en `border-blue` (formulaire de profil) ou `border-red` (zone danger).
- Labels : `text-sm font-semibold text-black mb-1`, ou méta `text-xs font-bold text-blue uppercase tracking-wide`.

### 4.4 Tags / pills
- `text-black border border-black text-xs font-normal px-3 py-1` (badges de catégorie).
- Badge « éditorial » : `text-red text-xs font-bold px-3 py-1 uppercase tracking-wider`.

### 4.5 Ligne de classement (leaderboard row)
- `flex items-center gap-4 p-4 border transition-all hover:scale-[1.01]` + `animate-slide-up` décalé.
- Bordure selon le rang : #1 `border-red` (ou `border-yellow` en hall of fame), #2 `border-black`,
  #3 `border-yellow`, autres `bg-white border-blue`.
- Rang : top 3 → `<Medal>` (couleurs `text-yellow`, `text-black/60`, `text-yellow/70`),
  sinon `#N` en `font-black`.
- Avatar (option) : `w-10 h-10 bg-black flex items-center justify-center` + `<GameIcon>`.
- Score à droite : `text-2xl font-black` + label `text-xs`.

### 4.6 Barre de progression
- Conteneur `w-full h-3 overflow-hidden`, remplissage `h-full bg-yellow transition-all duration-500 ease-out`,
  largeur via `style={{ width: `${pct}%` }}`. (Variante résultat : `h-4 bg-blue duration-1000`.)

### 4.7 En-tête de réponse / feedback de quiz
- Boutons de réponse : `border border-black hover:border-black px-6 py-4 text-left flex items-center gap-4`,
  lettre A/B/C/D dans une pastille `w-10 h-10`, `animate-slide-up` décalé.
- Au choix : bordure colorée selon le palier (`border-red` fort, `border-yellow` moyen, `border-blue` faible)
  + `scale-[1.02]`, icône lucide + points en `animate-bounce-in`, auto-avance après ~1200 ms.

---

## 5. Animations (keyframes + utilitaires)

| Utilitaire | Keyframe | Usage |
|---|---|---|
| `.animate-float` | `float` (±10px, 3s, infinite) | icônes décoratives de fond |
| `.animate-slide-up` | `slide-up` (opacity+translateY 30px, 0.6s) | **entrée de quasi tout bloc**, en cascade |
| `.animate-bounce-in` | `bounce-in` (scale 0→1.1→1, 0.5s) | apparition de récompense/score/feedback |
| `.animate-shake` | `shake` (rotation ±5°, 0.5s) | erreur/secousse |
| `.animate-confetti` | `confetti-fall` (chute + rotation 720°, 3s) | célébration |
| (inline) `progress-bar` | `width 0→` | révélation de barre |

**Cascade** : appliquer `animate-slide-up` + `style={{ animationDelay: `${i * 0.1}s` }}`
(ou `0.05s` pour des listes denses) pour faire entrer les éléments en séquence.

**Confettis** (`Confetti`) : 50 particules, couleurs = palette en hex
(`#000000 #f5c400 #d63a3a #3a6ed6 #ffffff`), 3–4 s puis disparition.

**Transitions globales** : `transition: background-color .3s, color .3s` sur `body` (fondu de thème).

---

## 6. Layout & patterns de page

- **Wrapper de page :** `min-h-[calc(100vh-80px)] px-4 py-12`, contenu centré dans
  `max-w-md | max-w-lg | max-w-2xl | max-w-4xl mx-auto`.
- **Décor flottant :** 2–3 grandes icônes lucide `text-black/20` en `absolute`, `animate-float`,
  `select-none`, avec `animationDelay` différents, sur un parent `relative overflow-hidden`.
- **États de chargement :** texte centré `text-xl text-blue animate-pulse` (ex. « Chargement… »).
- **États vides :** `.card` centrée, grande icône, titre `font-bold`, court texte, puis `.btn-primary`.
- **Grilles :** `grid sm:grid-cols-2 gap-6` (cartes), `grid grid-cols-3 gap-4` (features).

### 7. En-tête (Header) — structure deux étages

1. **Barre de navigation** (`h-10`, `text-sm md:text-base`) : cellules de liens séparées par
   `border-l border-black/20`, libellés courts en mobile / longs en desktop. **L'onglet actif prend
   la couleur de sa section** : classement → `bg-blue text-white`, hall of fame → `bg-yellow text-black`,
   profil → `bg-red text-white`, connexion → `bg-blue text-white`. `ThemeToggle` à l'extrémité droite.
2. **Bloc hero** (lien vers l'accueil) : grande icône + `<h1>` en Belanosima `uppercase tracking-tight
   leading-none` animé par **`DecodeText`** (effet décodage), + sous-titre contextuel. **Le fond du hero
   reflète la page active** (mêmes couleurs que l'onglet). **Taille de titre fluide** calculée selon la
   longueur de la chaîne (de `text-[9.5vw]` pour court à `text-[3.5vw]` pour long ; `text-2xl/3xl` en mobile).

> `DecodeText` : brouille puis « décode » le texte caractère par caractère (≈30 ms/frame).
> À réserver aux titres courts/héros.

---

## 8. Mode sombre

- `next-themes` : `<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>`.
- Bascule via `ThemeToggle` (`Sun`/`Moon`, état non monté → `Eclipse` + `cursor-wait`).
- Le thème agit **uniquement** par l'inversion `--background`/`--foreground`/`--card-bg` :
  écrire en `text-black`/`bg-white`/`text-foreground` suffit pour être compatible automatiquement.
- `suppressHydrationWarning` sur `<html>`, classes de variables de police sur `<html>`.

---

## 9. Checklist de conformité (utilisée par l'auditeur)

Un écran est **conforme** si :

- [ ] Aucun angle arrondi visible ; le reset `* { border-radius:0 !important }` est présent et non contourné.
- [ ] Aucune ombre ; `box-shadow:none !important` présent ; aucun `shadow-*` significatif.
- [ ] Aucune couleur hors palette (jaune/rouge/bleu + noir/blanc thémés). Pas de `#hex` en dur hors tokens.
- [ ] Pas de `#000`/`#fff`/`black`/`white` figés là où le thème doit jouer (utiliser les tokens).
- [ ] Polices = Belanosima (titres, uppercase) / Open Sans (corps).
- [ ] Zéro emoji ; toutes les icônes via lucide-react / `GameIcon`.
- [ ] `.card` utilise les accents d'angle ; boutons via `.btn-primary`/`.btn-secondary`.
- [ ] Entrées en `animate-slide-up` décalé ; décor en `animate-float`.
- [ ] Mode sombre fonctionnel (tokens utilisés, `ThemeProvider` monté).
- [ ] Wrapper `min-h-[calc(100vh-80px)] px-4 py-12` + conteneur `max-w-* mx-auto`.

---

## 10. DO / DON'T

**DO**
- Réutiliser `.card`, `.btn-primary`, `.btn-secondary`, `GameIcon`, `Confetti`, `DecodeText`, `ThemeToggle`.
- Penser en noir/blanc inversible + 3 accents sémantiques.
- Faire entrer les blocs en cascade `slide-up`.
- Garder les angles **vifs** et l'absence totale d'ombre.

**DON'T**
- ❌ Ajouter des `rounded-*` *attendus visibles*, des `shadow-*`, des dégradés multicolores.
- ❌ Introduire une 4ᵉ couleur, un emoji, une autre police.
- ❌ Coder `#000`/`#fff` en dur pour du texte/fond thémé.
- ❌ Supprimer le reset global radius/shadow « pour faire moderne ».
- ❌ Faire apparaître les éléments sans animation d'entrée.
