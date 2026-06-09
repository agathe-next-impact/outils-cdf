# Handoff Claude Code — Peer to Peer · palette « Lagune » (Teal)

## Pour Claude Code
Tu vas implémenter, dans le **codebase existant de Peer to Peer** (`peer-to-peer.fr`, Next.js), l'habillage visuel **« Brioche »** dans sa variante de palette **Lagune / Teal** : un univers SaaS chaleureux et apaisant, registre du soin, construit autour d'un **accent teal `#1E9AA0`** avec des fonds pastel coordonnés (aqua, sable, bleu poudré).

Le fichier `Peer to Peer — Lagune (teal).html` est une **maquette de référence haute-fidélité** — l'apparence et le comportement visés, **pas du code de production à copier-coller**. Recrée ce design avec les composants, conventions et le routage du codebase. Transforme les valeurs ci-dessous en **tokens / variables de thème** réutilisables (pas de styles inline).

> Le site déclare aujourd'hui un thème sombre (`meta-theme-color:#161513`) et un loader « Chargement du thème ». Lagune est un thème **clair**. À cadrer avec l'équipe : remplace-t-il le thème, ou devient-il une variante claire sélectionnable ? La maquette gère déjà le swap de palette à chaud via variables CSS — réutilise ce mécanisme côté thème.

## Fidélité : haute (hifi)
Recrée l'UI au pixel près avec les libs du codebase. Seuls éléments « démo » à remplacer par du vrai :
- La carte **« Recherche rapide »** du hero → brancher la recherche locale réelle (tout reste navigateur).
- Les `href="#…"` → vraies routes (`/outils`, `/parcours`, `/ressources`, `/contribuer`…).

---

## Palette Lagune (Teal) — tokens primaires

| Token | Hex | Rôle |
|---|---|---|
| `--cream` | `#F6F5F1` | Fond principal (crème neutre frais) |
| `--plum` | `#16292C` | Encre profonde (titres, corps) — teinte teal sombre |
| `--indigo` *(= accent)* | `#1E9AA0` | **Action / accent** : boutons, liens, eyebrows, focus, carte « Parcours » |
| `--lavender` *(= soft-1)* | `#D7ECEC` | Fond doux #1 : bande « Par où commencer », badge Parcours, blobs |
| `--peach` *(= soft-2)* | `#FBE6CE` | Fond doux #2 : bande « Les outils », **surlignage de titre**, blob |
| `--sage` *(= soft-3)* | `#DAE8EC` | Fond doux #3 : badge « Carnet », accents calmes |
| `--rose` | `#F39191` | Accent vif (blobs décoratifs uniquement) |
| `--dim` | `#6E8086` | Texte secondaire / légendes (slate-teal) |
| `--faint` | `#E3E7E3` | Bordures fines, séparateurs |
| `--action-rgb` | `30,154,160` | RGB de l'accent (ombres des boutons : `rgba(var(--action-rgb),.28)`) |

> Le nom de variable historique `--indigo` est conservé par compatibilité avec la maquette, **mais sa valeur est le teal** `#1E9AA0`. Si tu génères des tokens propres, renomme-la en `--accent` / `--color-action` et propage.

### Logique de palette
**1 accent (teal) + 3 fonds pastel froids/coordonnés (aqua, sable chaud, bleu poudré) + 1 encre profonde.** Les fonds alternent par section pour le rythme. Saturation des fonds très basse. Le sable `--peach` réintroduit un peu de chaleur pour éviter un rendu froid/clinique — important vu le contexte (rétablissement).

---

## Les 4 palettes (le design est multi-thèmes)
La maquette embarque un sélecteur de palette. **Lagune/Teal est la palette retenue pour ce handoff**, mais l'architecture en tokens permet d'en exposer plusieurs. Pour info, les jeux complets :

