// Catalogs, sizes, UI hints and localStorage keys. Keys must never change, or
// existing users lose their invoice counter and saved mode.

export const STORAGE_KEY = 'blakginja_last_invoice_no';
export const MODE_KEY = 'blakginja_mode';

export const CATEGORY_ORDER = ['Drinks', 'Snacks', 'Services', 'Other'];
export const CATALOG = [
  { name: 'Drinks', items: ['Sobolo', 'Lamugin', 'Aliha', 'Ginger', 'Pineapple & Ginger', 'Pineapple Juice', 'Pineapple & Mint', 'Tropical (mango, orange, and pineapple)', 'Beetroot', 'Watermelon & Beetroot', 'Mint Drink'] },
  { name: 'Snacks', items: ['Poolo', 'Dzowee', 'Agbelikaklo', 'Kulikuli', 'Nkatie cake'] },
  { name: 'Services', items: ['Transport', 'Service charge'] }
];
export const SIZES = ['350ml', '1L', '1.5L', '5L', '25L'];
export const BAR_CATALOG = [
  { name: 'Drinks', items: CATALOG[0].items },
  { name: 'Snacks', items: CATALOG[1].items },
  { name: 'Services', items: ['Transport', 'Bar setup', 'Cups, plates & straws', 'Service charge'] }
];
export const MODE_HINTS = {
  bulk: 'Bottles, snacks and services priced per item.',
  bar: 'Bar packages priced per guest. Details you enter are kept when you switch.'
};
