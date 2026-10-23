import { state } from './state.js';
import { writeLastNo } from './storage.js';
import { el } from './utils.js';

// html2pdf is heavy (~200 KB) and only needed for the Download button, so it is
// loaded on demand the first time PDF export is used (and cached by the SW).
const HTML2PDF_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
let html2pdfLoader = null;

export function ensureHtml2Pdf() {
  if (typeof html2pdf !== 'undefined') return Promise.resolve();
  if (html2pdfLoader) return html2pdfLoader;
  html2pdfLoader = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = HTML2PDF_SRC;
    s.async = true;
    s.onload = () => { resolve(); };
    s.onerror = () => { html2pdfLoader = null; reject(new Error('load failed')); };
    document.head.appendChild(s);
  });
  return html2pdfLoader;
}

export function downloadPdf() {
  if (state.pdfBusy) return;
  const elp = el('invoice-page');
  if (!elp) return;
  const num = (state.invNo || '').trim() || '001';
  setPdfBusy(true);
  ensureHtml2Pdf().then(() => {
    const opts = {
      margin: [8, 0, 8, 0],
      filename: 'BlakGinja-Invoice-' + num + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#FFFFFF' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };
    return html2pdf().set(opts).from(elp).save().then(() => {
      recordInvoiceNo(num);
      setPdfBusy(false);
    });
  }).catch(() => {
    setPdfBusy(false);
    alert('Could not create the PDF. Please use the Print button instead.');
  });
}

// Remember the issued invoice number so the next invoice starts one higher.
// Uses the last run of digits, so "INV-007" and "2026-014" count as 7 and 14.
export function recordInvoiceNo(invNo) {
  const m = String(invNo || '').match(/(\d+)\D*$/);
  const n = m ? parseInt(m[1], 10) : NaN;
  if (!isNaN(n) && n > 0) writeLastNo(n);
}

export function printInvoice() {
  window.print();
  recordInvoiceNo((state.invNo || '').trim() || '001');
}

export function setPdfBusy(busy) {
  state.pdfBusy = busy;
  const btn = el('btn-pdf');
  btn.disabled = busy;
  btn.textContent = busy ? 'Preparing PDF...' : 'Download PDF';
}
