'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Users,
  Megaphone,
  Workflow,
  ReceiptText,
  ListChecks,
  BarChart3,
  Bot,
  CalendarClock,
  type LucideIcon,
} from 'lucide-react';
import { Mascot } from '@/components/ui/Logo';

type Node = { icon: LucideIcon; label: string; ring: 0 | 1; angle: number };

const nodes: Node[] = [
  { icon: Users, label: 'CRM', ring: 0, angle: 0 },
  { icon: Megaphone, label: 'Marketing', ring: 0, angle: 72 },
  { icon: Workflow, label: 'Automation', ring: 0, angle: 144 },
  { icon: ReceiptText, label: 'Invoicing', ring: 0, angle: 216 },
  { icon: BarChart3, label: 'Analytics', ring: 0, angle: 288 },
  { icon: Bot, label: 'AI Agents', ring: 1, angle: 36 },
  { icon: ListChecks, label: 'Tasks', ring: 1, angle: 132 },
  { icon: CalendarClock, label: 'Scheduling', ring: 1, angle: 228 },
];

// ring radii expressed as a fraction of half the container — stays proportional at any size
const RINGS = [
  { rf: 0.56, dur: 46, dir: 1 },
  { rf: 0.92, dur: 64, dir: -1 },
];

export function OrbitalCore() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(440);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setSize(w);
    });
    ro.observe(el);
    setSize(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const half = size / 2;
  const nodeSize = Math.max(40, Math.min(52, size * 0.11));
  const coreSize = Math.max(88, Math.min(120, size * 0.26));

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[480px]">
      {/* glow */}
      <div
        aria-hidden
        className="absolute inset-0 animate-pulse-glow rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(217,188,88,0.22) 0%, rgba(196,160,48,0.06) 40%, transparent 68%)',
        }}
      />

      {/* concentric guide rings */}
      {RINGS.map((ring, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute left-1/2 top-1/2 rounded-full border border-[var(--border-subtle)]"
          style={{
            width: half * ring.rf * 2,
            height: half * ring.rf * 2,
            transform: 'translate(-50%, -50%)',
            opacity: 0.6,
          }}
        />
      ))}

      {/* orbiting nodes */}
      {RINGS.map((ring, ri) => {
        const ringNodes = nodes.filter((n) => n.ring === ri);
        const r = half * ring.rf;
        return (
          <motion.div
            key={ri}
            className="absolute left-1/2 top-1/2"
            style={{ width: 0, height: 0 }}
            animate={reduce ? undefined : { rotate: ring.dir * 360 }}
            transition={reduce ? undefined : { duration: ring.dur, ease: 'linear', repeat: Infinity }}
          >
            {ringNodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.label}
                  className="group absolute"
                  style={{ x, y, translateX: '-50%', translateY: '-50%' }}
                  animate={reduce ? undefined : { rotate: -ring.dir * 360 }}
                  transition={reduce ? undefined : { duration: ring.dur, ease: 'linear', repeat: Infinity }}
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      className="flex items-center justify-center rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)] shadow-[var(--shadow-sm)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--accent)] group-hover:text-[var(--accent-hover)] group-hover:shadow-[var(--shadow-md)]"
                      style={{ width: nodeSize, height: nodeSize }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                    </div>
                    <span className="pointer-events-none absolute -bottom-6 whitespace-nowrap rounded-full bg-[var(--bg-inverse)] px-2 py-0.5 text-[0.6875rem] font-medium text-[var(--text-inverse)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {node.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        );
      })}

      {/* core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center rounded-[var(--radius-2xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)] shadow-[var(--shadow-xl)]"
          style={{ width: coreSize, height: coreSize }}
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-[var(--radius-2xl)] opacity-60"
            style={{ background: 'linear-gradient(135deg, rgba(217,188,88,0.18), transparent 60%)' }}
          />
          <span className="text-[var(--accent)]">
            <Mascot className="h-1/2 w-1/2" />
          </span>
        </motion.div>
      </div>
    </div>
  );
}
