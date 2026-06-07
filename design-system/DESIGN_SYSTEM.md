# Charte UI/UX — « Peer to Peer » — Source de vérité

> Spécification **stricte** du système de design **« smart home dashboard »** (gris + accent rose,
> sombre-first, surfaces plates, grands rayons). C'est le document de référence : tout port, tout
> audit et toute nouvelle UI doivent s'y conformer. En cas de doute, ce fichier fait foi.
>
> Stack de référence : **Next.js (App Router) + React 19 + Tailwind CSS v4 + next-themes + lucide-react**.
>
> **Intention.** Le public peut être en situation de vulnérabilité psychique. Le design est
> ici un **levier de soin** : calme, lisible, rassurant, jamais surstimulant. Chaque choix
> (douceur des formes, palette gris + rose, mouvement lent, contrastes AA) sert cet objectif.

---

## 0. Les 7 lois non négociables

Ces règles définissent l'identité. Les enfreindre = hors charte.

1. **Profondeur douce.** Les angles sont **arrondis** (`--radius`), les ombres **basses et
   discrètes** (`--shadow-sm` / `--shadow`). Jamais d'ombre dure ni d'élévation tape-à-l'œil.
   La hiérarchie naît de l'espace, de la typo et de la couleur — l'ombre ne fait que *suggérer*.
2. **Calme avant tout.** Espace négatif généreux, densité faible, une seule idée par bloc.
   Aucune saturation criarde, aucun aplat de couleur vive sur de grandes surfaces.
3. **Palette gris + accent rose :** base **gris** (clair fond blanc / sombre fond gray-950, inversibles
   selon le thème) + accent **rose** (`pink-600` en clair, `pink-300` en sombre). Pas de bleu ni de
   vert : `info` et `success` réutilisent l'accent rose, distingués par **icône + libellé**, jamais la
   couleur seule. `warning` = ambre (fond uniquement), `danger` = rouge.
4. **Deux polices, deux rôles :** **`Inter`** pour les titres **et** le corps (casse normale, jamais en
   capitales forcées) + **`JetBrains Mono`** pour le code/mono. Plus de serif `Newsreader` ni d'`Open Sans`.
5. **Icônes = lucide-react uniquement.** Jamais d'emoji dans l'UI. Tout passe par `<GameIcon>`.
6. **Mode sombre obligatoire** (gris, *sombre-first* côté template — c'est le rendu de référence du
   dashboard), géré par `next-themes` (stratégie `class`), via inversion des variables
   `--background` / `--foreground` / `--card-bg` et de toute la palette sémantique.
7. **Mouvement lent et respectueux.** Entrées en `slide-up` doux et décalé ; décor en `float` lent ;
   célébrations *discrètes*. `prefers-reduced-motion` neutralise toute animation décorative.

> **Esthétique dashboard.** Inspiration directe d'un **« smart home dashboard »** : sombre par défaut
> côté template, surfaces **plates** (ombres très discrètes), **grands rayons** (`--radius` 1rem,
> `--radius-lg` 1.25rem). La **navigation se fait par une barre latérale fixe** (`Sidebar`) sur desktop,
> avec `Header` en repli mobile (voir §6).
>
> ⚠️ **Rupture avec l'ancienne charte (« flat carré »).** Le reset global
> `* { border-radius:0; box-shadow:none }` a été **supprimé volontairement**. Ne pas le réintroduire.

---

## 1. Couleurs (design tokens)

Définies en variables CSS dans `:root` / `.dark`, exposées en utilitaires Tailwind via `@theme inline`.
**Toutes les paires texte/fond ci-dessous sont vérifiées ≥ 4.5:1 (WCAG AA), dans les deux thèmes.**

| Token Tailwind | Variable | Clair | Sombre | Rôle |
|---|---|---|---|---|
| `bg-accent` / `text-accent` | `--accent` | `#db2777` (pink-600) | `#f9a8d4` (pink-300) | **Marque** + **action primaire** + info + progression. Rose |
| `bg-accent-soft` | `--accent-soft` | `#fce7f3` | `#500724` | Fond doux d'accent (survol, surbrillance) |
| `bg-accent-strong` | `--accent-strong` | `#9d174d` (pink-800) | `#fbcfe8` | Appui/emphase forte (état actif des boutons) |
| `accent-ink` | `--accent-ink` | `#ffffff` | `#111827` | **Texte posé SUR un aplat d'accent** (boutons pleins) |
| `bg-info` / `text-info` | `--info` | = accent | = accent | Information, **liens** (= accent rose, pas de bleu) |
| `bg-success` / `text-success` | `--success` | = accent | = accent | Progression, validation (= accent, pas de vert → **doubler d'une icône/d'un libellé**) |
| `bg-warning` / `text-warning` | `--warning` | `#fbbf24` (ambre) | `#fcd34d` | Mise en avant, attention. **Fond uniquement, jamais en texte sur blanc** |
| `bg-danger` / `text-danger` | `--danger` | `#dc2626` | `#f87171` | Alerte, erreur, zone de danger. Rouge |
| `text-foreground` / `bg-background` | `--foreground` / `--background` | `#111827` (gray-900) / blanc `#ffffff` | blanc `#ffffff` / `#030712` (gray-950) | **Texte & fond** (suivent le thème) |
| `bg-card` | `--card-bg` | `#ffffff` | `#111827` (gray-900) | Surface des cartes |
| `border-border` | `--border` | `#e5e7eb` (gray-200) | `#1f2937` (gray-800) | Filets, séparateurs (gris) |
| `text-muted` | `--muted` | `#4b5563` (gray-600) | `#9ca3af` (gray-400) | Texte secondaire gris (AA) |

