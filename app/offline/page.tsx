import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import GameIcon from "@/components/GameIcon";

export const metadata: Metadata = {
  title: "Hors ligne",
  description: "Vous êtes actuellement hors ligne.",
};

export default function OfflinePage() {
  return (
    <PageWrapper maxWidth="md">
      <div className="card flex flex-col items-center gap-3 text-center">
        <GameIcon name="wifi-off" size={40} className="text-accent" aria-hidden />
        <h1 className="font-heading text-2xl tracking-tight">Vous êtes hors ligne</h1>
        <p className="text-muted">
          La connexion est interrompue. Reconnectez-vous pour accéder à tous les outils. Vos
          saisies en cours restent dans cet onglet, le temps de la session.
        </p>
      </div>
    </PageWrapper>
  );
}
