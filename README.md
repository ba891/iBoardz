# iBoardz — Storefront

Static, dependency-free storefront for **iBoardz (Arduino Future)** — an electronics /
Arduino parts store for the Saudi market. Arabic-first (RTL), bilingual product data,
and a search engine built to behave like the big international stores.

The site is plain HTML + CSS + ES5-compatible JavaScript: no build step, no bundler,
no framework. Drop the folder on any static host (or run it through the local
server below) and it works.

---

## 1. Running it

```bash
npm start            # node ../store-dashboard/server.js  →  http://127.0.0.1:3000
npm test             # server API tests + search/catalog tests  (87 assertions)
npm run check        # node --check over every .js in the repo
npm run search:report   # human-readable search quality report
```

| URL | What it is |
| --- | --- |
| `http://127.0.0.1:3000/` | the storefront (this folder) |
| `http://127.0.0.1:3000/store-dashboard/` | the admin dashboard (sibling folder) |

A static host only needs the files in this folder — `catalog-data.js` is loaded as a
plain `<script>`, so the page also works when opened without any server.

---

## 2. Folder structure

```
iBoardz/
├── index.html                  the whole page shell (header, cart, footer, modals)
├── catalog-data.js             ⭐ single source of truth: meta, categories,
│                                  services, popular searches and all 41 products
├── logo111.jpeg                logo used by the dashboard / preview placeholders
├── logo123.jpeg                storefront logo (kept at the root on purpose)
│
├── assets/
│   ├── css/style.css           one stylesheet: base, dark mode, search UI, ad, responsive
│   ├── js/
│   │   ├── search-engine.js    window.IBSearch — normalization, synonyms, fuzzy, ranking
│   │   └── app.js              window.App     — routing, rendering, search UI, cart
│   └── fonts/                  riyal-sign.woff2 + OFL licence
│
├── images/
│   ├── logo.png
│   ├── banners/                add.jpg, add1.jpg — homepage carousel
│   ├── services/               3d-printing-service.jpg — the 3D printing ad artwork
│   └── products/<slug>/<file>  one folder per product (41 folders)
│
├── scripts/
│   └── migrate-store-images.js rewrites the dashboard DB image paths (re-runnable)
├── tests/
│   ├── search.test.js          node --test assertions: ranking, cut-off, catalog integrity
│   └── search-check.js         prints the ranking table for every sample query
└── docs/archive/               leftovers kept out of the way (old screenshot, unused assets)
```

### Why some files stay in the root

`catalog-data.js`, `logo111.jpeg` and `logo123.jpeg` are intentionally **not** moved:

* `store-dashboard/server.js` does `require(<storefront>/catalog-data.js)` to seed and
  validate the dashboard catalog.
* `store-dashboard/dashboard.js` references `logo123.jpeg` and builds product image URLs
  as `<storefrontBase()>images/<img>`.

Everything else (CSS, JS, fonts, banners, product photos) lives in `assets/` and
`images/`.

---

## 3. The catalog — `catalog-data.js`

One file, no build step, loaded both by the browser (`<script>`) and by Node
(`require`) so the storefront and the dashboard can never drift apart.

```js
module.exports = {
  meta:      { brand, tagline, whatsapp, email, site, currency, logo, ... },
  categories: [ { key, label, icon, aliases: [...] } ],   // 9 real + the "all" pseudo-key
  services:   [ { id, slug, name, nameAr, summary, longDesc, features, img, badge } ],
  popularSearches: [ 'اردوينو', 'ESP32', ... ],
  products:   [ {
    id, sku, slug, name, nameAr,
    price, op, cat,
    img: 'products/<slug>/<file>',      // relative to images/
    keywords: [...],                     // extra search terms, Arabic + English
    specs: [...], desc, badge, pop, stock, ...
  } ],
};
```

### Adding a product

1. Create `images/products/<slug>/` and drop the photo in.
2. Add the product to `products[]` in `catalog-data.js` with
   `img: 'products/<slug>/<file>'`.
3. Run `npm test` — it fails if the image is missing, if the file is not inside
   `images/<slug>/`, or if `id` / `slug` / `sku` collide.
4. Run `node scripts/migrate-store-images.js` so the dashboard DB picks up the new path.

### Adding the 3D printing ad

The service is described once in `services[]` and drives three surfaces:

* the dismissible announcement strip under the header (`renderHome`),
* the ad card on the homepage — artwork, feature grid, WhatsApp CTA (`renderAdSection`),
* the service modal, the search suggestions and the "did you mean" service row.

`images/services/3d-printing-service.jpg` (1184×880) is the artwork, and it is shown **whole**:
`.ad-media img` uses `height: auto`, so the frame keeps the image's own 1184×880 ratio and
nothing is ever clipped — the iBoardz logo in the top-left corner, the headline, the feature
list and the WhatsApp bar all stay complete. The photo is a `<button>`, so the whole picture is
clickable and reachable by keyboard, and the card reuses the product-card hover animation
(8px lift, offset shadow that grows, 1.06 image zoom).

It is also injected as `schema.org/Service` JSON-LD for SEO.

---

## 4. Search engine — `assets/js/search-engine.js`

Exposed as `window.IBSearch`, usable standalone:

```js
const index = IBSearch.build(products, categories);
const r = IBSearch.query(index, 'حساس حرارة', { limit: 8, minRatio: 0.18 });
// r.results  -> [{ product, score, matchedTokens, matchedIn, viaSynonym, strength }]
// r.total, r.tokens, r.suggestion, r.corrected, r.empty
IBSearch.highlight('ESP32 DEV MODEL', r.tokens);   // → '<mark>ESP32</mark> DEV MODEL'
```

