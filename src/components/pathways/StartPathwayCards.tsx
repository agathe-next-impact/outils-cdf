import Link from "next/link";
import GameIcon from "@/components/GameIcon";
import { START_PATHWAY_CARDS } from "@/data/start-pathways";
import { FOCUS_RING } from "@/lib/a11y";

export function StartPathwayCards() {
  return (
    <>
      {START_PATHWAY_CARDS.map((card, i) => (
        <Link
          key={card.title}
          href={card.href}
          className={`box parc parc--big link c6 ${i === 0 ? "box--accent " : "box--second "}${FOCUS_RING}`}
        >
          <div className="ptitle">
            <GameIcon name={card.icon} size={24} aria-hidden /> {card.title}
          </div>
          <p className="pdesc">{card.text}</p>
          <div className="pfoot">
            <span className="steps">{card.steps}</span>
            <span className="tlink">
              Commencer <GameIcon name="arrow-right" size={15} aria-hidden />
            </span>
          </div>
        </Link>
      ))}
    </>
  );
}
