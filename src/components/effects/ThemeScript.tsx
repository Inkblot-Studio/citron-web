/**
 * Sets the theme before first paint to avoid a flash. Light is the default
 * experience; a previously chosen theme in localStorage wins.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('citron-theme');if(t!=='light'&&t!=='dark'){t='light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
