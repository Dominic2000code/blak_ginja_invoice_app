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
- `logo.png` — the Blak Ginja logo shown on the invoice (see below).
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

## Publish it free with GitHub Pages

1. Create a new repository on GitHub (for example `blak-ginja-invoice`).
2. Upload `index.html`, `logo.png`, and `README.md` to the repository (or push them
   with git). Keep `index.html` in the top level of the repository.
3. In the repository, go to **Settings** > **Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Choose the **main** branch and the **/ (root)** folder, then click **Save**.
6. Wait a minute, then refresh. GitHub shows the live web address at the top of the
   Pages settings. That link is the invoice tool, ready to use and share.

Any time you upload a changed `index.html`, GitHub Pages updates the live site
automatically.

## Notes

- The tool needs an internet connection the first time, because it loads the fonts and
  the PDF library from the web.
- The invoice number counter is stored in the browser it is used in. Using a different
  browser or device starts its own count.
