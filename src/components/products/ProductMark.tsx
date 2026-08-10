import type { Glyph } from '@/lib/products';

/**
 * The site is paper, not ink. A dark tile punches a hole in a light page, so
 * the mark inverts: a tinted well in the product's own colour, and the glyph
 * in the colour itself.
 */
const WELL_TINT = 10;

/**
 * One tile, one colour, one glyph — the same marks the launcher uses.
 * Citron itself is the mascot; the others are drawn in the same hand, from
 * solid rectangles on one grid, and never repeat the face.
 */
function Shape({ glyph, accent, well }: { glyph: Glyph; accent: string; well: string }) {
  switch (glyph) {
    case 'citron':
      return (
        <g transform="translate(50 52) scale(0.8) translate(-50 -47)">
          <rect x="31" y="17" width="13" height="34" fill={accent} />
          <rect x="56" y="17" width="13" height="34" fill={accent} />
          <path d="M 12 40 A 38 38 0 0 0 88 40" stroke={accent} strokeWidth="13" fill="none" />
        </g>
      );
    case 'target':
      return (
        <>
          <rect x="18" y="18" width="64" height="64" fill={accent} />
          <rect x="31" y="31" width="38" height="38" fill={well} />
          <rect x="42" y="42" width="16" height="16" fill={accent} />
        </>
      );
    case 'ledger':
      return (
        <g fill={accent}>
          <rect x="18" y="22" width="64" height="13" />
          <rect x="18" y="43" width="46" height="13" />
          <rect x="18" y="64" width="28" height="13" />
        </g>
      );
    case 'card':
      return (
        <>
          <rect x="18" y="26" width="64" height="48" fill={accent} />
          <rect x="30" y="39" width="40" height="14" fill={well} />
        </>
      );
    case 'person':
      return (
        <g fill={accent}>
          <rect x="36" y="18" width="28" height="28" />
          <rect x="20" y="56" width="60" height="26" />
        </g>
      );
  }
}

export function ProductMark({
  glyph,
  accent,
  size = 76,
}: {
  glyph: Glyph;
  accent: string;
  size?: number;
}) {
  const well = `color-mix(in srgb, ${accent} ${WELL_TINT}%, #ffffff)`;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" rx="24" fill={well} />
      <Shape glyph={glyph} accent={accent} well={well} />
    </svg>
  );
}