> ⚠️ **Pièges.**
> - `black`/`white` restent des **alias inversibles** (`--color-black` = `--foreground`, `--color-white` = `--background`).
>   Ne jamais coder `#000`/`#fff` en dur pour du contenu thémé.
> - **`warning` (ambre) ne sert jamais au corps de texte** (réservé fonds/accents/bordures : `text-warning`
>   sur blanc est insuffisant). `danger` (rouge) peut porter de petits libellés/liens d'erreur ; le **corps**
>   reste en `text-foreground` / `text-muted`.
> - **`accent` (rose) est AA en texte dans les deux thèmes** : `#db2777` sur blanc (clair) et `#f9a8d4` sur
>   gray-950 (sombre) passent ≥ 4.5:1 ; il peut donc porter liens et petits libellés (`info`/`success` = accent).
> - **Compat :** les anciens tokens sont aliasés — `bg-orange`→accent, `bg-yellow`→warning, `bg-red`→danger,
>   `bg-blue`→info. Le markup existant fonctionne ; migrer vers les noms sémantiques au fil de l'eau.

### Profondeur (tokens)

Esthétique dashboard : **grands rayons** et surfaces **plates** (ombres très discrètes).

```css
--radius-sm: 0.75rem;  --radius: 1rem;  --radius-lg: 1.25rem;
--shadow-sm: 0 1px 2px rgba(17,24,39,.05);    /* clair, très discrète */
--shadow:    0 4px 16px rgba(17,24,39,.08);
/* .dark : ombres noires plus marquées mais douces (0 1px 2px / 0 8px 24px sur noir) */
```

---

## 2. Typographie

| Usage | Police | Variable | Réglages |
|---|---|---|---|
| Titres (`h1`–`h4`, `.font-heading`) | **Inter** | `--font-inter` → `--font-heading` | **casse normale**, `tracking` léger (`-0.01em`), `line-height` 1.2 |
| Corps (`body`, `.font-sans`) | **Inter** | `--font-inter` → `--font-sans` | `line-height` 1.6 |
| Mono / code | **JetBrains Mono** | `--font-jetbrains-mono` → `--font-mono` | chiffres, code, valeurs |

Une seule famille de texte (**Inter**) pour titres et corps ; **JetBrains Mono** réservé au code et
aux valeurs/chiffres (registre dashboard). Échelle de poids : titres en `font-semibold` (600), accents
en `font-medium`/`font-semibold`, corps en `normal`. **Proscrire `font-black` (900) et `uppercase`**
sur les titres : Inter porte la hiérarchie par la taille et le poids mesuré, pas par les capitales.
Plus de serif `Newsreader` ni d'`Open Sans`.

Tailles repères : titre de page `text-3xl md:text-4xl` (`font-semibold`) ; titre de carte
`text-xl font-semibold` ; corps `text-base` ; méta/labels `text-xs text-muted`.

---

## 3. Iconographie

- **100 % lucide-react.** Aucun emoji. Tout via **`GameIcon`** (`name` → composant lucide).
- Trait fin par défaut (`strokeWidth` 1.5–1.75 conseillé : plus doux que le trait épais).
- Tailles : `40` (héros de section), `28`–`32` (carte), `20`–`24` (ligne), `16` (inline/méta).
- Décor : grandes icônes en `text-muted` (faible opacité) avec `animate-float` lent.

---

## 4. Composants (anatomie)

### 4.1 `.card`
Surface douce : `bg-card`, padding `1.5rem`, bordure `1px` `--border`, **`border-radius:--radius-lg`**,
**`box-shadow:--shadow-sm`**. Au survol : légère élévation (`translateY(-2px)` + `--shadow`) et la
bordure se teinte d'accent. Variante `.card-accent` = filet **rose** de 3px à gauche (mise en avant).
> Plus d'équerres d'angle jaune/rouge : la signature est désormais la **douceur** (grand arrondi + ombre basse).

