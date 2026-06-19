/**
 * Inline, render-blocking-free theme bootstrap.
 * Sets data-theme before paint to avoid flash. Defaults to system preference.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('citron-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
