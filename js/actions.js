import { state, uid, newPkg } from './state.js';
import { writeMode } from './storage.js';
import { renderLineItems, renderDiscounts, renderBarPkgs, renderMode } from './render/editor.js';
import { renderPreview } from './render/preview.js';

// Data ops: mutate state, then re-render the affected parts.

export function addItem(desc, cat, qty, rate) {
  state.items.push({ id: uid(), desc: desc, cat: cat, qty: qty, rate: rate, size: '', sizeCustom: false });
  renderLineItems();
  renderPreview();
}
export function removeItem(id) {
  state.items = state.items.filter((it) => it.id !== id);
  renderLineItems();
  renderPreview();
}
export function addDiscount(type) {
  state.discounts.push({
    id: uid(),
    label: type === 'percent' ? 'Percentage discount' : 'Discount',
    type: type, value: '', mode: state.mode
  });
  renderDiscounts();
  renderPreview();
}
export function removeDiscount(id) {
  state.discounts = state.discounts.filter((dc) => dc.id !== id);
  renderDiscounts();
  renderPreview();
}

export function setMode(m) {
  state.mode = m;
  writeMode(m);
  renderMode();
  renderDiscounts();
  renderPreview();
}

export function findPkg(id) { return state.barPkgs.find((p) => p.id === id); }
export function addPkg() {
  state.barPkgs.push(newPkg());
  renderBarPkgs();
  renderPreview();
}
export function removePkg(id) {
  const rest = state.barPkgs.filter((p) => p.id !== id);
  // always keep one package to edit
  state.barPkgs = rest.length ? rest : [newPkg()];
  renderBarPkgs();
  renderPreview();
}
export function togglePkgItem(id, key) {
  const p = findPkg(id);
  if (!p) return;
  const i = p.included.indexOf(key);
  if (i >= 0) p.included.splice(i, 1); else p.included.push(key);
  renderBarPkgs();
  renderPreview();
}
export function addPkgExtra(id) {
  const p = findPkg(id);
  if (!p) return;
  const d = (p.extraDesc || '').trim();
  if (!d) return;
  if (p.extras[p.extraCat].indexOf(d) < 0) p.extras[p.extraCat].push(d);
  const key = p.extraCat + '|' + d;
  if (p.included.indexOf(key) < 0) p.included.push(key);
  p.extraDesc = '';
  renderBarPkgs();
  renderPreview();
}
