/**
 * Patch notes, rendered from the GitHub release body.
 *
 * These are Markdown, but only ever ours, and only ever a short list of
 * headings and bullets. Rendering the handful of shapes we actually publish
 * beats pulling in a Markdown parser plus a sanitiser to display six lines —
 * and because nothing here interprets HTML, a release note can never inject
 * markup into the page.
 */
export function ReleaseNotes({ markdown }: { markdown: string }) {
  const lines = markdown.split('\n').map((line) => line.trim());

  return (
    <div className="notes">
      {lines.map((line, index) => {
        if (!line) return null;

        if (line.startsWith('#')) {
          return (
            <p key={index} className="notes__heading">
              {line.replace(/^#+\s*/, '')}
            </p>
          );
        }

        if (/^[-*]\s+/.test(line)) {
          return (
            <p key={index} className="notes__bullet">
              {stripInline(line.replace(/^[-*]\s+/, ''))}
            </p>
          );
        }

        return (
          <p key={index} className="notes__line">
            {stripInline(line)}
          </p>
        );
      })}
    </div>
  );
}

/** Drops the inline emphasis marks we never style, so `**bold**` isn't read literally. */
function stripInline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1');
}
