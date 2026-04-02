import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Title({ title }: { title: string }) {
  const linkName = stripNonAlphanumeric(title.replace(" ", "-")).toLowerCase();
  return (
    <div
      className="flex items-baseline gap-2 mb-4 border-l-2 border-accent pl-3"
      id={linkName}
    >
      <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{title}</h1>
      <Link href={`#${linkName}`} scroll={false}>
        <LinkIcon className="h-3 w-3 text-muted-foreground hover:text-accent transition-colors" />
      </Link>
    </div>
  );
}

function stripNonAlphanumeric(input: string): string {
  return input.replace(/[^a-zA-Z0-9-]/g, "");
}
