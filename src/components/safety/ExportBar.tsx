"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import GameIcon from "@/components/GameIcon";
import { PrintableDocument } from "@/lib/export/PrintableDocument";
import type { NeutralDocument } from "@/lib/export/neutralDocument";
import { toMarkdown } from "@/lib/export/toMarkdown";
import { toJson } from "@/lib/export/toJson";
import { downloadText } from "@/lib/export/download";
import { exportFilename } from "@/lib/format";

export interface ExportPayload {
  doc: NeutralDocument;
  raw?: unknown;
}

interface ExportBarProps {
  /** Construit le document (et l'état brut) à l'instant de l'export. */
  build: () => ExportPayload;
  slug: string;
  className?: string;
}

/** Monte le document imprimable dans un portail #print-root et lance l'impression. */
function PrintMount({ doc, onDone }: { doc: NeutralDocument; onDone: () => void }) {
  const [container] = useState(() => {
    const el = document.createElement("div");
    el.id = "print-root";
    return el;
  });

  useEffect(() => {
    document.body.appendChild(container);
    const handleAfter = () => onDone();
    window.addEventListener("afterprint", handleAfter);
    const t = window.setTimeout(() => window.print(), 80);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("afterprint", handleAfter);
      if (container.parentNode) container.parentNode.removeChild(container);
    };
  }, [container, onDone]);

  return createPortal(<PrintableDocument doc={doc} />, container);
}

export function ExportBar({ build, slug, className }: ExportBarProps) {
  const [printDoc, setPrintDoc] = useState<NeutralDocument | null>(null);

  const handleMarkdown = () => {
    const { doc } = build();
    downloadText(exportFilename(slug, "md"), toMarkdown(doc), "text/markdown");
  };
  const handleJson = () => {
    const { doc, raw } = build();
    downloadText(exportFilename(slug, "json"), toJson(doc, raw), "application/json");
  };
  const handlePrint = () => setPrintDoc(build().doc);

  return (
    <div className={`no-print ${className ?? ""}`}>
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue">
        Conserver une trace
      </p>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn-secondary flex items-center gap-2" onClick={handlePrint}>
          <GameIcon name="printer" size={18} />
          PDF / Imprimer
        </button>
        <button type="button" className="btn-secondary flex items-center gap-2" onClick={handleMarkdown}>
          <GameIcon name="file-text" size={18} />
          Markdown
        </button>
        <button type="button" className="btn-secondary flex items-center gap-2" onClick={handleJson}>
          <GameIcon name="file-json" size={18} />
          JSON
        </button>
      </div>
      <p className="mt-2 text-xs text-black/60">
        Généré dans votre navigateur. Aucune donnée n&apos;est envoyée sur Internet.
      </p>
      {printDoc ? <PrintMount doc={printDoc} onDone={() => setPrintDoc(null)} /> : null}
    </div>
  );
}
