"use client";

import { useState } from "react";
import GameIcon from "@/components/GameIcon";
import { useSessionStore } from "@/store/sessionStore";
import { FOCUS_RING } from "@/lib/a11y";

interface ResetButtonProps {
  slug: string;
  label?: string;
  className?: string;
}

export function ResetButton({ slug, label = "Effacer mes réponses", className }: ResetButtonProps) {
  const resetTool = useSessionStore((s) => s.resetTool);
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className={`flex flex-wrap items-center gap-2 text-sm ${className ?? ""}`}>
        <span>Effacer définitivement&nbsp;?</span>
        <button
          type="button"
          className={`bg-red px-3 py-1 font-bold uppercase text-black ${FOCUS_RING}`}
          onClick={() => {
            resetTool(slug);
            setConfirming(false);
          }}
        >
          Oui, effacer
        </button>
        <button
          type="button"
          className={`border border-black px-3 py-1 ${FOCUS_RING}`}
          onClick={() => setConfirming(false)}
        >
          Annuler
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`flex items-center gap-2 border border-black px-3 py-1 text-sm hover:text-red ${FOCUS_RING} ${className ?? ""}`}
      onClick={() => setConfirming(true)}
    >
      <GameIcon name="trash-2" size={16} />
      {label}
    </button>
  );
}
