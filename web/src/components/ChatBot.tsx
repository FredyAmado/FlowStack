"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = { from: "bot" | "user"; text: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "¡Hola! Soy el asistente de FlowStack. ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function handleSend() {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    setSending(true);

    try {
      const chatRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat({ from: "user", text }).map((m) => ({
            role: m.from === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      if (!chatRes.ok) throw new Error();

      const { reply } = await chatRes.json();
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Chatbot", email: "chat@stacktecnologicodeautomatizacion.com", message: text, source: "chatbot" }),
      }).catch(() => {});
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Disculpa, tuve un problema. ¿Podrías repetirlo?" },
      ]);
    }
    setSending(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 sm:w-96 rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-black/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between bg-orange px-4 py-3">
            <div className="flex items-center gap-2">
              <img src="/images/flowstack-logo.svg" alt="FlowStack" className="h-7" />
              <span className="text-sm font-semibold text-white">FlowStack</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-72 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-orange text-white rounded-br-md"
                      : "bg-zinc-100 text-zinc-700 rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-zinc-100 px-4 py-2.5 text-sm text-zinc-500">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-zinc-100 px-4 py-3 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-black placeholder-zinc-400 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
            />
            <button
              onClick={handleSend}
              disabled={sending || !input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange text-white hover:bg-orange-light disabled:opacity-50 transition-colors shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-orange text-white shadow-2xl shadow-orange/40 hover:bg-orange-light hover:scale-105 transition-all duration-300 animate-bounce-subtle"
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      )}
    </div>
  );
}