| Palette | accent | soft-1 | soft-2 | soft-3 | rose | cream | plum | dim | faint |
|---|---|---|---|---|---|---|---|---|---|
| Brioche (indigo) | `#6C4DE8` | `#ECE0FA` | `#FFE0CB` | `#D8E8D2` | `#FF7AA8` | `#FBF6EF` | `#221A3D` | `#7A6E92` | `#EBE3D6` |
| Verger (sauge) | `#3E9C7A` | `#DCEEE3` | `#FBE7CB` | `#D6E7DC` | `#F1886A` | `#F8F5EC` | `#1B2C23` | `#6F7C70` | `#E6E5D4` |
| **Lagune (teal)** | **`#1E9AA0`** | **`#D7ECEC`** | **`#FBE6CE`** | **`#DAE8EC`** | **`#F39191`** | **`#F6F5F1`** | **`#16292C`** | **`#6E8086`** | **`#E3E7E3`** |
| Baie (prune) | `#C0457F` | `#F4DBEA` | `#FCDFD6` | `#EBDCF0` | `#FF9E7A` | `#FAF4F2` | `#2C1822` | `#8A6E7E` | `#EFE0E2` |

Chaque palette doit retheming **toute** la page (accent + fonds + encre + textes secondaires + bordures), pas seulement les boutons. Implémente-la comme un set de variables CSS posé sur `:root` (ou un attribut `data-palette`), swappable à chaud — voir le `<script>` de la maquette pour le mapping exact (`apply()` pose les 10 variables).

---

## Typographie
- **Sans** : `'Inter Tight'` — Google Fonts, 400/500/600/700 (+ italic 500).
- **Mono** : `'DM Mono'` — 400/500 ; eyebrows, métadonnées, tags, micro-labels.
- **Titres** : 700, `line-height` 0.94–0.96, `letter-spacing:-0.04em` (plus le titre est grand, plus le tracking est négatif).
- **Corps** : 17px / `line-height:1.6`. **Échelle** : display 76 · h2 46 · h3 24–27 · lede 19 · body 17 · mono 11–13.
- `text-wrap: pretty` sur titres et paragraphes.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;1,500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

## Rayons, ombres, espacements
- **Rayons** : boutons & pills `999px` ; cartes `22–24px` ; carte CTA majeure `30px` ; encarts `12–18px`.
- **Ombres** (teal-teintées) : `--shadow:0 12px 40px rgba(22,41,44,.10)` · `--shadow-sm:0 4px 20px rgba(22,41,44,.07)` · bouton primaire `0 6px 18px rgba(30,154,160,.28)` → hover `0 12px 26px rgba(30,154,160,.34)`.
- **Container** : max `1180px`, padding `32px` (`20px` mobile). **Sections** : `padding:84px 0` (hero `78px 0 70px`).

## Motif décoratif « blobs »
Cercles pastel flous (`border-radius:50%`, `filter:blur(2px)`), en débord du parent `overflow:hidden`, opacité 0.3–0.7, couleurs soft-1/soft-2/rose. Décoratifs : `pointer-events:none`, `aria-hidden`.

## Mascotte — « fenêtre souriante » (BriocheMark)
Carte arrondie + 2 yeux + sourire. SVG `viewBox="0 0 72 72"` ; composant réutilisable avec props `size`, `bg`, `fg`, joues optionnelles. La version accent porte `bg = var(--indigo)` (teal) et yeux/sourire `var(--cream)`.

```html
<svg width="SIZE" height="SIZE" viewBox="0 0 72 72" aria-hidden="true">
  <rect x="4" y="4" width="64" height="64" rx="20" fill="BG"/>
  <circle cx="26" cy="30" r="4" fill="FG"/><circle cx="46" cy="30" r="4" fill="FG"/>
  <path d="M22 44 Q36 56 50 44" stroke="FG" stroke-width="4" stroke-linecap="round" fill="none"/>
  <circle cx="14" cy="40" r="2.5" fill="#FBE6CE" opacity="0.85"/>
  <circle cx="58" cy="40" r="2.5" fill="#FBE6CE" opacity="0.85"/>
</svg>
```

