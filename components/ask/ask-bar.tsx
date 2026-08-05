"use client";

import * as React from "react";
import { Sparkles, ArrowUp, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { AnswerMarkdown } from "@/components/ask/answer-markdown";

type Role = "user" | "assistant";
interface Msg {
  role: Role;
  text: string;
}

const SUGGESTIONS = [
  "What's the temperature right now?",
  "Record high this year?",
  "Which birds were detected today?",
  "How much rain in the last 24 hours?",
];

function humanTool(tool: string): string {
  return tool.replace(/_/g, " ");
}

export default function AskBar() {
  const sessionId = React.useRef<string>("");
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [navDraft, setNavDraft] = React.useState("");
  const [draft, setDraft] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const appendToAssistant = React.useCallback((chunk: string) => {
    setMessages((prev) => {
      const next = prev.slice();
      for (let i = next.length - 1; i >= 0; i--) {
        if (next[i].role === "assistant") {
          next[i] = { ...next[i], text: next[i].text + chunk };
          break;
        }
      }
      return next;
    });
  }, []);

  const handleFrame = React.useCallback(
    (frame: string) => {
      const line = frame.split("\n").find((l) => l.startsWith("data:"));
      if (!line) return;
      let ev: { type?: string; text?: string; tool?: string; status?: string };
      try {
        ev = JSON.parse(line.slice(5).trim());
      } catch {
        return;
      }
      if (ev.type === "token" && ev.text) {
        setStatus("");
        appendToAssistant(ev.text);
      } else if (ev.type === "tool" && ev.status === "start" && ev.tool) {
        setStatus(`looking up ${humanTool(ev.tool)}…`);
      } else if (ev.type === "error") {
        setStatus("");
        appendToAssistant(ev.text ? `\n\n_${ev.text}_` : "\n\n_Something went wrong._");
      }
    },
    [appendToAssistant]
  );

  const send = React.useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || streaming) return;
      if (!sessionId.current) sessionId.current = crypto.randomUUID();

      setOpen(true);
      setMessages((prev) => [...prev, { role: "user", text }, { role: "assistant", text: "" }]);
      setStreaming(true);
      setStatus("thinking…");

      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ session_id: sessionId.current, message: text }),
        });
        if (!res.ok || !res.body) {
          appendToAssistant(
            res.status === 503
              ? "The assistant is not configured yet."
              : "The assistant is unavailable right now."
          );
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let idx: number;
          while ((idx = buffer.indexOf("\n\n")) !== -1) {
            handleFrame(buffer.slice(0, idx));
            buffer = buffer.slice(idx + 2);
          }
        }
      } catch {
        appendToAssistant("\n\n_The connection was interrupted._");
      } finally {
        setStreaming(false);
        setStatus("");
      }
    },
    [streaming, appendToAssistant, handleFrame]
  );

  return (
    <div className="flex flex-1 justify-center px-2 sm:px-4">
      {/* Desktop: inline ask input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const t = navDraft;
          setNavDraft("");
          void send(t);
        }}
        className="hidden w-full max-w-md items-center sm:flex"
      >
        <div className="relative w-full">
          <Sparkles className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={navDraft}
            onChange={(e) => setNavDraft(e.target.value)}
            placeholder="Ask about the weather…"
            aria-label="Ask about the weather"
            className="pl-8 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </form>

      {/* Mobile: icon trigger */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="sm:hidden"
        onClick={() => setOpen(true)}
        aria-label="Ask about the weather"
      >
        <Sparkles className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[70vh] max-h-[600px] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
          <DialogHeader className="border-b px-4 py-3 text-left">
            <DialogTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-accent" />
              ask lfpweather
            </DialogTitle>
            <DialogDescription className="sr-only">
              Ask questions about the Lake Forest Park weather station.
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 flex-1">
            {messages.length === 0 ? (
              <Empty className="h-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Sparkles />
                  </EmptyMedia>
                  <EmptyTitle>Ask lfpweather</EmptyTitle>
                  <EmptyDescription>
                    Live conditions, history, records, air quality, or birds — just ask.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTIONS.map((s) => (
                      <Button
                        key={s}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => void send(s)}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </EmptyContent>
              </Empty>
            ) : (
              <MessageScrollerProvider autoScroll>
                <MessageScroller className="h-full">
                  <MessageScrollerViewport>
                    <MessageScrollerContent
                      aria-busy={streaming}
                      className="gap-3 px-4 py-4"
                    >
                      {messages.map((m, i) => (
                        <MessageScrollerItem
                          key={i}
                          messageId={String(i)}
                          scrollAnchor={m.role === "user"}
                        >
                          <Bubble msg={m} />
                        </MessageScrollerItem>
                      ))}
                      {status && (
                        <MessageScrollerItem messageId="status">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            {status}
                          </div>
                        </MessageScrollerItem>
                      )}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton className="left-1/2" />
                </MessageScroller>
              </MessageScrollerProvider>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const t = draft;
              setDraft("");
              void send(t);
            }}
            className="border-t p-3"
          >
            <InputGroup className="has-[[data-slot=input-group-control]:focus-visible]:border-input has-[[data-slot=input-group-control]:focus-visible]:ring-0">
              <InputGroupInput
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask a follow-up…"
                aria-label="Ask a follow-up"
                disabled={streaming}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="submit"
                  variant="default"
                  size="icon-sm"
                  disabled={streaming || !draft.trim()}
                  aria-label="Send"
                >
                  {streaming ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <ArrowUp />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-3 py-2 text-sm",
          isUser
            ? "whitespace-pre-wrap bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {isUser ? (
          msg.text
        ) : msg.text ? (
          <AnswerMarkdown text={msg.text} />
        ) : (
          "…"
        )}
      </div>
    </div>
  );
}
