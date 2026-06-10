"use client";

/**
 * Moteur de mesure d'audience, piloté par le consentement.
 *
 *  - `unset`   → affiche le bandeau RGPD, ne charge RIEN.
 *  - `granted` → charge gtag.js (Consent Mode v2) et compte les pages vues,
 *                y compris sur navigation client (App Router ne recharge pas la page).
 *  - `denied`  → ne charge rien ; si GA était déjà actif (retrait via la page
 *                Confidentialité), le coupe (`ga-disable-*` + `consent: denied`).
 *
 * Invariant : seules des pages consultées sont envoyées, jamais le contenu saisi.
 */
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ANALYTICS } from "@/config/analytics";
import { CONSENT_EVENT, getConsent, setConsent, type Consent } from "@/lib/analytics-consent";
import { ConsentBanner } from "./ConsentBanner";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const [consent, setLocal] = useState<Consent>("unset");
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  const gaId = ANALYTICS.gaId;

  // Hydratation : lit la décision déjà prise et suit ses changements
  // (ex. acceptation/retrait depuis la page Confidentialité).
  useEffect(() => {
    setLocal(getConsent());
    const onChange = (e: Event) => setLocal((e as CustomEvent<Consent>).detail ?? getConsent());
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  // Coupe GA si le consentement n'est pas (ou plus) accordé.
  useEffect(() => {
    if (!gaId) return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = consent !== "granted";
    if (consent !== "granted" && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }
  }, [consent, gaId]);

  // Pages vues sur navigation client. Le tout 1er affichage est déjà compté par
  // `gtag('config', …)` ; on n'émet donc qu'aux changements de chemin réels.
  useEffect(() => {
    if (consent !== "granted") return;
    if (lastPath.current === null) {
      lastPath.current = pathname; // page d'entrée : déjà comptée par config()
      return;
    }
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.origin + pathname,
        page_title: document.title,
      });
    }
  }, [consent, pathname]);

  return (
    <>
      {consent === "granted" && gaId && (
        <>
          <Script
            id="ga-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;` +
              `gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});` +
              `gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}
      {consent === "unset" && (
        <ConsentBanner
          onAccept={() => setConsent("granted")}
          onDecline={() => setConsent("denied")}
        />
      )}
    </>
  );
}