---

## Composants UI
- **Boutons** `.btn` — pilule `999px`, `font-weight:600`, `padding:13px 22px` (`.btn-sm:8px 15px`), `white-space:nowrap`, **lift -2px** au survol. Variantes : `.btn-primary` (teal/crème + ombre teal), `.btn-ghost` (bordure 1.5px plum → fond plum/crème au survol), `.btn-soft` (fond sable), et sur fond teal : `.btn-on-indigo` (crème/plum), `.btn-outline-cream` (bordure crème translucide). **Ne pas** animer `background` dans la transition (provoque un déphasage au swap de palette — déjà corrigé dans la maquette : transition `transform/box-shadow` seulement).
- **Pill / badge d'info** `.pill` — fond crème, bordure 1px faint, 13px ; `.dot` vert `#21A95F` pour les statuts.
- **Eyebrow** `.eyebrow` — mono 12px, uppercase, teal, précédé d'un trait 18×2px (`::before`).
- **Entry card** `.entry` — crème, bordure faint, rayon 24, min-height 230, **lift -4px + ombre** au survol ; badge mono pilule, h3, p `--dim`, lien « Commencer → » teal poussé en bas. Badges : `.badge-carnet` (sage/plum), `.badge-parcours` (soft-1/teal).
- **Step card** `.step` — numéro mono teal, h3, p, mascotte colorée.
- **Way card** `.way` — 3 variantes (crème bordée / **teal plein** au centre / crème bordée), badge en haut, label mono en bas.
- **Support card** `.support-card` — grande carte **teal pleine**, rayon 30, padding `54px 56px`, blobs rose+sable, grille `1.3fr .9fr`.

## Structure de la page (ordre + fond)
1. **Nav** sticky (crème translucide `backdrop-filter:blur(12px)`, bordure basse faint, 72px) — mascotte + wordmark, liens, CTA pilule.
2. **Hero** (crème, blobs aqua/sable) — pill d'intro, display + mot surligné sable, lede, 2 CTA, micro-mentions, carte « Recherche rapide ».
3. **Par où commencer** (fond **soft-1 / aqua**) — 2 entry cards.
4. **Trois gestes simples** (crème) — 3 step cards 01/02/03.
5. **Les outils** (fond **soft-2 / sable**) — 3 way cards (carte centrale teal).
6. **Soutenir** (crème) — grande carte teal.
7. **Footer** (fond **plum**, texte crème en alphas pour rester lisible quelle que soit la palette).

Copy intégralement en français, reprise du site (titres, deux portes d'entrée, gestes Trouver/Choisir/Garder, familles Questionnaires/Parcours/Carnets, bloc soutien, disclaimer footer « éditée par Next Impact… ne remplace pas un·e professionnel·le »). Texte exact dans le HTML.

## Interactions, accessibilité, responsive
- Survols : lift + ombre, transition `.15–.18s` (jamais sur `background`).
- Curseur de recherche : `@keyframes` opacity, décoratif. Nav sticky + flou. `scroll-behavior:smooth`.
- **A11y** : respecter `prefers-reduced-motion` ; contrastes (plum sur pastels OK ; `--dim` réservé au secondaire) ; SVG décoratifs `aria-hidden`.
- **Breakpoints** : 960px → hero/grilles/support en 1 colonne, footer 2 col, liens nav masqués sauf CTA (prévoir un menu mobile). 560px → padding 20px, display 46px, h2 34px, footer 1 col.

## Assets
Aucun bitmap. Mascotte SVG (à composantiser), blobs (divs CSS), icônes loupe/cadenas (SVG inline, `stroke:var(--dim)`). Emojis système (👋✨❤️) avec parcimonie — contexte sensible.

## Fichiers
- `Peer to Peer — Lagune (teal).html` — maquette complète, **calée par défaut sur Teal** (tokens teal dans `:root`), sélecteur de palette inclus. Source de vérité visuelle.
- `README.md` — ce document.
