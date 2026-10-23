import { CATEGORY_ORDER } from '../config.js';
import { state } from '../state.js';
import { el, setText, esc, money, formatDate } from '../utils.js';
import { calc, pkgGroups } from '../calc.js';

function groupHeaderRow(name, dotColor) {
  return '<div style="background:var(--leaf-wash); color:var(--garden-leaf); font-size:11px; font-weight:600; letter-spacing:1.8px; text-transform:uppercase; padding:9px 16px; border-bottom:1px solid var(--leaf-rule);"><span style="color:' + dotColor + '; margin-right:8px;">●</span>' + esc(name) + '</div>';
}

// Class hooks (pv-mid, pv-amt, pv-line) let the compact phone layout in
// css/responsive.css restack rows; they have no effect on the A4/PDF layout.
function theadCell(label, width, align, cls) {
  const pad = width ? (align === 'right' ? '13px 16px' : '13px 8px') : '13px 16px';
  const size = width ? 'width:' + width + 'px;' : 'flex:1; min-width:0;';
  return '<div' + (cls ? ' class="' + cls + '"' : '') + ' style="' + size + ' padding:' + pad + '; font-size:11px; font-weight:600; letter-spacing:1.2px; text-transform:uppercase;' + (align ? ' text-align:' + align + ';' : '') + '">' + label + '</div>';
}

// Compact-layout summary line under a row (hidden at A4 width).
function rowLine(text) {
  return '<div class="pv-line">' + esc(text) + '</div>';
}

