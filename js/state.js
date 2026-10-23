import { readLastNo, readMode } from './storage.js';

// The single shared app state. Modules mutate its properties in place.

let uidSeq = 1;
export function uid() { return 'i' + (uidSeq++); }

export function newPkg() {
  return {
    id: uid(), name: 'Full Local Bar Package', qty: '', rate: '',
    included: [], extras: { Drinks: [], Snacks: [], Services: [] },
    extraDesc: '', extraCat: 'Drinks'
  };
}

export function todayISO() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

export const state = {
  invNo: String(readLastNo() + 1).padStart(3, '0'),
  date: todayISO(),
  mode: readMode(),
  clientName: '', clientPhone: '', clientEmail: '', clientLocation: '',
  items: [], discounts: [],
  barPkgs: [newPkg()],
  customCat: 'Drinks',
  payMomo: '+233 55 518 1595', payBank: 'CAL Bank', payAccount: '1400009574281', payName: 'Mary Bluawofogbe',
  pdfBusy: false
};
