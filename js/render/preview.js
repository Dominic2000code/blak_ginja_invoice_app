import { CATEGORY_ORDER } from '../config.js';
import { state } from '../state.js';
import { el, setText, esc, money, formatDate } from '../utils.js';
import { calc, pkgGroups } from '../calc.js';

function groupHeaderRow(name, dotColor) {
  return '<div style="background:#EEF5E8; color:#3A6B1A; font-size:11px; font-weight:600; letter-spacing:1.8px; text-transform:uppercase; padding:9px 16px; border-bottom:1px solid #C8DDB8;"><span style="color:' + dotColor + '; margin-right:8px;">●</span>' + esc(name) + '</div>';
}

function theadCell(label, width, align) {
  const pad = width ? (align === 'right' ? '13px 16px' : '13px 8px') : '13px 16px';
  const size = width ? 'width:' + width + 'px;' : 'flex:1; min-width:0;';
  return '<div style="' + size + ' padding:' + pad + '; font-size:11px; font-weight:600; letter-spacing:1.2px; text-transform:uppercase;' + (align ? ' text-align:' + align + ';' : '') + '">' + label + '</div>';
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
    ? theadCell('Description') + theadCell('Guests', 90, 'center') + theadCell('Rate per head', 120, 'center') + theadCell('Amount', 130, 'right')
    : theadCell('Description') + theadCell('Qty', 60, 'center') + theadCell('Size', 80, 'center') + theadCell('Rate', 100, 'center') + theadCell('Amount', 130, 'right');

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
    body += groupHeaderRow('Mobile Bar', '#E8820C');
    c.pkgs.forEach((row, i) => {
      const p = row.pkg;
      const bg = i % 2 === 1 ? '#FDFAF5' : '#FFFFFF';
      let lines = '';
      pkgGroups(p).forEach((g) => {
        const picked = g.names.filter((n) => p.included.indexOf(g.name + '|' + n) >= 0);
        if (!picked.length) return;
        lines += '<div style="font-size:12.5px; color:#5A5548; line-height:1.65;"><span style="color:#3A6B1A; font-weight:600;">' + esc(g.name) + ':</span> ' + esc(picked.join(', ')) + '.</div>';
      });
      body += '<div style="display:flex; align-items:center; border-bottom:1px solid #EDE8E0; background:' + bg + ';">' +
        '<div style="flex:1; min-width:0; padding:16px;">' +
          '<div style="font-size:15px; font-weight:600; color:#1C1C1C; margin-bottom:4px;">' + esc((p.name || '').trim() || 'Bar package') + '</div>' + lines +
        '</div>' +
        '<div style="width:90px; padding:12px 8px; text-align:center; color:#5A5548;">' + esc(p.qty === '' ? '0' : p.qty) + '</div>' +
        '<div style="width:120px; padding:12px 8px; text-align:center; color:#5A5548;">' + money(parseFloat(p.rate) || 0) + '</div>' +
        '<div style="width:130px; padding:12px 16px; text-align:right; font-weight:600; color:#1C1C1C;">' + money(row.amount) + '</div>' +
        '</div>';
    });
  } else if (c.items.length === 0) {
    body += '<div style="padding:24px 16px; text-align:center; color:#5A5548; font-size:13px; background:#FFFFFF;">No items yet. Add items in the editor to see them here.</div>';
  } else {
    CATEGORY_ORDER.forEach((name) => {
      const rows = c.items.filter((it) => it.cat === name);
      if (!rows.length) return;
      body += groupHeaderRow(name, '#E8820C');
      rows.forEach((it, i) => {
        const bg = i % 2 === 1 ? '#FDFAF5' : '#FFFFFF';
        body += '<div style="display:flex; border-bottom:1px solid #EDE8E0; background:' + bg + ';">' +
          '<div style="flex:1; min-width:0; padding:12px 16px; color:#1C1C1C;">' + esc(it.desc || ' ') + '</div>' +
          '<div style="width:60px; padding:12px 8px; text-align:center; color:#5A5548;">' + esc(it.qty === '' ? '0' : it.qty) + '</div>' +
          '<div style="width:80px; padding:12px 8px; text-align:center; color:#5A5548;">' + esc(it.cat === 'Drinks' ? ((it.size || '').trim() || '-') : '-') + '</div>' +
          '<div style="width:100px; padding:12px 8px; text-align:center; color:#5A5548;">' + money(parseFloat(it.rate) || 0) + '</div>' +
          '<div style="width:130px; padding:12px 16px; text-align:right; font-weight:600; color:#1C1C1C;">' + money(it.amount) + '</div>' +
          '</div>';
      });
    });
  }
  if (c.discounts.length) {
    body += groupHeaderRow('Discounts', '#3A6B1A');
    c.discounts.forEach((dc) => {
      const typeLabel = dc.type === 'percent' ? (dc.rate + '%') : 'Fixed';
      body += '<div style="display:flex; border-bottom:1px solid #EDE8E0; background:#FFFFFF;">' +
        '<div style="flex:1; min-width:0; padding:12px 16px; color:#3A6B1A;"><span style="font-size:10px; margin-right:6px;">▼</span>' + esc(dc.label || 'Discount') + '</div>' +
        '<div style="width:150px; padding:12px 8px; text-align:right; color:#5A5548;">' + esc(typeLabel) + '</div>' +
        '<div style="width:130px; padding:12px 16px; text-align:right; font-weight:600; color:#3A6B1A;">−' + money(dc.amount) + '</div>' +
        '</div>';
    });
  }
  el('pv-tbody').innerHTML = body;

  // totals
  let totals = '<div style="display:flex; justify-content:space-between; padding:5px 0; font-size:14px; color:#5A5548;"><span>Subtotal</span><span>' + money(c.subtotal) + '</span></div>';
  c.discounts.forEach((dc) => {
    totals += '<div style="display:flex; justify-content:space-between; padding:5px 0; font-size:14px; color:#3A6B1A; font-weight:500;"><span>' + esc(dc.label || 'Discount') + '</span><span>−' + money(dc.amount) + '</span></div>';
  });
  totals += '<div style="display:flex; justify-content:space-between; margin-top:12px; padding-top:14px; border-top:2px solid #E8820C; font-family:\'Playfair Display\', Georgia, serif; font-size:20px; font-weight:700; color:#1C1C1C;"><span>Total</span><span style="color:#C46D08;">' + money(c.total) + '</span></div>';
  el('pv-totals').innerHTML = totals;

  // payment
  setText('pv-payname', state.payName);
  setText('pv-momo', state.payMomo);
  setText('pv-bank', state.payBank);
  setText('pv-account', state.payAccount);
}
