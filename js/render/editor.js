import { CATALOG, CATEGORY_ORDER, SIZES, BAR_CATALOG, MODE_HINTS } from '../config.js';
import { state } from '../state.js';
import { el, setText, esc, escAttr, money } from '../utils.js';
import { calc, pkgAmount, pkgGroups } from '../calc.js';

// ---------- catalog (rendered once) ----------
export function renderCatalog() {
  let html = '';
  CATALOG.forEach((g) => {
    html += '<div style="margin-bottom:12px;">' +
      '<div style="font-size:10.5px; font-weight:600; letter-spacing:1.4px; text-transform:uppercase; color:#3A6B1A; margin-bottom:6px;">' + esc(g.name) + '</div>' +
      '<div style="display:flex; flex-wrap:wrap; gap:6px;">';
    g.items.forEach((label) => {
      html += '<button type="button" class="chip" data-name="' + escAttr(label) + '" data-cat="' + escAttr(g.name) + '">' + esc(label) + '</button>';
    });
    html += '</div></div>';
  });
  el('catalog').innerHTML = html;
}

// ---------- line items editor ----------
export function renderLineItems() {
  const c = calc(state);
  const container = el('lineitems');
  if (c.items.length === 0) {
    container.innerHTML = '<div style="font-size:12.5px; color:#5A5548; background:#FAF7F2; border:1px dashed #E3D9C8; border-radius:6px; padding:14px; text-align:center;">No items yet. Click an item above to add it.</div>';
    return;
  }
  const fieldLabel = 'display:flex; flex-direction:column; gap:3px; font-size:10px; font-weight:600; letter-spacing:0.8px; text-transform:uppercase; color:#5A5548;';
  let html = '';

  CATEGORY_ORDER.forEach((name) => {
    const rows = c.items.filter((it) => it.cat === name);
    if (!rows.length) return;
    html += '<div style="font-size:10.5px; font-weight:600; letter-spacing:1.4px; text-transform:uppercase; color:#3A6B1A; margin:10px 0 6px;">' + esc(name) + '</div>';
    rows.forEach((it) => {
      const isDrink = it.cat === 'Drinks';
      html += '<div style="border:1px solid #F0E9DC; border-radius:8px; padding:8px; margin-bottom:8px; background:#FFFFFF;">' +
        '<div style="display:grid; grid-template-columns:minmax(0,1fr) auto 24px; gap:8px; align-items:center;">' +
          '<input type="text" aria-label="Item description" class="inp-sm" data-id="' + it.id + '" data-field="desc" value="' + escAttr(it.desc) + '" style="width:100%; padding:7px 9px; border:1px solid #E3D9C8; border-radius:6px; font-size:13px; font-weight:500; color:#1C1C1C; background:#FFFFFF; outline:none; min-width:0;">' +
          '<div data-amount-id="' + it.id + '" style="font-size:13px; font-weight:600; text-align:right; color:#1C1C1C; white-space:nowrap;">' + money(it.amount) + '</div>' +
          '<button type="button" class="btn-x" data-action="remove-item" data-id="' + it.id + '" title="Remove item" aria-label="Remove item">×</button>' +
        '</div>' +
        '<div style="display:flex; gap:6px; margin-top:6px;">' +
          '<label style="width:64px; flex-shrink:0; ' + fieldLabel + '">Qty' +
            '<input type="number" min="0" class="inp-sm" data-id="' + it.id + '" data-field="qty" value="' + escAttr(it.qty) + '" style="width:100%; padding:7px 6px; border:1px solid #E3D9C8; border-radius:6px; font-size:13px; color:#1C1C1C; background:#FFFFFF; outline:none; text-align:center; min-width:0;">' +
          '</label>' +
          (isDrink ? sizeSelect(it, fieldLabel) : '') +
          '<label style="flex:1; min-width:0; ' + fieldLabel + '">Rate (₵)' +
            '<input type="number" min="0" step="0.01" placeholder="0.00" class="inp-sm" data-id="' + it.id + '" data-field="rate" value="' + escAttr(it.rate) + '" style="width:100%; padding:7px 8px; border:1px solid #E3D9C8; border-radius:6px; font-size:13px; color:#1C1C1C; background:#FFFFFF; outline:none; text-align:right; min-width:0;">' +
          '</label>' +
        '</div>' +
        (isDrink && it.sizeCustom
          ? '<input type="text" placeholder="Type a size, e.g. 500ml" aria-label="Custom size" data-id="' + it.id + '" data-field="size" value="' + escAttr(it.size) + '" style="width:100%; margin-top:6px; padding:7px 9px; border:1px solid #E8820C; border-radius:6px; font-size:13px; color:#1C1C1C; background:#FDF3E3; outline:none;">'
          : '') +
        '</div>';
    });
  });
  container.innerHTML = html;
}

