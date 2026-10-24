import { state } from './state.js';
import { el, money } from './utils.js';
import { pkgAmount } from './calc.js';
import {
  addItem, removeItem, addDiscount, removeDiscount, setMode,
  findPkg, addPkg, removePkg, togglePkgItem, addPkgExtra
} from './actions.js';
import { renderLineItems, updateRowAmount } from './render/editor.js';
import { renderPreview } from './render/preview.js';
import { downloadPdf } from './pdf.js';

export function bindStaticInput(id, key, afterPreview) {
  const input = el(id);
  input.addEventListener('input', (e) => {
    state[key] = e.target.value;
    renderPreview();
    if (afterPreview) afterPreview();
  });
}

export function bindEvents() {
  // fixed fields
  bindStaticInput('inp-invno', 'invNo');
  bindStaticInput('inp-date', 'date');
  bindStaticInput('inp-clientname', 'clientName');
  bindStaticInput('inp-clientphone', 'clientPhone');
  bindStaticInput('inp-clientemail', 'clientEmail');
  bindStaticInput('inp-clientlocation', 'clientLocation');
  bindStaticInput('inp-paymomo', 'payMomo');
  bindStaticInput('inp-paybank', 'payBank');
  bindStaticInput('inp-payaccount', 'payAccount');
  bindStaticInput('inp-payname', 'payName');

  el('sel-customcat').addEventListener('change', (e) => { state.customCat = e.target.value; });

  // custom item add
  el('btn-addcustom').addEventListener('click', () => {
    const desc = el('inp-customdesc').value.trim();
    if (!desc) return;
    const qty = el('inp-customqty').value || '1';
    const rate = el('inp-customrate').value;
    addItem(desc, state.customCat, qty, rate);
    el('inp-customdesc').value = '';
    el('inp-customqty').value = '';
    el('inp-customrate').value = '';
  });

  // catalog chips (delegated)
  el('catalog').addEventListener('click', (e) => {
    const btn = e.target.closest('button.chip');
    if (!btn) return;
    addItem(btn.getAttribute('data-name'), btn.getAttribute('data-cat'), '1', '');
    btn.classList.remove('flash');
    // reflow so the animation restarts if clicked repeatedly
    void btn.offsetWidth;
    btn.classList.add('flash');
    setTimeout(() => { btn.classList.remove('flash'); }, 700);
  });

  // line items (delegated) - edit in place, no re-render on field edits
  const li = el('lineitems');
  li.addEventListener('input', (e) => {
    const t = e.target;
    const id = t.getAttribute('data-id'), field = t.getAttribute('data-field');
    if (!id || !field || field === 'sizeSel') return;
    const it = state.items.find((x) => x.id === id);
    if (!it) return;
    it[field] = t.value;
    if (field === 'qty' || field === 'rate') updateRowAmount(id);
    renderPreview();
  });
  // size picker: re-render so the custom size box shows/hides
  li.addEventListener('change', (e) => {
    const t = e.target;
    if (t.getAttribute('data-field') !== 'sizeSel') return;
    const it = state.items.find((x) => x.id === t.getAttribute('data-id'));
    if (!it) return;
    if (t.value === '__custom') { it.sizeCustom = true; it.size = ''; }
    else { it.sizeCustom = false; it.size = t.value; }
    renderLineItems();
    renderPreview();
    if (it.sizeCustom) {
      const box = li.querySelector('[data-id="' + it.id + '"][data-field="size"]');
      if (box) box.focus();
    }
  });
  li.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="remove-item"]');
    if (btn) removeItem(btn.getAttribute('data-id'));
  });

  // discounts (delegated)
  const dl = el('discounts-list');
  function discountEdit(e) {
    const t = e.target;
    const id = t.getAttribute('data-id'), field = t.getAttribute('data-field');
    if (!id || !field) return;
    const dc = state.discounts.find((x) => x.id === id);
    if (!dc) return;
    dc[field] = t.value;
    renderPreview();
  }
  dl.addEventListener('input', discountEdit);
  dl.addEventListener('change', discountEdit);
  dl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="remove-discount"]');
    if (btn) removeDiscount(btn.getAttribute('data-id'));
  });

  // mode toggle
  el('btn-mode-bulk').addEventListener('click', () => { setMode('bulk'); });
  el('btn-mode-bar').addEventListener('click', () => { setMode('bar'); });

  // bar packages (delegated) - text/number edits update in place like line items
  const bp = el('barpkgs');
  bp.addEventListener('input', (e) => {
    const t = e.target;
    const field = t.getAttribute('data-field');
    if (!field || field === 'extraCat') return;
    const p = findPkg(t.getAttribute('data-id'));
    if (!p) return;
    p[field] = t.value;
    if (field === 'qty' || field === 'rate') {
      const cell = bp.querySelector('[data-pkg-amount-id="' + p.id + '"]');
      if (cell) cell.textContent = money(pkgAmount(p));
    }
    if (field !== 'extraDesc') renderPreview();
  });
  bp.addEventListener('change', (e) => {
    const t = e.target;
    if (t.getAttribute('data-field') !== 'extraCat') return;
    const p = findPkg(t.getAttribute('data-id'));
    if (p) p.extraCat = t.value;
  });
  bp.addEventListener('keydown', (e) => {
    const t = e.target;
    if (e.key === 'Enter' && t.getAttribute('data-field') === 'extraDesc') {
      e.preventDefault();
      addPkgExtra(t.getAttribute('data-id'));
    }
  });
  bp.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');
    if (action === 'toggle-pkg-item') togglePkgItem(id, btn.getAttribute('data-key'));
    else if (action === 'add-pkg-extra') addPkgExtra(id);
    else if (action === 'remove-pkg') removePkg(id);
  });
  el('btn-addpkg').addEventListener('click', addPkg);

  el('btn-addfixed').addEventListener('click', () => { addDiscount('fixed'); });
  el('btn-addpercent').addEventListener('click', () => { addDiscount('percent'); });

  el('btn-pdf').addEventListener('click', downloadPdf);
  el('btn-print').addEventListener('click', () => { window.print(); });
}

export function setInitialFieldValues() {
  el('inp-invno').value = state.invNo;
  el('inp-date').value = state.date;
  el('inp-clientname').value = state.clientName;
  el('inp-clientphone').value = state.clientPhone;
  el('inp-clientemail').value = state.clientEmail;
  el('inp-clientlocation').value = state.clientLocation;
  el('sel-customcat').value = state.customCat;
  el('inp-paymomo').value = state.payMomo;
  el('inp-paybank').value = state.payBank;
  el('inp-payaccount').value = state.payAccount;
  el('inp-payname').value = state.payName;
}
