import { STORAGE_KEY, MODE_KEY } from './config.js';

// localStorage may be unavailable (private mode, file://, blocked). Fall back to a
// session-only value so nothing ever throws.
let sessionCounter = 0;
let sessionMode = 'bulk';

export function readLastNo() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const n = parseInt(raw || '0', 10) || 0;
    return n < 0 ? 0 : n;
  } catch (e) {
    return sessionCounter;
  }
}

export function writeLastNo(n) {
  sessionCounter = n;
  try { localStorage.setItem(STORAGE_KEY, String(n)); } catch (e) {}
}

export function readMode() {
  try { return localStorage.getItem(MODE_KEY) === 'bar' ? 'bar' : 'bulk'; } catch (e) { return sessionMode; }
}

export function writeMode(m) {
  sessionMode = m;
  try { localStorage.setItem(MODE_KEY, m); } catch (e) {}
}
