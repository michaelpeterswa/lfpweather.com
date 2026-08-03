import { cn } from "@/lib/utils";
import { FIRE_TEXT } from "./fire-levels";

// FireStat is a labeled stat tile in the current-conditions house style. The
// optional level colors the hint line with the fire scale.
export default function FireStat({
  label,
  value,
  unit,
  hint,
  level,
}: {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
  level?: number;
}) {
  return (
    <div className="rounded-lg border bg-secondary/50 p-3">
      <p className="text-xs text-muted-foreground truncate">{label}</p>
      <p className="font-mono-data text-xl font-bold tracking-tight mt-0.5">
        {value}
        {unit && (
          <span className="text-sm font-normal text-muted-foreground ml-1">
            {unit}
          </span>
        )}
      </p>
      {hint && (
        <p
          className={cn(
            "text-[10px] mt-0.5 truncate",
            level !== undefined ? FIRE_TEXT[level] : "text-muted-foreground"
          )}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
