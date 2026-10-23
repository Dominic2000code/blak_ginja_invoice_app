import { renderCatalog, renderLineItems, renderBarPkgs, renderMode, renderDiscounts } from './render/editor.js';
import { renderPreview } from './render/preview.js';
import { bindEvents, setInitialFieldValues } from './events.js';
import { attachLogoFallbacks } from './logo-fallback.js';

attachLogoFallbacks();

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
