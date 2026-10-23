import { renderCatalog, renderLineItems, renderBarPkgs, renderMode, renderDiscounts } from './render/editor.js';
import { renderPreview } from './render/preview.js';
import { bindEvents, setInitialFieldValues } from './events.js';
import { attachLogoFallbacks } from './logo-fallback.js';

attachLogoFallbacks();

// The font stylesheet loads as media="print" so it doesn't block rendering, then
// switches to all media once loaded. Done here instead of an inline onload so a
// strict Content-Security-Policy won't block it.
document.querySelectorAll('link[data-async-css]').forEach((link) => {
  if (link.sheet) link.media = 'all';
  else link.addEventListener('load', () => { link.media = 'all'; }, { once: true });
});

function init() {
  setInitialFieldValues();
  renderMode();
  renderCatalog();
  renderLineItems();
  renderBarPkgs();
  renderDiscounts();
  renderPreview();
  bindEvents();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Register the service worker so the app is installable and works offline.
// Only runs over http/https (not when opened as a local file), and uses a relative
// path so it works from a GitHub Pages subpath.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
