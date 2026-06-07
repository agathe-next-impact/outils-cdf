import type { NeutralBlock, NeutralDocument } from "./neutralDocument";
import { formatDateFr } from "../format";

function Block({ block }: { block: NeutralBlock }) {
  switch (block.kind) {
    case "heading":
      return block.level === 2 ? (
        <h2 className="mt-4 text-lg font-black uppercase">{block.text}</h2>
      ) : (
        <h3 className="mt-3 text-base font-bold">{block.text}</h3>
      );
    case "text":
      return <p className="my-2 whitespace-pre-wrap">{block.text}</p>;
    case "kv":
      return (
        <dl className="my-2">
          {block.pairs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <dt className="font-bold">{p.label} :</dt>
              <dd>{p.value || "—"}</dd>
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
        <div className="my-2">
          <p>
            <strong>{block.label}</strong> : {block.value} / {block.max}
            {block.band ? ` — ${block.band}` : ""}
          </p>
          {block.guidance ? <p className="text-sm">{block.guidance}</p> : null}
        </div>
      );
    case "list":
      return block.ordered ? (
        <ol className="my-2 ml-5 list-decimal">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      ) : (
        <ul className="my-2 ml-5 list-disc">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "table":
      if (block.rows.length === 0) {
        return <p className="my-2 italic">(aucune entrée)</p>;
      }
      return (
        <table className="my-2">
          <thead>
            <tr>
              {block.columns.map((c, i) => (
                <th key={i}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci}>{cell || "—"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
  }
}

/** Rendu HTML du NeutralDocument pour l'impression / export PDF. */
export function PrintableDocument({ doc }: { doc: NeutralDocument }) {
  return (
    <article className="print-document font-sans">
      <h1 className="text-2xl font-black uppercase">{doc.toolTitle}</h1>
      <p className="text-sm italic">Exporté le {formatDateFr(doc.generatedAt)}</p>
      <blockquote className="my-3 border-l-4 border-black pl-3 text-sm">
        {doc.disclaimer}
      </blockquote>
      {doc.sections.map((section, i) => (
        <section key={i} className="mt-4">
          <h2 className="text-lg font-black uppercase">{section.heading}</h2>
          {section.blocks.map((block, j) => (
            <Block key={j} block={block} />
          ))}
        </section>
      ))}
    </article>
  );
}
