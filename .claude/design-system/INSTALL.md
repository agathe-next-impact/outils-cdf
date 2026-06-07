# Installer la charte UI/UX dans un projet cible (Next.js + Tailwind v4)

Ce kit est **copiable tel quel**. L'agent `ui-ux-porter` automatise tout ça ; ce guide
documente les étapes manuelles équivalentes.

## 0. Copier le kit dans le projet cible

Copier ces dossiers à la racine du projet cible :

```
.claude/design-system/   →  .claude/design-system/
.claude/agents/          →  .claude/agents/   (ui-ux-porter.md, ui-ux-auditor.md)
.claude/commands/        →  .claude/commands/ (charte-ui.md)
```

## 1. Dépendances

```bash
npm i next-themes lucide-react
npm i -D tailwindcss @tailwindcss/postcss
```

`postcss.config.mjs` :
```js
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

## 2. Feuille de style

Remplacer / préfixer le `globals.css` du projet par `.claude/design-system/globals.css`.
**Ne jamais supprimer** le bloc `* { border-radius:0 !important; box-shadow:none !important; }`
ni les variables de thème `:root` / `.dark`.

## 3. Polices + providers dans le layout racine

```tsx
import { Belanosima, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const belanosima = Belanosima({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-belanosima" });
const openSans   = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${belanosima.variable} ${openSans.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## 4. Composants

Copier `.claude/design-system/components/*` vers `src/components/` (ou `components/`) :
`GameIcon`, `DecodeText`, `Confetti`, `ThemeToggle`, `ThemeProvider`.
Étendre `ICON_MAP` de `GameIcon` avec les icônes lucide propres au projet.

## 5. Charte agent (recommandé)

Ajouter au `CLAUDE.md` du projet cible le contenu de `CLAUDE.snippet.md` (résumé des
7 lois) pour que toute génération future respecte la charte par défaut.

## 6. Vérifier

```bash
npm run build && npm run lint
```

Puis lancer un audit : voir l'agent `ui-ux-auditor` (ou `/charte-ui audit`).
