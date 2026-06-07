/**
 * Cadre commun des graphiques : un <figure> titré avec légende, une note
 * optionnelle, et une table de données VISUELLEMENT CACHÉE (sr-only) pour
 * l'accessibilité (l'information n'est jamais portée par la seule couleur).
 */
import type { ReactNode } from "react";

export function ChartFigure({
  title,
  description,
  note,
  children,
}: {
  title: string;
  description?: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <figure className="card">
      <figcaption>
        <h3 className="text-lg leading-tight">{title}</h3>
        {description ? <p className="mt-1 text-xs text-muted">{description}</p> : null}
      </figcaption>
      <div className="mt-3">{children}</div>
      {note ? <p className="mt-2 text-xs text-muted">{note}</p> : null}
    </figure>
  );
}

/** Équivalent textuel des données du graphique, lu par les lecteurs d'écran. */
export function SrDataTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c} scope="col">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((cell, j) =>
              j === 0 ? (
                <th key={j} scope="row">
                  {cell}
                </th>
              ) : (
                <td key={j}>{cell}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
