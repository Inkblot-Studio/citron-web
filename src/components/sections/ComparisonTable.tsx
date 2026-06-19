'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { comparisonGroups } from '@/lib/pricing-data';
import { viewportOnce } from '@/lib/motion';

function Cell({ value, accent }: { value: string | boolean; accent?: boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent-hover)]">
        <Check className="h-3 w-3" strokeWidth={3.5} />
      </span>
    );
  }
  if (value === false) {
    return <Minus className="h-4 w-4 text-[var(--border-strong)]" />;
  }
  return (
    <span className={accent ? 'text-[0.875rem] font-medium text-[var(--text-primary)]' : 'text-[0.875rem] text-[var(--text-secondary)]'}>
      {value}
    </span>
  );
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-[var(--bg-primary)] py-4 text-left text-[0.875rem] font-semibold text-[var(--text-primary)]">
              Features
            </th>
            <th className="px-4 py-4 text-center text-[0.875rem] font-semibold text-[var(--text-secondary)]">Starter</th>
            <th className="px-4 py-4 text-center">
              <span className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[var(--text-primary)]">
                Growth
                <span className="rounded-full bg-[var(--accent)]/15 px-2 py-0.5 text-[0.625rem] font-semibold text-[var(--accent-hover)]">
                  Popular
                </span>
              </span>
            </th>
            <th className="px-4 py-4 text-center text-[0.875rem] font-semibold text-[var(--text-secondary)]">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {comparisonGroups.map((grp) => (
            <Fragment key={grp.group}>
              <tr>
                <td
                  colSpan={4}
                  className="border-t border-[var(--border-default)] bg-[var(--bg-tertiary)] px-0 py-2.5 pl-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]"
                >
                  {grp.group}
                </td>
              </tr>
              {grp.rows.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.03 }}
                  className="border-t border-[var(--border-subtle)]"
                >
                  <td className="sticky left-0 z-10 bg-[var(--bg-primary)] py-3.5 pr-4 text-[0.875rem] text-[var(--text-secondary)]">
                    {row.feature}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <Cell value={row.starter} />
                  </td>
                  <td className="bg-[var(--accent)]/[0.04] px-4 py-3.5 text-center">
                    <Cell value={row.growth} accent />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <Cell value={row.enterprise} />
                  </td>
                </motion.tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
