import GameIcon from "@/components/GameIcon";
import { getDisclaimer } from "@/content/disclaimers";

interface DisclaimerBannerProps {
  disclaimerKey: string;
  variant?: "short" | "long";
  className?: string;
}

export function DisclaimerBanner({
  disclaimerKey,
  variant = "short",
  className,
}: DisclaimerBannerProps) {
  const d = getDisclaimer(disclaimerKey);
  const text = variant === "long" ? d.long : d.short;
  return (
    <div
      className={`flex items-start gap-3 border border-border p-3 text-sm ${className ?? ""}`}
      role="note"
    >
      <GameIcon name="info" size={20} className="mt-0.5 shrink-0 text-blue" />
      <p>{text}</p>
    </div>
  );
}
