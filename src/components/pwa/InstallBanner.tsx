"use client";

/**
 * Bandeau « Installer l'application » — affiché UNIQUEMENT sur mobile/tablette
 * (entrée tactile principale + masqué dès `lg` par le wrapper du layout).
 *
 *  - Android/Chrome : capte `beforeinstallprompt` → bouton « Installer ».
 *  - iOS/Safari : pas d'event natif → on affiche la marche à suivre.
 *  - Caché si l'app est déjà installée (standalone) ou déjà masquée.
 *
 * Le masquage est mémorisé en `sessionStorage` (cohérent avec le modèle
 * session-only : aucune persistance durable, rien n'est envoyé sur le réseau).
 */
import { useEffect, useState } from "react";
import GameIcon from "@/components/GameIcon";
import { Logo } from "@/components/Logo";
import { FOCUS_RING } from "@/lib/a11y";
import { SITE } from "@/config/site";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    __deferredBip?: BeforeInstallPromptEvent;
  }
}

const DISMISS_KEY = "p2p-install-dismissed";

export function InstallBanner() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [iosHint, setIosHint] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Déjà installée (lancée en mode autonome) → rien.
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;

    // Déjà masquée cette session → rien.
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      /* sessionStorage indisponible : on continue */
    }

    // Cible : mobile/tablette uniquement (pointeur grossier = tactile).
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    const show = (e: BeforeInstallPromptEvent) => {
      setDeferred(e);
      setVisible(true);
    };

    // Event éventuellement capté très tôt par le script inline du layout.
    if (window.__deferredBip) show(window.__deferredBip);
    const onReady = () => {
      if (window.__deferredBip) show(window.__deferredBip);
    };
    const onBIP = (e: Event) => {
      e.preventDefault();
      show(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("bip-ready", onReady as EventListener);
    window.addEventListener("beforeinstallprompt", onBIP as EventListener);

    // iOS Safari : pas de beforeinstallprompt → bandeau avec instructions.
    const ua = window.navigator.userAgent;
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    const isSafari = /^((?!chrome|crios|fxios|android).)*safari/i.test(ua);
    if (isIOS && isSafari) {
      setIosHint(true);
      setVisible(true);
    }

    const onInstalled = () => {
      setVisible(false);
      setDeferred(null);
      window.__deferredBip = undefined;
    };
    window.addEventListener("appinstalled", onInstalled as EventListener);

    return () => {
      window.removeEventListener("bip-ready", onReady as EventListener);
      window.removeEventListener("beforeinstallprompt", onBIP as EventListener);
      window.removeEventListener("appinstalled", onInstalled as EventListener);
    };
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    try {
      await deferred.userChoice;
    } catch {
      /* l'utilisateur a fermé la boîte : on masque quand même */
    }
    setDeferred(null);
    window.__deferredBip = undefined;
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Installer l'application"
      className="animate-slide-up flex items-center gap-3 border-b border-border bg-card px-4 py-2.5"
    >
      <span aria-hidden className="shrink-0">
        <Logo size={28} showWordmark={false} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-tight">Installer {SITE.name}</p>
        {iosHint ? (
          <p className="text-xs leading-snug text-muted">
            Touchez le bouton <strong className="font-semibold text-foreground">Partager</strong>,
            puis «&nbsp;Sur l&apos;écran d&apos;accueil&nbsp;».
          </p>
        ) : (
          <p className="text-xs leading-snug text-muted">
            Accès rapide depuis l&apos;écran d&apos;accueil, en plein écran.
          </p>
        )}
      </div>

      {!iosHint && (
        <button
          type="button"
          onClick={install}
          className={`shrink-0 rounded-xl bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 ${FOCUS_RING}`}
        >
          Installer
        </button>
      )}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Masquer ce bandeau"
        className={`shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:text-foreground ${FOCUS_RING}`}
      >
        <GameIcon name="x" size={18} aria-hidden />
      </button>
    </div>
  );
}
