---
name: Blak Ginja Invoice Creator
description: A warm, ledger-like invoice tool for a small cocktails, juices and farm-produce business in Accra.
colors:
  ginger-root: "#D97706"
  burnt-ginger: "#A65800"
  burnt-ginger-deep: "#874600"
  garden-leaf: "#3A6B1A"
  ledger-ink: "#1C1C1C"
  field-loam: "#5A5548"
  smoke-on-ink: "#D0C8BC"
  sheet-white: "#FFFFFF"
  cream-paper: "#FAF7F2"
  counter-linen: "#F2EDE3"
  mode-track: "#F4EEE3"
  ginger-wash: "#FDF3E3"
  leaf-wash: "#EEF5E8"
  leaf-rule: "#C8DDB8"
  row-blush: "#FDFAF5"
  husk-border: "#E3D9C8"
  field-edge: "#978B77"
  pale-husk: "#EAE2D4"
  divider-linen: "#F0E9DC"
  table-rule: "#EDE8E0"
  tan-rule: "#D4B896"
typography:
  display:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "38px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "2px"
  headline:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.5px"
  title:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.3
  wordmark-sm:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.15
  closing:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "16px"
    fontWeight: 400
    letterSpacing: "0.5px"
  item-title:
    fontFamily: "'DM Sans', Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  body:
    fontFamily: "'DM Sans', Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "'DM Sans', Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  field-label:
    fontFamily: "'DM Sans', Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 500
  touch-input:
    fontFamily: "'DM Sans', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
  label:
    fontFamily: "'DM Sans', Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "1.6px"
  caption:
    fontFamily: "'DM Sans', Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.8px"
  marker:
    fontFamily: "'DM Sans', Arial, sans-serif"
    fontSize: "10px"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  tab: "7px"
  pill: "999px"
spacing:
  xxs: "4px"
  xs: "6px"
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "16px"
  xxl: "20px"
  sheet: "44px 48px"
components:
  button-primary:
    backgroundColor: "{colors.burnt-ginger}"
    textColor: "{colors.sheet-white}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "13px 16px"
  button-primary-hover:
    backgroundColor: "{colors.burnt-ginger-deep}"
    textColor: "{colors.sheet-white}"
  button-add:
    backgroundColor: "{colors.burnt-ginger}"
    textColor: "{colors.sheet-white}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  button-secondary:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ledger-ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "7px 12px"
  button-secondary-hover:
    backgroundColor: "{colors.ginger-wash}"
    textColor: "{colors.ledger-ink}"
  chip:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ledger-ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  chip-hover:
    backgroundColor: "{colors.ginger-wash}"
    textColor: "{colors.burnt-ginger}"
  chip-selected:
    backgroundColor: "{colors.leaf-wash}"
    textColor: "{colors.garden-leaf}"
    rounded: "{rounded.pill}"
  input:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ledger-ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "8px 10px"
  mode-tab-active:
    backgroundColor: "{colors.burnt-ginger}"
    textColor: "{colors.sheet-white}"
    rounded: "{rounded.tab}"
    padding: "9px 10px"
  invoice-sheet:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ledger-ink}"
    padding: "{spacing.sheet}"
    width: "794px"
  table-header:
    backgroundColor: "{colors.ledger-ink}"
    textColor: "{colors.sheet-white}"
    typography: "{typography.label}"
    padding: "13px 16px"
---

# Design System: Blak Ginja Invoice Creator

## Overview

**Creative North Star: "The Market Ledger"**

Blak Ginja's invoice tool reads like a trusted trader's ledger: cream paper, ink-black rules, and ginger-orange marking whatever matters most. Everything serves one outcome, a clean A4 invoice a client can pay against, so the system's job is to be warm, trustworthy, crafted and efficient all at once. The warmth comes from the materials (cream, linen, husk and tan, never cool gray). The trust comes from document conventions: a firm wordmark, an all-caps INVOICE title, a black table header, ruled totals and a dark payment block. The craft comes from a Playfair Display serif for the brand voice, set against a quiet DM Sans for everything you read or type.

The surface is split in two: a dense white editor panel (440px) on the left, and the invoice preview on the right, set on a linen counter like a sheet of paper. The editor is compact and fast. Small type (12–13.5px), tight 6–10px gaps, uppercase section labels, and one-click item chips keep data entry quick. The invoice is spacious and formal, with 44px by 48px margins and larger serif display type. The editor is the working counter; the invoice is the finished page.

