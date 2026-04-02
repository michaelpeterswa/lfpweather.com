import { cn } from "@/lib/utils";

export default function Container({
  isAlert,
  children,
}: {
  isAlert?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 shadow-sm",
        isAlert && "border-destructive bg-red-50 dark:bg-red-950"
      )}
    >
      {children}
    </div>
  );
}