export function sizeSelect(it, fieldLabel) {
  const sel = it.sizeCustom ? '__custom' : (it.size || '');
  function opt(v, label) {
    return '<option value="' + escAttr(v) + '"' + (sel === v ? ' selected' : '') + '>' + esc(label) + '</option>';
  }
  return '<label style="flex:1; min-width:0; ' + fieldLabel + '">Size' +
    '<select data-id="' + it.id + '" data-field="sizeSel" style="width:100%; padding:7px 4px; border:1px solid #E3D9C8; border-radius:6px; font-size:13px; color:#1C1C1C; background:#FFFFFF; outline:none; min-width:0;">' +
      opt('', 'None') + SIZES.map((s) => opt(s, s)).join('') + opt('__custom', 'Custom...') +
    '</select></label>';
}

export function updateRowAmount(id) {
  const it = state.items.find((x) => x.id === id);
  if (!it) return;
  const cell = el('lineitems').querySelector('[data-amount-id="' + id + '"]');
  if (cell) cell.textContent = money((parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0));
}

// ---------- bar packages editor ----------
export function renderBarPkgs() {
  const fieldLabel = 'display:flex; flex-direction:column; gap:3px; font-size:10px; font-weight:600; letter-spacing:0.8px; text-transform:uppercase; color:#5A5548;';
  let html = '';
  state.barPkgs.forEach((p) => {
    html += '<div style="border:1px solid #EAE2D4; border-radius:10px; padding:12px; margin-bottom:12px; background:#FFFFFF;">' +
      '<div style="display:grid; grid-template-columns:minmax(0,1fr) 24px; gap:8px; align-items:center;">' +
        '<input type="text" placeholder="Package name" aria-label="Package name" class="inp" data-id="' + p.id + '" data-field="name" value="' + escAttr(p.name) + '" style="width:100%; padding:8px 10px; border:1px solid #E3D9C8; border-radius:6px; font-size:13.5px; font-weight:600; color:#1C1C1C; background:#FFFFFF; outline:none; min-width:0;">' +
        '<button type="button" class="btn-x" data-action="remove-pkg" data-id="' + p.id + '" title="Remove package" aria-label="Remove package">×</button>' +
      '</div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-top:8px; align-items:end;">' +
        '<label style="' + fieldLabel + '">Guests' +
          '<input type="number" min="0" placeholder="0" class="inp-sm" data-id="' + p.id + '" data-field="qty" value="' + escAttr(p.qty) + '" style="width:100%; padding:7px 8px; border:1px solid #E3D9C8; border-radius:6px; font-size:13px; color:#1C1C1C; background:#FFFFFF; outline:none; text-align:center; min-width:0;">' +
        '</label>' +
        '<label style="' + fieldLabel + '">Rate per head (₵)' +
          '<input type="number" min="0" step="0.01" placeholder="e.g. 25" class="inp-sm" data-id="' + p.id + '" data-field="rate" value="' + escAttr(p.rate) + '" style="width:100%; padding:7px 8px; border:1px solid #E3D9C8; border-radius:6px; font-size:13px; color:#1C1C1C; background:#FFFFFF; outline:none; text-align:right; min-width:0;">' +
        '</label>' +
        '<div style="' + fieldLabel + '">Amount' +
          '<div data-pkg-amount-id="' + p.id + '" style="padding:7px 8px; border-radius:6px; background:#FDF3E3; font-size:13px; font-weight:600; letter-spacing:0; text-transform:none; color:#C46D08; text-align:right; white-space:nowrap; overflow:hidden;">' + money(pkgAmount(p)) + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="font-size:10.5px; font-weight:600; letter-spacing:1.4px; text-transform:uppercase; color:#5A5548; margin:14px 0 2px;">Included items · ' + p.included.length + ' selected</div>';
    pkgGroups(p).forEach((g) => {
      html += '<div style="margin-top:8px;">' +
        '<div style="font-size:10.5px; font-weight:600; letter-spacing:1.4px; text-transform:uppercase; color:#3A6B1A; margin-bottom:6px;">' + esc(g.name) + '</div>' +
        '<div style="display:flex; flex-wrap:wrap; gap:6px;">';
      g.names.forEach((label) => {
        const key = g.name + '|' + label;
        const on = p.included.indexOf(key) >= 0;
        html += '<button type="button" class="chip toggle' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-action="toggle-pkg-item" data-id="' + p.id + '" data-key="' + escAttr(key) + '">' + (on ? '✓ ' : '') + esc(label) + '</button>';
      });
      html += '</div></div>';
    });
    html += '<div style="display:grid; grid-template-columns:minmax(0,1fr) 96px auto; gap:6px; margin-top:12px;">' +
        '<input type="text" placeholder="Other item" aria-label="Other included item" class="inp-sm" data-id="' + p.id + '" data-field="extraDesc" value="' + escAttr(p.extraDesc) + '" style="width:100%; padding:7px 9px; border:1px solid #E3D9C8; border-radius:6px; font-size:13px; color:#1C1C1C; background:#FFFFFF; outline:none; min-width:0;">' +
        '<select aria-label="Other item category" data-id="' + p.id + '" data-field="extraCat" style="padding:7px 4px; border:1px solid #E3D9C8; border-radius:6px; font-size:13px; color:#1C1C1C; background:#FFFFFF; outline:none;">' +
          BAR_CATALOG.map((g) => '<option value="' + escAttr(g.name) + '"' + (p.extraCat === g.name ? ' selected' : '') + '>' + esc(g.name) + '</option>').join('') +
        '</select>' +
        '<button type="button" class="btn-add" style="padding:7px 12px;" data-action="add-pkg-extra" data-id="' + p.id + '">Add</button>' +
      '</div>' +
    '</div>';
  });
  el('barpkgs').innerHTML = html;
}

