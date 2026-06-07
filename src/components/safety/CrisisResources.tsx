import GameIcon from "@/components/GameIcon";
import { getCrisisResources, DEFAULT_COUNTRY } from "@/content/crisis-resources";
import type { CrisisLevel } from "@/engines/types";

interface CrisisResourcesProps {
  level?: CrisisLevel;
  country?: string;
  className?: string;
}

export function CrisisResources({
  level = "standard",
  country = DEFAULT_COUNTRY,
  className,
}: CrisisResourcesProps) {
  const set = getCrisisResources(country);
  const elevated = level === "elevated";
  return (
    <section
      className={`card ${elevated ? "border-2 border-red" : "border border-blue"} ${className ?? ""}`}
      aria-label="Ressources de soutien et d'urgence"
    >
      <div className="mb-2 flex items-center gap-2">
        <GameIcon
          name={elevated ? "siren" : "heart-handshake"}
          size={24}
          className={elevated ? "text-red" : "text-blue"}
        />
        <h2 className="text-lg font-black uppercase">Besoin d&apos;aide maintenant&nbsp;?</h2>
      </div>
      <p className="mb-3 text-sm">{set.intro}</p>
      <ul className="space-y-2">
        {set.contacts.map((c) => (
          <li key={c.name} className="flex items-start gap-3 border border-black p-2">
            <GameIcon name={c.iconName} size={20} className="mt-0.5 shrink-0 text-red" />
            <div>
              <p className="font-bold">
                {c.phone ? (
                  <a
                    className="text-blue hover:underline"
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                  >
                    {c.name}
                    {c.name.includes(c.phone) ? "" : ` — ${c.phone}`}
                  </a>
                ) : (
                  c.name
                )}
              </p>
              <p className="text-sm text-black/70">{c.detail}</p>
              {c.href ? (
                <a
                  className="text-sm text-blue hover:underline"
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  En savoir plus
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
