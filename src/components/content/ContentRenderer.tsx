import GameIcon from "@/components/GameIcon";
import type { ContentBlock } from "@/engines/content";

function BlockView({
  block,
  hideCallouts,
  hideAttentionCallouts,
}: {
  block: ContentBlock;
  hideCallouts: boolean;
  hideAttentionCallouts: boolean;
}) {
  switch (block.kind) {
    case "paragraph":
      return <p className="my-2 text-base">{block.text}</p>;
    case "list":
      return block.ordered ? (
        <ol className="my-2 ml-5 list-decimal space-y-1 text-base">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      ) : (
        <ul className="my-2 ml-5 list-disc space-y-1 text-base">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "callout": {
      const attention = block.tone === "attention";
      if (hideCallouts || (attention && hideAttentionCallouts)) return null;

      return (
        <div
          className={`my-3 flex items-start gap-3 border p-3 text-sm ${attention ? "border-danger" : "border-border"}`}
          role="note"
        >
          <GameIcon
            name={block.iconName ?? (attention ? "alert-triangle" : "info")}
            size={20}
            className={`mt-0.5 shrink-0 ${attention ? "text-danger" : "text-accent"}`}
          />
          <p>{block.text}</p>
        </div>
      );
    }
    case "example":
      return (
        <div className="my-3 space-y-2 text-sm">
          {block.good ? (
            <div className="flex items-start gap-2 border border-border p-2">
              <GameIcon name="check" size={18} className="mt-0.5 shrink-0 text-accent" />
              <p>{block.good}</p>
            </div>
          ) : null}
          {block.avoid ? (
            <div className="flex items-start gap-2 border border-danger p-2">
              <GameIcon name="x" size={18} className="mt-0.5 shrink-0 text-danger" />
              <p>{block.avoid}</p>
            </div>
          ) : null}
          {block.note ? <p className="text-muted">{block.note}</p> : null}
        </div>
      );
    case "definition":
      return (
        <p className="my-2 text-base">
          <strong className="font-bold">{block.term}</strong> : {block.def}
        </p>
      );
    case "quote":
      return (
        <blockquote className="my-3 border-l-4 border-accent pl-3 text-base italic">
          {block.text}
          {block.source ? (
            <footer className="mt-1 text-xs not-italic text-muted">— {block.source}</footer>
          ) : null}
        </blockquote>
      );
  }
}

export function ContentRenderer({
  blocks,
  className,
  hideCallouts = true,
  hideAttentionCallouts = true,
}: {
  blocks: ContentBlock[];
  className?: string;
  hideCallouts?: boolean;
  hideAttentionCallouts?: boolean;
}) {
  return (
    <div className={className}>
      {blocks.map((b, i) => (
        <BlockView
          key={i}
          block={b}
          hideCallouts={hideCallouts}
          hideAttentionCallouts={hideAttentionCallouts}
        />
      ))}
    </div>
  );
}