export function renderPreview() {
  const c = calc(state);
  const isBar = state.mode === 'bar';

  setText('pv-date', formatDate(state.date));
  setText('pv-invno', state.invNo);
  setText('pv-billname', state.clientName.trim() || '--');

  const loc = state.clientLocation.trim();
  const locEl = el('pv-location');
  locEl.style.display = loc ? 'block' : 'none';
  locEl.textContent = loc;

  el('pv-thead').innerHTML = isBar
    ? theadCell('Description') + theadCell('Guests', 90, 'center', 'pv-mid') + theadCell('Rate per head', 120, 'center', 'pv-mid') + theadCell('Amount', 130, 'right', 'pv-amt')
    : theadCell('Description') + theadCell('Qty', 60, 'center', 'pv-mid') + theadCell('Size', 80, 'center', 'pv-mid') + theadCell('Rate', 100, 'center', 'pv-mid') + theadCell('Amount', 130, 'right', 'pv-amt');

  const parts = [];
  if (state.clientPhone.trim()) parts.push(state.clientPhone.trim());
  if (state.clientEmail.trim()) parts.push(state.clientEmail.trim());
  const wrap = el('pv-contact-wrap');
  if (parts.length) {
    wrap.style.display = 'block';
    setText('pv-contact', parts.join(' · '));
  } else {
    wrap.style.display = 'none';
  }

  // table body
  let body = '';
  if (isBar) {
    body += groupHeaderRow('Mobile Bar', 'var(--ginger-root)');
    c.pkgs.forEach((row, i) => {
      const p = row.pkg;
      const bg = i % 2 === 1 ? 'var(--row-blush)' : 'var(--sheet-white)';
      let lines = '';
      pkgGroups(p).forEach((g) => {
        const picked = g.names.filter((n) => p.included.indexOf(g.name + '|' + n) >= 0);
        if (!picked.length) return;
        lines += '<div style="font-size:12.5px; color:var(--field-loam); line-height:1.65;"><span style="color:var(--garden-leaf); font-weight:600;">' + esc(g.name) + ':</span> ' + esc(picked.join(', ')) + '.</div>';
      });
      const guests = p.qty === '' ? '0' : p.qty;
      body += '<div class="pv-row pv-row-bar" style="display:flex; align-items:center; border-bottom:1px solid var(--table-rule); background:' + bg + ';">' +
        '<div class="pv-desc" style="flex:1; min-width:0; padding:16px;">' +
          '<div style="font-size:15px; font-weight:600; color:var(--ledger-ink); margin-bottom:4px;">' + esc((p.name || '').trim() || 'Bar package') + '</div>' + lines +
        '</div>' +
        '<div class="pv-mid" style="width:90px; padding:12px 8px; text-align:center; color:var(--field-loam);">' + esc(guests) + '</div>' +
        '<div class="pv-mid" style="width:120px; padding:12px 8px; text-align:center; color:var(--field-loam);">' + money(parseFloat(p.rate) || 0) + '</div>' +
        '<div class="pv-amt" style="width:130px; padding:12px 16px; text-align:right; font-weight:600; color:var(--ledger-ink);">' + money(row.amount) + '</div>' +
        rowLine(guests + ' guests × ' + money(parseFloat(p.rate) || 0) + ' per head') +
        '</div>';
    });
  } else if (c.items.length === 0) {
    body += '<div style="padding:24px 16px; text-align:center; color:var(--field-loam); font-size:13px; background:var(--sheet-white);">No items yet. Add items in the editor to see them here.</div>';
  } else {
    CATEGORY_ORDER.forEach((name) => {
      const rows = c.items.filter((it) => it.cat === name);
      if (!rows.length) return;
      body += groupHeaderRow(name, 'var(--ginger-root)');
      rows.forEach((it, i) => {
        const bg = i % 2 === 1 ? 'var(--row-blush)' : 'var(--sheet-white)';
        const qty = it.qty === '' ? '0' : it.qty;
        const size = it.cat === 'Drinks' ? ((it.size || '').trim() || '-') : '-';
        const rate = money(parseFloat(it.rate) || 0);
        body += '<div class="pv-row" style="display:flex; border-bottom:1px solid var(--table-rule); background:' + bg + ';">' +
          '<div class="pv-desc" style="flex:1; min-width:0; padding:12px 16px; color:var(--ledger-ink);">' + esc(it.desc || ' ') + '</div>' +
          '<div class="pv-mid" style="width:60px; padding:12px 8px; text-align:center; color:var(--field-loam);">' + esc(qty) + '</div>' +
          '<div class="pv-mid" style="width:80px; padding:12px 8px; text-align:center; color:var(--field-loam);">' + esc(size) + '</div>' +
          '<div class="pv-mid" style="width:100px; padding:12px 8px; text-align:center; color:var(--field-loam);">' + rate + '</div>' +
          '<div class="pv-amt" style="width:130px; padding:12px 16px; text-align:right; font-weight:600; color:var(--ledger-ink);">' + money(it.amount) + '</div>' +
          rowLine(qty + ' × ' + rate + (size !== '-' ? ' · ' + size : '')) +
          '</div>';
      });
    });
  }
  if (c.discounts.length) {
    body += groupHeaderRow('Discounts', 'var(--garden-leaf)');
    c.discounts.forEach((dc) => {
      const typeLabel = dc.type === 'percent' ? (dc.rate + '%') : 'Fixed';
      body += '<div class="pv-row" style="display:flex; border-bottom:1px solid var(--table-rule); background:var(--sheet-white);">' +
        '<div class="pv-desc" style="flex:1; min-width:0; padding:12px 16px; color:var(--garden-leaf);"><span style="font-size:10px; margin-right:6px;">▼</span>' + esc(dc.label || 'Discount') + '</div>' +
        '<div class="pv-mid" style="width:150px; padding:12px 8px; text-align:right; color:var(--field-loam);">' + esc(typeLabel) + '</div>' +
        '<div class="pv-amt" style="width:130px; padding:12px 16px; text-align:right; font-weight:600; color:var(--garden-leaf);">−' + money(dc.amount) + '</div>' +
        rowLine(typeLabel) +
        '</div>';
    });
  }
  el('pv-tbody').innerHTML = body;

  // totals
  let totals = '<div style="display:flex; justify-content:space-between; padding:5px 0; font-size:14px; color:var(--field-loam);"><span>Subtotal</span><span>' + money(c.subtotal) + '</span></div>';
  c.discounts.forEach((dc) => {
    totals += '<div style="display:flex; justify-content:space-between; padding:5px 0; font-size:14px; color:var(--garden-leaf); font-weight:500;"><span>' + esc(dc.label || 'Discount') + '</span><span>−' + money(dc.amount) + '</span></div>';
  });
  totals += '<div style="display:flex; justify-content:space-between; margin-top:12px; padding-top:14px; border-top:2px solid var(--ginger-root); font-family:\'Playfair Display\', Georgia, serif; font-size:20px; font-weight:700; color:var(--ledger-ink);"><span>Total</span><span style="color:var(--burnt-ginger);">' + money(c.total) + '</span></div>';
  el('pv-totals').innerHTML = totals;

  // payment
  setText('pv-payname', state.payName);
  setText('pv-momo', state.payMomo);
  setText('pv-bank', state.payBank);
  setText('pv-account', state.payAccount);
}
