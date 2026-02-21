"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatMessage {
  from: "user" | "panda";
  text: string;
}

export default function TextChatUI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "panda", text: "Hi! I'm Panda 🐼 Ask me anything — I'm here to help you learn!" },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "panda", text: "Great question! Let me think about that for you... 🤔" },
      ]);
    }, 900);
  }

  return (
    <div className="flex flex-col h-[400px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2.5 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.from === "panda" && (
              <div className="h-8 w-8 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center text-sm flex-shrink-0">
                🐼
              </div>
            )}
            <div
              className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.from === "user"
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-gray-100 text-gray-700 rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border border-gray-200 rounded-2xl p-2 bg-gray-50 focus-within:border-blue-300 focus-within:bg-white transition-all">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask Panda anything…"
          className="flex-1 px-3 py-1.5 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="h-9 w-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white flex items-center justify-center transition-all flex-shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
