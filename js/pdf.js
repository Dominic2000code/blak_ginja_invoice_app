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
      const n = parseInt(num, 10);
      if (!isNaN(n) && n > 0) writeLastNo(n);
      setPdfBusy(false);
    });
  }).catch(() => {
    setPdfBusy(false);
    alert('Could not create the PDF. Please use the Print button instead.');
  });
}

export function setPdfBusy(busy) {
  state.pdfBusy = busy;
  const btn = el('btn-pdf');
  btn.disabled = busy;
  btn.textContent = busy ? 'Preparing PDF...' : 'Download PDF';
}
