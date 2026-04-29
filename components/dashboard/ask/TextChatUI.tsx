"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Lightbulb, HelpCircle, Layers, Hash } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  from: "user" | "panda";
  text: string;
}

interface TextChatUIProps {
  subject: string;
  className: string;
  initialSessionId?: string;
  onSessionCreated?: (sessionId: string) => void;
  enrolledCourses?: string[];
}

type QuickPrompt = { icon: React.ElementType; label: string; text: string };

const QUICK_PROMPTS: Record<string, QuickPrompt[]> = {
  Mathematics: [
    { icon: Lightbulb, label: "Explain a concept",   text: "Explain quadratic equations" },
    { icon: HelpCircle, label: "Solve a problem",    text: "Help me solve a word problem" },
    { icon: Layers,    label: "Show steps",          text: "What is differentiation?" },
    { icon: Hash,      label: "Quiz me",             text: "Quiz me on algebra" },
  ],
  Physics: [
    { icon: Lightbulb, label: "Newton's Laws",       text: "Explain Newton's 3rd Law" },
    { icon: HelpCircle, label: "Practice Quiz",      text: "Quiz me on optics" },
    { icon: Layers,    label: "Solve a Diagram",     text: "Help me with a numerical" },
    { icon: Hash,      label: "Physics Formulas",    text: "What is Ohm's law?" },
  ],
  Chemistry: [
    { icon: Lightbulb, label: "Periodic Table",      text: "Explain the periodic table" },
    { icon: HelpCircle, label: "Practice Quiz",      text: "Quiz me on reactions" },
    { icon: Layers,    label: "Solve a Problem",     text: "How does titration work?" },
    { icon: Hash,      label: "Key Formulas",        text: "What are covalent bonds?" },
  ],
  Biology: [
    { icon: Lightbulb, label: "Cell Division",       text: "Explain cell division" },
    { icon: HelpCircle, label: "Practice Quiz",      text: "Quiz me on the human body" },
    { icon: Layers,    label: "Photosynthesis",      text: "How does photosynthesis work?" },
    { icon: Hash,      label: "DNA Replication",     text: "What is DNA replication?" },
  ],
  "Computer Science": [
    { icon: Lightbulb, label: "Explain Recursion",   text: "Explain recursion with an example" },
    { icon: HelpCircle, label: "Practice Quiz",      text: "Quiz me on data structures" },
    { icon: Layers,    label: "Big O Notation",      text: "What is Big O notation?" },
    { icon: Hash,      label: "Debug my code",       text: "Help me debug my code" },
  ],
  English: [
    { icon: Lightbulb, label: "Improve my Essay",    text: "Help me improve my essay" },
    { icon: HelpCircle, label: "Practice Quiz",      text: "Quiz me on grammar" },
    { icon: Layers,    label: "Figures of Speech",   text: "Explain figures of speech" },
    { icon: Hash,      label: "Metaphors",           text: "What is a metaphor?" },
  ],
};

const FALLBACK_PROMPTS: QuickPrompt[] = [
  { icon: Lightbulb, label: "Explain a concept",  text: "Explain a key concept" },
  { icon: HelpCircle, label: "Solve a problem",   text: "Help me solve a problem" },
  { icon: Layers,    label: "Run a Quiz",          text: "Quiz me on this topic" },
  { icon: Hash,      label: "Study Tips",          text: "Give me study tips" },
];

function getPrompts(subject: string): QuickPrompt[] {
  return QUICK_PROMPTS[subject] ?? FALLBACK_PROMPTS;
}

