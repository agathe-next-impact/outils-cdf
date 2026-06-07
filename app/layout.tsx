import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopBar } from "@/components/layout/MobileTopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { InstallBanner } from "@/components/pwa/InstallBanner";
import { SITE } from "@/config/site";

// Capte l'event d'installation au plus tôt (avant l'hydratation React) pour
// que le bandeau d'installation puisse l'utiliser même s'il se déclenche tôt.
const BIP_CAPTURE =
  "window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();" +
  "window.__deferredBip=e;window.dispatchEvent(new Event('bip-ready'));});";

// Typographie du template « smart home dashboard » : Inter (UI) + JetBrains Mono.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Boîte à outils`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Plateforme libre d'outils d'auto-observation et de soutien au rétablissement. " +
    "Aucun compte, aucune donnée envoyée : tout reste dans votre navigateur, le temps de la session.",
  applicationName: `${SITE.name} — Boîte à outils`,
  appleWebApp: { capable: true, statusBarStyle: "default", title: SITE.name },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // étend sous l'encoche → safe-area exploitable
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen transition-colors duration-300">
        <script dangerouslySetInnerHTML={{ __html: BIP_CAPTURE }} />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:font-medium focus:text-white"
        >
          Aller au contenu
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Desktop : Sidebar. Mobile : fine barre haute + BottomNav (seule nav). */}
          <Sidebar />
          <div className="lg:ml-20">
            <div className="lg:hidden">
              <MobileTopBar />
              <InstallBanner />
            </div>
            {/* Marge basse mobile pour ne pas masquer le contenu sous la BottomNav. */}
            <div className="pb-24 lg:pb-0">
              {children}
              <Footer />
            </div>
          </div>
          <BottomNav />
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
