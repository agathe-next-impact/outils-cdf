import type { NeutralBlock, NeutralDocument } from "@/lib/export/neutralDocument";

function Block({ block }: { block: NeutralBlock }) {
  switch (block.kind) {
    case "heading":
      return block.level === 2 ? (
        <h3 className="mt-3 text-lg">{block.text}</h3>
      ) : (
        <h4 className="mt-2 text-base">{block.text}</h4>
      );
    case "text":
      return <p className="my-1 whitespace-pre-wrap text-base">{block.text}</p>;
    case "kv":
      return (
        <dl className="my-1 space-y-1">
          {block.pairs.map((p, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="font-bold">{p.label} :</dt>
              <dd className="whitespace-pre-wrap">{p.value || "—"}</dd>
            </div>
          ))}
        </dl>
      );
    case "scale":
      return (
        <p className="my-1">
          <strong>{block.label}</strong> : {block.value} / {block.max}
        </p>
      );
    case "score":
      return (
        <div className="my-1">
          <p>
            <strong>{block.label}</strong> : {block.value} / {block.max}
            {block.band ? ` — ${block.band}` : ""}
          </p>
          {block.guidance ? <p className="text-sm text-muted">{block.guidance}</p> : null}
        </div>
      );
    case "list":
      return block.ordered ? (
        <ol className="my-1 ml-5 list-decimal space-y-1">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      ) : (
        <ul className="my-1 ml-5 list-disc space-y-1">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "table":
      if (block.rows.length === 0) return <p className="my-1 italic text-muted">(aucune entrée)</p>;
      return (
        <div className="my-2 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {block.columns.map((c, i) => (
                  <th key={i} className="border border-border px-2 py-1 text-left font-semibold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-border px-2 py-1 align-top">
                      {cell || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/** Rendu à l'écran d'un NeutralDocument (synthèse, document de carnet). */
export function NeutralView({ doc }: { doc: NeutralDocument }) {
  if (doc.sections.length === 0) {
    return (
      <div className="card">
        <p className="text-sm text-muted">
          Rien à afficher pour l&apos;instant — vos saisies apparaîtront ici.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {doc.sections.map((section, i) => (
        <section key={i} className="card">
          <h2 className="mb-2 text-lg">{section.heading}</h2>
          {section.blocks.map((block, j) => (
            <Block key={j} block={block} />
          ))}
        </section>
      ))}
    </div>
  );
}
