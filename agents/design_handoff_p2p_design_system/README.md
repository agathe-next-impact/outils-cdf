# Handoff: Peer to Peer — Design System

A complete, framework-agnostic design system extracted from the *Peer to Peer* bento prototype. Use it to restyle an **existing project** to this identity.

---

## Overview

**Identity:** Editorial, calm, grayscale UI with a **single vermillion accent**. Built around a *bento* layout (irregular cards on a 12-column grid), elegant serif headlines, and crisp hairline borders with **no shadows**.

**Locked configuration (this is the spec to implement):**

| Axis | Value |
|---|---|
| **Typography** | *Édito* — **Newsreader** (display/serif) + **Hanken Grotesk** (body/sans) |
| **Color** | *Next Impact* — grayscale surfaces only |
| **Accent** | **Vermillion `#D83A1A`** (single accent, used sparingly) |
| **Modes** | **Light** (default) + **Dark** |
| **Geometry** | *Net* — sharp: `5px` / `4px` radii, `1px` hairline borders, **0 shadow** |

---

## About the design files

The files in `reference/` are **design references created in HTML/CSS** — a prototype showing the intended look and behavior, **not production code to copy verbatim**. The prototype also contains an interactive "Tweaks" panel and several *alternate* themes (other palettes, fonts, geometries) used for exploration — **ignore those**; only the locked configuration above is in scope.

Your task: **recreate this design system inside the target codebase's existing environment** (React, Vue, Svelte, SwiftUI, native, etc.), using its established component patterns and conventions. If the project has no styling environment yet, adopt the most appropriate one and implement there.

The production-ready artifacts you should actually build from are:
- **`design-system.css`** — distilled tokens + base component classes (clean, no prototype/tweak machinery).
- **`tokens.json`** — machine-readable tokens (for JS, Style Dictionary, or a theme object).
- **`tailwind.preset.js`** — drop-in Tailwind preset wired to the CSS variables.

## Fidelity

**High-fidelity.** Colors, typography, spacing, radii, and borders are final. Reproduce them exactly via the tokens — do not hardcode hex values in components; reference the CSS variables / token names so light↔dark and future tweaks stay centralized.

---

## Design tokens

### Color — Light (default)

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#E9E9E9` | Page background |
| `--surface` | `#F7F7F7` | Card / panel |
| `--surface-2` | `#E7E7E7` | Inset / secondary card |
| `--tint` | `#DEDEDE` | Subtle fill |
| `--ink` | `#171717` | Primary text |
| `--ink-soft` | `#565656` | Secondary text |
| `--ink-faint` | `#8A8A8A` | Tertiary / captions |
| `--line` | `#DADADA` | Hairline border |
| `--line-strong` | `#C4C4C4` | Hover / emphasis border |
| `--accent` | `#D83A1A` | **Vermillion — the only color** |
| `--accent-deep` | `#B22E12` | Pressed / deep accent |
| `--accent-soft` | `#E6E6E6` | Icon-chip background (kept gray) |
| `--on-accent` | `#FFFFFF` | Text/icon on accent |
| `--hero-bg` | `#181818` | Filled dark hero panel |
| `--hero-ink` | `#ECECEC` | Text on hero |
| `--hero-line` | `#2F2F2F` | Hero border |
| `--second` | `#2A2A2A` | Secondary category (neutral) |
| `--second-soft` | `#E0E0E0` | Secondary category fill |

### Color — Dark

| Token | Hex |
|---|---|
| `--bg` | `#0F0F0F` |
| `--surface` | `#191919` |
| `--surface-2` | `#202020` |
| `--tint` | `#262626` |
| `--ink` | `#ECECEC` |
| `--ink-soft` | `#A6A6A6` |
| `--ink-faint` | `#6E6E6E` |
| `--line` | `#2C2C2C` |
| `--line-strong` | `#3C3C3C` |
| `--accent` | `#E8472A` *(lifted vermillion for contrast on dark)* |
| `--accent-deep` | `#C42E12` |
| `--accent-soft` | `#242424` |
| `--on-accent` | `#FFFFFF` |
| `--hero-bg` | `#000000` |
| `--hero-ink` | `#ECECEC` |
| `--hero-line` | `#2A2A2A` |
| `--second` | `#ECECEC` |
| `--second-soft` | `#242424` |

> **Color discipline:** everything is grayscale **except** vermillion. Use the accent only for: brand mark, active nav, eyebrows/labels, key numbers, links, and icon glyphs. Never tint surfaces or text with it.

### Theme switching
- Default is light (`:root`).
- Dark applies via `<html data-theme="dark">` **or** automatically through `@media (prefers-color-scheme: dark)` when no explicit theme is set. Force light with `data-theme="light"`.
- **Important:** when toggling theme at runtime, briefly disable CSS transitions (add a `.theming` class that sets `transition:none !important` for one animation frame, then remove it). Transitioning `background`/`color` that derive from CSS variables can otherwise visually "stick" on the old value in Chromium.

### Typography

