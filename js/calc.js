import { BAR_CATALOG } from './config.js';

// Pure invoice maths: no DOM access, state is passed in.

export function calc(state) {
  const items = state.items.map((it) => ({
    id: it.id, desc: it.desc, cat: it.cat, qty: it.qty, rate: it.rate,
    size: it.size, sizeCustom: it.sizeCustom,
    amount: (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0)
  }));
  const pkgs = state.barPkgs.map((p) => ({ pkg: p, amount: pkgAmount(p) }));
  const subtotal = state.mode === 'bar'
    ? pkgs.reduce((s, p) => s + p.amount, 0)
    : items.reduce((s, it) => s + it.amount, 0);
  // Each mode keeps its own discounts. Negative values count as 0, percentages
  // are capped at 100%, and discounts never take the total below zero.
  let remaining = Math.max(subtotal, 0);
  const discounts = state.discounts.filter((dc) => dc.mode === state.mode).map((dc) => {
    const v = Math.max(parseFloat(dc.value) || 0, 0);
    const rate = dc.type === 'percent' ? Math.min(v, 100) : 0;
    const wanted = dc.type === 'percent' ? subtotal * rate / 100 : v;
    const amount = Math.min(wanted, remaining);
    remaining -= amount;
    return { id: dc.id, label: dc.label, type: dc.type, value: dc.value, rate: rate, amount: amount };
  });
  const total = subtotal - discounts.reduce((s, dc) => s + dc.amount, 0);
  return { items: items, pkgs: pkgs, subtotal: subtotal, discounts: discounts, total: total };
}

export function pkgAmount(p) { return (parseFloat(p.qty) || 0) * (parseFloat(p.rate) || 0); }

// Chip names for one package: the bar catalog plus any "Other item" extras.
export function pkgGroups(p) {
  return BAR_CATALOG.map((g) => ({
    name: g.name,
    names: g.items.concat(p.extras[g.name].filter((x) => g.items.indexOf(x) < 0))
  }));
}
