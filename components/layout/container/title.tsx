import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Title({ title }: { title: string }) {
  const linkName = stripNonAlphanumeric(title.replace(" ", "-")).toLowerCase();
  return (
    <>
      <div
        className="flex justify-center items-baseline gap-2 w-full mb-4"
        id={linkName}
      >
        <h1 className="text-3xl lg:text-4xl">{title}</h1>
        <Link href={`#${linkName}`} scroll={false}>
          <LinkIcon className="h-3 w-3 text-gray-600" />
        </Link>
      </div>
    </>
  );
}

function stripNonAlphanumeric(input: string): string {
  return input.replace(/[^a-zA-Z0-9-]/g, "");
}
