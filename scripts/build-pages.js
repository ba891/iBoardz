/**
 * iBoardz — static page generator
 * ------------------------------------------------------------------
 * Builds the real, indexable paths for the storefront:
 *
 *   /shop/
 *   /category/<category-key>/
 *   /product/<product-slug>/
 *   /projects/  /contact/  /terms/   (+ /features/ redirect for old links)
 *
 * Every page shares the same header, cart drawer and footer as index.html,
 * but gets its own <title>, description, canonical URL and JSON-LD.
 *
 * Run after changing catalog-data.js:
 *   node scripts/build-pages.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const catalog = require(path.join(ROOT, 'catalog-data.js'));
const SITE = String(catalog.meta.site || 'https://iboardz.netlify.app').replace(/\/+$/, '');
const BRAND = 'iBoardz';
const DEFAULT_IMAGE = SITE + '/images/banners/add.jpg';

const esc = (value) => String(value == null ? '' : value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

// Specs are stored as "label: value" strings (or {label, value} objects).
const specParts = (value) => {
  if (value && typeof value === 'object') {
    return {
      label: String(value.label == null ? '' : value.label).trim(),
      value: String(value.value == null ? '' : value.value).trim(),
    };
  }
  const text = String(value == null ? '' : value).trim();
  const sep = text.indexOf(':');
  if (sep > 0) return { label: text.slice(0, sep).trim(), value: text.slice(sep + 1).trim() };
  return { label: '', value: text };
};

const json = (value) => JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
const imagePath = (rel) => encodeURI('images/' + String(rel || '').replace(/^images\//, ''));
const absoluteImage = (rel) => SITE + '/' + imagePath(rel);
const absolute = (route) => SITE + route;

function countByCat() {
  const counts = {};
  catalog.products.forEach((product) => {
    counts[product.cat] = (counts[product.cat] || 0) + 1;
  });
  return counts;
}
const COUNTS = countByCat();

function productRoute(product) {
  return `/product/${encodeURIComponent(product.slug)}/`;
}
function categoryRoute(key) {
  return `/category/${encodeURIComponent(key)}/`;
}

function icon(name) {
  // A tiny subset of the storefront icon set, only used inside <noscript>.
  const paths = {
    box: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  };
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.box}</svg>`;
}

function head(options) {
  const {
    title, description, keywords, route, image, imageAlt, ogType, extraLd, root,
  } = options;
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<script>
(function() {
  try {
    var t = localStorage.getItem('iboardz-theme');
    if (t !== 'dark' && t !== 'light') {
      t = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
</script>
<meta charset="UTF-8">
<meta name="color-scheme" content="light dark">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${keywords ? `<meta name="keywords" content="${esc(keywords)}">` : ''}
<meta name="author" content="${esc(BRAND)}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<link rel="canonical" href="${esc(absolute(route))}">
<meta name="theme-color" content="#ff9500">
<meta name="geo.region" content="SA">
<meta name="geo.placename" content="Saudi Arabia">
<meta name="rating" content="general">

<meta property="og:type" content="${esc(ogType || 'website')}">
<meta property="og:site_name" content="${esc(BRAND)}">
<meta property="og:locale" content="ar_SA">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(absolute(route))}">
<meta property="og:image" content="${esc(image || DEFAULT_IMAGE)}">
<meta property="og:image:alt" content="${esc(imageAlt || 'iBoardz — متجر الإلكترونيات والاردوينو')}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image || DEFAULT_IMAGE)}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Sans+Symbols+2&display=swap" rel="stylesheet">
<link rel="icon" type="image/png" href="${root}images/logo.png?v=3">
<link rel="apple-touch-icon" href="${root}images/logo.png?v=3">
<link rel="stylesheet" href="${root}assets/css/style.css?v=15">
<link rel="stylesheet" href="${root}assets/css/mega-menu.css?v=4">
${extraLd ? extraLd : ''}
</head>`;
}

function headerAndChrome(root) {
  return `<a class="skip-link" href="#mainContent">تجاوز إلى المحتوى الرئيسي</a>

<header class="header" id="header">
  <a class="logo" href="${root}" title="iBoardz — الصفحة الرئيسية" aria-label="iBoardz — الصفحة الرئيسية">
    <span class="logo-text"><span class="i">i</span><span class="boardz">Boardz</span></span>
  </a>

  <div class="header-search" id="headerSearch" role="search">
    <div class="search-field">
      <input type="search" id="headerSearchInput" placeholder="ابحث عن قطعة… مثال: حساس حرارة"
        oninput="App.searchDebounced(this.value,'header')" onfocus="App.focusSearch('header')" onkeydown="App.searchKeydown(event)"
        autocomplete="off" autocapitalize="off" spellcheck="false"
        role="combobox" aria-expanded="false" aria-controls="searchSuggest" aria-autocomplete="list" aria-label="ابحث عن منتج">
      <span class="search-field-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </span>
      <button class="search-field-clear" data-search-clear onclick="App.clearSearch('header')" aria-label="مسح البحث" hidden>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div id="searchSuggest" class="search-suggest" role="listbox" aria-label="نتائج البحث الفورية" hidden></div>
  </div>

  <div class="header-actions">
    <button class="menu-btn" onclick="App.toggleMenu(event)" aria-label="القائمة" aria-expanded="false" aria-controls="dropdown" aria-haspopup="true" title="القائمة">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
    <button class="cart-btn icon-btn" onclick="App.openCart()">
      <span class="sr-only">سلة التسوق</span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
      <span class="cart-badge" id="cartBadge" style="display:none">0</span>
    </button>
    <button class="theme-toggle icon-btn" id="themeToggle" onclick="App.toggleTheme()" aria-label="الوضع الداكن">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    </button>
    <button class="search-toggle icon-btn" id="searchToggle" onclick="App.toggleHeaderSearch()" aria-label="بحث">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </button>
  </div>
</header>

<div id="dropdown" class="dropdown-menu"></div>
<div id="menuBackdrop" onclick="App.closeMenu()"></div>

<div id="cartOverlay" class="cart-overlay">
  <div class="cart-backdrop" onclick="App.closeCart()"></div>
  <div class="cart-panel">
    <div class="cart-header">
      <h2>سلة التسوق (<span id="cartCount">0</span>)</h2>
      <button class="cart-close icon-btn" onclick="App.closeCart()" aria-label="إغلاق السلة">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="cart-body" id="cartBody"></div>
    <div class="cart-footer" id="cartFooter" style="display:none"></div>
  </div>
</div>

<div id="modalOverlay" class="modal-overlay" style="display:none"></div>
<div id="toastContainer" class="toast-container" aria-live="polite" aria-atomic="false"></div>
<button id="backToTop" class="back-to-top" type="button" onclick="App.scrollToTop()" aria-label="العودة للأعلى">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
</button>`;
}

function footer(root) {
  const cats = catalog.categories.filter((c) => c.key !== 'all');
  return `<footer class="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-col footer-brand">
        <div class="footer-logo"><span class="i">i</span><span class="boardz">Boardz</span></div>
        <div class="footer-subtitle">ARDUINO <span class="future">FUTURE</span></div>
        <p class="footer-desc">منصتك الأولى لمكونات الإلكترونيات والبرمجة في المملكة العربية السعودية</p>
        <div class="footer-trust">
          <span>أصلي ومضمون</span>
          <span>شحن لكل المملكة</span>
          <span>دعم فني مباشر</span>
        </div>
      </div>
      <div class="footer-col">
        <h3>روابط سريعة</h3>
        <div class="footer-links" id="footerLinks">
          <a href="${root}">الرئيسية</a>
          <a href="${root}shop/">المنتجات</a>
          <a href="${root}projects/">ابنِ مشروعك</a>
          <a href="${root}contact/">تواصل معنا</a>
          <a href="${root}terms/">الشروط والأحكام</a>
        </div>
      </div>
      <div class="footer-col">
        <h3>أقسام المتجر</h3>
        <div class="footer-links footer-cat-links" id="footerCategories">
          ${cats.map((c) => `<a href="${root}category/${esc(c.key)}/">${esc(c.label)}<span>${COUNTS[c.key] || 0}</span></a>`).join('\n          ')}
        </div>
      </div>
      <div class="footer-col">
        <h3>تواصل معنا</h3>
        <div class="footer-contact">
          <p>واتساب: <a class="phone" href="https://wa.me/${esc(catalog.meta.whatsapp)}" target="_blank" rel="noopener noreferrer">${esc(catalog.meta.whatsappDisplay)}</a></p>
          <p>البريد: <a href="mailto:${esc(catalog.meta.email)}">${esc(catalog.meta.email)}</a></p>
          <p class="footer-address">الرياض، المملكة العربية السعودية</p>
        </div>
        <div class="footer-payments" aria-label="طرق الدفع المتاحة">
          <span>مدى</span><span>Apple Pay</span><span>STC Pay</span><span>تحويل بنكي</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="footerYear">2026</span> iBoardz</span>
      <span class="footer-bottom-sep">—</span>
      <span>جميع الحقوق محفوظة</span>
      <a class="footer-policy" href="${root}terms/">الشروط والأحكام</a>
      <a class="footer-policy" href="${root}contact/">الدعم والمساعدة</a>
    </div>
  </div>
</footer>`;
}

function page(options) {
  const {
    page: pageType, root, bodyAttrs, title, description, keywords, route,
    image, imageAlt, ogType, extraLd, main,
  } = options;
  const bodyData = [
    `data-page="${esc(pageType)}"`,
    bodyAttrs || '',
    `data-root="${root}"`,
  ].filter(Boolean).join(' ');

  return `${head({ title, description, keywords, route, image, imageAlt, ogType, extraLd, root })}
<body ${bodyData}>

${headerAndChrome(root)}

<main class="main" id="mainContent" tabindex="-1">
${main}
</main>

${footer(root)}

<script src="${root}catalog-data.js"></script>
<script src="${root}assets/js/search-engine.js"></script>
<script src="${root}assets/js/menu.js"></script>
<script src="${root}assets/js/app.js?v=11"></script>
</body>
</html>
`;
}

function productLd(product) {
  const route = productRoute(product);
  const url = absolute(route);
  const stock = product.stock == null || product.stock === '' ? null : Math.max(0, Math.floor(Number(product.stock) || 0));
  const availability = stock === 0 ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': url + '#product',
        name: product.name,
        alternateName: product.nameAr,
        sku: product.sku || String(product.id),
        description: product.desc,
        image: [absoluteImage(product.img)],
        category: catalog.categories.find((c) => c.key === product.cat)?.label || product.cat,
        brand: { '@type': 'Brand', name: 'iBoardz' },
        itemCondition: 'https://schema.org/NewCondition',
        offers: {
          '@type': 'Offer',
          url,
          priceCurrency: 'SAR',
          price: product.price,
          availability,
          seller: { '@type': 'Organization', name: 'iBoardz', url: SITE },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: absolute('/') },
          { '@type': 'ListItem', position: 2, name: 'المنتجات', item: absolute('/shop/') },
          {
            '@type': 'ListItem',
            position: 3,
            name: catalog.categories.find((c) => c.key === product.cat)?.label || product.cat,
            item: absolute(categoryRoute(product.cat)),
          },
          { '@type': 'ListItem', position: 4, name: product.name, item: url },
        ],
      },
    ],
  };
}

function productPage(product) {
  const root = '../../';
  const route = productRoute(product);
  const cat = catalog.categories.find((c) => c.key === product.cat) || { label: product.cat, desc: '' };
  const specs = Array.isArray(product.specs) ? product.specs : [];
  const wa = `https://wa.me/${catalog.meta.whatsapp}?text=${encodeURIComponent('مرحباً، أريد طلب: ' + product.name + ' (الرمز: ' + (product.sku || product.id) + ')')}`;
  const fallback = `<noscript>
  <div class="noscript-notice product-fallback">
    <nav class="breadcrumbs" aria-label="مسار التصفح">
      <a href="${root}">الرئيسية</a>
      <span class="crumb-sep">/</span>
      <a href="${root}shop/">المنتجات</a>
      <span class="crumb-sep">/</span>
      <a href="${root}category/${esc(product.cat)}/">${esc(cat.label)}</a>
    </nav>
    <h1>${esc(product.name)}</h1>
    <p>${esc(product.nameAr)}</p>
    <p>${esc(product.desc)}</p>
    <p><strong>السعر: ${esc(product.price)} ر.س</strong> — بدلاً من ${esc(product.op)} ر.س</p>
    <h2>المواصفات التقنية</h2>
    <ul>${specs.map((s) => { const parts = specParts(s); return `<li>${parts.label ? `<strong>${esc(parts.label)}:</strong> ` : ''}${esc(parts.value)}</li>`; }).join('')}</ul>
    <p><a href="${esc(wa)}" target="_blank" rel="noopener noreferrer">اطلب عبر واتساب</a></p>
  </div>
</noscript>`;

  return page({
    page: 'product',
    root,
    bodyAttrs: `data-product="${esc(product.slug)}" data-category="${esc(product.cat)}"`,
    title: `${product.name} — ${product.nameAr} | iBoardz`,
    description: `${product.name} ${product.nameAr}: ${product.desc} — السعر ${product.price} ر.س مع شحن سريع لجميع مناطق المملكة من iBoardz.`,
    keywords: [product.name, product.nameAr, cat.label, 'iBoardz', ...(product.keywords || [])].join(', '),
    route,
    image: absoluteImage(product.img),
    imageAlt: `${product.name} — ${product.nameAr}`,
    ogType: 'product',
    extraLd: `<script type="application/ld+json">\n${json(productLd(product))}\n</script>`,
    main: fallback,
  });
}

function categoryPage(category) {
  const root = '../../';
  const route = categoryRoute(category.key);
  const products = catalog.products.filter((p) => p.cat === category.key);
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': absolute(route) + '#collection',
        name: category.label,
        description: category.desc,
        url: absolute(route),
        isPartOf: { '@type': 'WebSite', name: 'iBoardz', url: absolute('/') },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: products.length,
          itemListElement: products.map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: p.name,
            url: absolute(productRoute(p)),
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: absolute('/') },
          { '@type': 'ListItem', position: 2, name: 'المنتجات', item: absolute('/shop/') },
          { '@type': 'ListItem', position: 3, name: category.label, item: absolute(route) },
        ],
      },
    ],
  };
  const fallback = `<noscript>
  <div class="noscript-notice">
    <nav class="breadcrumbs" aria-label="مسار التصفح">
      <a href="${root}">الرئيسية</a>
      <span class="crumb-sep">/</span>
      <a href="${root}shop/">المنتجات</a>
    </nav>
    <h1>${esc(category.label)}</h1>
    <p>${esc(category.desc)}</p>
    <p>${products.length} منتجات في هذا القسم.</p>
    <ul>
      ${products.map((p) => `<li><a href="${root}product/${esc(p.slug)}/">${esc(p.name)} — ${esc(p.nameAr)} — ${esc(p.price)} ر.س</a></li>`).join('\n      ')}
    </ul>
  </div>
</noscript>`;

  return page({
    page: 'category',
    root,
    bodyAttrs: `data-category="${esc(category.key)}"`,
    title: `${category.label} — ${products.length} منتجات | iBoardz`,
    description: `${category.label}: ${category.desc} — تصفح ${products.length} منتجات من iBoardz مع شحن سريع لجميع مناطق المملكة.`,
    keywords: [category.label, category.desc, 'iBoardz', ...(category.aliases || [])].join(', '),
    route,
    image: DEFAULT_IMAGE,
    imageAlt: category.label + ' — iBoardz',
    ogType: 'website',
    extraLd: `<script type="application/ld+json">\n${json(ld)}\n</script>`,
    main: fallback,
  });
}

function shopPage() {
  const root = '../';
  const route = '/shop/';
  const products = catalog.products;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': absolute(route) + '#collection',
        name: 'كل منتجات iBoardz',
        description: 'تسوق جميع قطع الإلكترونيات ومكونات Arduino وESP32 والحساسات والشاشات ومستلزمات التوصيل.',
        url: absolute(route),
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: products.length,
          itemListElement: products.map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: p.name,
            url: absolute(productRoute(p)),
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: absolute('/') },
          { '@type': 'ListItem', position: 2, name: 'المنتجات', item: absolute(route) },
        ],
      },
    ],
  };
  const cats = catalog.categories.filter((c) => c.key !== 'all');
  const fallback = `<noscript>
  <div class="noscript-notice">
    <h1>كل منتجات iBoardz</h1>
    <p>تصفح ${products.length} قطعة إلكترونية من أردوينو وESP32 والحساسات والشاشات ووحدات الطاقة ومستلزمات التوصيل.</p>
    <h2>الأقسام</h2>
    <ul>${cats.map((c) => `<li><a href="${root}category/${esc(c.key)}/">${esc(c.label)} (${COUNTS[c.key] || 0})</a></li>`).join('')}</ul>
  </div>
</noscript>`;

  return page({
    page: 'shop',
    root,
    title: `كل المنتجات — ${products.length} قطعة إلكترونية | iBoardz`,
    description: `تسوق جميع منتجات iBoardz من Arduino وESP32 والحساسات والشاشات ووحدات الطاقة ومستلزمات التوصيل — ${products.length} قطعة مع شحن سريع.`,
    keywords: 'متجر الكترونيات, اردوينو, ESP32, حساسات, شاشات OLED, iBoardz, قطع الكترونية, السعودية',
    route,
    image: DEFAULT_IMAGE,
    imageAlt: 'iBoardz — كل المنتجات',
    ogType: 'website',
    extraLd: `<script type="application/ld+json">\n${json(ld)}\n</script>`,
    main: fallback,
  });
}

function contentPage(type) {
  const root = '../';
  const meta = {
    projects: {
      route: '/projects/',
      title: 'أطقم مشاريع جاهزة — ابنِ مشروعك بطقم واحد | iBoardz',
      description: 'أطقم مشاريع أردوينو وESP32 جاهزة تُباع كمنتج واحد بسعر واحد يشمل كل القطع. اختر طقمك وأضفه إلى السلة بضغطة واحدة من iBoardz.',
      heading: 'ابنِ مشروعك',
      intro: 'أطقم مشاريع جاهزة تُباع كمنتج واحد بسعر واحد، مع محتويات كل طقم وخطوات التركيب ونصائح عملية.',
    },
    contact: {
      route: '/contact/',
      title: 'تواصل معنا — iBoardz',
      description: 'تواصل مع فريق iBoardz عبر واتساب أو البريد الإلكتروني للاستفسار عن المنتجات والطلبات وخدمة الطباعة ثلاثية الأبعاد.',
      heading: 'تواصل معنا',
      intro: 'نرحب بتواصلك في أي وقت. فريقنا جاهز للإجابة على استفساراتك ومساعدتك في اختيار القطع المناسبة.',
    },
    terms: {
      route: '/terms/',
      title: 'الشروط والأحكام — iBoardz',
      description: 'الشروط والأحكام وسياسة الشحن والاستبدال والضمان والخصوصية في متجر iBoardz.',
      heading: 'الشروط والأحكام',
      intro: 'سياسة الشحن والاستبدال والضمان والخصوصية في متجر iBoardz.',
    },
  }[type];

  const projects = type === 'projects' ? (catalog.projects || []) : [];
  const levelLabel = (level) => ({ beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' }[level] || 'متوسط');
  const projectLines = (project) => (project.parts || []).map((part) => {
    const product = catalog.products.find((p) => String(p.id) === String(part.id));
    return product ? { product, qty: Math.max(1, Number(part.qty) || 1) } : null;
  }).filter(Boolean);
  const roundUpToNine = (value) => {
    let n = Math.max(1, Math.ceil(Number(value) || 0));
    while (String(n).indexOf('9') === -1) n += 1;
    return n;
  };
  const projectTotal = (project) => {
    const listed = Number(project.price);
    if (Number.isFinite(listed) && listed > 0) return Math.round(listed * 100) / 100;
    return roundUpToNine(projectLines(project)
      .reduce((sum, line) => sum + line.product.price * line.qty, 0));
  };

  const ld = {
    '@context': 'https://schema.org',
    '@type': type === 'projects' ? 'CollectionPage' : 'WebPage',
    name: meta.heading,
    description: meta.description,
    url: absolute(meta.route),
    isPartOf: { '@type': 'WebSite', name: 'iBoardz', url: absolute('/') },
  };
  if (projects.length) {
    ld.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        item: {
          '@type': ['Product', 'HowTo'],
          name: project.title,
          description: project.summary,
          image: (() => {
            const first = projectLines(project)[0];
            return first ? absoluteImage(first.product.img) : DEFAULT_IMAGE;
          })(),
          estimatedCost: { '@type': 'MonetaryAmount', currency: 'SAR', value: projectTotal(project) },
          offers: {
            '@type': 'Offer',
            price: projectTotal(project),
            priceCurrency: 'SAR',
            availability: 'https://schema.org/InStock',
            url: absolute('/projects/') + '#project-' + encodeURIComponent(project.key),
          },
          supply: projectLines(project).map(({ product, qty }) => ({
            '@type': 'HowToSupply',
            name: `${product.name} ×${qty}`,
            url: absolute(productRoute(product)),
          })),
          step: (project.steps || []).map((step, stepIndex) => ({
            '@type': 'HowToStep',
            position: stepIndex + 1,
            text: step,
          })),
        },
      })),
    };
  }

  const projectFallback = projects.map((project) => `<section>
      <h2>${esc(project.title)}</h2>
      <p>${esc(project.summary)}</p>
      <p><strong>المستوى:</strong> ${esc(levelLabel(project.level))} — <strong>الوقت المتوقع:</strong> ${esc(project.time)}</p>
      <h3>محتويات الطقم</h3>
      <ul>${projectLines(project).map(({ product, qty }) => `<li><a href="${root}product/${esc(product.slug)}/">${esc(product.name)}</a> ×${qty}</li>`).join('')}</ul>
      <p><strong>سعر الطقم كامل: ${esc(projectTotal(project))} ر.س</strong> — يُباع كمنتج واحد ويشمل كل القطع أعلاه.</p>
      <h3>خطوات التركيب</h3>
      <ol>${(project.steps || []).map((step) => `<li>${esc(step)}</li>`).join('')}</ol>
      <p>${esc(project.tip)}</p>
    </section>`).join('\n    ');

  const fallback = `<noscript>
  <div class="noscript-notice">
    <nav class="breadcrumbs" aria-label="مسار التصفح">
      <a href="${root}">الرئيسية</a>
      <span class="crumb-sep">/</span>
      <span class="crumb-current">${esc(meta.heading)}</span>
    </nav>
    <h1>${esc(meta.heading)}</h1>
    <p>${esc(meta.intro)}</p>
    ${projects.length ? `${projectFallback}\n    <p><a href="${root}shop/">تصفح كل القطع في المتجر</a></p>` : ''}
    <p>لتجربة الموقع الكاملة يرجى تفعيل JavaScript، أو تواصل معنا عبر واتساب: <a href="https://wa.me/${esc(catalog.meta.whatsapp)}" target="_blank" rel="noopener noreferrer">${esc(catalog.meta.whatsappDisplay)}</a></p>
  </div>
</noscript>`;

  return page({
    page: type,
    root,
    title: meta.title,
    description: meta.description,
    keywords: type === 'projects'
      ? 'أطقم مشاريع, مشاريع اردوينو, مشاريع ESP32, مشاريع جاهزة, ابنِ مشروعك, iBoardz'
      : 'iBoardz, ' + meta.heading,
    route: meta.route,
    image: DEFAULT_IMAGE,
    imageAlt: meta.heading + ' — iBoardz',
    ogType: 'website',
    extraLd: `<script type="application/ld+json">\n${json(ld)}\n</script>`,
    main: fallback,
  });
}

function redirectPage(to) {
  const target = absolute(to);
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<script>
(function() {
  try {
    var t = localStorage.getItem('iboardz-theme');
    if (t !== 'dark' && t !== 'light') {
      t = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
</script>
<meta charset="UTF-8">
<meta name="color-scheme" content="light dark">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="refresh" content="0; url=${esc(to)}">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${esc(target)}">
<title>انتقل إلى ابنِ مشروعك — iBoardz</title>
<style>
  body { margin: 0; padding: 24px; font-family: 'IBM Plex Sans Arabic', sans-serif; background: #fafafa; color: #1a1a2e; }
  html[data-theme="dark"] body { background: #0a0a14; color: #e8e8f0; }
  a { color: #ff9500; }
</style>
</head>
<body>
<p>انتقل قسم المميزات إلى صفحة <a href="${esc(to)}">ابنِ مشروعك</a>.</p>
</body>
</html>
`;
}

function write(route, html) {
  // route: /product/slug/  ->  product/slug/index.html
  const rel = route.replace(/^\/+|\/+$/g, '');
  const file = path.join(ROOT, ...(rel ? rel.split('/') : []), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, 'utf8');
  return path.relative(ROOT, file);
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  const add = (route, priority, changefreq) => urls.push({ route, priority, changefreq });

  add('/', '1.0', 'weekly');
  add('/shop/', '0.95', 'weekly');
  catalog.categories.filter((c) => c.key !== 'all').forEach((c) => {
    add(categoryRoute(c.key), '0.9', 'weekly');
  });
  catalog.products.forEach((p) => {
    add(productRoute(p), '0.8', 'weekly');
  });
  add('/projects/', '0.75', 'monthly');
  add('/contact/', '0.6', 'monthly');
  add('/terms/', '0.5', 'monthly');

  const body = urls.map((entry) => `  <url>
    <loc>${esc(absolute(entry.route))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
  return urls.length;
}

const written = [];
written.push(write('/shop/', shopPage()));
['projects', 'contact', 'terms'].forEach((type) => {
  written.push(write('/' + type + '/', contentPage(type)));
});
// Old shared links still resolve; Netlify serves the 301 from _redirects,
// every other static host gets this meta-refresh page.
written.push(write('/features/', redirectPage('/projects/')));
catalog.categories.filter((c) => c.key !== 'all').forEach((category) => {
  written.push(write(categoryRoute(category.key), categoryPage(category)));
});
catalog.products.forEach((product) => {
  written.push(write(productRoute(product), productPage(product)));
});
const sitemapCount = buildSitemap();

console.log(`Generated ${written.length} pages + sitemap.xml (${sitemapCount} URLs).`);
