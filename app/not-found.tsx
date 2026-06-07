import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import GameIcon from "@/components/GameIcon";

export default function NotFound() {
  return (
    <PageWrapper maxWidth="md" decor={["ghost"]}>
      <div className="card border border-red text-center">
        <GameIcon name="ghost" size={48} className="mx-auto mb-3 text-red" />
        <h1 className="font-heading text-2xl font-black uppercase">Page introuvable</h1>
        <p className="mt-2 text-sm">Cette page n&apos;existe pas, ou plus.</p>
        <Link href="/" className="btn-primary mt-4 inline-block">
          Retour à l&apos;accueil
        </Link>
      </div>
    </PageWrapper>
  );
}
