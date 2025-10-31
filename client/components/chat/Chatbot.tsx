import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const FAQ: Record<string, string> = {
  "how to book":
    "Go to Dashboard → Public tab → Search a lawyer → Book appointment. You'll get a calendar link and confirmation.",
  "mock test":
    "Open Dashboard → Student tab → Mock Tests. Select a category and start. Results are instant with explanations.",
  "lawyer earnings":
    "Open Dashboard → Lawyer tab → Earnings section. Charts show daily and monthly revenue with filters.",
  news: "Every tab includes a Law News panel that fetches the latest headlines.",
  "sign in":
    "Use the avatar in the header to sign in or sign up with Clerk. Sessions persist automatically.",
};

function findAnswer(q: string) {
  const s = q.toLowerCase();
  for (const [k, v] of Object.entries(FAQ)) if (s.includes(k)) return v;
  if (/\b(law|section|ipc|contract|rights|bail|divorce|property)\b/.test(s)) {
    return "I can share general information, not legal advice. Try searching our Articles in the Public tab or consult a verified lawyer via the Public tab → Book appointment.";
  }
  return "I can help with navigation and general law info. Try asking: 'How to book', 'Mock test', 'Lawyer earnings', or 'News'.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      content:
        "Hi! I’m your Legal Hub assistant. Ask me about features or general law info.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  function send() {
    const text = input.trim();
    if (!text) return;
    const user: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    const answer = findAnswer(text);
    const bot: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: answer,
    };
    setMessages((m) => [...m, user, bot]);
    setInput("");
    requestAnimationFrame(() =>
      listRef.current?.scrollTo({ top: 999999, behavior: "smooth" }),
    );
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 z-50 w-[90vw] max-w-sm rounded-xl border bg-background shadow-xl"
          >
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span className="font-semibold">Legal Hub Assistant</span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-72" ref={listRef as any}>
              <div className="p-3 space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <form
              className="p-3 flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <Input
                placeholder="Ask about Legal Hub…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label="Open chat"
        className="fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-5 w-5" />
      </motion.button>
    </>
  );
}
