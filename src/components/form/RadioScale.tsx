"use client";

import type { ScaleDef } from "@/engines/scored/types";

interface RadioScaleProps {
  /** Nom de groupe unique (ex. id de l'item) pour les radios natifs. */
  name: string;
  scale: ScaleDef;
  value: number | null;
  onChange: (value: number) => void;
  ariaLabel: string;
}

/**
 * Groupe de radios NATIFS (accessibles : navigation aux flèches, un seul arrêt
 * de tabulation), stylé en chips carrés conformes à la charte.
 */
export function RadioScale({ name, scale, value, onChange, ariaLabel }: RadioScaleProps) {
  return (
    <fieldset>
      <legend className="sr-only">{ariaLabel}</legend>
      <div className="flex flex-wrap gap-2">
        {scale.options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-2 border px-3 py-2 text-sm font-semibold transition-colors ${
                selected ? "border-blue bg-blue text-white" : "border-black hover:border-blue"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="h-4 w-4 accent-blue"
              />
              {opt.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