This system is never corporate SaaS (no cool blue or gray chrome), never loud (no neon, gradients or glows beyond the soft ginger focus halo), and never cold monochrome. Removing the warmth removes the brand.

**Key Characteristics:**
- Warm neutrals everywhere: cream, linen, husk and tan instead of grays.
- One accent voice, ginger, in two strengths: Burnt Ginger for action and readable emphasis, Ginger Root for display type, rules and marks. A second, botanical voice (Garden Leaf green) is reserved for categories, discounts and "selected".
- Serif for the brand and the document's headings; sans for every working surface.
- Flat editor, lifted paper invoice.
- Uppercase, letter-spaced micro-labels organize the content in place of heavy dividers.

## Colors

A warm, earthy palette: a kitchen-cream ground, ink-black type, a ginger-orange accent, and a leaf-green counterpoint.

### Primary
- **Burnt Ginger** (#A65800): the action and readable-text orange. Fills primary buttons (Download PDF, Add) and the active mode tab with white text (5.2:1), and colors every small orange text: editor section labels, links, the Bill To label, the Total amount, chip hover text, the package amount pill and the editor wordmark's "Ginja". It also draws focus borders and focus rings.
- **Burnt Ginger Deep** (#874600): hover state for Burnt Ginger fills and links.
- **Ginger Root** (#D97706): the bright, display-strength orange. Used only at large sizes or for marks: the INVOICE title, the invoice wordmark's "Ginja", the Bill To block's left border, the 2px rule above the Total, the dots on table group rows, the ✦ marks, payment labels on the dark block, and chip hover borders. It passes 3:1 as large text, never 4.5:1, so never use it for small text on light grounds. (The original brighter #E8820C survives only as the browser theme color and in soft ginger glows.)

### Secondary
- **Garden Leaf** (#3A6B1A): the botanical counter-voice. Used for catalog and category group labels, discount lines and amounts, selected include-chips, the flash after adding a catalog chip, and category names in bar package details. It means "grouped", "saved" or "chosen", never "act now".

### Neutral
- **Ledger Ink** (#1C1C1C): body text, the invoice table header bar, and the payment-details block.
- **Field Loam** (#5A5548): secondary text, field labels, helper copy, quantities and rates in table rows.
- **Smoke on Ink** (#D0C8BC): body text inside the dark payment block.
- **Sheet White** (#FFFFFF): the editor panel, the invoice sheet, inputs, chips and secondary buttons.
- **Cream Paper** (#FAF7F2): the app background, the custom-item tray, and empty-state wells.
- **Counter Linen** (#F2EDE3): the backdrop behind the invoice preview, the counter the paper rests on.
- **Mode Track** (#F4EEE3): the recessed track of the Bulk order / Mobile bar toggle.
- **Ginger Wash** (#FDF3E3): a pale orange tint for the Bill To block, hover fills on chips and secondary buttons, the package amount pill, and the custom-size input.
- **Leaf Wash** (#EEF5E8) with **Leaf Rule** (#C8DDB8): the fill and bottom border of invoice table group rows, plus the selected-chip fill.
- **Row Blush** (#FDFAF5): zebra fill on alternate invoice table rows.
- **Husk Border** (#E3D9C8): the 1px stroke on unselected chips and the dashed empty-state wells. Decorative only.
- **Field Edge** (#978B77): the 1px stroke on inputs and selects, dark enough (3:1+ on white, cream and wash) for low-vision users to find each field.
- **Pale Husk** (#EAE2D4): the panel edge, package card borders, and the action bar's top rule.
- **Divider Linen** (#F0E9DC): dividers between editor sections and line-item card borders.
- **Table Rule** (#EDE8E0): hairlines between invoice table rows.
- **Tan Rule** (#D4B896): structural document rules, namely the 2px line under the invoice header and above the totals, and the border of secondary buttons.

### Named Rules
**The Readable Ginger Rule.** Orange text smaller than 24px (or 18.7px bold) is always Burnt Ginger. Ginger Root is for display type, rules and marks only.

**The Warm Neutral Rule.** Every neutral leans warm (yellow-brown hue, low chroma). A cool or pure gray anywhere in the UI is a bug.

**The Two Voices Rule.** Ginger marks action and money; Garden Leaf marks grouping, discounts and selection. Never swap them, and never add a third accent.

## Typography

**Display Font:** Playfair Display (with Georgia, serif)
**Body Font:** DM Sans (with Arial, sans-serif)

**Character:** A high-contrast editorial serif gives the brand and the invoice a stamped, trustworthy authority. A soft geometric sans keeps every working surface calm and legible at small sizes.

### Hierarchy
- **Display** (Playfair 700, 38px, line-height 1, +2px tracking): the INVOICE title only, in Ginger Root.
- **Headline** (Playfair 700, 28px, line-height 1.1, −0.5px tracking): the Blak Ginja wordmark on the invoice. The editor header uses the same treatment at 18px.
- **Title** (Playfair 600–700, 20px): the client name in Bill To and the Total row. Thank-you text uses Playfair at 16px.
- **Body** (DM Sans 400, 14px, line-height 1.5 in the editor, 1.6 on the invoice): table rows and general copy. Buttons in the action bar use 14.5px at 500–600.
- **Body small** (DM Sans 400–500, 13–13.5px): input text, chips, line-item rows and preview contact details.
- **Label** (DM Sans 600, 11px, uppercase, +1.6px tracking): editor section labels (Invoice details, Bill to, Add items), the table header (+1.2px), and invoice block labels (Bill To, Payment Instructions, Payment Details; 11px, +2px).
- **Caption** (DM Sans 600, 11px, uppercase, +0.8–1.4px tracking): field labels inside cards (Qty, Size, Rate) and category group labels.
- **Supporting sizes:** 18px Playfair for the editor wordmark, 16px Playfair for the thank-you line, 15px DM Sans 600 for bar package names on the invoice, and 12px DM Sans 500 for field labels above inputs. On touch screens every field uses 16px text so iOS doesn't zoom on focus.

### Named Rules
**The Serif Is the Signature Rule.** Playfair appears only on brand and document moments: the wordmark, INVOICE, the client name, the Total and the thank-you line. Never on controls, labels or form fields.

**The 11px Floor Rule.** No functional text is smaller than 11px. The only smaller glyph is the decorative ▼ before discount lines.

**The Small Caps Ledger Rule.** Organize content with uppercase, letter-spaced 10–11px labels rather than larger headings or extra dividers.

## Layout

A fixed two-pane workspace at desktop widths:
- **Editor:** a 440px white panel with its own scroll area and a sticky action bar at the bottom.
- **Preview:** a flexible area padded 32px by 24px on Counter Linen, centering a 794px A4-width invoice sheet.

Editor sections stack with 16px by 20px padding, separated by 1px Divider Linen rules. Two-up field grids use a 10px gap. Line-item and package cards use 6–8px internal gaps.

Spacing runs on a small, tight scale (4, 6, 8, 10, 12, 16, 20px) inside the editor. The invoice opens up to 18–38px gaps between its blocks:
- header to Bill To: 32px
- Bill To to table: 32px
- table to totals: 30px
- totals to payment: 38px

Below 980px the panes stack. The editor goes full width above the preview. The action bar becomes fixed to the bottom of the viewport with an upward shadow, padded clear of safe-area insets (home indicator, landscape notches), and the preview gets 110px of bottom padding so the bar never covers it.

The invoice preview adapts to the width of its panel, not the viewport, through a container query on `#preview-wrap`:
- **Narrower than 794px:** the sheet fills the panel with 28px by 22px padding instead of scrolling sideways.
- **Narrower than 620px:** the invoice reflows for reading.
  - **Header:** stacks, with a 64px logo.
  - **Line items:** each becomes description plus amount, with a "qty × rate · size" line underneath (guests × rate per head in bar mode, the percentage for discounts).
  - **Totals:** span the full width.
  - **Payment block:** collapses to one column.
  - This applies to phones and to laptop windows around 1024px.

On touch screens (`pointer: coarse`), every chip, tab, button and field is at least 44px tall, and the × remove buttons get a 44px hit area without changing the row layout. Hover styles apply only on devices that can hover. In print, the editor and action bar disappear and the invoice prints flat at up to 794px.

**The PDF Stays A4 Rule.** Restyle invoice content only through the preview container query, never with viewport media queries. The PDF is captured from a copy of the invoice that sits outside the preview panel, so container rules never reach it and every PDF keeps the 794px layout, whatever device made it.

**The A4 Sheet Rule.** The invoice is designed at 794px (A4 at 96dpi) and is exported to PDF exactly as rendered. Any new invoice content must fit that width without horizontal overflow.

## Elevation & Depth

Flat by default, with one lifted object. The editor, cards and controls sit flat and rely on warm 1px borders and tonal fills for structure. The invoice sheet is the only thing that floats: a sheet of paper resting on the linen counter. Every shadow is tinted warm brown or ginger, never neutral black at high opacity.

### Shadow Vocabulary
- **Paper lift** (`box-shadow: 0 8px 40px rgba(60,45,20,0.14)`): the invoice sheet on its counter. Removed in print.
- **Table set-in** (`box-shadow: 0 2px 16px rgba(0,0,0,0.08)`): the soft halo around the invoice line-item table.
- **Docked bar** (`box-shadow: 0 -4px 20px rgba(60,45,20,0.12)`): the action bar when it is fixed to the bottom on narrow screens.
- **Ginger hover** (`box-shadow: 0 2px 8px rgba(232,130,12,0.25)`): catalog and include-chips on hover, paired with a 1px upward lift.
- **Active tab** (`box-shadow: 0 2px 6px rgba(232,130,12,0.35)`): the selected mode tab.
- **Focus halo** (`box-shadow: 0 0 0 3px rgba(232,130,12,0.14)`): the focus ring on primary text inputs.

### Named Rules
**The One Sheet Rule.** Only the invoice is elevated at rest. Everything in the editor is flat until hovered or focused.

## Shapes

Gently softened rectangles throughout, with one exception for chips.
- **Inputs, selects, small buttons:** 6px corners.
- **Big buttons and containers:** 8px for action-bar buttons, line-item cards, the invoice table and the payment block.
- **Package cards and the mode track:** 10px, with the active tab set at 7px inside it so the corners stay concentric.
- **Chips:** fully pill-shaped (999px).
- **Remove (×) buttons:** circular, 24px.

The Bill To block is squared on the left where its 4px Ginger Root border sits (radius 0 6px 6px 0), like a tabbed ledger entry. Borders are almost always 1px; 2px rules are reserved for document structure: the header underline, the line above the totals, and the Total's top rule.

## Components

### Buttons
Tidy and tactile: solid, small-radius, no gradients.
- **Shape:** softened rectangles: 8px in the action bar, 6px elsewhere.
- **Primary (Download PDF, Add):** Burnt Ginger fill with white 600-weight text. The action-bar version is full-width-flex with 13px by 16px padding and 14.5px text. The inline Add is 8px by 14px at 13px.
- **Hover:** fill deepens to Burnt Ginger Deep. A disabled primary drops to 70% opacity and its label changes to "Preparing PDF...".
- **Secondary (Print, + Fixed amount, + Percentage, + Add another package):** a white fill with a 1px Tan Rule border and Ledger Ink 500-weight text. On hover it fills with Ginger Wash, and the small variants also turn their border Ginger Root.
- **Remove (×):** a 24px circular ghost in Field Loam. On hover it fills with Ginger Wash and turns Burnt Ginger.

### Chips
- **Catalog chips (add an item):** pill-shaped, white, 1px Husk Border, 12.5px Ledger Ink text.
  - On hover the text and border turn ginger and the fill becomes Ginger Wash, with a 1px lift and the Ginger hover shadow. Pressing shrinks the chip to 92%.
  - After a click the chip flashes Leaf Wash and Garden Leaf with a quick 0.35s pop, confirming the item was added.
- **Include chips (bar packages):** the same pill, but a toggle. Selected chips take Leaf Wash, a Garden Leaf border and text at weight 600, and a "✓ " prefix. On hover only the border and lift respond; the fill stays put.
- **The add flash wins over hover:** the leaf-green confirmation shows even while the pointer is still over the chip just clicked.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, the lift, press-shrink and pop are removed. Color transitions and the leaf flash stay, so adding an item is still confirmed.

### Cards / Containers
- **Line-item card:** an 8px radius, white fill, 1px Divider Linen border and 8px padding. The top row holds description, amount and ×; the second row holds labelled Qty, Size and Rate fields.
- **Bar package card:** a 10px radius, white fill, 1px Pale Husk border and 12px padding.
- **Amount pill:** a Ginger Wash fill with right-aligned Burnt Ginger 600-weight figures.
- **Trays and empty states:** Cream Paper with a 1px Divider Linen border (dashed Husk Border for "No items yet").
- **No card is shadowed** (see The One Sheet Rule).

### Inputs / Fields
- **Style:** a white fill, 1px Field Edge border and 6px radius, with 8px by 10px padding and 13.5px text (7px by 8–9px and 13px in dense rows). There's no outline at rest.
- **Focus:** every field and select shifts its border to Burnt Ginger and gains the 3px ginger Focus halo. Buttons and invoice links get a 2px Burnt Ginger outline, offset 2px, on keyboard focus.
- **Labels:** 12px Field Loam 500-weight labels above the field. Inside cards, labels are 11px uppercase captions stacked above the input.
- **Special:** the custom-size field uses a Burnt Ginger border on Ginger Wash, so the custom entry stands out from the preset options.

### Navigation (Mode toggle)
A two-option segmented control (Bulk order / Mobile bar) on a 10px Mode Track with 4px internal padding. The active tab is a Burnt Ginger fill with white 13.5px 600-weight text and the Active tab shadow. The inactive tab is transparent with Field Loam text. A one-line Field Loam hint below explains the current mode.

### Invoice Sheet (signature component)
The finished document, and the system's reason to exist:
- **Header:** the logo, the Playfair wordmark (with "Ginja" in Ginger Root) and contact links, then the Display INVOICE title with date and number, closed by a 2px Tan Rule.
- **Bill To:** a Ginger Wash block with a 4px Ginger Root left border, holding a Playfair client name, location and contacts.
- **Line-item table:** a Ledger Ink header bar of white uppercase labels, Leaf Wash group rows marked with a ginger "●", zebra rows in Row Blush, and right-aligned 600-weight amounts. Bar mode lists each package's included items per category under a bold package name.
- **Totals:** a right-aligned 290px block ruled in Tan, with Garden Leaf discount lines and a Playfair Total in Burnt Ginger over a 2px Ginger Root rule.
- **Payment block:** a Ledger Ink panel with ginger uppercase labels and Smoke on Ink text.
- **Thank-you line:** Playfair, flanked by Ginger Root "✦" marks.

## Do's and Don'ts

### Do:
- **Do** keep every neutral warm; pick from Cream Paper, Counter Linen, Husk Border, Tan Rule and Field Loam before inventing a new gray.
- **Do** use Burnt Ginger (#A65800) for the one primary action per area, for money emphasis and whenever orange has to be read as text; keep Ginger Root (#D97706) for display type, rules and marks.
- **Do** use Garden Leaf (#3A6B1A) for categories, discounts and selected states.
- **Do** label editor sections with 11px uppercase 600-weight Burnt Ginger labels tracked at +1.6px.
- **Do** keep the invoice at 794px wide with 44px by 48px padding, so the PDF matches the preview.
- **Do** confirm additions with the leaf flash or ✓ state rather than toasts or modals.
- **Do** reference colors and shadows through the CSS variables in `css/base.css` (`var(--burnt-ginger)`, `var(--shadow-paper)`), never raw hex. The only literal colors are the theme-color meta tag and html2canvas's `backgroundColor` option, which can't read variables.

### Don't:
- **Don't** introduce corporate SaaS blue or cool-gray chrome.
- **Don't** go loud: no neon, saturated gradients or glows beyond the existing soft ginger halos.
- **Don't** drain the palette to cold black, white and gray monochrome; the warmth is the brand.
- **Don't** put Playfair Display on buttons, inputs or labels; it belongs to the brand and the document.
- **Don't** add shadows to editor cards or controls at rest; only the invoice sheet is lifted.
- **Don't** add a third accent color, or swap the ginger and leaf roles.
- **Don't** restyle invoice content with viewport media queries; use the `#preview-wrap` container query (see The PDF Stays A4 Rule).
- **Don't** set functional text below 11px.
