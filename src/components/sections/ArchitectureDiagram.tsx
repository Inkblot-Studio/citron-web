'use client';

import { motion } from 'framer-motion';
import { Database, Boxes, BrainCircuit, MonitorSmartphone } from 'lucide-react';
import { viewportOnce } from '@/lib/motion';

const layers = [
  {
    icon: MonitorSmartphone,
    name: 'Experience',
    desc: 'One calm, consistent interface across web, desktop, and mobile.',
  },
  {
    icon: BrainCircuit,
    name: 'Intelligence',
    desc: 'AI agents and reasoning that act on every part of your business.',
  },
  {
    icon: Boxes,
    name: 'Modules',
    desc: 'CRM, marketing, finance, automation — composable, not bolted-on.',
  },
  {
    icon: Database,
    name: 'Unified data core',
    desc: 'One canonical model of your company. No copies, no drift.',
  },
];

export function ArchitectureDiagram() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="flex flex-col gap-3">
        {layers.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-xs)] transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-md)]"
              style={{ marginLeft: `${(layers.length - 1 - i) * 6}%`, marginRight: `${(layers.length - 1 - i) * 6}%` }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'linear-gradient(90deg, rgba(217,188,88,0.08), transparent)' }}
              />
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-tertiary)] text-[var(--accent-hover)]">
                <Icon className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <div className="relative">
                <h3 className="text-[1rem] font-semibold text-[var(--text-primary)]">{layer.name}</h3>
                <p className="mt-0.5 text-[0.875rem] leading-snug text-[var(--text-secondary)]">
                  {layer.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-[0.8125rem] text-[var(--text-muted)]">
        Every layer shares the one below it. That’s what makes intelligence possible.
      </p>
    </div>
  );
}
