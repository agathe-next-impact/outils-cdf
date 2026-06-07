interface ProgressBarProps {
  value: number;
  max: number;
  variant?: "progress" | "result";
  label?: string;
  showCount?: boolean;
}

export function ProgressBar({
  value,
  max,
  variant = "progress",
  label,
  showCount = true,
}: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const isResult = variant === "result";

  return (
    <div>
      {label || showCount ? (
        <div className="mb-1 flex items-center justify-between text-xs font-medium text-muted">
          <span>{label}</span>
          {showCount ? (
            <span>
              {value}/{max}
            </span>
          ) : null}
        </div>
      ) : null}
      <div
        className={`w-full overflow-hidden rounded-full bg-border ${isResult ? "h-4" : "h-2.5"}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full rounded-full transition-all ease-out ${isResult ? "bg-info duration-1000" : "bg-success duration-700"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
