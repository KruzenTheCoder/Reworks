"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone, User } from "lucide-react";

type ChatMessage = {
  id: string;
  author: "user" | "agent";
  text: string;
  ts: number;
};

const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98, originX: 1, originY: 1 },
  visible: { opacity: 1, y: 0, scale: 1, originX: 1, originY: 1 },
  exit: { opacity: 0, y: 24, scale: 0.98, originX: 1, originY: 1 },
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Persist messages for the session
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("rw_chat_messages");
      if (cached) setMessages(JSON.parse(cached));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem("rw_chat_messages", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const placeholderGreeting = useMemo(
    () => ({
      id: crypto.randomUUID(),
      author: "agent" as const,
      text: "Hi there! A human agent will be with you shortly.",
      ts: Date.now(),
    }),
    []
  );

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([placeholderGreeting]);
    }
  }, [open]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      author: "user",
      text,
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate agent acknowledgement
    setTimeout(() => {
      const ack: ChatMessage = {
        id: crypto.randomUUID(),
        author: "agent",
        text: "Thanks! We’ve notified an agent. Sit tight — we’ll reply here.",
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, ack]);
    }, 600);
  };

  return (
    <motion.div layout className="fixed bottom-4 right-4 z-[60]">
      {/* Toggle button */}
      <motion.button
        aria-label={open ? "Close chat" : "Open chat"}
        className="shadow-lg rounded-full bg-primary-blue text-white p-3 flex items-center justify-center hover:bg-blue-600 focus:outline-none"
        whileTap={{ scale: 0.95 }}
        animate={{ scale: open ? 0.96 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
            layout
            className="mt-3 w-[320px] sm:w-[360px] rounded-xl border border-gray-200 bg-white shadow-2xl overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <User className="w-5 h-5 text-primary-blue" />
                  <span className="absolute -right-1 -bottom-1 w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Chat with us</p>
                  <p className="text-xs text-gray-500">Typically replies within minutes</p>
                </div>
              </div>
              <button
                aria-label="Close chat"
                className="p-1 text-gray-500 hover:text-gray-700"
                onClick={() => setOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <motion.div ref={listRef} layout className="max-h-[38vh] overflow-y-auto px-4 py-3 space-y-3">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${m.author === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <motion.div
                      layout
                      className={`rounded-2xl px-3 py-2 text-sm shadow-sm max-w-[80%] ${
                        m.author === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {m.text}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Quick actions */}
            <div className="px-4">
              <div className="flex items-center justify-between gap-3 pb-2">
                <a
                  href="/contact"
                  className="text-xs text-blue-600 hover:text-blue-700 underline"
                >
                  Contact page
                </a>
                <a
                  href="tel:"
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
                  title="Call us"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>
              </div>
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-gray-200 px-4 py-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Type a message to reach a person..."
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="inline-flex items-center gap-1 rounded-lg bg-primary-blue text-white px-3 py-2 text-sm hover:bg-blue-600"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