Pipeline:

1. **Arabic normalization** — `أ إ آ ٱ → ا`, `ى → ي`, `ة → ه`, diacritics/tatweel
   removed, Arabic-Indic digits → latin, punctuation stripped, lower-cased.
2. **Tokenization** — `esp32c3` → `esp 32 c 3`, so `esp`, `32`… each match on their own.
3. **Weighted field index** — `name` 10 > `nameAr` 9 > `keywords` 7 > `sku` 6 >
   `category` 5 > `desc` 3.5 > `specs` 2.5 > `badge` 1. Prefix hits get ×1.5, exact
   name ×2.4.
4. **Bilingual synonyms** — `arduino ⇄ اردوينو ⇄ uno ⇄ لوح`, `سنسور → sensor`,
   `بطارية ⇄ battery ⇄ ليثيوم`… Multi-word entries (`حساس حرارة`) are matched as whole
   phrases, never split, otherwise `حرارة` would drag in every product that merely
   contains `حساس`. A synonym never "rescues" another word of the same query.
5. **Typo tolerance** — Damerau-Levenshtein with a length-aware budget (1 up to 4
   chars, 2 up to 8, 3 beyond). Arabic candidates must also match the last character,
   which kills false friends like `حرارة` ≈ `حساس`. Results are memoized per token.
6. **AND matching + ranking** — every query token must match. Score gets a phrase
   bonus, a popularity bonus, a badge bonus, an out-of-stock penalty, then fuzzy and
   synonym multipliers.
7. **Relevance cut-off** — anything below `minRatio` (default `0.18`) of the top hit is
   dropped, so one word never returns the whole catalog. `لا توجد نتائج` state shows up
   instead, with popular searches and categories.
8. **Did you mean** — offered only when the re-typed correction actually returns
   results (`countStrict`), so it never nags.

### UI behaviour (`assets/js/app.js`)

* Typing is debounced by 140 ms; results render live under both search boxes.
* Suggestions panel: products + services, price, matched-field hint, "view all (n)".
  It is a `position: fixed` layer on `<body>` positioned from the input's rect — it must
  **not** live inside the header, which carries `backdrop-filter` and would make the
  panel composite semi-transparent.
* Keyboard: `↑` `↓` move, `Enter` opens the highlighted row, `Esc` closes, `/` focuses
  the header search.
* Recent searches (`localStorage`) and popular searches when the box is empty.
* URL stays in sync: `?q=…&cat=…&sort=…`, so results are shareable and survive reload.
* Products page: category chips, 6 sort modes (relevance, popularity, price ↑↓,
  name, biggest discount) and a live result count.
* Entering a query from any page navigates to the products page automatically.

---

## 5. Dashboard compatibility

The dashboard lives in the sibling folder `store-dashboard/` and is served under
`/store-dashboard/`.

* It seeds itself from `catalog-data.js`, then merges only `price`, `stock` and
  `lowStockThreshold` into the storefront catalog — storefront `img` always wins.
* Dashboard image URLs are `<storefront>images/<img>`, so `img` must stay relative to
  `images/` (e.g. `products/<slug>/<file>`, each segment URL-encoded).
* After moving product images, run `node scripts/migrate-store-images.js` to rewrite the
  seeded `store-dashboard/data/store.json`.

---

## 6. Design notes

The storefront should read like a shop that a person maintains, not like generated
marketing filler. The rules that keep it there:

* **One icon set, no emoji.** Every icon — marquee, terms cards, warranty cards, cart
  savings — comes from the `icons` map in `app.js` as inline SVG (`currentColor`), so it
  scales, follows the theme and reads at 15px. Emoji were the main "AI template" tell and
  render differently on every OS.
* **No invented urgency.** The marquee advertises what the store actually does
  (delivery, warranty, support, discounts, original parts, the 3D printing service). No
  "-40%", no "24/7" promises that nobody keeps.
* **One card language.** `.ad-card` reuses the product-card hover (8px lift, offset
  shadow that grows, 1.06 image zoom, `--ease` transitions) instead of inventing its own.
* **Consistent motion tokens.** Radii, `--ease` / `--ease-bounce`, and the 1.5–1.8px
  stroke weight of every inline SVG come from the same scale.
* **Contrast is checked, not assumed.** Orange fills carry `#151515` ink, never white —
  white on `#ff9500` is 2.19:1 and fails WCAG AA. Lighthouse must stay at 100.
* **The marquee actually works.** The track is rendered twice and animates `translateX(0 →
  -50%)`, so the loop is seamless; the strip is anchored `direction: ltr` because an
  over-wide box inside the RTL page would be pinned to the right edge and scroll out of
  sight. The strip fades at both ends with a mask instead of a hard cut.

---

## 7. Quality gates

`npm test` (87 assertions) covers:

* the top hit for 30 queries, Arabic and English, including typos (`dth11`, `oeld`,
  `hlc-sr04`, `sirvo`),
* prefix matching (`ار` → ARDUINO UNO R3, `esp`, `mq`) and single-letter rejection,
* the relevance cut-off (e.g. `حساس حرارة` ≤ 6 results, `breadboard` exactly 1),
* zero-result handling (`xyz123`, `良品`, `g책`),
* Arabic normalization, highlighting and HTML escaping,
* catalog integrity: unique `id`/`slug`/`sku`, known category, **image exists on disk
  inside `images/<slug>/`**,
* every asset referenced by `index.html` exists,
* the 3D printing ad: the artwork exists, the service `img` points at it, and `index.html`
  references the same path (JSON-LD).

Lighthouse on the homepage: **Accessibility 100 · Best Practices 100 · SEO 100**.