### 4.2 Boutons
- **`.btn-primary`** : fond **rose** (`--accent`), texte `--accent-ink`, `padding:.75rem 1.5rem`,
  `font-weight:600`, **casse normale**, `border-radius:--radius`, `--shadow-sm`. Hover → `translateY(-1px)`,
  fond légèrement assombri, `--shadow` ; actif → `--accent-strong`.
- **`.btn-secondary`** : **fantôme bordé** — fond transparent, bordure + texte accent, hover `bg-accent-soft`.
- Liens tertiaires : texte `info`, `font-medium`, soulignement discret au survol.

### 4.3 Inputs / textarea
- `w-full px-4 py-3 bg-card border border-border rounded-[--radius] focus:border-accent focus:outline-none transition-colors`.
- Labels : `text-sm font-medium text-foreground mb-1` ; aide/méta : `text-xs text-muted`.
- États : bordure `info` (focus), `danger` (erreur, **+ texte d'erreur**, jamais la couleur seule).

### 4.4 Tags / pills
- Neutre : `text-muted border border-border text-xs px-3 py-1 rounded-full`.
- Statut : `bg-success-soft text-foreground` / `bg-warning-soft text-foreground` / `bg-danger-soft text-foreground`.

### 4.5 Barre de progression
- Conteneur `w-full h-2.5 rounded-full bg-border overflow-hidden`,
  remplissage `h-full rounded-full bg-success transition-all duration-700 ease-out`, largeur via `style`.
- Toujours doubler par un **libellé chiffré** (`aria-live`), jamais la couleur seule.

### 4.6 Bandeaux de sécurité (`DisclaimerBanner`, `CrisisResources`)
- `.card` ou `.card-accent` avec accent `info` (cadre/contexte) ; ressources de crise en `danger` mais
  **sobres** (pas d'aplat rouge plein écran). Toujours visibles, jamais anxiogènes.

---

## 5. Animations

| Utilitaire | Keyframe | Usage |
|---|---|---|
| `.animate-float` | `float` (±8px, **5s**, infinite) | icônes décoratives de fond |
| `.animate-slide-up` | `slide-up` (opacity + 16px, **0.55s**) | entrée de bloc, en cascade |
| `.animate-bounce-in` | `bounce-in` (scale 0.96→1.01→1, 0.5s) | apparition douce de feedback |
| `.animate-shake` | `shake` (±3px translation, 0.4s) | erreur, secousse minimale |
| `.animate-confetti` | `confetti-fall` (chute + rotation **360°**, 3.5s) | célébration discrète |

**Cascade :** `animate-slide-up` + `style={{ animationDelay: ${i*0.08}s }}`.
**Célébrations sobres :** confettis en palette désaturée, peu nombreux ; pas de rebond agressif.
`@media (prefers-reduced-motion: reduce)` neutralise tout (animations + transitions réduites à ~0).

---

## 6. Layout & patterns de page

- **Wrapper de page :** `min-h-[calc(100vh-80px)] px-4 py-12` (voire `py-16`), contenu centré dans
  `max-w-md | max-w-lg | max-w-2xl | max-w-4xl mx-auto`. **Privilégier la respiration** (espacements amples).
- **Mise en page Bento (système, toutes les pages) :** grille modulaire de tuiles via le primitif
  `src/components/layout/Bento.tsx` — `<BentoGrid>` (1→2→3 colonnes) + `<BentoBox>` (tuile = `.card`
  avec `span 1–3`, `tall`, `tone plain|accent|soft`, cascade `index`) ; helper `bentoSpan()` pour les
  tuiles clic­ables (`<Link>`). **Deux registres :**
  - **Accueil & pages « collection »** (outils, catégories, parcours, ressources) → Bento **varié** :
    une tuile vedette `span={2}` (ou `tone`), le reste régulier. Découpe en modules calmes, réduit
    le sentiment de submersion.
  - **Pages de texte** (légales, à propos) **et page outil** → Bento **sobre** à tuiles régulières ;
    le texte long reste **d'un seul tenant** dans une tuile en pleine largeur (largeur de lecture
    confortable), et le déroulé d'un questionnaire/runner reste en **une seule colonne**.
- **Barre latérale fixe (`Sidebar`, navigation principale desktop) :** primitif
  `src/components/layout/Sidebar.tsx` — rail vertical **fixe** d'icônes (`GameIcon`) avec, sur l'onglet
  **actif**, une **pastille d'accent** (rose) et un **tooltip** au survol/focus. C'est le mode de
  navigation par défaut sur desktop (registre dashboard) ; le `Header` ne sert qu'en **repli mobile**.
  L'état actif se signale par l'accent **+** un libellé/aria (jamais par la seule couleur).
- **Décor flottant :** 1–2 grandes icônes `text-muted` en `absolute`, `animate-float` lent, `select-none`.
- **États de chargement :** texte centré `text-muted animate-pulse`.
- **États vides :** `.card` centrée, icône, titre `font-semibold`, court texte, puis `.btn-primary`.

### En-tête (Header — repli mobile)
Sur mobile (la `Sidebar` étant masquée) : `<Logo>` (carré **rose** + wordmark Inter) à gauche,
navigation repliée, `ThemeToggle` à droite. **Pas d'effet `DecodeText`** ni de hero à fond coloré plein :
un titre Inter posé, éventuellement un sous-titre `text-muted`. L'onglet actif se signale par l'accent +
un libellé (jamais par la seule couleur).

---

## 7. Mode sombre

- `next-themes` : `<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>`.
- Bascule via `ThemeToggle`. Le thème agit par l'inversion **gris** de `--background`/`--foreground`/`--card-bg`
  (blanc/gray-900 ↔ gray-950/gray-900) **et** par les variantes sombres de toute la palette sémantique
  (accent rose/info/success/warning/danger) — toutes re-vérifiées AA. Le rendu **sombre-first** est celui
  du template. Écrire en `text-foreground`/`bg-card`/`text-accent`… suffit.

---

## 8. Accessibilité (WCAG 2.2 AA — contrainte produit)

- **Contraste :** toutes les paires de la §1 sont ≥ 4.5:1 (texte) ; éléments d'UI ≥ 3:1.
- **Focus :** anneau rose `outline:2px solid var(--ring)` + `outline-offset` (suit l'arrondi).
- **Information jamais portée par la seule couleur** : doubler par texte, icône ou libellé.
- **`aria-live`** pour scores/progression ; navigation clavier complète ; cibles tactiles ≥ 44px.
- **Mouvement :** `prefers-reduced-motion` respecté de bout en bout.

---

## 9. Checklist de conformité (auditeur)

Un écran est **conforme** si :

- [ ] Angles **arrondis larges** cohérents (`--radius*`) ; ombres **discrètes** uniquement (`--shadow-sm`/`--shadow`).
- [ ] Aucune ombre dure, aucun aplat de couleur saturé sur grande surface.
- [ ] Palette = gris thémés + accent **rose** + sémantiques (warning ambre, danger rouge). Pas de `#hex` en dur hors tokens.
- [ ] Pas de `#000`/`#fff` figés là où le thème doit jouer ; `warning` (ambre) jamais en corps de texte.
- [ ] Titres = **Inter casse normale** (pas d'`uppercase`/`font-black`) ; corps = Inter ; code = JetBrains Mono.
- [ ] Zéro emoji ; icônes via `GameIcon`, trait fin.
- [ ] Contrastes AA vérifiés ; focus visible ; info non portée par la couleur seule ; `prefers-reduced-motion`.
- [ ] Entrées `animate-slide-up` douces et décalées ; mode sombre fonctionnel.
- [ ] Navigation par **barre latérale fixe** (`Sidebar`) sur desktop ; `Header` en repli mobile.
- [ ] Wrapper `min-h-[calc(100vh-80px)] px-4 py-12` + conteneur `max-w-* mx-auto`, généreusement espacé.

---

## 10. DO / DON'T

**DO**
- Réutiliser `.card` / `.card-accent`, `.btn-primary` / `.btn-secondary`, `GameIcon`, `ThemeToggle`, `Sidebar`, `Bento`.
- Penser gris inversibles + accent **rose** + sémantiques (warning ambre, danger rouge).
- Aérer, ralentir le mouvement, traiter le texte avec soin (Inter, hiérarchie par la taille et le poids).
- Garder des contrastes AA et un ton rassurant ; assumer le registre **dashboard** (sombre-first, grands rayons).

**DON'T**
- ❌ Réintroduire le reset carré/zéro-ombre, ou poser des ombres dures / élévations marquées.
- ❌ Mettre les titres en `uppercase`/`font-black`, ou utiliser `DecodeText`.
- ❌ Saturer l'écran (aplats rouges plein écran, couleurs criardes, densité maximaliste).
- ❌ Introduire une couleur hors palette (bleu, vert, terracotta/orange…), un emoji, une autre police (Newsreader, Open Sans…).
- ❌ Mettre l'**ambre (`warning`) en texte** sur fond clair, ni coder `#000`/`#fff` en dur pour du texte/fond thémé, ni porter une info par la seule couleur.
