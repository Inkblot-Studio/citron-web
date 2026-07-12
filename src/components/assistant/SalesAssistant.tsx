'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import { ASSISTANT_GREETING, type AssistantSuggestion } from '@/lib/assistant';
import { Mascot } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  suggestions?: AssistantSuggestion[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function SalesAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: ASSISTANT_GREETING.reply, suggestions: ASSISTANT_GREETING.suggestions },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setInput('');
    setBusy(true);
    const next: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(next);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map(({ role, content: c }) => ({ role, content: c })),
        }),
      });
      const data = (await res.json()) as { reply?: string; suggestions?: AssistantSuggestion[] };
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply ?? 'Sorry — I hit a snag. Try again, or book a demo and we’ll answer everything live.',
          suggestions: data.suggestions,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry — I hit a snag. Try again, or book a demo and we’ll answer everything live.',
          suggestions: [{ label: 'Book a demo', href: '/demo' }],
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  const lastSuggestions = messages[messages.length - 1]?.suggestions;

  return (
    <>
      {/* launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close Citron assistant' : 'Chat with the Citron assistant'}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--cine-ink)] text-[#fbfaf7] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_32px_-10px_rgba(29,28,25,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <MessageCircle className="h-5 w-5" strokeWidth={1.75} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-[5.5rem] right-5 z-[60] flex max-h-[calc(100dvh-8rem)] w-[calc(100vw-2.5rem)] max-w-[24rem] flex-col overflow-hidden rounded-[1.5rem] border border-[var(--cine-card-border)] bg-white shadow-[0_1px_2px_rgba(29,28,25,0.05),0_32px_72px_-24px_rgba(29,28,25,0.35)]"
            role="dialog"
            aria-label="Citron sales assistant"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-[var(--cine-line)] bg-[rgba(var(--cine-particle),0.06)] px-4 py-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--cine-ink)] text-[var(--cine-amber-soft)]">
                <Mascot className="h-5 w-5" animate={false} />
              </span>
              <div className="min-w-0">
                <p className="text-[0.875rem] font-semibold text-cine">Citron Assistant</p>
                <p className="text-[0.72rem] text-cine-faint">Plans, pricing & product questions</p>
              </div>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    'max-w-[85%] rounded-[var(--radius-lg)] px-3.5 py-2.5 text-[0.85rem] leading-relaxed',
                    m.role === 'user'
                      ? 'ml-auto bg-[var(--cine-ink)] text-[#fbfaf7]'
                      : 'bg-[rgba(29,28,25,0.05)] text-cine'
                  )}
                >
                  {m.content}
                </div>
              ))}
              {busy && (
                <div className="flex w-fit items-center gap-1.5 rounded-[var(--radius-lg)] bg-[rgba(var(--cine-particle),0.08)] px-3.5 py-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--cine-amber)]"
                      style={{ animationDelay: `${d * 150}ms` }}
                    />
                  ))}
                </div>
              )}

              {/* quick replies */}
              {!busy && lastSuggestions && lastSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {lastSuggestions.map((s) =>
                    s.href ? (
                      s.href.startsWith('http') ? (
                        <a
                          key={s.label}
                          href={s.href}
                          className="rounded-full border border-[var(--cine-line)] px-3 py-1.5 text-[0.75rem] font-medium text-[var(--cine-amber)] transition hover:border-[var(--cine-amber-bright)] hover:bg-[rgba(var(--cine-particle),0.06)]"
                        >
                          {s.label} ↗
                        </a>
                      ) : (
                        <Link
                          key={s.label}
                          href={s.href}
                          onClick={() => setOpen(false)}
                          className="rounded-full border border-[var(--cine-line)] px-3 py-1.5 text-[0.75rem] font-medium text-[var(--cine-amber)] transition hover:border-[var(--cine-amber-bright)] hover:bg-[rgba(var(--cine-particle),0.06)]"
                        >
                          {s.label} ↗
                        </Link>
                      )
                    ) : (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => send(s.label)}
                        className="rounded-full border border-[var(--cine-line)] px-3 py-1.5 text-[0.75rem] font-medium text-cine-dim transition hover:border-[var(--cine-amber-bright)] hover:text-[var(--cine-amber)]"
                      >
                        {s.label}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-[var(--cine-line)] p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about plans, pricing, credits…"
                aria-label="Message the Citron assistant"
                className="h-10 flex-1 rounded-[var(--radius-lg)] border border-[var(--cine-line)] bg-transparent px-3 text-[0.85rem] text-cine placeholder:text-cine-faint focus:border-[var(--cine-amber-bright)] focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--cine-ink)] text-[#fbfaf7] transition-transform duration-300 hover:scale-105 disabled:opacity-40"
              >
                <Send className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
