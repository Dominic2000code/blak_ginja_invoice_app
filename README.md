# Blak Ginja Invoice Creator

A simple, client-side invoice generator for Blak Ginja. Fill in the form on the left,
watch the invoice build on the right, then download it as a PDF or print it. Everything
runs in the browser. There is no account, no server, and no data leaves the computer.

## What it does

- Fill in the invoice number, date, and who the invoice is for.
- Click any drink, snack, or service to add it as a line item, then type in the rate.
- Add your own custom items, add discounts (fixed amount or percentage), and the totals
  update live in Ghana cedi (₵).
- Download the invoice as an A4 PDF, or use Print as a backup.
- The invoice number counts up on its own. After each PDF download, the next one is
  suggested automatically (001, 002, 003, and so on).

## Files

- `index.html` — the whole app. Open it and it works.
- `logo.png` — the Blak Ginja logo shown on the invoice.
- `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest` — the app
  icon used when the site is added to a phone home screen. Upload these along with the
  rest so the home screen icon works.
- `sw.js` — the service worker that lets the app be installed and work offline.
- `README.md` — this file.

## Preview it on your computer

The quickest way is to double-click `index.html` to open it in your web browser.

To run it through a local web server (this is the closest match to how GitHub Pages
serves it), open a terminal in this folder and run one of these, then visit the address
it prints (usually <http://localhost:8000>):

```bash
python3 -m http.server 8000
```

or, if you have Node.js:

```bash
npx serve
```

## Install it as an app (works offline)

Once the site is live on GitHub Pages (a secure https address), it is a Progressive Web
App. That means it can be installed and used without internet after the first visit.

- On a phone: open the site, then choose "Add to Home Screen". It opens like a normal app
  with the Blak Ginja icon.
- On a computer: in Chrome or Edge, click the install icon in the address bar.

The first visit needs internet so the app can save itself. After that it opens and makes
invoices even with no connection.

Offline only works on the live https site (or a local web server), not when the
`index.html` file is opened directly by double-clicking.

### Updating the app later

When you change any file and upload it again, open `sw.js` and increase the version line
near the top (`blakginja-v1` to `blakginja-v2`, and so on). This tells installed copies to
refresh to the new version instead of showing the old cached one.

## Notes

- The tool needs an internet connection the first time, because it loads the fonts and
  the PDF library from the web, and saves a copy for offline use.
- The invoice number counter is stored in the browser it is used in. Using a different
  browser or device starts its own count.
