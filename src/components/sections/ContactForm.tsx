'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const topics = ['Sales', 'Support', 'Partnership', 'Press', 'Other'];

const fieldClass =
  'w-full rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-card)] px-3.5 py-2.5 text-[0.9375rem] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-200 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30';
const labelClass = 'mb-1.5 block text-[0.8125rem] font-medium text-[var(--text-secondary)]';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState('Sales');
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Simulated submission — wire to your endpoint of choice.
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 700);
  }

  return (
    <div className="relative rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-md)] sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]">
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </span>
            <h3 className="mt-6 text-[1.5rem] font-semibold text-[var(--text-primary)]">Message sent</h3>
            <p className="mt-2 max-w-sm text-[0.9375rem] text-[var(--text-secondary)]">
              Thanks for reaching out. A member of our team will get back to you
              within one business day.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 text-[0.875rem] font-medium text-[var(--accent-hover)] hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={labelClass}>First name</label>
                <input id="firstName" name="firstName" required autoComplete="given-name" className={fieldClass} placeholder="Jane" />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>Last name</label>
                <input id="lastName" name="lastName" required autoComplete="family-name" className={fieldClass} placeholder="Doe" />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className={labelClass}>Work email</label>
                <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="jane@company.com" />
              </div>
              <div>
                <label htmlFor="company" className={labelClass}>Company</label>
                <input id="company" name="company" autoComplete="organization" className={fieldClass} placeholder="Acme Inc." />
              </div>
            </div>

            <div>
              <span className={labelClass}>What can we help with?</span>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={
                      topic === t
                        ? 'rounded-full border border-[var(--accent)] bg-[var(--accent)]/12 px-3.5 py-1.5 text-[0.8125rem] font-medium text-[var(--accent-hover)]'
                        : 'rounded-full border border-[var(--border-default)] px-3.5 py-1.5 text-[0.8125rem] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)]'
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>Message</label>
              <textarea id="message" name="message" required rows={4} className={`${fieldClass} resize-none`} placeholder="Tell us a little about what you’re looking for…" />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--accent)] text-[0.9375rem] font-medium text-[#1d1c19] shadow-[0_2px_16px_-4px_rgba(196,160,48,0.5)] transition-all duration-200 hover:bg-[var(--accent-hover)] disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Send message'}
              {!submitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
            <p className="text-center text-[0.75rem] text-[var(--text-muted)]">
              By submitting, you agree to our{' '}
              <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-[var(--text-secondary)]">
                Privacy Policy
              </Link>
              .
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
