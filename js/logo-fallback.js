// Logo fallback: if logo.png is missing, draw a simple brand badge so the site and
// the PDF still render. Replace logo.png with the real logo to override this.
export function brandLogoFallback(img) {
  img.src = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3E%3Ccircle%20cx='50'%20cy='50'%20r='49'%20fill='%231C1C1C'/%3E%3Ccircle%20cx='50'%20cy='50'%20r='46'%20fill='none'%20stroke='%23E8820C'%20stroke-width='2.5'/%3E%3Ctext%20x='50'%20y='62'%20font-family='Georgia,serif'%20font-size='34'%20font-weight='700'%20fill='%23E8820C'%20text-anchor='middle'%3EBG%3C/text%3E%3C/svg%3E";
}

// Attach the fallback from JS (no inline onerror). An image that already failed
// before this ran is complete with zero natural width, so swap it straight away.
export function attachLogoFallbacks() {
  document.querySelectorAll('img[src="logo.png"]').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) brandLogoFallback(img);
    else img.addEventListener('error', () => { brandLogoFallback(img); }, { once: true });
  });
}
