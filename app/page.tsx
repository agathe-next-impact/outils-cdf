import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CatalogExplorer } from "@/components/catalogue/CatalogExplorer";
import { CATEGORIES, getCatalog } from "@/data/catalog";
import { getPathwaySummaries } from "@/data/pathways";
import GameIcon from "@/components/GameIcon";
import { Logo } from "@/components/Logo";
import { FOCUS_RING } from "@/lib/a11y";
import { SITE } from "@/config/site";

const STEPS: { icon: string; title: string; text: string }[] = [
  {
    icon: "mouse-pointer",
    title: "Choisir",
    text: "Parcourez les outils et ouvrez celui qui vous parle. Aucun compte, aucune inscription.",
  },
  {
    icon: "pen-line",
    title: "Remplir",
    text: "Avancez à votre rythme. Vous pouvez passer une question, vous arrêter, et reprendre.",
  },
  {
    icon: "download",
    title: "Exporter",
    text: "Gardez une trace si vous le souhaitez (PDF, Markdown). Rien n'est envoyé.",
  },
];

// Empans des cartes catégorie / parcours / étapes (rythme éditorial du mockup).
const CAT_SPAN = ["c5", "c4", "c3"];
const PARC_SPAN = ["c6 r2", "c6", "c3", "c3"];
const STEP_SPAN = ["c5", "c4", "c3"];

export default function HomePage() {
  const catalog = getCatalog();
  const pathways = getPathwaySummaries();
  const countFor = (key: string) => catalog.filter((e) => e.category === key).length;

  return (
    <PageWrapper maxWidth="full">
      {/* ===== Masthead ===== */}
      <section className="bento">
        {/* Marque + actions */}
        <div className="box box--fill c7 r2">
          <Logo size={40} showWordmark={false} />
          <span className="tagline" style={{ marginTop: 22 }}>
            Boîte à outils du rétablissement
          </span>
          <h1>{SITE.name}</h1>
          <p className="desc">
            Des outils d&apos;auto-observation et de soutien, gratuits et sans compte. Ils ne posent
            aucun diagnostic — ils vous accompagnent, à votre rythme.
          </p>
          <div className="hero-cta">
            <Link href="#tous-les-outils" className={`btn-primary ${FOCUS_RING}`}>
              Découvrir les outils <GameIcon name="arrow-right" size={15} aria-hidden />
            </Link>
            <Link href="#parcours" className={`btn-ghost ${FOCUS_RING}`}>
              Par où commencer
            </Link>
          </div>
        </div>

        {/* Confidentialité */}
        <div className="box box--soft c5">
          <div className="ichip">
            <GameIcon name="shield-check" size={20} aria-hidden />
          </div>
          <h3 style={{ fontSize: 21, marginTop: 14 }}>Sans compte, rien n&apos;est envoyé</h3>
          <p className="body">
            Vos réponses restent dans votre navigateur, le temps de la session, et ne sont jamais
            envoyées sur Internet.
          </p>
        </div>

        {/* Aide immédiate */}
        <div className="box c5">
          <div className="box-tt">
            <GameIcon name="phone-call" size={20} className="text-danger" aria-hidden />
            <h3>Besoin d&apos;aide tout de suite&nbsp;?</h3>
          </div>
          <p className="body">
            En cas d&apos;urgence&nbsp;: <strong>3114</strong> (24h/24), le <strong>15</strong> ou le{" "}
            <strong>112</strong>.
          </p>
          <Link href="/ressources" className={`tlink ${FOCUS_RING}`} style={{ marginTop: 14 }}>
            Toutes les ressources <GameIcon name="arrow-right" size={15} aria-hidden />
          </Link>
        </div>

        {/* Session */}
        <div className="box box--tint c8">
          <div className="box-tt">
            <GameIcon name="timer" size={20} className="text-accent" aria-hidden />
            <h3>Votre session</h3>
          </div>
          <p className="body" style={{ maxWidth: "62ch" }}>
            Quand vous commencez un outil, vos réponses restent ici le temps de l&apos;onglet —
            jamais envoyées sur Internet, et effacées à la fermeture.
          </p>
        </div>

        {/* Repères chiffrés */}
        <div className="box c4" style={{ padding: 16 }}>
          <div className="stats">
            <div className="stat"><span className="n">{catalog.length}</span><span className="l">outils au catalogue</span></div>
            <div className="stat"><span className="n">{pathways.length}</span><span className="l">parcours guidés</span></div>
            <div className="stat"><span className="n">{CATEGORIES.length}</span><span className="l">catégories</span></div>
          </div>
        </div>
      </section>

      {/* ===== Explorer par type ===== */}
      <div className="section-head">
        <span className="eyebrow">Catégories</span>
        <h2>Explorer par type</h2>
      </div>
      <section className="bento">
        {CATEGORIES.map((cat, i) => {
          const second = i === 1;
          const n = countFor(cat.key);
          return (
            <Link
              key={cat.key}
              href={`/categories/${cat.key}`}
              className={`box tcard link ${second ? "box--second " : ""}${CAT_SPAN[i] ?? "c4"} ${FOCUS_RING}`}
            >
              <div className={`ichip ${second ? "ichip--ink" : ""}`}>
                <GameIcon name={cat.iconName} size={20} aria-hidden />
              </div>
              <h3>{cat.label}</h3>
              <p className="body">{cat.description}</p>
              <span className="count">
                {n} OUTIL{n > 1 ? "S" : ""}
              </span>
            </Link>
          );
        })}
      </section>

      {/* ===== Par où commencer ===== */}
      <div className="section-head" id="parcours">
        <span className="eyebrow">Parcours</span>
        <h2>Par où commencer&nbsp;?</h2>
        <span className="sub">Chaque parcours enchaîne quelques outils qui se complètent.</span>
      </div>
      <section className="bento">
        {pathways.map((p, i) => {
          const big = i === 0;
          return (
            <Link
              key={p.id}
              href={`/parcours/${p.id}`}
              className={`box parc link ${big ? "parc--big box--accent " : ""}${PARC_SPAN[i] ?? "c4"} ${FOCUS_RING}`}
            >
              <div className="ptitle">
                <GameIcon name={p.iconName} size={big ? 24 : 20} aria-hidden /> {p.goal}
              </div>
              <p className="pdesc">{p.pitch}</p>
              <div className="pfoot">
                <span className="steps">{p.stepCount} ÉTAPES</span>
                <span className="tlink">
                  Commencer <GameIcon name="arrow-right" size={15} aria-hidden />
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ===== Comment ça marche ===== */}
      <div className="section-head">
        <span className="eyebrow">Mode d&apos;emploi</span>
        <h2>Comment ça marche</h2>
      </div>
      <section className="bento">
        {STEPS.map((s, i) => (
          <div key={s.title} className={`box step ${i === 1 ? "box--tint " : ""}${STEP_SPAN[i] ?? "c4"}`}>
            <span className="num">{i + 1}</span>
            <div className="step-tt">
              <GameIcon name={s.icon} size={20} className="text-accent" aria-hidden />
              <h3>{s.title}</h3>
            </div>
            <p className="body">{s.text}</p>
          </div>
        ))}
      </section>

      {/* ===== Tous les outils ===== */}
      <div className="section-head" id="tous-les-outils">
        <span className="eyebrow">Catalogue</span>
        <h2>Tous les outils</h2>
      </div>
      <CatalogExplorer entries={catalog} categories={CATEGORIES} />
    </PageWrapper>
  );
}
