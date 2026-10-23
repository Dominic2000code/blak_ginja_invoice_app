export function el(id) { return document.getElementById(id); }
export function setText(id, v) { const n = el(id); if (n) n.textContent = v; }

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
export function escAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

export function money(n) {
  if (!isFinite(n)) n = 0;
  return '₵' + n.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatDate(iso) {
  const p = (iso || '').split('-');
  if (p.length !== 3) return iso || '';
  const dt = new Date(+p[0], +p[1] - 1, +p[2]);
  if (isNaN(dt.getTime())) return iso;
  return dt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
