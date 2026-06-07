import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BentoGrid, BentoBox } from "@/components/layout/Bento";
import GameIcon from "@/components/GameIcon";

export default function NotFound() {
  return (
    <PageWrapper maxWidth="md" decor={["ghost"]}>
      <BentoGrid>
        <BentoBox span={3} className="border-danger text-center">
          <GameIcon name="ghost" size={48} className="mx-auto mb-3 text-danger" />
          <h1 className="font-heading text-2xl">Page introuvable</h1>
          <p className="mt-2 text-sm">Cette page n&apos;existe pas, ou plus.</p>
          <Link href="/" className="btn-primary mt-4 inline-block">
            Retour à l&apos;accueil
          </Link>
        </BentoBox>
      </BentoGrid>
    </PageWrapper>
  );
}