export default function TextChatUI({
  subject,
  className,
  initialSessionId,
  onSessionCreated,
}: TextChatUIProps) {
  const greeting = `Hi! I'm Panda 🐼 Let's explore **${subject}** together! Ask me anything or pick a prompt below.`;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "panda", text: greeting },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(!!initialSessionId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionIdRef = useRef<string | null>(initialSessionId ?? null);

  const isWelcome = messages.length === 1 && messages[0].from === "panda";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!initialSessionId) return;
    setIsLoadingHistory(true);
    fetch(`/api/chat/sessions/${initialSessionId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || !data.messages?.length) return;
        const loaded: ChatMessage[] = data.messages.map(
          (m: { role: string; content: string }) => ({
            from: m.role === "user" ? "user" : "panda",
            text: m.content,
          })
        );
        setMessages(loaded);
      })
      .catch(() => {})
      .finally(() => setIsLoadingHistory(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fillPrompt(text: string) {
    setInput(text);
    inputRef.current?.focus();
  }

  async function handleSend() {
    if (!input.trim() || isStreaming) return;
    const userMsg = input.trim();
    setInput("");

    const history = messages.map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text,
    }));

    setMessages((prev) => [...prev, { from: "user", text: userMsg }, { from: "panda", text: "" }]);
    setIsStreaming(true);

    if (!sessionIdRef.current) {
      try {
        const res = await fetch("/api/chat/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subject, class_name: className, title: userMsg.slice(0, 80) }),
        });
        if (res.ok) {
          const data = await res.json();
          sessionIdRef.current = data.id;
          onSessionCreated?.(data.id);
        }
      } catch { /* non-fatal */ }
    }

    let assistantText = "";

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, class_name: className, subject, history }),
      });

      if (res.status === 401) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { from: "panda", text: "Please sign in to continue." };
          return updated;
        });
        return;
      }
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      outer: while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "token") {
              assistantText += data.content;
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = { ...last, text: last.text + data.content };
                return updated;
              });
            } else if (data.type === "done" || data.type === "error") {
              if (data.type === "error") {
                assistantText = "";
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { from: "panda", text: "Sorry, something went wrong. Please try again." };
                  return updated;
                });
              }
              break outer;
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch {
      assistantText = "";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { from: "panda", text: "Couldn't connect to Panda. Please check your connection and try again." };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      if (sessionIdRef.current && assistantText) {
        fetch(`/api/chat/sessions/${sessionIdRef.current}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              { role: "user",      content: userMsg      },
              { role: "assistant", content: assistantText },
            ],
          }),
        }).catch(() => {});
      }
    }
  }

  return (
    <div className="relative h-full flex flex-col">
      {/* ── Message canvas ─────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 lg:px-8 py-6 space-y-6 scroll-smooth">
        {isLoadingHistory ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="h-14 w-14 rounded-full bg-[#C8E6C9] flex items-center justify-center animate-pulse text-2xl">
              🐼
            </div>
            <p className="text-sm text-[#44483D] font-medium">Loading conversation…</p>
          </div>
        ) : isWelcome ? (
          /* ── Welcome state ── */
          <div className="flex flex-col items-center justify-center min-h-full gap-6 px-4 text-center py-8">
            {/* Panda avatar with pulse */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#C8E6C9] flex items-center justify-center text-5xl shadow-sm">
                🐼
              </div>
              <div className="absolute bottom-0.5 right-0.5 w-6 h-6 bg-[#43A047] rounded-full border-4 border-[#FDFBF7] flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            <div>
              <h1
                className="text-3xl font-bold text-[#1B1C17] mb-2"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Namaste, I&apos;m Panda!
              </h1>
              <p className="text-[#44483D] text-base">
                Ready to tackle{" "}
                <span className="font-bold text-[#43A047]">{subject}</span>
                {className ? <> · Class <span className="font-bold">{className}</span></> : null}
                ? Ask me anything or pick a prompt.
              </p>
            </div>

            {/* Quick action chips */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              {getPrompts(subject).map(({ icon: Icon, label, text }) => (
                <button
                  key={label}
                  onClick={() => fillPrompt(text)}
                  className="flex items-start gap-3 bg-white hover:bg-[#C8E6C9]/30 border border-[#E8E4D9] hover:border-[#43A047]/20 p-4 rounded-2xl text-left transition-all group"
                >
                  <Icon className="h-5 w-5 text-[#43A047] flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#1B1C17] leading-snug">{label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── Chat messages ── */
          <>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col gap-2 ${msg.from === "user" ? "items-end" : "items-start"}`}
              >
                {/* Bubble */}
                <div
                  className={`text-sm leading-relaxed px-5 py-4 rounded-2xl ${
                    msg.from === "user"
                      ? "max-w-[65%] bg-[#43A047] text-white shadow-sm"
                      : "max-w-[88%] bg-white border border-[#E8E4D9] text-[#1B1C17] shadow-sm"
                  }`}
                >
                  {msg.from === "user" ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : msg.text ? (
                    <ReactMarkdown
                      components={{
                        p:          ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                        strong:     ({ children }) => <strong className="font-bold text-[#1B5E20]">{children}</strong>,
                        em:         ({ children }) => <em className="italic text-[#44483D]">{children}</em>,
                        ul:         ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-1">{children}</ul>,
                        ol:         ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-1">{children}</ol>,
                        li:         ({ children }) => <li className="leading-snug">{children}</li>,
                        code:       ({ children, className: cc }) =>
                          cc ? (
                            <pre className="bg-[#F0EDE4] border-l-4 border-[#43A047] rounded-r-xl pl-4 pr-3 py-3 my-2 overflow-x-auto text-xs font-mono">
                              <code>{children}</code>
                            </pre>
                          ) : (
                            <code className="bg-[#C8E6C9]/60 text-[#1B5E20] rounded px-1.5 py-0.5 text-xs font-mono">{children}</code>
                          ),
                        h1:         ({ children }) => <h1 className="font-bold text-base mb-1.5 text-[#1B5E20]" style={{ fontFamily: "var(--font-fredoka)" }}>{children}</h1>,
                        h2:         ({ children }) => <h2 className="font-bold text-sm mb-1 text-[#1B5E20]" style={{ fontFamily: "var(--font-fredoka)" }}>{children}</h2>,
                        h3:         ({ children }) => <h3 className="font-semibold mb-0.5 text-[#1B1C17]">{children}</h3>,
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-[#43A047] bg-[#C8E6C9]/20 pl-3 pr-2 py-2 my-2 rounded-r-xl text-[#44483D] italic">
                            {children}
                          </blockquote>
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : isStreaming && i === messages.length - 1 ? (
                    /* Typing indicator */
                    <span className="flex gap-1.5 items-center py-0.5">
                      <span className="h-2 w-2 rounded-full bg-[#43A047] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-[#43A047] animate-bounce" style={{ animationDelay: "160ms" }} />
                      <span className="h-2 w-2 rounded-full bg-[#43A047] animate-bounce" style={{ animationDelay: "320ms" }} />
                    </span>
                  ) : null}
                </div>

                {/* Avatar + label — below the bubble */}
                <div className={`flex items-center gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base border-2 border-white shadow-sm ${
                      msg.from === "panda" ? "bg-[#C8E6C9]" : "bg-[#43A047]"
                    }`}
                  >
                    {msg.from === "panda" ? "🐼" : "👤"}
                  </div>
                  <span className="text-[11px] font-semibold text-[#75796C]">
                    {msg.from === "panda" ? "Panda" : "You"}
                  </span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* ── Input bar ──────────────────────────────────────────── */}
      <div className="shrink-0 px-5 lg:px-8 py-4 border-t border-[#E8E4D9] bg-white">
        <div className="max-w-3xl mx-auto bg-white border border-[#E8E4D9] rounded-2xl p-1.5 flex items-center gap-2 focus-within:border-[#43A047]/40 focus-within:shadow-sm transition-all">
          {/* Subject chip */}
          <span className="shrink-0 bg-[#C8E6C9] text-[#1B5E20] text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap ml-1">
            {subject || "No subject"}
          </span>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={isStreaming ? "Panda is thinking…" : "Type your question here…"}
            disabled={isStreaming || isLoadingHistory}
            className="flex-1 border-none focus:ring-0 bg-transparent text-sm text-[#1B1C17] placeholder:text-[#9E9E9E] font-medium outline-none disabled:opacity-50 px-2"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming || isLoadingHistory}
            className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-95 ${
              input.trim() && !isStreaming
                ? "bg-[#43A047] text-white shadow-sm hover:bg-[#388E3C]"
                : "bg-[#F0EDE4] text-[#BDBDBD]"
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-center text-[10px] text-[#9E9E9E] mt-2">
          Panda can make mistakes — always verify important answers
        </p>
      </div>
    </div>
  );
}