| | Family | Use |
|---|---|---|
| **Display** | `Newsreader`, Georgia, serif — weight **500** | All headings, key numbers, brand |
| **Body** | `Hanken Grotesk`, system-ui, sans — 400/500/600 | Paragraphs, UI, labels |

Load: Google Fonts `Newsreader` (opsz 6–72, ital 0/1, wght 400–600) + `Hanken Grotesk` (400–700). See the `@import` at the top of `design-system.css`.

**Scale** (family in parens):
- Display (serif): `clamp(40px, 5vw, 60px)`, line-height `.98`, letter-spacing `-0.02em`
- H2 (serif): `clamp(24px, 2.4vw, 32px)`
- H3 (serif): `20px`
- Stat number (serif, **accent color**): `40px`
- Body (sans): `15px` / line-height `1.55`
- Body small (sans, `--ink-soft`): `14px`
- Eyebrow (sans, **accent**): `11px`, weight 600, `letter-spacing .14em`, UPPERCASE

### Geometry — "Net"
- `--radius: 5px` (cards, panels, inputs, stat tiles)
- `--radius-sm: 4px` (chips, icon chips, swatches)
- Borders: **1px** hairline using `--line` (→ `--line-strong` on hover)
- **No box-shadows** anywhere. Separation comes from surface contrast + hairlines.
- Buttons & badges are the exception: full **pill** radius (`999px`).

### Spacing & grid
- Card padding: `22px 24px`.
- Bento grid: `display:grid; grid-template-columns:repeat(12,1fr); gap:14px`.
- Span helpers `.c3….c12` + `.r2` (row span 2) create irregular bento sizing.
- Responsive: collapse to 6 cols ≤1080px, 1 col ≤720px.

---

## Components

All component recipes are in **`design-system.css`** (class-based) — adapt them to your framework's component model. Summary:

| Component | Class | Notes |
|---|---|---|
| **Bento card** | `.box` (+ `--inset`, `--soft`, `--fill`, `--accent`) | Core surface. `.is-link:hover` lifts `translateY(-2px)` + stronger border. `--fill` = dark hero block; `--accent` = solid vermillion block (use rarely, e.g. one flagship card). |
| **Grid** | `.bento` + `.c3…c12` / `.r2` | 12-col irregular bento. |
| **Button** | `.btn` + `--primary` / `--ghost` | Pill. Primary = solid `--ink` on `--bg` (inverts in dark). Ghost = `currentColor` outline. |
| **Text link** | `.tlink` | Accent-colored, arrow icon shifts right on hover. |
| **Icon chip** | `.ichip` (+ `--line`) | 40px, `--radius-sm`, **gray bg + vermillion glyph** — the signature color pop. |
| **Badge** | `.badge` | Hairline pill, `--ink-soft`. |
| **Filter chip** | `.chip` (+ `.is-on`) | `.is-on` = solid accent. |
| **Stat tile** | `.stat` / `.stat .n` / `.stat .l` | Big serif number in accent + tiny caption. |
| **Eyebrow** | `.eyebrow` | Accent uppercase label above headings. |

**Icons:** the prototype uses a custom inline-SVG sprite (1.6px stroke, rounded caps, 24×24 viewBox). Replace with your project's existing icon library at equivalent weight; tint glyphs with `--accent` inside `.ichip`, otherwise `--ink-soft`.

---

## Interactions & behavior
- **Hover:** cards raise 2px and border goes `--line` → `--line-strong` (`0.2s`). Links nudge their arrow `+3px`. Keep it subtle.
- **No decorative motion/loops.** This is a calm, editorial system.
- **Theme toggle:** see the transition-suppression note above.
- **Accessibility:** vermillion `#D83A1A` on `--surface` `#F7F7F7` ≈ 4.7:1 (AA for text/UI). On dark, the lifted `#E8472A` keeps contrast. Body `--ink` on `--bg` is ~13:1. Maintain ≥44px hit targets; respect `prefers-reduced-motion`.

---

## Files in this bundle

| File | Purpose |
|---|---|
| `README.md` | This document — implement from it alone. |
| `design-system.css` | **Production tokens + base component classes.** Start here. |
| `tokens.json` | Machine-readable tokens (JS / Style Dictionary / theme object). |
| `tailwind.preset.js` | Tailwind preset mapping tokens → utilities (variable-backed, dark via `[data-theme="dark"]`). |
| `reference/prototype.html` | Full visual reference (open in a browser). Contains exploratory Tweaks — **out of scope**, use only the locked config. |
| `reference/bento.css` | Source styles behind the prototype (reference only). |

---

## Implementation checklist
1. Add the two webfonts (Newsreader + Hanken Grotesk).
2. Copy the `:root` (light) + `[data-theme="dark"]` token blocks from `design-system.css` into your global stylesheet (or import the file / Tailwind preset).
3. Wire a theme toggle that sets `data-theme` on `<html>` (with transition suppression).
4. Rebuild screens using your framework's components, mapping every value to a token — verify against `reference/prototype.html` in **both** light and dark.
5. Audit: no hardcoded hex, no shadows, no color other than vermillion, all radii `≤5px`, hairline borders intact.
