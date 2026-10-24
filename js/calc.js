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
  const discounts = state.discounts.map((dc) => {
    const v = parseFloat(dc.value) || 0;
    const amount = dc.type === 'percent' ? subtotal * v / 100 : v;
    return { id: dc.id, label: dc.label, type: dc.type, value: dc.value, amount: amount };
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
