"use client";

import Link from "next/link";
import { useState } from "react";
import GameIcon from "@/components/GameIcon";
import { DEFAULT_COUNTRY, getCrisisResources } from "@/content/crisis-resources";
import { FOCUS_RING } from "@/lib/a11y";

export function FloatingHelp() {
  const [open, setOpen] = useState(false);
  const set = getCrisisResources(DEFAULT_COUNTRY);

  return (
    <aside className="floating-help" aria-label="Aide d'urgence">
      {open ? (
        <div id="floating-help-panel" className="floating-help-panel">
          <div className="floating-help-head">
            <div className="flex items-center gap-2">
              <GameIcon name="heart-handshake" size={18} className="text-danger" aria-hidden />
              <p className="font-semibold">Besoin d&apos;aide ?</p>
            </div>
            <button
              type="button"
              className={`floating-help-close ${FOCUS_RING}`}
              onClick={() => setOpen(false)}
              aria-label="Fermer l'aide"
            >
              <GameIcon name="x" size={16} aria-hidden />
            </button>
          </div>
          <p className="floating-help-intro">{set.intro}</p>
          <ul className="floating-help-list">
            {set.contacts.slice(0, 3).map((contact) => (
              <li key={contact.name}>
                <a
                  href={contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : contact.href}
                  target={contact.phone ? undefined : "_blank"}
                  rel={contact.phone ? undefined : "noreferrer"}
                  className={`floating-help-link ${FOCUS_RING}`}
                >
                  <GameIcon name={contact.iconName} size={16} className="text-danger" aria-hidden />
                  <span>
                    <strong>{contact.name}</strong>
                    <small>{contact.detail}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Link href="/ressources" className={`floating-help-more ${FOCUS_RING}`}>
            Toutes les ressources <GameIcon name="arrow-right" size={14} aria-hidden />
          </Link>
        </div>
      ) : null}

      <button
        type="button"
        className={`floating-help-trigger ${FOCUS_RING}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="floating-help-panel"
      >
        <GameIcon name="heart-handshake" size={18} aria-hidden />
        Aide
      </button>
    </aside>
  );
}
