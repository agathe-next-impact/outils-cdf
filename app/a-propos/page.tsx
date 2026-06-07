import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import GameIcon from "@/components/GameIcon";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Une plateforme libre d'outils d'auto-observation et de soutien au rétablissement.",
};

export default function AProposPage() {
  return (
    <PageWrapper maxWidth="2xl" decor={["sparkles", "flower"]}>
      <header className="mb-6">
        <GameIcon name="book-open" size={48} className="mb-2 text-blue" />
        <h1 className="font-heading text-3xl font-black uppercase tracking-tight md:text-4xl">
          À propos
        </h1>
      </header>

      <section className="card mb-6 border border-blue">
        <h2 className="mb-2 text-lg font-black uppercase">Une boîte à outils libre</h2>
        <p className="text-base">
          Cette plateforme rassemble des outils d&apos;auto-observation et de soutien au
          rétablissement en santé mentale, adaptés de guides et de méthodes existants. Ils
          sont proposés en accès libre, sans compte ni inscription.
        </p>
      </section>

      <section className="card mb-6 border border-yellow">
        <h2 className="mb-2 text-lg font-black uppercase">Ce que ces outils ne sont pas</h2>
        <ul className="ml-5 list-disc space-y-1 text-base">
          <li>Ils ne posent aucun diagnostic.</li>
          <li>Ils ne remplacent pas un·e professionnel·le de santé.</li>
          <li>Ils ne proposent ni traitement, ni conseil médical.</li>
        </ul>
        <p className="mt-3 text-sm text-black/70">
          En cas de difficulté, consultez la page{" "}
          <Link className="text-blue hover:underline" href="/ressources">
            Ressources d&apos;urgence
          </Link>
          .
        </p>
      </section>

      <section className="card border border-black">
        <h2 className="mb-2 text-lg font-black uppercase">Vos données vous appartiennent</h2>
        <p className="text-base">
          Aucune donnée n&apos;est envoyée sur Internet. Vos saisies restent dans votre
          navigateur, le temps de la session.{" "}
          <Link className="text-blue hover:underline" href="/confidentialite">
            En savoir plus sur la confidentialité
          </Link>
          .
        </p>
      </section>
    </PageWrapper>
  );
}
