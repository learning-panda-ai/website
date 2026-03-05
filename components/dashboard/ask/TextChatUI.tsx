"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
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
  onNewSession?: () => void;
}

const QUICK_PROMPTS: Record<string, string[]> = {
  Mathematics:        ["Explain quadratic equations", "Help me solve a word problem", "What is differentiation?", "Quiz me on algebra"],
  Physics:            ["Explain Newton's laws of motion", "Help me with a numerical", "What is Ohm's law?", "Quiz me on optics"],
  Chemistry:          ["Explain the periodic table", "How does titration work?", "What are covalent bonds?", "Quiz me on reactions"],
  Biology:            ["Explain cell division", "How does photosynthesis work?", "What is DNA replication?", "Quiz me on the human body"],
  "Computer Science": ["Explain recursion with an example", "What is Big O notation?", "Help me debug my code", "Quiz me on data structures"],
  English:            ["Help me improve my essay", "Explain figures of speech", "What is a metaphor?", "Quiz me on grammar"],
};
const FALLBACK_PROMPTS = [
  "Explain a key concept",
  "Help me solve a problem",
  "Quiz me on this topic",
  "Give me study tips",
];

function getPrompts(subject: string) {
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

  // Only load session history on mount — chatInstanceKey in parent handles remounting
  // when the user explicitly switches sessions. We must NOT re-run this when
  // initialSessionId changes mid-conversation (e.g. after onSessionCreated fires).
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

  function fillPrompt(prompt: string) {
    setInput(prompt);
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

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userMsg },
      { from: "panda", text: "" },
    ]);
    setIsStreaming(true);

    if (!sessionIdRef.current) {
      try {
        const res = await fetch("/api/chat/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject,
            class_name: className,
            title: userMsg.slice(0, 80),
          }),
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
              { role: "user", content: userMsg },
              { role: "assistant", content: assistantText },
            ],
          }),
        }).catch(() => {});
      }
    }
  }

  return (
    <div className="flex flex-col h-[600px]">

      {/* ── Message area ─────────────────────────────────────────────── */}
      <div className="relative flex-1 min-h-0">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

        <div className="h-full overflow-y-auto px-1 py-4 space-y-4 scroll-smooth">
          {isLoadingHistory ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div className="h-12 w-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center animate-pulse text-2xl">
                🐼
              </div>
              <p className="text-sm text-gray-400 font-medium">Loading conversation…</p>
            </div>
          ) : isWelcome ? (
            /* ── Welcome screen ── */
            <div className="flex flex-col items-center justify-center h-full gap-6 px-4 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-green-100 to-emerald-50 border-2 border-green-200 flex items-center justify-center text-4xl shadow-sm">
                  🐼
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-800" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Hi! I&apos;m Panda, your AI tutor
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Ready to explore <span className="font-bold text-green-600">{subject}</span>
                    {className ? <> · Class <span className="font-bold">{className}</span></> : null}
                  </p>
                </div>
              </div>

              {/* Quick prompt chips */}
              <div className="w-full max-w-sm">
                <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide flex items-center gap-1 justify-center">
                  <Sparkles className="h-3 w-3" /> Try asking
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {getPrompts(subject).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => fillPrompt(prompt)}
                      className="text-left text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-200 rounded-xl px-3 py-2.5 transition-all leading-snug"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ── Chat messages ── */
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2.5 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Panda avatar — only for first or after a user message */}
                {msg.from === "panda" && (
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-green-100 to-emerald-50 border-2 border-green-200 flex items-center justify-center text-sm flex-shrink-0 self-end shadow-sm">
                    🐼
                  </div>
                )}

                <div
                  className={`max-w-[74%] rounded-2xl text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-sm px-4 py-3 shadow-md shadow-blue-100 whitespace-pre-wrap"
                      : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm px-4 py-3 shadow-sm"
                  }`}
                >
                  {msg.from === "user" ? (
                    msg.text
                  ) : msg.text ? (
                    <ReactMarkdown
                      components={{
                        p:          ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                        strong:     ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                        em:         ({ children }) => <em className="italic text-gray-600">{children}</em>,
                        ul:         ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-1">{children}</ul>,
                        ol:         ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-1">{children}</ol>,
                        li:         ({ children }) => <li className="leading-snug">{children}</li>,
                        code:       ({ children, className: cc }) =>
                          cc ? (
                            <pre className="bg-gray-50 border border-gray-200 rounded-xl p-3 my-2 overflow-x-auto text-xs font-mono">
                              <code>{children}</code>
                            </pre>
                          ) : (
                            <code className="bg-green-50 text-green-700 rounded px-1.5 py-0.5 text-xs font-mono">{children}</code>
                          ),
                        h1:         ({ children }) => <h1 className="font-extrabold text-base mb-1.5 text-gray-900">{children}</h1>,
                        h2:         ({ children }) => <h2 className="font-bold text-sm mb-1 text-gray-900">{children}</h2>,
                        h3:         ({ children }) => <h3 className="font-semibold mb-0.5 text-gray-800">{children}</h3>,
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-green-300 bg-green-50 pl-3 pr-2 py-1.5 my-2 rounded-r-lg text-gray-600 italic">
                            {children}
                          </blockquote>
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : isStreaming && i === messages.length - 1 ? (
                    /* Typing indicator */
                    <span className="flex gap-1 items-center py-0.5">
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "160ms" }} />
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "320ms" }} />
                    </span>
                  ) : null}
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      {/* ── Input bar ────────────────────────────────────────────────── */}
      <div className="pt-3">
        <div className="flex items-center gap-2 bg-gray-50 border-2 border-gray-200 rounded-2xl px-3 py-2 focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-blue-50 transition-all duration-200">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={isStreaming ? "Panda is thinking…" : "Ask Panda anything…"}
            disabled={isStreaming || isLoadingHistory}
            className="flex-1 px-2 py-1.5 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400 disabled:opacity-50 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming || isLoadingHistory}
            className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150
              bg-blue-600 hover:bg-blue-700 active:scale-95
              disabled:bg-gray-200 disabled:text-gray-400
              text-white shadow-sm hover:shadow-md disabled:shadow-none"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-300 mt-1.5">
          Panda can make mistakes — always verify important answers
        </p>
      </div>
    </div>
  );
}