export function renderMode() {
  const isBar = state.mode === 'bar';
  const bulkBtn = el('btn-mode-bulk'), barBtn = el('btn-mode-bar');
  bulkBtn.classList.toggle('active', !isBar);
  barBtn.classList.toggle('active', isBar);
  bulkBtn.setAttribute('aria-pressed', String(!isBar));
  barBtn.setAttribute('aria-pressed', String(isBar));
  setText('mode-hint', MODE_HINTS[state.mode]);
  el('bulk-sections').style.display = isBar ? 'none' : '';
  el('bar-section').style.display = isBar ? '' : 'none';
}

// ---------- discounts editor ----------
export function renderDiscounts() {
  const container = el('discounts-list');
  const list = state.discounts.filter((dc) => dc.mode === state.mode);
  if (list.length === 0) { container.innerHTML = ''; return; }
  let html = '<div style="display:grid; grid-template-columns:1fr 100px 70px 24px; gap:6px; font-size:10.5px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#5A5548; margin-bottom:6px; padding:0 2px;">' +
    '<div>Label</div><div>Type</div><div style="text-align:right;">Value</div><div></div></div>';
  list.forEach((dc) => {
    html += '<div style="display:grid; grid-template-columns:1fr 100px 70px 24px; gap:6px; align-items:center; margin-bottom:6px;">' +
      '<input type="text" aria-label="Discount label" class="inp-sm" data-id="' + dc.id + '" data-field="label" value="' + escAttr(dc.label) + '" style="width:100%; padding:7px 9px; border:1px solid #E3D9C8; border-radius:6px; font-size:13px; color:#1C1C1C; background:#FFFFFF; outline:none; min-width:0;">' +
      '<select aria-label="Discount type" data-id="' + dc.id + '" data-field="type" style="width:100%; padding:7px 4px; border:1px solid #E3D9C8; border-radius:6px; font-size:12.5px; color:#1C1C1C; background:#FFFFFF; outline:none;">' +
        '<option value="fixed"' + (dc.type === 'fixed' ? ' selected' : '') + '>Fixed ₵</option>' +
        '<option value="percent"' + (dc.type === 'percent' ? ' selected' : '') + '>Percent %</option>' +
      '</select>' +
      '<input type="number" min="0" step="0.01" placeholder="0" aria-label="Discount value" class="inp-sm" data-id="' + dc.id + '" data-field="value" value="' + escAttr(dc.value) + '" style="width:100%; padding:7px 8px; border:1px solid #E3D9C8; border-radius:6px; font-size:13px; color:#1C1C1C; background:#FFFFFF; outline:none; text-align:right; min-width:0;">' +
      '<button type="button" class="btn-x" data-action="remove-discount" data-id="' + dc.id + '" title="Remove discount" aria-label="Remove discount">×</button>' +
      '</div>';
  });
  container.innerHTML = html;
}
