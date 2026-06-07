import type { Metadata } from "next";
import { Belanosima, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getMegaMenu } from "@/data/catalog";
import { getPathwaySummaries } from "@/data/pathways";

const belanosima = Belanosima({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-belanosima",
});
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });

export const metadata: Metadata = {
  title: {
    default: "Comme des Fous — Boîte à outils",
    template: "%s — Comme des Fous",
  },
  description:
    "Plateforme libre d'outils d'auto-observation et de soutien au rétablissement. " +
    "Aucun compte, aucune donnée envoyée : tout reste dans votre navigateur, le temps de la session.",
  applicationName: "Comme des Fous — Boîte à outils",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const megaMenu = getMegaMenu();
  const pathways = getPathwaySummaries();
  return (
    <html
      lang="fr"
      className={`${belanosima.variable} ${openSans.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen transition-colors duration-300">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-blue focus:px-3 focus:py-2 focus:font-bold focus:text-white"
        >
          Aller au contenu
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header menu={megaMenu} pathways={pathways} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
