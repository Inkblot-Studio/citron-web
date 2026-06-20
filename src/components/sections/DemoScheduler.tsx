'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock } from 'lucide-react';

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

const days = [
  { label: 'Mon', date: 'Jun 22' },
  { label: 'Tue', date: 'Jun 23' },
  { label: 'Wed', date: 'Jun 24' },
  { label: 'Thu', date: 'Jun 25' },
];
const times = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

/** Real Calendly inline embed when configured, with a graceful native fallback. */
export function DemoScheduler() {
  const calRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!CALENDLY_URL || !calRef.current) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      link.remove();
      script.remove();
    };
  }, []);

  if (CALENDLY_URL) {
    return (
      <div
        ref={calRef}
        className="calendly-inline-widget min-h-[680px] overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)]"
        data-url={CALENDLY_URL}
      />
    );
  }

  return <FallbackScheduler />;
}

function FallbackScheduler() {
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-md)] sm:p-8">
      <AnimatePresence mode="wait">
        {confirmed ? (
          <motion.div
            key="confirmed"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[440px] flex-col items-center justify-center text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]">
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </span>
            <h3 className="mt-6 text-[1.5rem] font-semibold text-[var(--text-primary)]">You’re booked</h3>
            <p className="mt-2 max-w-sm text-[0.9375rem] text-[var(--text-secondary)]">
              We’ve reserved <strong className="text-[var(--text-primary)]">{days[day].date} at {time}</strong>.
              A calendar invite and confirmation are on their way.
            </p>
            <button
              type="button"
              onClick={() => {
                setConfirmed(false);
                setTime(null);
              }}
              className="mt-6 text-[0.875rem] font-medium text-[var(--accent-hover)] hover:underline"
            >
              Pick a different time
            </button>
          </motion.div>
        ) : (
          <motion.div key="picker" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-2 text-[0.875rem] font-medium text-[var(--text-secondary)]">
              <Clock className="h-4 w-4 text-[var(--accent)]" />
              30-minute walkthrough · with a product specialist
            </div>

            <div className="mt-6">
              <span className="mb-2 block text-[0.8125rem] font-medium text-[var(--text-secondary)]">
                Select a day
              </span>
              <div className="grid grid-cols-4 gap-2">
                {days.map((d, i) => (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => setDay(i)}
                    className={
                      i === day
                        ? 'flex flex-col items-center rounded-[var(--radius-md)] border border-[var(--accent)] bg-[var(--accent)]/10 py-3'
                        : 'flex flex-col items-center rounded-[var(--radius-md)] border border-[var(--border-default)] py-3 transition-colors hover:border-[var(--border-strong)]'
                    }
                  >
                    <span className="text-[0.75rem] text-[var(--text-muted)]">{d.label}</span>
                    <span className="text-[0.875rem] font-semibold text-[var(--text-primary)]">{d.date.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <span className="mb-2 block text-[0.8125rem] font-medium text-[var(--text-secondary)]">
                Available times
              </span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={
                      time === t
                        ? 'rounded-[var(--radius-md)] border border-[var(--accent)] bg-[var(--accent)]/10 py-2.5 text-[0.875rem] font-medium text-[var(--accent-hover)]'
                        : 'rounded-[var(--radius-md)] border border-[var(--border-default)] py-2.5 text-[0.875rem] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              disabled={!time}
              onClick={() => setConfirmed(true)}
              className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-[var(--radius-lg)] bg-[var(--accent)] text-[0.9375rem] font-medium text-[#1d1c19] shadow-[0_2px_16px_-4px_rgba(196,160,48,0.5)] transition-all duration-200 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {time ? `Confirm ${days[day].date} at ${time}` : 'Select a time to continue'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
