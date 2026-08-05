"use client";

import * as React from "react";
import Markdown from "react-markdown";

import { cn } from "@/lib/utils";

/**
 * The beautification grammar for assistant answers.
 *
 * This whitelist IS the grammar: react-markdown parses CommonMark, and any
 * element outside this set is dropped while its text is kept (unwrapDisallowed).
 * The agent is prompted to stay inside the same subset.
 *
 *   **bold**      the headline number or answer
 *   *italic*      qualifiers, timestamps
 *   - item        bulleted list (breakdowns: low/high, per-pollutant)
 *   1. item       numbered list (sequences, rankings)
 *   `code`        exact field names or values
 *   blank line    paragraph break
 *   [text](url)   link (rare; opens in a new tab)
 *
 * Deliberately excluded — they look broken in a small chat bubble: headings,
 * tables, blockquotes, images, horizontal rules, and raw HTML.
 */
const ALLOWED = [
  "p",
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "code",
  "a",
  "br",
] as const;

const components = {
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p className={cn("mb-2 leading-relaxed last:mb-0", className)} {...props} />
  ),
  strong: ({ className, ...props }: React.ComponentProps<"strong">) => (
    <strong className={cn("font-semibold", className)} {...props} />
  ),
  em: ({ className, ...props }: React.ComponentProps<"em">) => (
    <em className={cn("italic", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul
      className={cn("mb-2 list-disc space-y-0.5 pl-4 last:mb-0", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol
      className={cn("mb-2 list-decimal space-y-0.5 pl-4 last:mb-0", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
  code: ({ className, ...props }: React.ComponentProps<"code">) => (
    <code
      className={cn(
        "rounded bg-background/60 px-1 py-0.5 font-mono text-[0.85em]",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a
      className={cn("underline underline-offset-2", className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
};

/** AnswerMarkdown renders one assistant answer within the beautification grammar. */
export function AnswerMarkdown({ text }: { text: string }) {
  return (
    <Markdown
      allowedElements={ALLOWED as unknown as string[]}
      unwrapDisallowed
      components={components}
    >
      {text}
    </Markdown>
  );
}
