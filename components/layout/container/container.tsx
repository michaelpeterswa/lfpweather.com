import { cn } from "@/lib/utils";

export default function Container({
  isAlert,
  children,
}: {
  isAlert?: boolean;
  children: React.ReactNode;
}) {
  const baseStyle = "container bg-base border rounded-lg shadow p-4 mb-4";
  const alertStyle = "border-red-500 bg-red-50 dark:bg-red-950";

  return (
    <div className={isAlert ? cn(baseStyle, alertStyle) : baseStyle}>
      {children}
    </div>
  );
}
