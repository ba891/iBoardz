/**
 * iBoardz Storefront — application
 * ------------------------------------------------------------------
 * Sections:
 *   1. Data            2. State           3. Helpers
 *   4. Persistence     5. Theme           6. Navigation
 *   7. Cart            8. Contact/Toast   9. Modal
 *  10. SEARCH (live suggestions, instant results, sort, history, URL sync)
 *  11. Rendering      12. Pages          13. Carousel / effects
 *  14. Events / init  15. Structured data
 */
const App = {
  // ===== 1. DATA =====
  catalog: window.IBOARDZ_CATALOG || { products: [], categories: [], services: [] },
  products: window.IBOARDZ_CATALOG ? window.IBOARDZ_CATALOG.products : [],
  services: window.IBOARDZ_CATALOG && window.IBOARDZ_CATALOG.services ? window.IBOARDZ_CATALOG.services : [],
  projects: window.IBOARDZ_CATALOG && window.IBOARDZ_CATALOG.projects ? window.IBOARDZ_CATALOG.projects : [],
  popularSearches: window.IBOARDZ_CATALOG && window.IBOARDZ_CATALOG.popularSearches ? window.IBOARDZ_CATALOG.popularSearches : [],
  meta: (window.IBOARDZ_CATALOG && window.IBOARDZ_CATALOG.meta) || { whatsapp: '966552645082', whatsappDisplay: '+966 552 645 082', email: 'iBoardz@outlook.com' },

  // Which static shell we are on (home / shop / category / product / projects / contact / terms)
  // and the relative prefix that points at the site root from this page.
  pageType: (document.body && document.body.dataset.page) || 'home',
  root: (document.body && document.body.dataset.root) || './',
  // True when the page was opened straight from disk. Browsers show a folder
  // listing for `file://…/shop/` instead of serving its index.html, and there
  // is no API origin, so links and the catalog sync adapt (see localHref).
  localFileMode: window.location.protocol === 'file:',
  siteOrigin: (window.IBOARDZ_CATALOG && window.IBOARDZ_CATALOG.meta && window.IBOARDZ_CATALOG.meta.site) || 'https://iboardz.netlify.app',

  // category icons (presentation only — labels/aliases live in catalog-data.js)
  catIcons: {
    all: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    mcu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4"/><path d="M13 2v3M17 2v3M7 2v3M21 13h-3M21 17h-3M21 7h-3M3 13h3M3 17h3M3 7h3M13 22v-3M17 22v-3M7 22v-3"/>',
    sensor: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    display: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    motor: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    input: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/>',
    output: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    power: '<rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="14"/>',
    module: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    accessory: '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>',
  },

  reviews: [
    { text: 'جاني المستشعرات وكل الجهاز مع بعض مغلف كويس وشرح لي كل التفاصيل، أنصحكم تتعاملون معه.', stars: 5 },
    { text: 'تعاملت معه لأنه كان عندي هاكاثون ومشروع يبيله برمجة ومستشعرات طبية وشغلات كثيرة، ما قصّر أبداً اشتغل من ذمّته وهو وفّر كل القطع وبرمجها لي، وكان يجاوب على أسئلتي وكل ما أعطيه يضيف شيء إضافي للمشروع وشرح لي بذمّة وضمير، الله يجزاه خير أنصحكم فيه.', stars: 5 },
    { text: 'شغله ما شاء الله رهيب.', stars: 5 },
    { text: 'صراحة الرجال متعاون جداً وشغله مضمون، سويت عنده مشروع تخرج أردوينو وما قصّر معي في شيء، أنصح بالتعامل معه.', stars: 5 },
    { text: 'بصراحة أنصح بالتعامل معه، الرجال خدوم في أيام قليلة وخلص المشروع.', stars: 5 },
    { text: 'الرجال واجد طيب وتعامله راقي، يستاهل 10/10 وفنّان في المشاريع.', stars: 5 },
    { text: 'الرجال ما قصّر، كان عندي مشروع حاولت تشغيله أكثر من مرّة وجا الرجال وعطاني الكود البرمجي واشتغل معي الحمد لله.', stars: 5 },
    { text: 'Perfect 👌🏼', stars: 5 },
    { text: 'ممتازه جداً', stars: 5 },
    { text: 'احترام يجيب بسرعه', stars: 5 },
  ],

  // Project-page helpers (board picker). Product data still comes from the catalog.
  boards: [
    {
      id: 3, badge: 'الأنسب للبداية',
      bullets: ['5V ومنافذ متوافقة مع أغلب الشيلدات', 'شروحات ومكتبات جاهزة بلا نهاية', 'الأفضل لمشاريع الدروس والتجارب'],
      best: 'اخترها إذا كانت هذه أول مرة تمسك فيها لوح أردوينو أو تتبع شرحاً دراسياً.',
    },
    {
      id: 2, badge: 'الأكثر مرونة',
      bullets: ['واي فاي + بلوتوث مدمجان', 'معالج أسرع وذاكرة أكبر', 'مناسب لمشاريع IoT والتحكم عن بعد'],
      best: 'اخترها إذا كان مشروعك يحتاج اتصالاً بالإنترنت أو تطبيق جوال أو حساسات متعددة.',
    },
    {
      id: 4, badge: 'الأصغر حجماً',
      bullets: ['حجم صغير جداً للتركيب داخل العلبة', 'واي فاي + بلوتوث', 'منافذ أقل — يكفي للمشاريع المدمجة'],
      best: 'اخترها إذا كان الحجم مهمًا (ساعة، حساس متنقل، علبة صغيرة) ولا تحتاج منافذ كثيرة.',
    },
  ],

  navItems: [
    { key: 'home', label: 'الرئيسية' },
    { key: 'products', label: 'المنتجات' },
    { key: 'projects', label: 'ابنِ مشروعك' },
    { key: 'contact', label: 'تواصل معنا' },
    { key: 'terms', label: 'الشروط والأحكام' },
  ],

  icons: {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    box: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    envelope: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',
    truck: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    headset: '<path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>',
    phone: '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>',
    whatsapp: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    fire: '<path d="M12 2s4 4 4 8a4 4 0 01-8 0c0-1 .5-2 1-3 0 2 1 3 1 3s0-4 2-8z"/><path d="M6 14a6 6 0 0012 0"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    cloud: '<path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>',
    droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>',
    radar: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="12" x2="19" y2="5"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>',
    door: '<path d="M4 21V3h12v18"/><path d="M16 21h4"/><circle cx="12" cy="12" r="1"/>',
    wifi: '<path d="M5 12.55a11 11 0 0114 0"/><path d="M8.5 16.1a6 6 0 017 0"/><path d="M12 20h.01"/>',
    battery: '<rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/>',
    calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="11" x2="8.01" y2="11"/><line x1="12" y1="11" x2="12.01" y2="11"/><line x1="16" y1="11" x2="16.01" y2="11"/><line x1="8" y1="15" x2="8.01" y2="15"/><line x1="12" y1="15" x2="12.01" y2="15"/><line x1="8" y1="19" x2="8.01" y2="19"/><line x1="12" y1="19" x2="12.01" y2="19"/><line x1="16" y1="15" x2="16" y2="19"/>',
    bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7V18h8v-3.3A7 7 0 0012 2z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>',
    tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    award: '<circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"/>',
    mapPin: '<path d="M21 10c0 6.5-9 12-9 12s-9-5.5-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
    clipboard: '<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
    wrench: '<path d="M20.5 6.5a5 5 0 01-7.6 4.3l-8.8 8.8a2 2 0 11-2.8-2.8l8.8-8.8A5 5 0 0117 6.5l-2.9 2.9 2.5 2.5 2.9-2.9a5 5 0 01-1.5 1.5z"/>',
    card: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/><line x1="5" y1="15" x2="9" y2="15"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  },

  // ===== 2. STATE =====
  state: {
    page: 'home', menuOpen: false, cartOpen: false, cart: [],
    filter: 'all', search: '', sort: 'relevance', ci: 0, selProd: null,
    currentProduct: null, notFound: false,
    pageNum: 1, perPage: 12, price: 'all', onlySale: false, onlyPop: false,
    homeTab: 'popular', projectLevel: 'all', filtersOpen: false,
  },

  // sort options (label + comparator)
  sorts: [
    { key: 'relevance', label: 'الأكثر صلة' },
    { key: 'popular', label: 'الأكثر رواجاً' },
    { key: 'price-asc', label: 'الأقل سعراً' },
    { key: 'price-desc', label: 'الأعلى سعراً' },
    { key: 'name', label: 'الاسم (أ-ي)' },
    { key: 'discount', label: 'أكبر خصم' },
  ],

  // price buckets used by the shop sidebar
  priceRanges: [
    { key: 'all', label: 'كل الأسعار' },
    { key: 'under-10', label: 'أقل من 10 ر.س' },
    { key: '10-25', label: '10 - 25 ر.س' },
    { key: '25-50', label: '25 - 50 ر.س' },
    { key: '50-plus', label: '50 ر.س وأكثر' },
  ],

  carouselTimer: null,
  _bodyLockCount: 0,
  _revealObserver: null,
  _headerSearchOpen: false,
  _lastAdd: null,
  _suggestOpen: false,
  _suggestAnchor: null,
  _suggestItems: [],
  _suggestActive: -1,
  _searchTimer: null,
  _searchOrigin: 'header',
  _lastResult: null,
  _sectionScrollTop: null,
  _sectionScrollSetup: false,
  RECENT_KEY: 'iboardz-recent-searches',
  SECTION_SCROLL_KEY: 'iboardz-section-scroll',
  AD_KEY: 'iboardz-ad-3d-dismissed',

  // ===== 3. HELPERS =====
  catLabel(key) {
    const cat = this.catalog.categories.find(c => c.key === key);
    return cat ? cat.label : key;
  },

  catDesc(key) {
    const cat = this.catalog.categories.find(c => c.key === key);
    return cat && cat.desc ? cat.desc : '';
  },

  catCount(key) {
    return key === 'all' ? this.products.length : this.products.filter(p => p.cat === key).length;
  },

  productCount(n) {
    const count = Number(n) || 0;
    if (count === 1) return 'منتج واحد';
    if (count === 2) return 'منتجان';
    if (count >= 3 && count <= 10) return count + ' منتجات';
    return count + ' منتج';
  },

  resultCount(n) {
    const count = Number(n) || 0;
    if (count === 0) return 'لا توجد نتائج';
    if (count === 1) return 'نتيجة واحدة';
    if (count === 2) return 'نتيجتان';
    if (count >= 3 && count <= 10) return count + ' نتائج';
    return count + ' نتيجة';
  },

  cats() {
    return this.catalog.categories.map(c => ({ key: c.key, label: c.label, desc: c.desc || '', icon: this.catIcons[c.key] || this.catIcons.all }));
  },

  // ---- path helpers -------------------------------------------------
  // The site is served from real directories, so every page builds links
  // relative to the site root (`data-root`) instead of relying on query strings.
  url(path) {
    const clean = String(path == null ? '' : path).replace(/^\.\//, '').replace(/^\//, '');
    return this.localHref(this.root + clean);
  },

  /**
   * Directory URLs work on the server (`/shop/`), but a browser opening the
   * files directly (`file://`) renders a folder listing instead of the
   * index.html inside it. In that mode every directory link gets the file
   * name spelled out; over HTTP the clean URLs are left untouched.
   */
  localHref(href) {
    const value = String(href == null ? '' : href);
    if (!this.localFileMode || !value) return value;
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)) return value; // external, anchor
    const cut = value.search(/[?#]/);
    const path = cut === -1 ? value : value.slice(0, cut);
    const rest = cut === -1 ? '' : value.slice(cut);
    if (!path || /\.[a-z0-9]{1,8}$/i.test(path)) return value; // already a file
    return (path.charAt(path.length - 1) === '/' ? path : path + '/') + 'index.html' + rest;
  },

  /** Rewrite the links that are hard-coded in the static HTML shell. */
  localizeLinks() {
    if (!this.localFileMode) return;
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      const next = this.localHref(href);
      if (next !== href) link.setAttribute('href', next);
    });
  },

  pagePath(page) {
    if (page === 'home') return this.url('');
    if (page === 'products' || page === 'shop') return this.url('shop/');
    return this.url(page + '/');
  },

  productUrl(product) {
    const slug = product && typeof product === 'object' ? product.slug : product;
    return slug ? this.url('product/' + encodeURIComponent(String(slug)) + '/') : this.url('shop/');
  },

  categoryUrl(key) {
    return !key || key === 'all' ? this.url('shop/') : this.url('category/' + encodeURIComponent(String(key)) + '/');
  },

  shopUrl(query) {
    const base = this.url('shop/');
    if (!query) return base;
    const qs = typeof query === 'string' ? query.replace(/^\?/, '') : query.toString();
    return qs ? base + '?' + qs : base;
  },

  go(target) {
    if (!target) return;
    window.location.href = this.localHref(target);
  },

  priceInRange(price, key) {
    const n = Number(price) || 0;
    if (key === 'under-10') return n < 10;
    if (key === '10-25') return n >= 10 && n < 25;
    if (key === '25-50') return n >= 25 && n < 50;
    if (key === '50-plus') return n >= 50;
    return true;
  },

  imgPath(rel) {
    // Encode spaces and non-ASCII characters so image URLs work the same
    // on every browser/CDN, not only when the server tolerates raw filenames.
    // `root` keeps the same catalog data working from nested product/category pages.
    return encodeURI(this.root + 'images/' + String(rel).replace(/^images\//, ''));
  },

  getStock(product) {
    if (!product || product.stock == null || product.stock === '') return null;
    const stock = Number(product.stock);
    return Number.isFinite(stock) ? Math.max(0, Math.floor(stock)) : null;
  },

  disc(p) { return Math.round((1 - p.price / p.op) * 100); },

  totalItems() { return this.state.cart.reduce((s, i) => s + i.qty, 0); },
  totalPrice() { return this.state.cart.reduce((s, i) => s + i.product.price * i.qty, 0); },
  totalOriginal() { return this.state.cart.reduce((s, i) => s + i.product.op * i.qty, 0); },
  totalSaved() { return this.totalOriginal() - this.totalPrice(); },

  wa(text) {
    const msg = text ? '?text=' + encodeURIComponent(text) : '';
    return `https://wa.me/${this.meta.whatsapp}${msg}`;
  },

  esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },

  // Specs can be "label: value" strings (catalog) or {label, value} objects.
  specParts(value) {
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
  },

  // ===== 4. PERSISTENCE =====
  async syncCatalog() {
    // Straight from disk there is no server origin to call; catalog-data.js
    // already holds every product, so the static catalog is the whole store.
    if (this.localFileMode) return false;
    try {
      const response = await fetch(this.root + 'api/catalog');
      if (!response.ok) return false;
      const payload = await response.json();
      const serverProducts = Array.isArray(payload)
        ? payload
        : payload && Array.isArray(payload.products)
          ? payload.products
          : payload && payload.data && Array.isArray(payload.data.products)
            ? payload.data.products
            : Array.isArray(payload && payload.data) ? payload.data : [];
      if (!serverProducts.length) return false;
      const updates = new Map();
      serverProducts.forEach(product => { if (product && product.id != null) updates.set(String(product.id), product); });
      if (!updates.size) return false;
      this.products = this.products.map(product => {
        const update = updates.get(String(product.id));
        if (!update) return product;
        const merged = { ...product };
        ['price', 'stock', 'lowStockThreshold'].forEach(field => {
          if (update[field] != null) merged[field] = update[field];
        });
        return merged;
      });
      this.buildSearchIndex();
      return true;
    } catch {
      return false;
    }
  },

  loadCart() {
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem('iboardz-cart') || '[]'); } catch {}
    if (!Array.isArray(saved)) { this.state.cart = []; return; }
    const cart = [];
    saved.forEach(line => {
      if (!line || typeof line !== 'object') return;
      const productId = line.product && line.product.id != null ? line.product.id : line.id;
      const product = this.products.find(p => String(p.id) === String(productId));
      if (!product) return;
      const qty = Number(line.qty);
      if (!Number.isFinite(qty) || qty <= 0) return;
      const color = line.color == null ? null : String(line.color);
      if (!product.customInput) {
        if (color !== null && (!product.colorOptions || !product.colorOptions.includes(color))) return;
        if (color === null && product.colorOptions && product.colorOptions.length) return;
      }
      const stock = this.getStock(product);
      if (stock === 0) return;
      const normalizedQty = stock === null ? Math.floor(qty) : Math.min(Math.floor(qty), stock);
      if (normalizedQty < 1) return;
      const existing = cart.find(item => String(item.product.id) === String(product.id) && (item.color || null) === color);
      if (existing) {
        const combined = existing.qty + normalizedQty;
        existing.qty = stock === null ? combined : Math.min(combined, stock);
      } else {
        const item = { product, qty: normalizedQty };
        if (color !== null) item.color = color;
        cart.push(item);
      }
    });
    this.state.cart = cart;
    this.saveCart();
  },

  saveCart() {
    try { localStorage.setItem('iboardz-cart', JSON.stringify(this.state.cart)); } catch {}
  },

  // ===== 5. THEME =====
  getTheme() {
    try { return localStorage.getItem('iboardz-theme') || 'light'; } catch { return 'light'; }
  },

  setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.setAttribute('aria-label', t === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن');
      btn.title = t === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن';
      btn.innerHTML = t === 'dark'
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    }
    try { localStorage.setItem('iboardz-theme', t); } catch {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = t === 'dark' ? '#0a0a14' : '#ff9500';
  },

  toggleTheme() {
    const next = this.getTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    const btn = document.getElementById('themeToggle');
    if (btn) { btn.style.transform = 'rotate(360deg) scale(0.8)'; setTimeout(() => { btn.style.transform = ''; }, 400); }
  },

  // ===== 6. NAVIGATION =====
  // Every destination is a real directory on the server, so navigation is a
  // normal page load. That keeps product/category URLs shareable and indexable.
  nav(page) {
    if (this.state.filtersOpen) this.toggleFilters(false);
    this.closeMenu();
    this.closeSearch();
    const target = this.pagePath(page);
    let targetPath = target;
    try { targetPath = new URL(target, window.location.href).pathname; } catch {}
    if (targetPath === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    this.go(target);
  },

  navCategory(cat) {
    this.closeMenu();
    this.closeSearch();
    const target = this.categoryUrl(cat);
    let targetPath = target;
    try { targetPath = new URL(target, window.location.href).pathname; } catch {}
    if (targetPath === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    this.go(target);
  },

  // ---- section switching --------------------------------------------
  // Every section is a real page (for shareable/indexable URLs), so a section
  // switch is a normal page load and a fresh load starts at the top. The
  // category list in the shop sidebar instead remembers where the product
  // grid sat in the viewport and lines it up again on the next section. Every
  // other destination (home, a product, projects, the menu, the footer) still
  // opens at the top of the page.
  setupSectionScroll() {
    if (this._sectionScrollSetup) return;
    this._sectionScrollSetup = true;
    document.addEventListener('click', e => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target && e.target.closest ? e.target.closest('a[data-scroll-keep]') : null;
      if (!link || link.target === '_blank' || !this.isListingPage()) return;

      // Already in this section with no filters applied: a reload would only
      // throw the visitor back to the top for no reason.
      const cat = link.dataset.cat;
      const dirty = !!this.state.search || this.state.price !== 'all' || this.state.onlySale ||
        this.state.onlyPop || this.state.pageNum > 1 || this.state.sort !== 'relevance';
      if (cat && cat === this.state.filter && !dirty) {
        e.preventDefault();
        if (this.state.filtersOpen) this.toggleFilters(false);
        this.closeSearch();
        // The visitor tapped the section they are already in; bring its
        // products back into view instead of doing nothing at all.
        const results = document.getElementById('shopResults');
        const rect = results && results.getBoundingClientRect();
        if (rect && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
          window.scrollTo({ top: Math.max(0, rect.top + window.scrollY - 92), behavior: 'smooth' });
        }
        return;
      }

      let dest = null;
      try { dest = new URL(link.href, window.location.href); } catch {}
      if (!dest) return;
      this.rememberSectionScroll(dest.pathname + dest.search);
    });
  },

  rememberSectionScroll(dest) {
    const results = document.getElementById('shopResults');
    if (!results) return;
    // Only keep the position when the product grid is actually on screen.
    // From the hero or from the section cards at the bottom of the page the
    // new section should open normally at its beginning.
    if (window.scrollY < 40) return;
    const rect = results.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
    try {
      window.sessionStorage.setItem(this.SECTION_SCROLL_KEY, JSON.stringify({
        dest,
        resultsTop: Math.round(rect.top),
        time: Date.now(),
      }));
    } catch {}
  },

  restoreSectionScroll() {
    let raw = null;
    try { raw = window.sessionStorage.getItem(this.SECTION_SCROLL_KEY); } catch { return; }
    if (!raw) return;
    let saved = null;
    try { saved = JSON.parse(raw); } catch {}
    try { window.sessionStorage.removeItem(this.SECTION_SCROLL_KEY); } catch {}
    if (!saved || !this.isListingPage()) return;
    if (Date.now() - Number(saved.time) > 20000) return;
    if (saved.dest !== window.location.pathname + window.location.search) return;
    if (!Number.isFinite(saved.resultsTop)) return;

    this._sectionScrollTop = saved.resultsTop;
    this.alignSectionScroll();
    this._releaseSectionScroll();
    // Late layout changes (fonts, live catalog refresh) may shift the grid a
    // few pixels; after a moment the page belongs to the visitor again.
    setTimeout(() => { this._sectionScrollTop = null; }, 1500);
    window.addEventListener('load', () => this.alignSectionScroll(), { once: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => this.alignSectionScroll()).catch(() => {});
    }
  },

  /** Put #shopResults back at the viewport offset it had on the last section. */
  alignSectionScroll() {
    if (this._sectionScrollTop == null) return;
    const results = document.getElementById('shopResults');
    if (!results) return;
    const delta = Math.round(results.getBoundingClientRect().top - this._sectionScrollTop);
    if (!delta) return;
    // The global `scroll-behavior: smooth` would animate the correction and
    // make the switch feel like a scroll instead of a seamless swap.
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, Math.max(0, Math.round(window.scrollY + delta)));
    root.style.scrollBehavior = previous;
  },

  /** Stop late corrections (fonts, live catalog) once the visitor scrolls. */
  _releaseSectionScroll() {
    const release = () => { this._sectionScrollTop = null; };
    window.addEventListener('wheel', release, { once: true, passive: true });
    window.addEventListener('touchmove', release, { once: true, passive: true });
    window.addEventListener('keydown', release, { once: true });
  },

  toggleMenu(e) {
    if (e) e.stopPropagation();
    this.state.menuOpen = !this.state.menuOpen;
    this.renderMenu();
    const btn = document.querySelector('.menu-btn');
    if (btn) btn.setAttribute('aria-expanded', String(this.state.menuOpen));
    if (this.state.menuOpen) this.lockBody(); else this.unlockBody();
  },

  closeMenu() {
    const wasOpen = this.state.menuOpen;
    const dd = document.getElementById('dropdown');
    const active = document.activeElement;
    this.state.menuOpen = false;
    this.renderMenu();
    const btn = document.querySelector('.menu-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (active && dd && dd.contains(active) && btn) btn.focus({ preventScroll: true });
    if (wasOpen) this.unlockBody();
  },

  openCart() {
    if (this.state.cartOpen) { this.renderCart(); return; }
    this.state.cartOpen = true;
    this.renderCart();
    this.lockBody();
  },

  closeCart() {
    const wasOpen = this.state.cartOpen;
    this.state.cartOpen = false;
    this.renderCart();
    if (wasOpen) this.unlockBody();
  },

  scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); },

  // ===== BODY LOCK =====
  lockBody() {
    this._bodyLockCount++;
    if (this._bodyLockCount === 1) document.body.style.overflow = 'hidden';
  },

  unlockBody() {
    this._bodyLockCount = Math.max(0, this._bodyLockCount - 1);
    if (this._bodyLockCount === 0) document.body.style.overflow = '';
  },

  // ===== 7. CART =====
  addCart(prod, color, event) {
    const product = this.products.find(item => String(item.id) === String(prod && prod.id));
    if (!product) return false;
    const selectedColor = color == null ? null : String(color);
    if (!product.customInput) {
      if (selectedColor !== null && (!product.colorOptions || !product.colorOptions.includes(selectedColor))) {
        this.showToast('الرجاء اختيار خيار متاح', 'error');
        return false;
      }
      if (selectedColor === null && product.colorOptions && product.colorOptions.length) {
        this.showToast('الرجاء اختيار اللون أولاً', 'error');
        return false;
      }
    }
    const ex = this.state.cart.find(item =>
      String(item.product.id) === String(product.id) && (item.color || null) === selectedColor
    );
    const stock = this.getStock(product);
    const nextQty = (ex ? ex.qty : 0) + 1;
    if (stock !== null && nextQty > stock) {
      this.showToast('الكمية المتوفرة غير كافية', 'error');
      return false;
    }
    const key = product.id + (selectedColor !== null ? '|' + selectedColor : '');
    const now = Date.now();
    if (this._lastAdd && this._lastAdd.key === key && now - this._lastAdd.t < 600) return false;
    this._lastAdd = { key, t: now };
    if (ex) {
      ex.qty = nextQty;
      this.showToast(`تم زيادة الكمية: ${product.name} ×${ex.qty}`, 'success');
    } else {
      const item = { product, qty: 1 };
      if (selectedColor !== null) item.color = selectedColor;
      this.state.cart.push(item);
      const suffix = selectedColor !== null ? (product.customInput ? ' - القيمة: ' + selectedColor : ' - ' + selectedColor) : '';
      this.showToast(`تمت الإضافة: ${product.name}${suffix}`, 'success', true);
    }
    this.saveCart();
    this.updateBadge();
    this.renderCart();
    if (event) this.flyToCart(event);
    return true;
  },

  flyToCart(event) {
    const cartBtn = document.querySelector('.cart-btn');
    if (!cartBtn || !event) return;
    const target = event.currentTarget || event.target;
    const btnRect = target.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();
    const flyEl = document.createElement('div');
    flyEl.className = 'fly-to-cart';
    flyEl.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: var(--primary);
      border-radius: 50%;
      z-index: 99999;
      pointer-events: none;
      box-shadow: 0 0 12px rgba(255,149,0,0.6);
      transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    flyEl.style.left = (btnRect.left + btnRect.width / 2 - 10) + 'px';
    flyEl.style.top = (btnRect.top + btnRect.height / 2 - 10) + 'px';
    document.body.appendChild(flyEl);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      flyEl.style.left = (cartRect.left + cartRect.width / 2 - 10) + 'px';
      flyEl.style.top = (cartRect.top + cartRect.height / 2 - 10) + 'px';
      flyEl.style.transform = 'scale(0.3)';
      flyEl.style.opacity = '0.6';
    }));
    setTimeout(() => {
      flyEl.remove();
      cartBtn.style.transform = 'scale(1.2)';
      setTimeout(() => { cartBtn.style.transform = ''; }, 200);
    }, 700);
  },

  addCartWithColor(id) {
    const prod = this.products.find(x => x.id === id);
    if (!prod) return;
    let color = null;
    if (prod.customInput) {
      const inp = document.getElementById('prodCustomValue');
      const val = inp ? inp.value.trim() : '';
      if (!val) { this.showToast('الرجاء كتابة القيمة المطلوبة أولاً', 'error'); return; }
      color = val;
    } else {
      const sel = document.querySelector('input[name="prodOption"]:checked');
      color = sel ? sel.value : null;
      if (prod.colorOptions && !color) { this.showToast('الرجاء اختيار اللون أولاً', 'error'); return; }
    }
    if (this.addCart(prod, color)) this.closeModal();
  },

  removeCart(id, color) {
    const hasColor = color !== undefined;
    const selectedColor = color == null ? null : String(color);
    this.state.cart = this.state.cart.filter(item =>
      String(item.product.id) !== String(id) || (hasColor && (item.color || null) !== selectedColor)
    );
    this.saveCart();
    this.updateBadge();
    this.renderCart();
  },

  updQty(id, d, color) {
    const hasColor = color !== undefined;
    const selectedColor = color == null ? null : String(color);
    const item = this.state.cart.find(line =>
      String(line.product.id) === String(id) && (!hasColor || (line.color || null) === selectedColor)
    );
    const delta = Number(d);
    if (!item || !Number.isFinite(delta)) return;
    const stock = this.getStock(item.product);
    if (stock === 0) {
      this.state.cart = this.state.cart.filter(line => line !== item);
      this.saveCart();
      this.updateBadge();
      this.renderCart();
      this.showToast('المنتج غير متوفر حالياً', 'error');
      return;
    }
    const nextQty = Math.max(1, item.qty + delta);
    item.qty = stock === null ? nextQty : Math.min(nextQty, stock);
    if (stock !== null && nextQty > stock) this.showToast('الكمية المتوفرة غير كافية', 'error');
    this.saveCart();
    this.renderCart();
  },

  updateBadge() {
    const b = document.getElementById('cartBadge');
    if (!b) return;
    const t = this.totalItems();
    if (t > 0) { b.style.display = 'flex'; b.textContent = t; }
    else { b.style.display = 'none'; }
  },

  // ===== 8. CONTACT / TOAST =====
  handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const msg = document.getElementById('contactMsg').value.trim();
    if (!name || !msg) return;
    const text = `الاسم: ${name}\nالبريد: ${email || 'غير مذكور'}\n\nالرسالة:\n${msg}`;
    const btn = document.getElementById('contactSubmitBtn');
    btn.textContent = 'جاري الإرسال...';
    btn.disabled = true;
    window.open(this.wa(text), '_blank');
    setTimeout(() => { btn.textContent = 'إرسال الرسالة'; btn.disabled = false; }, 2000);
    this.showToast('تم تحويلك إلى واتساب لإتمام الإرسال', 'info');
  },

  showToast(msg, type = 'success', showCartBtn = false) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    [...container.querySelectorAll('.toast')].forEach(c => { if (c.dataset.msg === msg) c.remove(); });
    const el = document.createElement('div');
    el.dataset.msg = msg;
    el.className = `toast ${type}`;
    const icons = {
      success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
      error: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    };
    el.innerHTML = `${icons[type] || icons.success} ${msg}`;
    if (showCartBtn && this.state.cart.length > 0) {
      el.innerHTML += ` <button class="toast-cart-btn" onclick="App.openCart()">عرض السلة</button>`;
    }
    container.appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 3500);
  },

  // ===== 9. MODAL =====
  // Products now have a dedicated page; the modal remains only for the
  // 3D-printing service, which is not an orderable catalog product.
  showProduct(id) {
    const product = this.products.find(p => String(p.id) === String(id));
    if (!product) return;
    this.closeSearch();
    this.closeMenu();
    const target = this.productUrl(product);
    let targetPath = target;
    try { targetPath = new URL(target, window.location.href).pathname; } catch {}
    if (targetPath === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    this.go(target);
  },

  closeModal() {
    const wasOpen = !!this.state.selProd || !!this.state.selService;
    this.state.selProd = null;
    this.state.selService = null;
    this.renderModal();
    if (wasOpen) this.unlockBody();
    this.updateUrl();
    this.syncSeo();
  },

  // ============================================================
  // 10. SEARCH
  // ============================================================
  buildSearchIndex() {
    if (!window.IBSearch) return;
    this.searchIndex = IBSearch.build(this.products, this.catalog.categories);
    this.serviceIndex = IBSearch.build(
      this.services.map(s => ({
        id: s.id, name: s.name, nameAr: s.nameEn, keywords: (s.keywords || []).concat([s.name, s.nameEn]),
        sku: '', cat: 'service', desc: s.summary, specs: s.features || [],
        price: 0, op: 0, badge: s.badge, isService: true, service: s,
      })),
      []
    );
    this.projectIndex = IBSearch.build(
      this.projects.map(project => {
        const totals = this.projectTotals(project);
        const partWords = totals.parts.reduce((words, part) => words.concat([
          part.product.name,
          part.product.nameAr,
          part.product.sku,
        ]), []);
        return {
          id: 'project:' + project.key,
          name: project.title,
          nameAr: project.title,
          keywords: ['مشروع', 'مشاريع', 'ابن مشروع', 'بناء مشروع', 'مشروع جاهز']
            .concat(project.tags || [])
            .concat(partWords)
            .filter(Boolean),
          sku: '',
          cat: 'project',
          desc: project.summary,
          specs: [],
          price: totals.price,
          op: totals.original,
          badge: this.projectLevelLabel(project.level),
          isProject: true,
          project,
        };
      }),
      []
    );
  },

  /** True on the two listing pages where filtering happens without a reload. */
  isListingPage() {
    return this.pageType === 'shop' || this.pageType === 'category';
  },

  /** Main entry point used by both the header and the page search box. */
  search(rawValue, origin) {
    const value = typeof rawValue === 'string' ? rawValue : '';
    const trimmed = value.trim();
    this.state.search = trimmed;
    this.state.pageNum = 1;
    if (origin) this._searchOrigin = origin;
    if (!this.searchIndex) this.buildSearchIndex();

    // On a product/content page the search box only suggests; submitting it
    // takes the shopper to the shop page. Listing pages filter in place.
    if (!this.isListingPage()) {
      this.renderSuggestions(trimmed);
      if (origin === 'header') this.syncSearchInputs();
      return;
    }

    this.renderSuggestions(trimmed);
    if (origin === 'header') this.syncSearchInputs();
    this.updateProductsView();
    this.updateUrl();
  },

  /** Enter in a search box or a click on "view all results". */
  submitSearch() {
    const q = String(this.state.search || '').trim();
    this.closeSearch();
    if (this.isListingPage()) {
      if (q) this.pushRecent(q);
      this.updateProductsView();
      this.updateUrl();
      return;
    }
    if (!q) { this.go(this.shopUrl()); return; }
    this.pushRecent(q);
    this.go(this.shopUrl('q=' + encodeURIComponent(q)));
  },

  /** Debounced variant for typing in the page search box. */
  searchDebounced(value, origin) {
    clearTimeout(this._searchTimer);
    this._searchTimer = setTimeout(() => this.search(value, origin), 140);
  },

  syncSearchInputs() {
    const header = document.getElementById('headerSearchInput');
    if (header && header.value !== this.state.search) header.value = this.state.search;
    const page = document.getElementById('productsSearchInput');
    if (page && page.value !== this.state.search) page.value = this.state.search;
    document.querySelectorAll('[data-search-clear]').forEach(btn => {
      btn.hidden = !this.state.search;
    });
  },

  clearSearch(origin) {
    this.search('', origin || (this._searchOrigin === 'header' ? 'header' : 'page'));
    const input = this._searchOrigin === 'header'
      ? document.getElementById('headerSearchInput')
      : document.getElementById('productsSearchInput');
    if (input) input.focus();
  },

  applySuggestion(query) {
    const q = String(query || '').trim();
    if (!q) return;
    this.pushRecent(q);
    if (this.isListingPage()) {
      this.search(q, this._searchOrigin);
      this.closeSearch();
      return;
    }
    this.closeSearch();
    this.go(this.shopUrl('q=' + encodeURIComponent(q)));
  },

  pushRecent(query) {
    const q = String(query || '').trim();
    if (q.length < 2) return;
    try {
      const list = JSON.parse(localStorage.getItem(this.RECENT_KEY) || '[]');
      const next = [q].concat(list.filter(item => item !== q)).slice(0, 8);
      localStorage.setItem(this.RECENT_KEY, JSON.stringify(next));
    } catch {}
  },

  getRecent() {
    try {
      const list = JSON.parse(localStorage.getItem(this.RECENT_KEY) || '[]');
      return Array.isArray(list) ? list.filter(v => typeof v === 'string') : [];
    } catch { return []; }
  },

  clearRecent() {
    try { localStorage.removeItem(this.RECENT_KEY); } catch {}
    this.renderSuggestions(this.state.search);
  },

  // ---- live suggestions -------------------------------------
  renderSuggestions(query) {
    if (!this.searchIndex) this.buildSearchIndex();
    const panel = document.getElementById('searchSuggest');
    if (!panel) return;

    const anchor = this._currentSearchAnchor();
    if (!anchor) return;
    this._positionSuggest(anchor);

    const q = String(query || '').trim();
    let html = '';

    if (!q) {
      const recent = this.getRecent();
      const popular = this.popularSearches;
      if (recent.length) {
        html += `<div class="sg-head">${this.svgIcon(this.icons.clock, 14)} بحثك الأخير</div>` +
          recent.map(item =>
            `<button class="sg-chip" onclick="App.applySuggestion(this.dataset.q)" data-q="${this.esc(item)}">${this.esc(item)}</button>`
          ).join('') +
          `<button class="sg-clear" onclick="App.clearRecent()">مسح الكل</button>`;
      }
      if (popular.length) {
        html += `<div class="sg-head">${this.svgIcon(this.icons.fire, 14)} الأكثر بحثاً</div>` +
          popular.map(item =>
            `<button class="sg-chip hot" onclick="App.applySuggestion(this.dataset.q)" data-q="${this.esc(item)}">${this.esc(item)}</button>`
          ).join('');
      }
      if (!html) html = '<div class="sg-empty">ابدأ بالكتابة للبحث عن قطعة…</div>';
    } else {
      const productHits = IBSearch.query(this.searchIndex, q, { limit: 6 });
      const serviceHits = this.serviceIndex ? IBSearch.query(this.serviceIndex, q, { limit: 1 }) : { results: [] };
      const projectHits = this.projectIndex ? IBSearch.query(this.projectIndex, q, { limit: 3 }) : { results: [], total: 0 };
      this._suggestItems = [];

      if (serviceHits.results && serviceHits.results.length) {
        html += `<div class="sg-head">${this.svgIcon(this.icons.printer, 14)} خدمة</div>`;
        serviceHits.results.forEach(hit => {
          const s = hit.product.service;
          html += `<button class="sg-item" onclick="App.showService('${this.esc(s.id)}')">
              <span class="sg-thumb">${this.imgTag(this.imgPath(s.img), s.name, 34)}</span>
              <span class="sg-meta">
                <span class="sg-name">${IBSearch.highlight(s.name, hit.matchedTokens)}</span>
                <span class="sg-sub">${this.esc(s.summary)}</span>
              </span>
              <span class="sg-cta">${this.esc(s.badge || 'خدمة')}</span>
            </button>`;
        });
      }

      if (productHits.results.length) {
        html += `<div class="sg-head">منتجات</div>`;
        productHits.results.forEach(hit => {
          const p = hit.product;
          const idx = this._suggestItems.length;
          this._suggestItems.push({ type: 'product', id: p.id });
          const sub = (p.nameAr && p.nameAr !== p.name) ? p.nameAr : (this.catLabel(p.cat) + ' · ' + (hit.matchedIn === 'name' ? 'مطابق في الاسم' : 'مطابق في التفاصيل'));
          html += `<a class="sg-item" href="${this.esc(this.productUrl(p))}" onclick="App.closeSearch()" data-idx="${idx}">
              <span class="sg-thumb">${this.imgTag(this.imgPath(p.img), p.name, 34)}</span>
              <span class="sg-meta">
                <span class="sg-name">${IBSearch.highlight(p.name, hit.matchedTokens)}</span>
                <span class="sg-sub">${this.esc(sub)}</span>
              </span>
              <span class="sg-price">⃁ ${p.price}</span>
            </a>`;
        });
        const total = productHits.total;
        const allHref = this.isListingPage() ? '#' : this.shopUrl('q=' + encodeURIComponent(q));
        html += `<a class="sg-all" href="${this.esc(allHref)}" onclick="event.preventDefault();App.applySuggestion(this.dataset.q)" data-q="${this.esc(q)}">
            عرض كل النتائج (${total}) ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 16)}
          </a>`;
      }

      if (projectHits.results.length) {
        html += `<div class="sg-head">${this.svgIcon(this.icons.grid, 14)} مشاريع جاهزة</div>`;
        projectHits.results.forEach(hit => {
          const project = hit.product.project;
          const totals = this.projectTotals(project);
          const firstPart = totals.parts[0];
          const href = this.pagePath('projects') + '#' + this.projectAnchor(project);
          html += `<a class="sg-item" href="${this.esc(href)}" onclick="App.closeSearch()">
              <span class="sg-thumb">${firstPart ? this.imgTag(this.imgPath(firstPart.product.img), project.title, 34) : this.svgIcon(this.icons.grid, 20)}</span>
              <span class="sg-meta">
                <span class="sg-name">${IBSearch.highlight(project.title, hit.matchedTokens)}</span>
                <span class="sg-sub">${totals.parts.length} قطع · ${this.projectLevelLabel(project.level)} · ⃁ ${this.money(totals.price)}</span>
              </span>
              <span class="sg-cta">مشروع</span>
            </a>`;
        });
        if (!productHits.results.length) {
          html += `<a class="sg-all" href="${this.esc(this.pagePath('projects'))}" onclick="App.closeSearch()">
              عرض كل المشاريع (${this.projects.length}) ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 16)}
            </a>`;
        }
      }

      if (!productHits.results.length && !projectHits.results.length) {
        if (productHits.corrected) {
          html += `<button class="sg-item empty" onclick="App.applySuggestion(this.dataset.q)" data-q="${this.esc(productHits.suggestion)}">
              <span class="sg-meta"><span class="sg-name">هل تقصد: <strong>${this.esc(productHits.suggestion)}</strong></span></span>
            </button>`;
        } else {
          html += `<div class="sg-empty">
              <strong>لا توجد نتائج لـ "${this.esc(q)}"</strong>
              <span>جرّب كلمة أخرى أو تصفح الأقسام</span>
            </div>`;
        }
      }
    }

    panel.innerHTML = html;
    panel.hidden = false;
    panel.classList.toggle('empty', !q);
    this._suggestActive = -1;
    this._suggestOpen = true;
    document.querySelectorAll('#headerSearchInput, #productsSearchInput').forEach(el => el.setAttribute('aria-expanded', 'false'));
    const input = this._currentSearchInput();
    if (input) input.setAttribute('aria-expanded', 'true');
  },

  _currentSearchInput() {
    return this._searchOrigin === 'header'
      ? document.getElementById('headerSearchInput')
      : document.getElementById('productsSearchInput');
  },

  _currentSearchAnchor() {
    return this._searchOrigin === 'header'
      ? document.getElementById('headerSearchInput')
      : document.getElementById('productsSearchInput');
  },

  /**
   * The panel lives directly under <body> and is positioned with fixed
   * coordinates measured from the input. It must NOT live inside the header:
   * the header carries `backdrop-filter`, and a dropdown that overflows a
   * backdrop-filtered layer is composited semi-transparent by the browser,
   * which makes the suggestions unreadable over the product grid.
   */
  _positionSuggest(anchor) {
    const panel = document.getElementById('searchSuggest');
    if (!panel || !anchor) return;
    if (panel.parentElement !== document.body) document.body.appendChild(panel);

    const rect = anchor.getBoundingClientRect();
    const width = Math.max(300, Math.min(rect.width, Math.max(300, window.innerWidth - 24)));
    let left = rect.left;
    if (left + width > window.innerWidth - 12) left = window.innerWidth - width - 12;
    if (left < 12) left = 12;

    panel.style.left = `${Math.round(left)}px`;
    panel.style.top = `${Math.round(rect.bottom + 10)}px`;
    panel.style.width = `${Math.round(width)}px`;
    panel.style.maxWidth = `${window.innerWidth - 24}px`;
  },

  moveSuggest(step) {
    const panel = document.getElementById('searchSuggest');
    if (!panel || panel.hidden) return;
    const items = [...panel.querySelectorAll('.sg-item:not(.empty), .sg-all')];
    if (!items.length) return;
    this._suggestActive = (this._suggestActive + step + items.length + 1) % (items.length + 1);
    items.forEach(el => el.classList.remove('is-active'));
    if (this._suggestActive >= items.length) {
      this._suggestActive = -1;
      const input = this._currentSearchInput();
      if (input) input.removeAttribute('aria-activedescendant');
      return;
    }
    const active = items[this._suggestActive];
    active.classList.add('is-active');
    if (active.scrollIntoView) active.scrollIntoView({ block: 'nearest' });
  },

  closeSearch() {
    const panel = document.getElementById('searchSuggest');
    if (panel) { panel.hidden = true; panel.innerHTML = ''; }
    this._suggestOpen = false;
    this._suggestActive = -1;
    document.querySelectorAll('#headerSearchInput, #productsSearchInput').forEach(el => el.setAttribute('aria-expanded', 'false'));
  },

  /** Called from the search inputs' onkeydown handler. */
  searchKeydown(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); this.moveSuggest(1); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); this.moveSuggest(-1); return; }
    if (e.key === 'Escape') { e.preventDefault(); this.closeSearch(); return; }
    if (e.key === 'Enter') {
      const panel = document.getElementById('searchSuggest');
      const items = panel ? [...panel.querySelectorAll('.sg-item:not(.empty), .sg-all')] : [];
      if (this._suggestActive >= 0 && items[this._suggestActive]) {
        e.preventDefault();
        items[this._suggestActive].click();
        return;
      }
      if (this.state.search) {
        e.preventDefault();
        this.submitSearch();
      }
    }
  },

  focusSearch(origin) {
    if (origin) this._searchOrigin = origin;
    const input = this._currentSearchInput();
    if (input) this.renderSuggestions(this.state.search);
  },

  // ---- products page ----------------------------------------
  shopFiltered() {
    let pool = this.state.filter === 'all'
      ? this.products.slice()
      : this.products.filter(p => p.cat === this.state.filter);

    if (this.state.price !== 'all') {
      pool = pool.filter(p => this.priceInRange(p.price, this.state.price));
    }
    if (this.state.onlySale) pool = pool.filter(p => this.disc(p) >= 50);
    if (this.state.onlyPop) pool = pool.filter(p => p.pop);

    let list = pool;
    let hit = { total: pool.length, tokens: [], suggestion: '', corrected: false };
    if (this.searchIndex && this.state.search) {
      const res = IBSearch.query(this.searchIndex, this.state.search, { pool, limit: 0 });
      list = res.results.map(r => r.product);
      hit = res;
    }
    const sorterKey = this.state.search
      ? this.state.sort
      : (this.state.sort === 'relevance' ? 'popular' : this.state.sort);
    if (!(this.state.search && sorterKey === 'relevance')) list.sort(this._sorter(sorterKey));
    return { list, hit };
  },

  shopPages(total) {
    return Math.max(1, Math.ceil(total / this.state.perPage));
  },

  updateProductsView() {
    if (this.state.page !== 'products') return;
    const result = this.shopFiltered();
    const list = result.list;
    const pageCount = this.shopPages(list.length);
    this.state.pageNum = Math.min(Math.max(1, this.state.pageNum), pageCount);
    const start = (this.state.pageNum - 1) * this.state.perPage;
    const pageItems = list.slice(start, start + this.state.perPage);
    this._lastResult = result.hit;

    const grid = document.getElementById('productsResults');
    if (grid) {
      grid.innerHTML = this.renderResults(pageItems, result.hit);
      grid.classList.remove('enter');
      void grid.offsetWidth;
      grid.classList.add('enter');
    }

    const count = document.getElementById('productsCount');
    if (count) count.textContent = this.state.search ? this.resultCount(list.length) : this.productCount(list.length);

    const range = document.getElementById('productsRange');
    if (range) {
      range.textContent = list.length
        ? `عرض ${start + 1}–${Math.min(start + pageItems.length, list.length)} من ${list.length}`
        : '';
    }

    const pagination = document.getElementById('shopPagination');
    if (pagination) pagination.innerHTML = this.renderPagination(list.length);

    const active = document.getElementById('shopActiveFilters');
    if (active) active.innerHTML = this.renderActiveFilters();

    const crumbs = document.getElementById('shopBreadcrumb');
    if (crumbs) crumbs.innerHTML = this.renderBreadcrumbs();

    const title = document.getElementById('shopTitle');
    if (title) title.textContent = this.state.filter === 'all' ? 'كل المنتجات' : this.catLabel(this.state.filter);

    const subt = document.getElementById('shopSubtitle');
    if (subt) subt.textContent = this.state.filter === 'all'
      ? 'تصفح جميع القطع، أو اختر قسماً من القائمة لتصفية النتائج.'
      : this.catDesc(this.state.filter);

    const displaySort = this.displaySort();
    const sel = document.getElementById('shopSort');
    if (sel && sel.value !== displaySort) sel.value = displaySort;

    document.querySelectorAll('#shopSidebar [data-cat]').forEach(link => {
      const active = link.dataset.cat === this.state.filter;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.querySelectorAll('#shopSidebar [data-price]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.price === this.state.price);
      btn.setAttribute('aria-pressed', String(btn.dataset.price === this.state.price));
    });
    const sale = document.getElementById('filterOnlySale');
    if (sale) sale.checked = this.state.onlySale;
    const pop = document.getElementById('filterOnlyPop');
    if (pop) pop.checked = this.state.onlyPop;

    const badge = document.getElementById('filterCountBadge');
    if (badge) {
      const n = this.activeFilterCount();
      badge.textContent = n ? String(n) : '';
      badge.style.display = n ? 'inline-flex' : 'none';
    }
    document.title = this.pageTitle();
    this.syncSeo();
    this.syncSearchInputs();
  },

  displaySort() {
    return (!this.state.search && this.state.sort === 'relevance') ? 'popular' : this.state.sort;
  },

  activeFilterCount() {
    let n = 0;
    // The category itself is part of the path on /category/<key>/.
    if (this.state.filter !== 'all' && this.pageType !== 'category') n++;
    if (this.state.price !== 'all') n++;
    if (this.state.onlySale) n++;
    if (this.state.onlyPop) n++;
    if (this.state.search) n++;
    return n;
  },

  renderActiveFilters() {
    const chips = [];
    if (this.state.search) {
      chips.push(`<button class="active-chip" onclick="App.clearSearch('page')">بحث: ${this.esc(this.state.search)} ${this.svgIcon(this.icons.close, 13)}</button>`);
    }
    if (this.state.filter !== 'all' && this.pageType !== 'category') {
      chips.push(`<button class="active-chip" onclick="App.setFilter('all')">${this.esc(this.catLabel(this.state.filter))} ${this.svgIcon(this.icons.close, 13)}</button>`);
    }
    if (this.state.price !== 'all') {
      const range = this.priceRanges.find(r => r.key === this.state.price);
      chips.push(`<button class="active-chip" onclick="App.setPrice('all')">${range ? range.label : 'السعر'} ${this.svgIcon(this.icons.close, 13)}</button>`);
    }
    if (this.state.onlySale) chips.push(`<button class="active-chip" onclick="App.setFlag('onlySale', false)">خصم 50%+ ${this.svgIcon(this.icons.close, 13)}</button>`);
    if (this.state.onlyPop) chips.push(`<button class="active-chip" onclick="App.setFlag('onlyPop', false)">الأكثر رواجاً ${this.svgIcon(this.icons.close, 13)}</button>`);
    if (!chips.length) return '';
    return `<span class="active-chip-label">الفلاتر النشطة:</span>${chips.join('')}<button class="active-chip-clear" onclick="App.clearFilters()">مسح الكل</button>`;
  },

  renderPagination(total) {
    const pages = this.shopPages(total);
    if (pages <= 1) return '';
    const current = this.state.pageNum;
    const nums = [];
    const push = n => { if (!nums.includes(n)) nums.push(n); };
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) push(i);
    } else {
      push(1);
      if (current <= 3) { push(2); push(3); push(4); }
      else if (current >= pages - 2) { push(pages - 3); push(pages - 2); push(pages - 1); }
      else { push(current - 1); push(current); push(current + 1); }
      push(pages);
    }
    nums.sort((a, b) => a - b);

    let items = '';
    let prev = 0;
    nums.forEach(n => {
      if (prev && n - prev > 1) items += `<span class="page-ellipsis" aria-hidden="true">…</span>`;
      items += `<button class="page-btn${n === current ? ' active' : ''}" onclick="App.goToPage(${n})" ${n === current ? 'aria-current="page"' : ''} aria-label="صفحة ${n}">${n}</button>`;
      prev = n;
    });

    return `<nav class="shop-pagination" aria-label="التنقل بين صفحات المنتجات">
      <button class="page-nav" onclick="App.goToPage(${current - 1})" ${current === 1 ? 'disabled' : ''} aria-label="الصفحة السابقة">
        ${this.svgIcon('<polyline points="9 18 15 12 9 6"/>', 16)}<span>السابق</span>
      </button>
      <div class="page-numbers">${items}</div>
      <span class="page-status">صفحة ${current} من ${pages}</span>
      <button class="page-nav" onclick="App.goToPage(${current + 1})" ${current === pages ? 'disabled' : ''} aria-label="الصفحة التالية">
        <span>التالي</span>${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 16)}
      </button>
    </nav>`;
  },

  goToPage(n) {
    const pages = this.shopPages(this.shopFiltered().list.length);
    const target = Math.min(Math.max(1, Number(n) || 1), pages);
    this.state.pageNum = target;
    this.updateProductsView();
    this.updateUrl();
    const el = document.getElementById('shopResults');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  },

  toggleFilters(force) {
    const wasOpen = this.state.filtersOpen;
    const open = force === undefined ? !wasOpen : !!force;
    this.state.filtersOpen = open;
    const sidebar = document.getElementById('shopSidebar');
    const backdrop = document.getElementById('shopFilterBackdrop');
    if (sidebar) sidebar.classList.toggle('open', open);
    if (backdrop) backdrop.classList.toggle('open', open);
    const trigger = document.querySelector('.shop-filter-toggle');
    if (trigger) trigger.setAttribute('aria-expanded', String(open));
    if (open && !wasOpen) this.lockBody();
    if (!open && wasOpen) this.unlockBody();
  },

  _sorter(key) {
    switch (key) {
      case 'price-asc': return (a, b) => a.price - b.price;
      case 'price-desc': return (a, b) => b.price - a.price;
      case 'name': return (a, b) => String(a.name).localeCompare(String(b.name), 'ar');
      case 'discount': return (a, b) => this.disc(b) - this.disc(a);
      case 'popular':
      default:
        return (a, b) => (b.pop ? 1 : 0) - (a.pop ? 1 : 0) || a.price - b.price;
    }
  },

  setSort(key) {
    this.state.sort = key;
    this.state.pageNum = 1;
    this.updateProductsView();
    this.updateUrl();
  },

  setFilter(cat) {
    if (this.state.filtersOpen) this.toggleFilters(false);
    if (this.pageType === 'shop') {
      if (cat === 'all') {
        this.state.filter = 'all';
        this.state.pageNum = 1;
        this.updateProductsView();
        this.updateUrl();
      } else {
        this.go(this.categoryUrl(cat));
      }
      return;
    }
    if (this.pageType === 'category') {
      if (cat === this.state.filter) return;
      this.go(cat === 'all' ? this.shopUrl() : this.categoryUrl(cat));
      return;
    }
    this.go(cat === 'all' ? this.shopUrl() : this.categoryUrl(cat));
  },

  setPrice(key) {
    this.state.price = key;
    this.state.pageNum = 1;
    this.updateProductsView();
    this.updateUrl();
  },

  setFlag(flag, value) {
    if (flag !== 'onlySale' && flag !== 'onlyPop') return;
    this.state[flag] = !!value;
    this.state.pageNum = 1;
    this.updateProductsView();
    this.updateUrl();
  },

  clearFilters() {
    this.state.filter = this.pageType === 'category'
      ? (document.body.dataset.category || 'all')
      : 'all';
    this.state.price = 'all';
    this.state.onlySale = false;
    this.state.onlyPop = false;
    this.state.search = '';
    this.state.pageNum = 1;
    this.syncSearchInputs();
    this.updateProductsView();
    this.updateUrl();
    this.closeSearch();
    if (this.state.filtersOpen) this.toggleFilters(false);
  },

  showService(id) {
    const service = this.services.find(s => String(s.id) === String(id));
    if (!service) return;
    const alreadyOpen = !!this.state.selProd || !!this.state.selService;
    this.closeSearch();
    this.state.selProd = null;
    this.state.selService = service;
    this.renderServiceModal();
    if (!alreadyOpen) this.lockBody();
  },

  // ---- URL (filters stay as query params on the current path) -------
  updateUrl() {
    if (!window.history || !window.history.replaceState) return;
    try {
      const url = new URL(window.location.href);
      ['q', 'cat', 'sort', 'price', 'sale', 'pop', 'page', 'shop', 'view', 'product'].forEach(key => url.searchParams.delete(key));
      if (this.isListingPage()) {
        if (this.state.search) url.searchParams.set('q', this.state.search);
        if (this.state.sort && this.state.sort !== 'relevance') url.searchParams.set('sort', this.state.sort);
        if (this.state.price !== 'all') url.searchParams.set('price', this.state.price);
        if (this.state.onlySale) url.searchParams.set('sale', '1');
        if (this.state.onlyPop) url.searchParams.set('pop', '1');
        if (this.state.pageNum > 1) url.searchParams.set('page', String(this.state.pageNum));
      }
      window.history.replaceState({}, '', url.toString());
    } catch {}
  },

  /** Read the static shell (body data attributes) for this page. */
  readPageContext() {
    const body = document.body;
    this.state.pageNum = 1;
    this.state.filter = 'all';
    this.state.currentProduct = null;
    this.state.notFound = false;

    if (this.pageType === 'product') {
      const slug = body.dataset.product || '';
      const product = this.products.find(p => String(p.slug) === String(slug));
      this.state.page = 'products';
      this.state.currentProduct = product || null;
      this.state.notFound = !product;
      if (product) this.state.filter = product.cat;
      return;
    }

    if (this.pageType === 'category') {
      const key = body.dataset.category || 'all';
      this.state.page = 'products';
      this.state.filter = this.catalog.categories.some(c => c.key === key) ? key : 'all';
      return;
    }

    if (this.pageType === 'shop') {
      this.state.page = 'products';
      this.state.filter = 'all';
      return;
    }

    this.state.page = ['projects', 'contact', 'terms'].indexOf(this.pageType) > -1 ? this.pageType : 'home';
  },

  /** Filters / sort / page number live in the query string of the current path. */
  readQueryState() {
    if (!window.URLSearchParams || !this.isListingPage()) return;
    const params = new URLSearchParams(window.location.search);
    const q = (params.get('q') || '').trim();
    const sort = params.get('sort') || 'relevance';
    const price = params.get('price') || 'all';
    const page = Math.max(1, parseInt(params.get('page') || '1', 10) || 1);
    const validSort = this.sorts.some(s => s.key === sort);
    this.state.sort = validSort ? sort : 'relevance';
    if (this.priceRanges.some(r => r.key === price)) this.state.price = price;
    this.state.onlySale = params.get('sale') === '1';
    this.state.onlyPop = params.get('pop') === '1';
    this.state.pageNum = page;
    if (q) this.state.search = q;
  },

  /** Convert the old query-string URLs into the new directory paths. */
  legacyRedirect() {
    if (!window.URLSearchParams) return false;
    const params = new URLSearchParams(window.location.search);
    const filterKeys = ['q', 'sort', 'price', 'sale', 'pop', 'page'];
    const filterQuery = () => {
      const next = new URLSearchParams();
      filterKeys.forEach(key => {
        const value = params.get(key);
        if (value) next.set(key, value);
      });
      const qs = next.toString();
      return qs ? '?' + qs : '';
    };
    const withQuery = (base) => base + filterQuery();

    const productParam = params.get('product');
    if (productParam) {
      const product = this.products.find(p => String(p.id) === String(productParam) || String(p.slug) === String(productParam));
      if (product) {
        window.location.replace(this.productUrl(product));
        return true;
      }
    }

    if (this.pageType === 'home') {
      const cat = params.get('cat');
      if (cat && cat !== 'all' && this.catalog.categories.some(c => c.key === cat)) {
        window.location.replace(withQuery(this.categoryUrl(cat)));
        return true;
      }
      if (params.get('q') || params.get('shop') === '1') {
        window.location.replace(withQuery(this.shopUrl()));
        return true;
      }
      const view = params.get('view');
      if (view === 'features') {
        window.location.replace(this.pagePath('projects'));
        return true;
      }
      if (['projects', 'contact', 'terms'].indexOf(view) > -1) {
        window.location.replace(this.pagePath(view));
        return true;
      }
    }

    if (this.pageType === 'shop') {
      const cat = params.get('cat');
      if (cat && cat !== 'all' && this.catalog.categories.some(c => c.key === cat)) {
        window.location.replace(withQuery(this.categoryUrl(cat)));
        return true;
      }
    }

    return false;
  },

  // ============================================================
  // 11. RENDERING
  // ============================================================
  render() {
    this.renderMain();
    this.renderMenu();
    this.updateBadge();
    this.startCarousel();
    this.setupBackToTop();
    this.setupHeaderScroll();
  },

  renderMenu() {
    const dd = document.getElementById('dropdown');
    const bd = document.getElementById('menuBackdrop');
    if (this.state.menuOpen && window.IBOARDZ_MENU) {
      dd.innerHTML = window.IBOARDZ_MENU.html(this);
      dd.setAttribute('aria-label', 'قائمة التنقل والمتجر');
      dd.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => {
        if (!this.state.menuOpen) return;
        dd.classList.add('open');
        bd.classList.add('open');
      });
    } else {
      dd.classList.remove('open');
      dd.setAttribute('aria-hidden', 'true');
      bd.classList.remove('open');
    }
  },

  renderCart() {
    const overlay = document.getElementById('cartOverlay');
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    const count = document.getElementById('cartCount');
    if (!overlay || !body) return;

    overlay.className = 'cart-overlay' + (this.state.cartOpen ? ' open' : '');
    count.textContent = this.totalItems();

    if (this.state.cart.length === 0) {
      body.innerHTML = `<div class="cart-empty">${this.svgIcon(this.icons.box, 40, 'var(--text-muted,#ccc)')}<p style="font-size:16px;margin-top:12px">السلة فارغة</p><p style="font-size:13px">أضف منتجات للبدء</p></div>`;
      footer.style.display = 'none';
      return;
    }

    body.innerHTML = this.state.cart.map(item => `<div class="cart-item">
      <div class="cart-item-img">${this.imgTag(this.imgPath(item.product.img), item.product.name, 40)}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${this.esc(item.product.name)}${item.color ? `<span class="cart-item-color">${item.product.customInput ? ' - القيمة: ' + this.esc(item.color) : ' - ' + this.esc(item.color)}</span>` : ''}</div>
        <div class="cart-item-prices"><span class="price" style="font-size:15px">⃁ ${item.product.price}</span><span class="old-price">⃁ ${item.product.op}</span></div>
      </div>
      <div class="cart-qty-controls">
        <button class="qty-btn" onclick="App.updQty(${item.product.id},-1${item.color == null ? '' : ',' + JSON.stringify(item.color).replace(/"/g, '&quot;')})" aria-label="نقص" title="نقص الكمية">−</button>
        <span style="font-weight:900;min-width:22px;text-align:center;font-size:16px;color:var(--primary)">${item.qty}</span>
        <button class="qty-btn" onclick="App.updQty(${item.product.id},1${item.color == null ? '' : ',' + JSON.stringify(item.color).replace(/"/g, '&quot;')})" aria-label="زيادة" title="زيادة الكمية">+</button>
        <button class="cart-remove" onclick="App.removeCart(${item.product.id}${item.color == null ? '' : ',' + JSON.stringify(item.color).replace(/"/g, '&quot;')})" aria-label="إزالة ${this.esc(item.product.name)} من السلة" title="إزالة من السلة">${this.svgIcon('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>', 16)}</button>
      </div>
    </div>`).join('');

    const tp = this.totalPrice(), top2 = this.totalOriginal(), ts = this.totalSaved();
    const waText = 'مرحباً، أريد طلب:\n' + this.state.cart.map(i =>
      `${i.product.name}${i.color ? (i.product.customInput ? ' (القيمة: ' + i.color + ')' : ' - ' + i.color) : ''} × ${i.qty} = ⃁ ${i.product.price * i.qty}`
    ).join('\n') + '\nالمجموع: ⃁ ' + tp;

    footer.style.display = 'block';
    footer.innerHTML = `<div class="cart-totals">
      <div class="cart-total-row original"><span class="cart-total-label">الإجمالي قبل الخصم:</span><span class="cart-total-old">⃁ ${top2}</span></div>
      <div class="cart-total-row discounted"><span class="cart-total-label">الإجمالي بعد الخصم:</span><span class="cart-total-new">⃁ ${tp}</span></div>
      ${ts > 0 ? `<div class="cart-savings-badge"><span class="savings-icon">${this.svgIcon(this.icons.tag, 18, 'var(--success)')}</span><span class="savings-text">وفّرت ⃁ ${ts}</span></div>` : ''}
    </div>
    <a class="whatsapp-btn" href="${this.wa(waText)}" target="_blank" rel="noopener noreferrer">${this.svgIcon(this.icons.whatsapp, 20, 'currentColor', 'currentColor')} اطلب عبر واتساب</a>`;
  },

  renderModal() {
    const m = document.getElementById('modalOverlay');
    if (!m) return;
    const p = this.state.selProd;
    if (!p) {
      if (this.state.selService) { this.state.selService = null; }
      m.style.display = 'none';
      return;
    }
    const stock = this.getStock(p);
    const related = this.products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 3);
    m.style.display = 'flex';
    m.innerHTML = `<div class="modal-backdrop" onclick="App.closeModal()"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="App.closeModal()" aria-label="إغلاق">${this.svgIcon('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 20)}</button>
        <div class="modal-img">${this.imgTag(this.imgPath(p.img), p.name, 160)}</div>
        <div class="modal-body">
          <div class="modal-badges">
            <span class="badge badge-orange">${this.catLabel(p.cat)}</span>
            ${p.badge ? `<span class="badge badge-red">${this.esc(p.badge)}</span>` : ''}
            <span class="badge badge-orange">-${this.disc(p)}%</span>
          </div>
          <h2 class="modal-title">${this.esc(p.name)}</h2>
          ${p.nameAr ? `<p class="modal-name-ar">${this.esc(p.nameAr)}</p>` : ''}
          <div class="modal-meta">
            ${p.sku ? `<span>رمز القطعة: <strong dir="ltr">${this.esc(p.sku)}</strong></span>` : ''}
            <span class="modal-stock${stock === 0 ? ' out' : ''}">${stock === 0 ? 'غير متوفر حالياً' : 'متوفر للطلب'}</span>
          </div>
          <p class="modal-desc">${this.esc(p.desc)}</p>
          ${p.customInput
            ? `<div class="modal-color-picker"><label class="modal-color-label" for="prodCustomValue">${this.esc(p.customInput.label || 'القيمة:')}</label><input type="text" id="prodCustomValue" class="modal-custom-input" placeholder="${this.esc(p.customInput.placeholder || '')}" autocomplete="off"></div>`
            : p.colorOptions
              ? `<div class="modal-color-picker"><label class="modal-color-label">${this.esc(p.optionLabel || 'اختر اللون المناسب:')}</label><div class="modal-color-options">${p.colorOptions.map(c => `<label class="modal-color-option"><input type="radio" name="prodOption" value="${this.esc(c)}" class="modal-color-radio"><span class="modal-color-swatch" data-color="${this.esc(c)}">${this.esc(c)}</span></label>`).join('')}</div></div>`
            : ''}
          <div class="modal-prices"><span class="modal-new-price">⃁ ${p.price}</span><span class="modal-old-price">⃁ ${p.op}</span><span class="modal-save">توفير ${this.disc(p)}%</span></div>
          <div class="modal-specs"><h3>المواصفات التقنية:</h3>${(p.specs || []).map(s => { const parts = this.specParts(s); return `<div class="spec-item"><div class="spec-dot"></div><span class="spec-text">${parts.label ? `<strong>${this.esc(parts.label)}:</strong> ` : ''}${this.esc(parts.value)}</span></div>`; }).join('')}</div>
          <div class="modal-trust">
            <span>${this.svgIcon(this.icons.truck, 14)} شحن لكل المملكة</span>
            <span>${this.svgIcon(this.icons.shield, 14)} ضمان على المنتجات</span>
            <span>${this.svgIcon(this.icons.headset, 14)} دعم فني</span>
          </div>
          <button class="modal-add-btn" onclick="App.addCartWithColor(${p.id})">أضف إلى السلة ${this.svgIcon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 16)}</button>
          <a class="modal-wa-link" href="${this.wa('مرحباً، أريد طلب: ' + p.name + ' (الرمز: ' + (p.sku || p.id) + ')')}" target="_blank" rel="noopener noreferrer">${this.svgIcon(this.icons.whatsapp, 16)} أو اطلب مباشرة عبر واتساب</a>
          ${related.length ? `<div class="modal-related">
            <h3>منتجات مشابهة</h3>
            <div class="modal-related-grid">${related.map(r => `<button class="modal-related-item" onclick="App.showProduct(${r.id})">
              <span class="modal-related-img">${this.imgTag(this.imgPath(r.img), r.name, 54)}</span>
              <span class="modal-related-name">${this.esc(r.name)}</span>
              <span class="modal-related-price">⃁ ${r.price}</span>
            </button>`).join('')}</div>
          </div>` : ''}
        </div>
      </div>`;
  },

  renderServiceModal() {
    const m = document.getElementById('modalOverlay');
    const s = this.state.selService;
    if (!m || !s) return;
    m.style.display = 'flex';
    m.innerHTML = `<div class="modal-backdrop" onclick="App.closeModal()"></div>
      <div class="modal-content service">
        <button class="modal-close" onclick="App.closeModal()">${this.svgIcon('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 20)}</button>
        <div class="modal-img service">${this.imgTag(this.imgPath(s.img), s.name, 160)}</div>
        <div class="modal-body">
          <div class="modal-badges"><span class="badge badge-red">${this.esc(s.badge || 'خدمة')}</span><span class="badge badge-orange">${this.esc(s.nameEn)}</span></div>
          <h2 class="modal-title">${this.esc(s.name)}</h2>
          <p class="modal-desc">${this.esc(s.summary)}</p>
          <p class="modal-desc">${this.esc(s.longDesc)}</p>
          <div class="modal-specs"><h3>مميزات الخدمة:</h3>${(s.features || []).map(f => `<div class="spec-item"><div class="spec-dot"></div><span class="spec-text">${this.esc(f)}</span></div>`).join('')}</div>
          <a class="modal-add-btn service" href="${this.wa('مرحباً، أرغب بطلب خدمة الطباعة ثلاثية الأبعاد من iBoardz')}" target="_blank" rel="noopener noreferrer">اطلب الخدمة عبر واتساب ${this.svgIcon(this.icons.whatsapp, 16, 'currentColor')}</a>
        </div>
      </div>`;
  },

  // ---- svg helpers -----------------------------------------
  svgIcon(d, s = 18, stroke = 'currentColor', fill = 'none') {
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  },

  imgTag(src, alt, minH = 60) {
    return `<img src="${this.esc(src)}" alt="${this.esc(alt)}" loading="lazy" decoding="async" onerror="App.imgFallback(this)" class="img-tag" style="min-height:${minH}px">`;
  },

  // Retry once (covers a transient network/CDN hiccup), then show a branded
  // placeholder instead of leaving an unexplained blank image area.
  imgFallback(img) {
    if (!img) return;
    if (!img.dataset.retried) {
      img.dataset.retried = '1';
      const src = img.getAttribute('src') || '';
      img.src = src + (src.indexOf('?') > -1 ? '&' : '?') + 'retry=1';
      return;
    }
    img.onerror = null;
    img.classList.add('img-fallback');
    img.alt = 'صورة المنتج غير متوفرة';
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120">' +
      '<rect width="160" height="120" rx="12" fill="#f1f3f8"/>' +
      '<path d="M46 78l20-24 14 16 10-12 24 30H46z" fill="#c7cedb"/>' +
      '<circle cx="62" cy="44" r="9" fill="#c7cedb"/>' +
      '<text x="80" y="104" text-anchor="middle" font-family="Arial" font-size="11" fill="#8b93a7">iBoardz</text>' +
      '</svg>';
    img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  },

  starSVG(filled, size = 18) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${filled ? '#ff9500' : 'none'}" stroke="${filled ? 'none' : 'var(--star-empty,#ddd)'}" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  },

  renderStars(n, size = 18) {
    return Array(5).fill(0).map((_, i) => this.starSVG(i < n, size)).join('');
  },

  // ---- product card ----------------------------------------
  productCard(p, large, highlightTokens) {
    const name = highlightTokens && highlightTokens.length
      ? IBSearch.highlight(p.name, highlightTokens)
      : this.esc(p.name);
    const needsOptions = !!(p.colorOptions || p.customInput);
    const addAction = needsOptions
      ? `App.showProduct(${p.id})`
      : `App.addCart(App.products.find(x=>String(x.id)===String(${p.id})), null, event)`;
    const stock = this.getStock(p);
    const discount = this.disc(p);
    const desc = p.desc ? this.esc(p.desc) : (p.nameAr ? this.esc(p.nameAr) : this.esc(this.catDesc(p.cat)));
    const href = this.productUrl(p);
    const imageLabel = `عرض صفحة ${p.name}${p.badge ? ' — ' + p.badge : ''} -${discount}%`;
    return `<article class="product-card${large ? ' product-card-large' : ''}">
      <a class="product-img${large ? ' product-img-large' : ''}" href="${this.esc(href)}" aria-label="${this.esc(imageLabel)}">
        ${this.imgTag(this.imgPath(p.img), p.name, 100)}
        ${p.badge ? `<span class="product-badge badge-primary">${this.esc(p.badge)}</span>` : ''}
        <span class="discount-badge">-${discount}%</span>
      </a>
      <div class="product-info">
        <div class="product-cat-row">
          <a class="product-cat" href="${this.esc(this.categoryUrl(p.cat))}">${this.esc(this.catLabel(p.cat))}</a>
          ${stock !== null ? `<span class="stock-pill${stock === 0 ? ' out' : ''}">${stock === 0 ? 'غير متوفر' : 'متوفر'}</span>` : ''}
        </div>
        <h3 class="product-name" title="${this.esc(p.name)}"><a href="${this.esc(href)}">${name}</a></h3>
        <p class="product-desc">${desc}</p>
        <div class="product-bottom">
          <div class="product-prices">
            <span class="price">⃁ ${p.price}</span>
            <span class="old-price">⃁ ${p.op}</span>
          </div>
          <button class="add-btn" onclick="event.stopPropagation();${addAction}" aria-label="أضف ${this.esc(p.name)} إلى السلة">
            ${this.svgIcon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 16)}
            <span class="add-btn-label">أضف</span>
          </button>
        </div>
      </div>
    </article>`;
  },

  renderMain() {
    const main = document.getElementById('mainContent');
    const fl = document.getElementById('footerLinks');
    if (fl) fl.innerHTML = this.navItems.map(n => `<a href="${this.esc(this.pagePath(n.key))}">${n.label}</a>`).join('');
    const fc = document.getElementById('footerCategories');
    if (fc) fc.innerHTML = this.cats().filter(c => c.key !== 'all').map(c =>
      `<a href="${this.esc(this.categoryUrl(c.key))}">${c.label}<span>${this.catCount(c.key)}</span></a>`
    ).join('');

    if (this.pageType === 'product') main.innerHTML = this.renderProductPage();
    else if (this.pageType === 'category' || this.pageType === 'shop') main.innerHTML = this.renderProducts();
    else if (this.pageType === 'projects') main.innerHTML = this.renderProjects();
    else if (this.pageType === 'terms') main.innerHTML = this.renderTerms();
    else if (this.pageType === 'contact') main.innerHTML = this.renderContact();
    else main.innerHTML = this.renderHome();

    document.title = this.pageTitle();
    this.syncSeo();
    setTimeout(() => this.setupScrollReveal(), 100);
  },

  syncSeo() {
    try {
      document.title = this.pageTitle();
      const origin = this.siteOrigin;
      let path = '/';
      let desc = 'متجر iBoardz - وجهتك الرقمية الأولى لمكونات الإلكترونيات والبرمجة في السعودية. متحكمات Arduino وESP32 وحساسات وشاشات ووحدات طاقة وشحن سريع لجميع المدن.';
      let image = origin + '/images/banners/add.jpg';
      let imageAlt = 'iBoardz — متجر الإلكترونيات والاردوينو';
      let ogType = 'website';

      if (this.pageType === 'product') {
        const p = this.state.currentProduct;
        if (p) {
          path = `/product/${encodeURIComponent(p.slug)}/`;
          desc = `${p.name}${p.nameAr ? ' — ' + p.nameAr : ''}: ${p.desc || ''} — السعر ${p.price} ر.س من متجر iBoardz مع شحن سريع.`;
          image = origin + '/' + encodeURI('images/' + p.img);
          imageAlt = p.name;
          ogType = 'product';
        } else {
          path = '/shop/';
          desc = 'المنتج المطلوب غير متوفر. تصفّح جميع منتجات iBoardz من أردوينو وESP32 وحساسات وشاشات ومستلزمات التوصيل.';
        }
      } else if (this.pageType === 'category') {
        const cat = this.state.filter;
        path = `/category/${encodeURIComponent(cat)}/`;
        desc = `${this.catLabel(cat)}: ${this.catDesc(cat)} — ${this.catCount(cat)} منتجات من متجر iBoardz مع شحن سريع لجميع مناطق المملكة.`;
        if (this.state.search) desc = `بحث عن "${this.state.search}" داخل ${this.catLabel(cat)} — متجر iBoardz.`;
      } else if (this.pageType === 'shop') {
        path = '/shop/';
        desc = 'تسوق جميع منتجات iBoardz من أردوينو وESP32 وحساسات وشاشات ووحدات طاقة ومستلزمات توصيل، مع شحن سريع لجميع مناطق المملكة.';
        if (this.state.search) desc = `نتائج البحث عن "${this.state.search}" في متجر iBoardz — قطع إلكترونية أصلية وشحن سريع.`;
      } else if (this.pageType === 'contact') {
        path = '/contact/';
        desc = 'تواصل مع فريق iBoardz عبر واتساب أو البريد الإلكتروني للاستفسار عن المنتجات والطلبات وخدمة الطباعة ثلاثية الأبعاد.';
      } else if (this.pageType === 'terms') {
        path = '/terms/';
        desc = 'الشروط والأحكام وسياسة الشحن والاستبدال والضمان والخصوصية في متجر iBoardz.';
      } else if (this.pageType === 'projects') {
        path = '/projects/';
        desc = 'مشاريع أردوينو وESP32 جاهزة مع قائمة القطع المطلوبة والسعر الإجمالي. اختر مشروعك وأضف كل القطع إلى السلة بضغطة واحدة من iBoardz.';
      }

      const url = new URL(path, origin + '/');
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.href = url.toString();
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.content = url.toString();
      const ogImage = document.querySelector('meta[property="og:image"]');
      const twImage = document.querySelector('meta[name="twitter:image"]');
      const ogAlt = document.querySelector('meta[property="og:image:alt"]');
      if (ogImage) ogImage.content = image;
      if (twImage) twImage.content = image;
      if (ogAlt) ogAlt.content = imageAlt;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.content = this.pageTitle();
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.content = this.pageTitle();
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.content = desc;
      const ogTypeMeta = document.querySelector('meta[property="og:type"]');
      if (ogTypeMeta) ogTypeMeta.content = ogType;
    } catch {}
  },

  pageTitle() {
    if (this.pageType === 'product') {
      const p = this.state.currentProduct;
      return p ? `${p.name} — ${p.nameAr || 'منتج iBoardz'} | iBoardz` : `المنتج غير موجود | iBoardz`;
    }
    if (this.pageType === 'category') {
      if (this.state.search) return `بحث: ${this.state.search} في ${this.catLabel(this.state.filter)} | iBoardz`;
      return `${this.catLabel(this.state.filter)} — ${this.productCount(this.catCount(this.state.filter))} | iBoardz`;
    }
    if (this.pageType === 'shop') {
      if (this.state.search) return `بحث: ${this.state.search} | iBoardz`;
      return `كل المنتجات — ${this.productCount(this.products.length)} | iBoardz`;
    }
    if (this.pageType === 'projects') return `مشاريع جاهزة — ابنِ مشروعك | iBoardz`;
    if (this.pageType === 'terms') return `الشروط والأحكام | iBoardz`;
    if (this.pageType === 'contact') return `تواصل معنا | iBoardz`;
    return `iBoardz | متجر الإلكترونيات والاردوينو الأول في السعودية - ARDUINO FUTURE`;
  },

  // ============================================================
  // 12. PAGES
  // ============================================================
  renderHome() {
    const ad = this.services.find(s => s.slug === '3d-printing-service');
    const adStrip = ad && !this.isAdDismissed() ? `
    <div class="ad-strip" id="adStrip">
      <span class="ad-strip-tag">جديد</span>
      <span class="ad-strip-text">خدمة الطباعة ثلاثية الأبعاد الاحترافية متوفرة الآن — دقة عالية وإنجاز سريع</span>
      <button class="ad-strip-cta" onclick="App.showService('${this.esc(ad.id)}')">اعرف المزيد</button>
      <button class="ad-strip-close" onclick="App.dismissAd()" aria-label="إخفاء الإعلان">${this.svgIcon(this.icons.close, 14)}</button>
    </div>` : '';

    return `
    ${adStrip}

    ${this.renderHero()}

    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">${this.marqueeItems()}${this.marqueeItems()}</div>
    </div>

    <div class="section reveal home-products">
      <div class="home-products-head">
        <div class="home-products-copy">
          <div class="section-badge">مختارات iBoardz</div>
          <h2 class="section-title">منتجات مختارة لمشروعك</h2>
          <p class="section-subtitle">أكثر القطع طلباً، وأحدث ما وصل، وأفضل العروض في مكان واحد</p>
        </div>
        <div class="home-tabs" id="homeTabs" role="tablist" aria-label="تصفية المنتجات المختارة">
          ${this.homeTabs().map(t => `<button class="home-tab${this.state.homeTab === t.key ? ' active' : ''}" data-tab="${t.key}" role="tab" aria-selected="${this.state.homeTab === t.key}" onclick="App.setHomeTab('${t.key}')">${t.label}</button>`).join('')}
        </div>
      </div>
      <div class="products-grid" id="homeFeaturedGrid" role="tabpanel" aria-live="polite">${this.homeFeaturedList(this.state.homeTab).map(p => this.productCard(p)).join('')}</div>
      <div class="home-products-footer">
        <a class="show-all-btn" href="${this.esc(this.shopUrl())}">عرض جميع المنتجات (${this.products.length}) ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 22)}</a>
      </div>
    </div>

    ${this.renderHomeProjects()}

    ${ad ? this.renderAdSection(ad) : ''}

    <div class="section reveal section-alt-bg">
      <div class="section-header">
        <div class="section-badge">آراء العملاء</div>
        <h2 class="section-title">ماذا يقول عملاؤنا</h2>
        <p class="section-subtitle">تجارب حقيقية من عملاء صمموا مشاريعهم مع iBoardz</p>
      </div>
      <div class="reviews-grid-home">
        ${this.reviews.slice(0, 3).map(r => `
          <div class="review-card-home">
            <div class="review-stars-home">${this.renderStars(r.stars || 5)}</div>
            <p class="review-text-home">${r.text}</p>
            <div class="review-decor-home"><span class="review-decor-dot"></span><span class="review-decor-dot"></span><span class="review-decor-dot"></span></div>
          </div>
        `).join('')}
      </div>
      <div style="text-align:center;margin-top:40px"><a class="show-all-btn" href="${this.esc(this.pagePath('projects'))}#reviews">عرض جميع التقييمات ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 22)}</a></div>
    </div>`;
  },

  // ---- home project teaser ----------------------------------
  renderHomeProjects() {
    if (!this.projects.length) return '';
    const picks = ['weather-station', 'plant-watering', 'gas-alarm']
      .map(key => this.projects.find(project => project.key === key))
      .filter(Boolean);
    if (!picks.length) return '';
    return `<div class="section projects-teaser reveal">
      <div class="projects-teaser-head">
        <div>
          <span class="section-badge">مشاريع جاهزة</span>
          <h2 class="section-title">ابنِ مشروعك من أول قطعة</h2>
          <p class="section-subtitle">اختر مشروعاً، شوف القطع المطلوبة وسعرها، وأضفها للسلة بضغطة.</p>
        </div>
        <a class="projects-text-link" href="${this.esc(this.pagePath('projects'))}">كل المشاريع ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 14)}</a>
      </div>
      <div class="home-projects-grid">${picks.map(project => this.homeProjectCard(project)).join('')}</div>
    </div>`;
  },

  homeProjectCard(project) {
    const totals = this.projectTotals(project);
    const icon = this.icons[project.icon] || this.icons.grid;
    const level = project.level || 'intermediate';
    return `<a class="home-project-card" href="${this.esc(this.pagePath('projects'))}#${this.esc(this.projectAnchor(project))}">
      <span class="home-project-top">
        <span class="home-project-icon" aria-hidden="true">${this.svgIcon(icon, 20)}</span>
        <span class="home-project-level level-${level}">${this.projectLevelLabel(level)}</span>
      </span>
      <strong class="home-project-title">${this.esc(project.title)}</strong>
      <span class="home-project-summary">${this.esc(project.summary)}</span>
      <span class="home-project-meta">${totals.parts.length} قطع · ${this.esc(project.time)}</span>
      <span class="home-project-foot">
        <span class="home-project-price">⃁ ${this.money(totals.price)}</span>
        <span class="home-project-link">شوف المشروع ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 13)}</span>
      </span>
    </a>`;
  },

  // ---- hero -------------------------------------------------
  renderHero() {
    const picks = ['esp32-dev-model', 'arduino-uno-r3', 'sh1107-oled-display', 'dht11-sensor']
      .map(slug => this.products.find(p => p.slug === slug))
      .filter(Boolean);
    const cards = picks.map((p, i) => `
      <a class="hero-product hero-product-${i + 1}" href="${this.esc(this.productUrl(p))}">
        <span class="hero-product-img"><img src="${this.esc(this.imgPath(p.img))}" alt="" width="180" height="150" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async"></span>
        <span class="hero-product-meta">
          <span class="hero-product-name">${this.esc(p.name)}</span>
          <span class="hero-product-price">⃁ ${p.price}</span>
        </span>
      </a>`).join('');

    return `<section class="home-hero" aria-labelledby="heroTitle">
      <div class="home-hero-grid" aria-hidden="true"></div>
      <div class="home-hero-glow" aria-hidden="true"></div>
      <div class="home-hero-inner">
        <div class="hero-copy">
          <h1 class="hero-title" id="heroTitle">كل قطع مشروعك<br><span>في مكان واحد.</span></h1>
          <p class="hero-desc">متحكمات أردوينو وESP32، حساسات، شاشات، وحدات طاقة ومستلزمات توصيل — منتجات أصلية مع شحن سريع لكل مناطق المملكة ودعم فني يساعدك حتى تشغّل مشروعك.</p>
          <div class="hero-actions">
            <a class="hero-btn primary" href="${this.esc(this.shopUrl())}">تسوق المنتجات ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 18)}</a>
            <a class="hero-btn ghost" href="${this.esc(this.pagePath('projects'))}">${this.svgIcon(this.icons.grid, 17)} ابنِ مشروعك</a>
            <button class="hero-btn ghost" onclick="App.showService('svc-3d-printing')">خدمة الطباعة 3D ${this.svgIcon(this.icons.printer, 18)}</button>
          </div>
          <div class="hero-stats">
            <div><strong>${this.products.length}+</strong><span>قطعة متوفرة</span></div>
            <div><strong>${this.cats().length - 1}</strong><span>أقسام رئيسية</span></div>
            <div><strong>7 أيام</strong><span>استبدال واسترجاع</span></div>
          </div>
        </div>
        <div class="hero-visual">${cards}</div>
      </div>
    </section>`;
  },

  // ---- home featured tabs -----------------------------------
  homeTabs() {
    return [
      { key: 'popular', label: 'الأكثر رواجاً' },
      { key: 'new', label: 'وصل حديثاً' },
      { key: 'deals', label: 'أفضل العروض' },
    ];
  },

  homeFeaturedList(tab) {
    const list = this.products.slice();
    if (tab === 'new') list.sort((a, b) => Number(b.id) - Number(a.id));
    else if (tab === 'deals') list.sort((a, b) => this.disc(b) - this.disc(a) || a.price - b.price);
    else list.sort((a, b) => (b.pop ? 1 : 0) - (a.pop ? 1 : 0) || a.price - b.price);
    return list.slice(0, 8);
  },

  setHomeTab(tab) {
    if (!this.homeTabs().some(t => t.key === tab)) return;
    this.state.homeTab = tab;
    document.querySelectorAll('#homeTabs .home-tab').forEach(btn => {
      const on = btn.dataset.tab === tab;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-selected', String(on));
    });
    const grid = document.getElementById('homeFeaturedGrid');
    if (grid) {
      grid.innerHTML = this.homeFeaturedList(tab).map(p => this.productCard(p)).join('');
      grid.classList.remove('enter');
      void grid.offsetWidth;
      grid.classList.add('enter');
    }
  },

  // ---- the announcement marquee ---------------------------
  // Rendered twice so the -50% keyframe loop is seamless.
  marqueeItems() {
    return [
      [this.icons.truck, 'توصيل سريع لجميع مناطق المملكة'],
      [this.icons.shield, 'ضمان كامل على جميع المنتجات'],
      [this.icons.headset, 'دعم فني متواصل عبر واتساب'],
      [this.icons.tag, 'خصومات تنافسية طوال الموسم'],
      [this.icons.award, 'منتجات أصلية ومضمونة'],
      [this.icons.printer, 'خدمة طباعة ثلاثية الأبعاد احترافية'],
    ].map(([ic, txt]) => `<span class="marquee-item">${this.svgIcon(ic, 15, 'var(--primary)')}<span>${txt}</span></span>`).join('');
  },

  // ---- the 3D printing service advertisement ----------------
  renderAdSection(ad) {
    const waLink = this.wa('مرحباً، أرغب بطلب خدمة الطباعة ثلاثية الأبعاد من iBoardz');
    return `
    <section class="ad-section reveal" aria-label="إعلان: خدمات الطباعة ثلاثية الأبعاد">
      <div class="ad-card">
        <button type="button" class="ad-media" onclick="App.showService('${this.esc(ad.id)}')" title="عرض تفاصيل الخدمة">
          <img src="${this.esc(this.imgPath(ad.img))}" alt="${this.esc(ad.name)}" width="1184" height="880" loading="lazy" decoding="async">
          <span class="ad-ribbon">${this.esc(ad.badge || 'جديد')}</span>
        </button>
        <div class="ad-copy">
          <span class="ad-kicker">خدماتنا</span>
          <h2 class="ad-title">${this.esc(ad.name)}</h2>
          <p class="ad-summary">${this.esc(ad.summary)}</p>
          <ul class="ad-features">
            ${(ad.features || []).map(f => `<li>${this.svgIcon(this.icons.check, 16, 'var(--primary)')}<span>${this.esc(f)}</span></li>`).join('')}
          </ul>
          <div class="ad-actions">
            <a class="ad-btn primary" href="${waLink}" target="_blank" rel="noopener noreferrer">اطلب الآن عبر واتساب ${this.svgIcon(this.icons.whatsapp, 18, 'currentColor')}</a>
            <button class="ad-btn ghost" onclick="App.showService('${this.esc(ad.id)}')">تفاصيل الخدمة</button>
          </div>
          <p class="ad-contact">للاستفسار: <a class="phone" href="tel:+${this.meta.whatsapp}">${this.meta.whatsappDisplay}</a></p>
        </div>
      </div>
    </section>`;
  },

  isAdDismissed() {
    try { return sessionStorage.getItem(this.AD_KEY) === '1'; } catch { return false; }
  },

  dismissAd() {
    try { sessionStorage.setItem(this.AD_KEY, '1'); } catch {}
    const el = document.getElementById('adStrip');
    if (el) el.remove();
  },

  // ---- products page ---------------------------------------
  renderCategoryHero(catKey) {
    const cat = this.catalog.categories.find(c => c.key === catKey) || { key: 'all', label: 'كل المنتجات', desc: '' };
    const icon = this.catIcons[catKey] || this.catIcons.all;
    const count = this.catCount(catKey);
    return `<section class="category-hero reveal" aria-labelledby="shopTitle">
      <div class="category-hero-main">
        <span class="category-hero-icon">${this.svgIcon(icon, 34)}</span>
        <div class="category-hero-copy">
          <span class="category-hero-kicker">قسم المنتجات</span>
          <h1 id="shopTitle">${this.esc(cat.label)}</h1>
          <p id="shopSubtitle">${this.esc(cat.desc || this.catDesc(catKey))}</p>
          <div class="category-hero-meta">
            <span>${this.svgIcon(this.icons.shield, 14)} منتجات أصلية</span>
            <span>${this.svgIcon(this.icons.truck, 14)} شحن لكل المملكة</span>
            <span>${this.svgIcon(this.icons.headset, 14)} دعم فني مباشر</span>
          </div>
        </div>
      </div>
      <div class="category-hero-stat">
        <strong>${count}</strong>
        <span>في هذا القسم</span>
        <a href="#shopResults">تصفح القطع ${this.svgIcon('<polyline points="9 18 15 12 9 6"/>', 14)}</a>
      </div>
    </section>`;
  },

  renderCategoryCrossLinks(activeCat) {
    const others = this.cats().filter(c => c.key !== 'all' && c.key !== activeCat);
    if (!others.length) return '';
    return `<section class="category-cross-links reveal" aria-labelledby="crossCatsTitle">
      <div class="category-cross-head">
        <div>
          <div class="section-badge">أقسام أخرى</div>
          <h2 id="crossCatsTitle">أكمل مشروعك من هذه الأقسام</h2>
        </div>
        <a class="show-all-btn" href="${this.esc(this.shopUrl())}">كل المنتجات ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 18)}</a>
      </div>
      <div class="category-cross-grid">
        ${others.map(c => `<a class="category-cross-link" href="${this.esc(this.categoryUrl(c.key))}">
          <span class="category-cross-icon">${this.svgIcon(c.icon, 19)}</span>
          <span class="category-cross-copy"><strong>${this.esc(c.label)}</strong><small>${this.productCount(this.catCount(c.key))}</small></span>
          <span class="category-cross-arrow">${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 14)}</span>
        </a>`).join('')}
      </div>
    </section>`;
  },

  renderProducts() {
    const q = this.state.search;
    const result = this.shopFiltered();
    const list = result.list;
    const pageCount = this.shopPages(list.length);
    this.state.pageNum = Math.min(Math.max(1, this.state.pageNum), pageCount);
    const start = (this.state.pageNum - 1) * this.state.perPage;
    const pageItems = list.slice(start, start + this.state.perPage);
    this._lastResult = result.hit;

    const cats = this.cats();
    const activeCat = this.state.filter;
    const total = this.products.length;
    const isCategory = this.pageType === 'category';
    const head = isCategory
      ? this.renderCategoryHero(activeCat)
      : `<div class="shop-head reveal">
          <div class="shop-head-row">
            <div class="shop-head-copy">
              <span class="section-badge">متجر iBoardz</span>
              <h1 id="shopTitle">كل المنتجات</h1>
              <p id="shopSubtitle">تصفح جميع القطع، أو اختر قسماً من القائمة لتصفية النتائج.</p>
            </div>
            <div class="shop-head-stat">
              <span class="shop-head-stat-num">${total}</span>
              <span class="shop-head-stat-label">منتج في المتجر</span>
              <span class="shop-head-stat-sub">${cats.length - 1} أقسام رئيسية</span>
            </div>
          </div>
        </div>`;

    return `<div class="section shop-section">
      <nav class="breadcrumbs" id="shopBreadcrumb" aria-label="مسار التصفح">${this.renderBreadcrumbs()}</nav>
      ${head}

      <div class="search-bar shop-search">
        <input type="search" id="productsSearchInput" placeholder="${isCategory ? 'ابحث داخل هذا القسم…' : 'ابحث بالاسم أو الوصف أو رقم القطعة… مثال: ESP32، حساس حرارة، بطارية 3.7V'}"
          value="${this.esc(q)}"
          oninput="App.searchDebounced(this.value,'page')" onfocus="App.focusSearch('page')" onkeydown="App.searchKeydown(event)"
          autocomplete="off" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="false" aria-controls="searchSuggest" aria-autocomplete="list" aria-label="ابحث عن منتج">
        <span class="search-icon">${this.svgIcon(this.icons.search, 20)}</span>
        <button class="search-clear" data-search-clear onclick="App.clearSearch('page')" aria-label="مسح البحث" ${q ? '' : 'hidden'}>${this.svgIcon(this.icons.close, 16)}</button>
      </div>

      <div class="shop-layout">
        <div class="shop-filter-backdrop" id="shopFilterBackdrop" onclick="App.toggleFilters(false)"></div>
        <aside class="shop-sidebar" id="shopSidebar" aria-label="فلاتر المنتجات">
          <div class="shop-sidebar-head">
            <h2>${this.svgIcon(this.icons.filter, 17)} الفلاتر</h2>
            <button class="shop-sidebar-close" onclick="App.toggleFilters(false)" aria-label="إغلاق الفلاتر">${this.svgIcon(this.icons.close, 18)}</button>
          </div>

          <div class="filter-card">
            <h3>الأقسام</h3>
            <div class="cat-filter-list">
              ${cats.map(c => `<a class="cat-filter${activeCat === c.key ? ' active' : ''}" href="${this.esc(c.key === 'all' ? this.shopUrl() : this.categoryUrl(c.key))}" data-cat="${c.key}" data-scroll-keep aria-current="${activeCat === c.key ? 'page' : 'false'}">
                <span class="cat-filter-ico">${this.svgIcon(c.icon, 15)}</span>
                <span class="cat-filter-label">${this.esc(c.label)}</span>
                <span class="cat-filter-count">${c.key === 'all' ? total : this.catCount(c.key)}</span>
              </a>`).join('')}
            </div>
          </div>

          <div class="filter-card">
            <h3>نطاق السعر</h3>
            <div class="price-filter-list">
              ${this.priceRanges.map(r => `<button class="price-filter${this.state.price === r.key ? ' active' : ''}" data-price="${r.key}" aria-pressed="${this.state.price === r.key}" onclick="App.setPrice('${r.key}')">${r.label}</button>`).join('')}
            </div>
          </div>

          <div class="filter-card">
            <h3>خيارات إضافية</h3>
            <label class="filter-check">
              <input type="checkbox" id="filterOnlySale" ${this.state.onlySale ? 'checked' : ''} onchange="App.setFlag('onlySale', this.checked)">
              <span class="filter-check-box"></span>
              <span>خصم 50% أو أكثر</span>
            </label>
            <label class="filter-check">
              <input type="checkbox" id="filterOnlyPop" ${this.state.onlyPop ? 'checked' : ''} onchange="App.setFlag('onlyPop', this.checked)">
              <span class="filter-check-box"></span>
              <span>الأكثر رواجاً</span>
            </label>
          </div>

          <button class="clear-filters-btn" onclick="App.clearFilters()">${this.svgIcon('<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>', 15)} مسح كل الفلاتر</button>

          <div class="sidebar-help">
            <div class="sidebar-help-icon">${this.svgIcon(this.icons.headset, 22)}</div>
            <h4>محتاج مساعدة؟</h4>
            <p>ساعدناك تختار القطعة المناسبة لمشروعك.</p>
            <a href="${this.wa('مرحباً، أحتاج مساعدة في اختيار قطعة من متجر iBoardz')}" target="_blank" rel="noopener noreferrer">تواصل عبر واتساب</a>
          </div>
        </aside>

        <div class="shop-main" id="shopResults">
          <div class="shop-toolbar">
            <button class="shop-filter-toggle" onclick="App.toggleFilters()" aria-controls="shopSidebar" aria-expanded="false">${this.svgIcon(this.icons.filter, 16)} الفلاتر <span class="filter-badge" id="filterCountBadge" style="${this.activeFilterCount() ? '' : 'display:none'}">${this.activeFilterCount() || ''}</span></button>
            <div class="shop-count">
              <span class="products-count" id="productsCount" aria-live="polite">${q ? this.resultCount(list.length) : this.productCount(list.length)}</span>
              <span class="products-range" id="productsRange">${list.length ? `عرض ${start + 1}–${Math.min(start + pageItems.length, list.length)} من ${list.length}` : ''}</span>
            </div>
            <label class="sort-control">
              <span>ترتيب حسب</span>
              <select id="shopSort" onchange="App.setSort(this.value)" aria-label="ترتيب المنتجات">
                ${this.sorts.map(s => `<option value="${s.key}" ${this.displaySort() === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
              </select>
              <span class="sort-caret">${this.svgIcon(this.icons.chevronDown, 14)}</span>
            </label>
          </div>

          <div class="shop-active-filters" id="shopActiveFilters">${this.renderActiveFilters()}</div>

          <div id="productsResults" class="enter">${this.renderResults(pageItems, result.hit)}</div>
          <div id="shopPagination">${this.renderPagination(list.length)}</div>
        </div>
      </div>
      ${isCategory ? this.renderCategoryCrossLinks(activeCat) : ''}
    </div>`;
  },

  renderBreadcrumbs() {
    const activeCat = this.state.filter;
    const sep = `<span class="crumb-sep">${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 12)}</span>`;
    if (activeCat === 'all') {
      return `<a href="${this.esc(this.pagePath('home'))}">الرئيسية</a>${sep}<span class="crumb-current" aria-current="page">المنتجات</span>${this.state.search ? `${sep}<span class="crumb-current">نتائج البحث</span>` : ''}`;
    }
    return `<a href="${this.esc(this.pagePath('home'))}">الرئيسية</a>${sep}<a href="${this.esc(this.shopUrl())}">المنتجات</a>${sep}<span class="crumb-current" aria-current="page">${this.esc(this.catLabel(activeCat))}</span>${this.state.search ? `${sep}<span class="crumb-current">نتائج البحث</span>` : ''}`;
  },

  renderResults(list, hit) {
    const q = this.state.search;
    const tokens = q ? IBSearch.tokenize(q) : [];
    const serviceHits = (q && this.serviceIndex && this.state.pageNum === 1)
      ? IBSearch.query(this.serviceIndex, q, { limit: 2 }).results.map(r => r.product.service)
      : [];

    let html = '';

    if (hit.corrected && this.state.pageNum === 1) {
      html += `<div class="search-tip">هل تقصد <button class="link" onclick="App.applySuggestion('${this.esc(hit.suggestion)}')">${this.esc(hit.suggestion)}</button>؟</div>`;
    }

    if (serviceHits.length) {
      html += `<div class="results-services">
        ${serviceHits.map(s => `<button class="result-service" onclick="App.showService('${this.esc(s.id)}')">
          <img src="${this.esc(this.imgPath(s.img))}" alt="${this.esc(s.name)}" loading="lazy">
          <span class="rs-text"><strong>${this.esc(s.name)}</strong><span>${this.esc(s.summary)}</span></span>
          <span class="rs-badge">${this.esc(s.badge || 'خدمة')}</span>
        </button>`).join('')}
      </div>`;
    }

    if (!list.length) {
      html += `<div class="products-empty">
        ${this.svgIcon(this.icons.search, 48)}
        <p style="margin-top:12px;font-size:16px">لا توجد نتائج مطابقة${this.state.filter !== 'all' ? ' في هذا القسم' : ''}</p>
        <p style="font-size:13px">جرّب كلمة مختلفة أو خفف الفلاتر</p>
        <div class="empty-actions">
          <button class="show-all-btn" onclick="App.clearFilters()">مسح كل الفلاتر</button>
        </div>
        <div class="empty-suggest">
          <h4>بحث شائع</h4>
          <div class="sg-chips">${this.popularSearches.map(s => `<button class="sg-chip" onclick="App.applySuggestion(this.dataset.q)" data-q="${this.esc(s)}">${this.esc(s)}</button>`).join('')}</div>
          <h4>تصفح الأقسام</h4>
          <div class="sg-chips">${this.cats().filter(c => c.key !== 'all').map(c => `<a class="sg-chip" href="${this.esc(this.categoryUrl(c.key))}">${c.label}</a>`).join('')}</div>
        </div>
      </div>`;
      return html;
    }

    html += `<div class="products-grid-large">${list.map(p => this.productCard(p, true, tokens)).join('')}</div>`;
    return html;
  },

  // ---- product detail page ---------------------------------
  renderProductPage() {
    const p = this.state.currentProduct;
    if (!p) return this.renderProductNotFound();

    const stock = this.getStock(p);
    const out = stock === 0;
    const cat = this.catalog.categories.find(c => c.key === p.cat) || { key: p.cat, label: this.catLabel(p.cat), desc: this.catDesc(p.cat) };
    const catIcon = this.catIcons[p.cat] || this.catIcons.all;
    const specs = Array.isArray(p.specs) ? p.specs : [];
    const specRowHtml = specs.map((s) => {
      const parts = this.specParts(s);
      if (!parts.label) return `<tr><td colspan="2" dir="auto">${this.esc(parts.value)}</td></tr>`;
      return `<tr><th scope="row">${this.esc(parts.label)}</th><td dir="auto">${this.esc(parts.value)}</td></tr>`;
    });
    const specHalf = Math.ceil(specRowHtml.length / 2);
    const specTable = (rows) => `<table class="product-spec-table" aria-label="المواصفات التقنية"><thead><tr><th scope="col">المواصفة</th><th scope="col">القيمة</th></tr></thead><tbody>${rows.join('')}</tbody></table>`;
    const specCountLabel = specs.length >= 3 && specs.length <= 10
      ? specs.length + ' بنود'
      : specs.length + ' بنداً';
    const discount = this.disc(p);
    const categoryUrl = this.categoryUrl(p.cat);
    const waText = 'مرحباً، أريد طلب: ' + p.name + ' (الرمز: ' + (p.sku || p.id) + ')';

    const related = this.products
      .filter(x => x.id !== p.id && x.cat === p.cat)
      .concat(this.products.filter(x => x.id !== p.id && x.cat !== p.cat && x.pop))
      .filter((x, i, arr) => arr.findIndex(y => y.id === x.id) === i)
      .slice(0, 4);

    const optionMarkup = p.customInput
      ? `<div class="product-option-group">
          <label class="product-option-label" for="prodCustomValue">${this.esc(p.customInput.label || 'القيمة:')}</label>
          <input type="text" id="prodCustomValue" class="product-custom-input" placeholder="${this.esc(p.customInput.placeholder || '')}" autocomplete="off">
        </div>`
      : p.colorOptions
        ? `<div class="product-option-group">
            <span class="product-option-label">${this.esc(p.optionLabel || 'اختر اللون المناسب:')}</span>
            <div class="product-option-list">
              ${p.colorOptions.map(c => `<label class="product-option">
                <input type="radio" name="prodOption" value="${this.esc(c)}" class="product-option-radio">
                <span class="product-option-chip">${this.esc(c)}</span>
              </label>`).join('')}
            </div>
          </div>`
        : '';

    return `<div class="product-page">
      <nav class="breadcrumbs product-breadcrumbs" aria-label="مسار التصفح">
        <a href="${this.esc(this.pagePath('home'))}">الرئيسية</a>
        <span class="crumb-sep">${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 12)}</span>
        <a href="${this.esc(this.shopUrl())}">المنتجات</a>
        <span class="crumb-sep">${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 12)}</span>
        <a href="${this.esc(categoryUrl)}">${this.esc(cat.label)}</a>
        <span class="crumb-sep">${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 12)}</span>
        <span class="crumb-current" aria-current="page">${this.esc(p.name)}</span>
      </nav>

      <div class="product-hero">
        <div class="product-gallery">
          <div class="product-gallery-frame">
            <span class="product-gallery-badge">${this.esc(cat.label)}</span>
            ${p.badge ? `<span class="product-gallery-flag">${this.esc(p.badge)}</span>` : ''}
            <span class="product-gallery-save">-${discount}%</span>
            <img src="${this.esc(this.imgPath(p.img))}" alt="${this.esc(p.name)} — ${this.esc(p.nameAr || '')}" width="640" height="480" loading="eager" decoding="async" onerror="App.imgFallback(this)">
          </div>
        </div>

        <div class="product-detail">
          <div class="product-detail-top">
            <a class="product-cat-chip" href="${this.esc(categoryUrl)}">${this.svgIcon(catIcon, 15)} ${this.esc(cat.label)}</a>
            <span class="stock-pill${out ? ' out' : ''}">${out ? 'غير متوفر حالياً' : 'متوفر للطلب'}</span>
          </div>

          <h1 class="product-title">${this.esc(p.name)}</h1>
          ${p.nameAr ? `<p class="product-title-ar">${this.esc(p.nameAr)}</p>` : ''}
          <p class="product-lead">${this.esc(p.desc || this.catDesc(p.cat))}</p>
          ${p.sku ? `<p class="product-sku">رمز القطعة: <strong dir="ltr">${this.esc(p.sku)}</strong></p>` : ''}

          <div class="product-buybox">
            <div class="product-price-block">
              <span class="product-price-main">⃁ ${p.price}</span>
              <span class="product-price-old">⃁ ${p.op}</span>
              <span class="product-save-pill">وفّر ${discount}%</span>
            </div>
            <p class="product-price-note">السعر شامل ضريبة القيمة المضافة</p>

            ${optionMarkup}

            <div class="product-cta-row">
              <button class="product-buy-btn add-btn" onclick="App.addCartWithColor(${p.id})" ${out ? 'disabled' : ''}>
                ${this.svgIcon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 18)}
                <span>${out ? 'غير متوفر' : 'أضف إلى السلة'}</span>
              </button>
              <a class="product-wa-btn" href="${this.wa(waText)}" target="_blank" rel="noopener noreferrer">
                ${this.svgIcon(this.icons.whatsapp, 18, 'currentColor', 'currentColor')}
                <span>اطلب عبر واتساب</span>
              </a>
            </div>

            <ul class="product-assurances">
              <li>${this.svgIcon(this.icons.check, 15)} شحن لجميع مناطق المملكة</li>
              <li>${this.svgIcon(this.icons.check, 15)} استبدال أو استرجاع خلال 7 أيام وفق الشروط</li>
              <li>${this.svgIcon(this.icons.check, 15)} دعم فني يساعدك حتى تشغيل المشروع</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="product-content">
        <section class="product-panel product-specs-panel" aria-labelledby="specsTitle">
          <div class="product-panel-head product-specs-head">
            <div class="product-specs-title">
              <span class="product-specs-icon">${this.svgIcon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>', 20)}</span>
              <div>
                <h2 id="specsTitle">المواصفات التقنية</h2>
                <p class="product-specs-sub">بيانات تقنية تفصيلية للقطعة</p>
              </div>
            </div>
            <span class="product-specs-count">${specCountLabel}</span>
          </div>
          <div class="product-spec-columns">
            <div class="product-spec-col">${specTable(specRowHtml.slice(0, specHalf))}</div>
            <div class="product-spec-col">${specTable(specRowHtml.slice(specHalf))}</div>
          </div>
          <div class="product-overview">
            <h3>نظرة عامة</h3>
            <p>${this.esc(p.desc || '')}</p>
            <p>${this.esc(p.nameAr || p.name)} — قطعة من قسم ${this.esc(cat.label)} متوفرة للطلب من iBoardz مع دعم فني يساعدك على توصيلها وتشغيلها في مشروعك.</p>
          </div>
        </section>

        <div class="product-support-grid">
          <div class="product-panel product-help-panel">
            <span class="product-help-icon">${this.svgIcon(this.icons.headset, 24)}</span>
            <h2>محتاج مساعدة؟</h2>
            <p>نساعدك في التأكد من توافق القطعة مع مشروعك قبل الطلب.</p>
            <a href="${this.wa('مرحباً، أحتاج مساعدة بخصوص ' + p.name)}" target="_blank" rel="noopener noreferrer">
              ${this.svgIcon(this.icons.whatsapp, 16, 'currentColor', 'currentColor')} تواصل عبر واتساب
            </a>
          </div>

          <div class="product-panel product-shipping-panel">
            <h2>الشحن والاستبدال</h2>
            <ul>
              <li>${this.svgIcon(this.icons.truck, 15)} شحن عبر شركات شحن معتمدة.</li>
              <li>${this.svgIcon(this.icons.box, 15)} تغليف آمن ومتابعة للشحنة.</li>
              <li>${this.svgIcon(this.icons.clock, 15)} استبدال أو استرجاع خلال 7 أيام.</li>
              <li>${this.svgIcon(this.icons.shield, 15)} الضمان حسب تفاصيل المنتج.</li>
            </ul>
            <a class="product-terms-link" href="${this.esc(this.pagePath('terms'))}">اقرأ الشروط والأحكام ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 13)}</a>
          </div>
        </div>
      </div>

      ${related.length ? `<section class="product-related" aria-labelledby="relatedTitle">
        <div class="product-related-head">
          <div>
            <span class="section-badge">مقترحات لمشروعك</span>
            <h2 id="relatedTitle">منتجات مشابهة</h2>
          </div>
          <a class="show-all-btn" href="${this.esc(categoryUrl)}">كل ${this.esc(cat.label)} ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 18)}</a>
        </div>
        <div class="products-grid">${related.map(r => this.productCard(r)).join('')}</div>
      </section>` : ''}

      ${this.renderCategoryCrossLinks(p.cat)}
    </div>`;
  },

  renderProductNotFound() {
    return `<div class="product-page product-missing">
      <nav class="breadcrumbs" aria-label="مسار التصفح">
        <a href="${this.esc(this.pagePath('home'))}">الرئيسية</a>
        <span class="crumb-sep">${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 12)}</span>
        <a href="${this.esc(this.shopUrl())}">المنتجات</a>
      </nav>
      <div class="product-missing-card">
        <span class="product-missing-icon">${this.svgIcon(this.icons.search, 42)}</span>
        <h1>المنتج غير موجود</h1>
        <p>قد يكون الرابط قديماً أو تمت إعادة تسمية المنتج. تصفح المتجر للوصول إلى جميع القطع المتوفرة.</p>
        <a class="product-buy-btn add-btn" href="${this.esc(this.shopUrl())}">تصفح كل المنتجات ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 16)}</a>
      </div>
    </div>`;
  },

  // ---- project kits page ------------------------------------
  projectAnchor(project) {
    return 'project-' + project.key;
  },

  projectLevelLabel(level) {
    return { beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' }[level] || 'متوسط';
  },

  money(value) {
    const n = Math.round((Number(value) || 0) * 100) / 100;
    return n.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
  },

  pieceWord(count) {
    const n = Math.abs(Number(count) || 0);
    const tail = n % 100;
    if (tail === 1) return 'قطعة';
    if (tail === 2) return 'قطعتان';
    if (tail >= 3 && tail <= 10) return 'قطع';
    return 'قطعة';
  },

  projectParts(project) {
    return (project.parts || []).map(part => {
      const product = this.products.find(p => String(p.id) === String(part.id));
      if (!product) return null;
      return Object.assign({}, part, { product, qty: Math.max(1, Math.floor(Number(part.qty) || 1)) });
    }).filter(Boolean);
  },

  projectTotals(project) {
    const parts = this.projectParts(project);
    const price = parts.reduce((sum, part) => sum + part.product.price * part.qty, 0);
    const original = parts.reduce((sum, part) => sum + part.product.op * part.qty, 0);
    return {
      parts,
      price: Math.round(price * 100) / 100,
      original: Math.round(original * 100) / 100,
    };
  },

  filteredProjects() {
    const level = this.state.projectLevel;
    const rank = { beginner: 0, intermediate: 1, advanced: 2 };
    return this.projects
      .filter(project => level === 'all' || project.level === level)
      .slice()
      .sort((a, b) => (rank[a.level] || 0) - (rank[b.level] || 0));
  },

  projectPartRow(part) {
    const product = part.product;
    const option = part.option != null ? String(part.option) : (part.value != null ? String(part.value) : '');
    const out = this.getStock(product) === 0;
    return `<li class="project-part">
      <span class="project-part-img"><img src="${this.esc(this.imgPath(product.img))}" alt="" loading="lazy" decoding="async" onerror="App.imgFallback(this)"></span>
      <a class="project-part-name" href="${this.esc(this.productUrl(product))}" title="عرض ${this.esc(product.name)} — ${this.esc(product.nameAr || '')}">${this.esc(product.name)}${option ? `<span class="project-part-opt">${this.esc(option)}</span>` : ''}</a>
      ${out ? '<span class="project-part-out">غير متوفر</span>' : ''}
      <span class="project-part-qty" aria-label="الكمية ${part.qty}">×${part.qty}</span>
      <span class="project-part-price">⃁ ${this.money(product.price * part.qty)}</span>
    </li>`;
  },

  projectCard(project) {
    const totals = this.projectTotals(project);
    const level = project.level || 'intermediate';
    const icon = this.icons[project.icon] || this.icons.grid;
    const chevron = this.svgIcon('<polyline points="6 9 12 15 18 9"/>', 14);
    return `<article class="project-card" id="${this.esc(this.projectAnchor(project))}">
      <div class="project-card-head">
        <span class="project-icon" aria-hidden="true">${this.svgIcon(icon, 25)}</span>
        <div class="project-head-copy">
          <div class="project-title-row">
            <h3 class="project-title">${this.esc(project.title)}</h3>
            <span class="project-level level-${level}">${this.projectLevelLabel(level)}</span>
          </div>
          <p class="project-summary">${this.esc(project.summary)}</p>
          <div class="project-tags">${(project.tags || []).map(tag => `<span class="project-tag">${this.esc(tag)}</span>`).join('')}</div>
          <div class="project-meta">
            <span>${this.svgIcon(this.icons.clock, 13)} ${this.esc(project.time)}</span>
            <span>${this.svgIcon(this.icons.box, 13)} ${totals.parts.length} قطع</span>
          </div>
        </div>
      </div>

      <ul class="project-parts" aria-label="قطع مشروع ${this.esc(project.title)}">
        ${totals.parts.map(part => this.projectPartRow(part)).join('')}
      </ul>

      <details class="project-steps">
        <summary>خطوات التركيب ونصيحة قبل ما تبدأ ${chevron}</summary>
        <ol>${(project.steps || []).map(step => `<li>${this.esc(step)}</li>`).join('')}</ol>
        ${project.tip ? `<p class="project-tip">${this.svgIcon(this.icons.bulb, 14)}<span>${this.esc(project.tip)}</span></p>` : ''}
      </details>

      <div class="project-foot">
        <div class="project-total">
          <span>إجمالي سعر القطع</span>
          <strong>⃁ ${this.money(totals.price)}</strong>
        </div>
        <button type="button" class="project-add" data-project="${this.esc(project.key)}" aria-label="أضف كل قطع مشروع ${this.esc(project.title)} إلى السلة" onclick="App.addProjectBundle('${this.esc(project.key)}', event)">
          ${this.svgIcon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 15)}
          <span>أضف كل القطع للسلة</span>
        </button>
      </div>
    </article>`;
  },

  renderProjectPreview() {
    const project = this.projects[0];
    if (!project) return '';
    const totals = this.projectTotals(project);
    const shown = totals.parts.slice(0, 3);
    return `<aside class="project-preview" aria-label="مثال على قائمة قطع مشروع ${this.esc(project.title)}">
      <div class="project-preview-top">
        <span class="project-preview-icon">${this.svgIcon(this.icons[project.icon] || this.icons.grid, 22)}</span>
        <div><strong>${this.esc(project.title)}</strong><span>${totals.parts.length} قطع · ${this.projectLevelLabel(project.level)}</span></div>
        <span class="project-preview-total">⃁ ${this.money(totals.price)}</span>
      </div>
      <ul class="project-preview-parts">
        ${shown.map(part => `<li>
          <span class="project-preview-img"><img src="${this.esc(this.imgPath(part.product.img))}" alt="" loading="eager" decoding="async"></span>
          <span>${this.esc(part.product.name)}</span>
          <strong>⃁ ${this.money(part.product.price * part.qty)}</strong>
        </li>`).join('')}
        ${totals.parts.length > shown.length ? `<li class="project-preview-more">+ ${totals.parts.length - shown.length} قطع إضافية</li>` : ''}
      </ul>
      <div class="project-preview-foot">
        <span class="project-preview-dot"></span>
        <span>القطع مربوطة بصفحاتها في المتجر</span>
        <a class="project-preview-cta" href="#${this.esc(this.projectAnchor(project))}" aria-label="عرض تفاصيل مشروع ${this.esc(project.title)}">شوف المشروع</a>
      </div>
    </aside>`;
  },

  renderBoardPicker() {
    const cards = this.boards.map(board => {
      const product = this.products.find(p => String(p.id) === String(board.id));
      if (!product) return '';
      const out = this.getStock(product) === 0;
      return `<article class="board-card">
        <div class="board-media"><img src="${this.esc(this.imgPath(product.img))}" alt="${this.esc(product.name)}" loading="lazy" decoding="async" onerror="App.imgFallback(this)"><span class="board-badge">${this.esc(board.badge)}</span></div>
        <h3 class="board-name">${this.esc(product.name)}</h3>
        <p class="board-ar">${this.esc(product.nameAr)}</p>
        <div class="board-price">⃁ ${this.money(product.price)} <span>⃁ ${this.money(product.op)}</span></div>
        <ul class="board-specs">${board.bullets.map(bullet => `<li>${this.svgIcon(this.icons.check, 13)}<span>${this.esc(bullet)}</span></li>`).join('')}</ul>
        <p class="board-best"><strong>اخترها إذا:</strong> ${this.esc(board.best)}</p>
        <div class="board-actions">
          <a class="board-btn ghost" href="${this.esc(this.productUrl(product))}">التفاصيل</a>
          <button type="button" class="board-btn primary"${out ? ' disabled' : ''} onclick="App.addCart(App.products.find(x=>String(x.id)===String(${product.id})), null, event)" aria-label="${out ? 'غير متوفر' : 'أضف ' + this.esc(product.name) + ' إلى السلة'}">${out ? 'غير متوفر' : 'أضف للسلة'}</button>
        </div>
      </article>`;
    }).join('');
    return `<section class="projects-subsection reveal" aria-labelledby="boardPickerTitle">
      <div class="projects-subhead">
        <div>
          <span class="section-badge">قبل ما تشتري</span>
          <h2 id="boardPickerTitle">محتار أي لوحة تختار؟</h2>
          <p>ثلاث لوحات تغطي أغلب المشاريع. الفرق الأساسي في الجهد والاتصال وحجم اللوح.</p>
        </div>
        <a class="projects-text-link" href="${this.esc(this.categoryUrl('mcu'))}">كل المتحكمات ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 14)}</a>
      </div>
      <div class="board-grid">${cards}</div>
    </section>`;
  },

  setProjectLevel(level) {
    const valid = ['all', 'beginner', 'intermediate', 'advanced'];
    if (valid.indexOf(level) === -1) return;
    this.state.projectLevel = level;
    document.querySelectorAll('.projects-level').forEach(btn => {
      const on = btn.dataset.level === level;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    const grid = document.getElementById('projectsGrid');
    const empty = document.getElementById('projectsEmpty');
    const list = this.filteredProjects();
    if (grid) {
      grid.innerHTML = list.map(project => this.projectCard(project)).join('');
      grid.classList.remove('enter');
      void grid.offsetWidth;
      grid.classList.add('enter');
    }
    if (empty) empty.hidden = list.length > 0;
  },

  addProjectBundle(key, event) {
    const project = this.projects.find(p => p.key === key);
    if (!project) return;
    const totals = this.projectTotals(project);
    if (!totals.parts.length) return;
    let added = 0;
    let skipped = 0;

    totals.parts.forEach(part => {
      const product = part.product;
      const selected = product.customInput
        ? (part.value != null ? String(part.value) : null)
        : (part.option != null ? String(part.option) : (product.colorOptions && product.colorOptions.length ? product.colorOptions[0] : null));
      if (product.customInput && !selected) { skipped += part.qty; return; }
      if (product.colorOptions && !selected) { skipped += part.qty; return; }
      if (product.colorOptions && selected && product.colorOptions.indexOf(selected) === -1) { skipped += part.qty; return; }

      const stock = this.getStock(product);
      if (stock === 0) { skipped += part.qty; return; }
      const keyColor = selected == null ? '' : selected;
      let line = this.state.cart.find(item =>
        String(item.product.id) === String(product.id) && String(item.color || '') === keyColor
      );
      if (line) {
        const room = stock === null ? part.qty : Math.max(0, stock - line.qty);
        const addQty = Math.min(part.qty, room);
        line.qty += addQty;
        added += addQty;
        if (addQty < part.qty) skipped += part.qty - addQty;
      } else {
        const addQty = stock === null ? part.qty : Math.min(part.qty, stock);
        if (addQty < 1) { skipped += part.qty; return; }
        const item = { product, qty: addQty };
        if (selected != null) item.color = selected;
        this.state.cart.push(item);
        added += addQty;
        if (addQty < part.qty) skipped += part.qty - addQty;
      }
    });

    if (!added) {
      this.showToast('تعذّر إضافة القطع — تحقق من توفرها', 'error');
      return;
    }
    this.saveCart();
    this.updateBadge();
    this.renderCart();
    const message = skipped
      ? `أضفنا ${added} ${this.pieceWord(added)} من "${project.title}" — ${skipped} ${this.pieceWord(skipped)} غير متوفرة حالياً`
      : `تمت إضافة ${added} ${this.pieceWord(added)} من "${project.title}" إلى السلة`;
    this.showToast(message, skipped ? 'info' : 'success', true);
    if (event) this.flyToCart(event);

    const btn = event && event.currentTarget;
    if (btn && btn.classList) {
      const original = btn.innerHTML;
      btn.classList.add('added');
      btn.innerHTML = `${this.svgIcon(this.icons.check, 15)} <span>تمت الإضافة</span>`;
      setTimeout(() => {
        if (!btn.isConnected) return;
        btn.classList.remove('added');
        btn.innerHTML = original;
      }, 2400);
    }
  },

  projectReviewCard(review) {
    return `<div class="review-pro-card">
      <div class="review-pro-quote">"</div>
      <div class="review-pro-stars">${this.renderStars(review.stars || 5)}</div>
      <p class="review-pro-text">${review.text}</p>
      <div class="review-decor-pro"><span class="review-decor-line"></span><span class="review-decor-icon">${this.svgIcon('<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>', 14, '#ff9500')}</span><span class="review-decor-line"></span></div>
    </div>`;
  },

  renderProjects() {
    const levels = [
      { key: 'all', label: 'الكل' },
      { key: 'beginner', label: 'مبتدئ' },
      { key: 'intermediate', label: 'متوسط' },
      { key: 'advanced', label: 'متقدم' },
    ];
    const counts = { all: this.projects.length };
    this.projects.forEach(project => {
      counts[project.level] = (counts[project.level] || 0) + 1;
    });
    const list = this.filteredProjects();
    const usedParts = new Set();
    this.projects.forEach(project => (project.parts || []).forEach(part => usedParts.add(part.id)));
    const supportUrl = this.wa('مرحباً، عندي فكرة مشروع وأحتاج مساعدة في اختيار القطع المناسبة من iBoardz');
    const arrow = this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 16);

    return `<div class="projects-page">
      <section class="projects-hero" aria-labelledby="projectsTitle">
        <div class="projects-hero-grid" aria-hidden="true"></div>
        <div class="projects-hero-glow" aria-hidden="true"></div>
        <div class="projects-hero-inner">
          <div class="projects-hero-copy">
            <span class="projects-kicker">${this.svgIcon(this.icons.bulb, 15)} مشاريع جاهزة بالقطع والأسعار</span>
            <h1 id="projectsTitle">ابنِ مشروعك <span>من أول قطعة</span></h1>
            <p>اختر مشروعاً، راجع قائمة القطع المطلوبة، وأضفها كلها للسلة بضغطة واحدة. كل قطعة في القائمة مربوطة بصفحتها في المتجر.</p>
            <div class="projects-hero-actions">
              <a class="projects-hero-btn primary" href="#projectList">تصفح المشاريع ${arrow}</a>
              <a class="projects-hero-btn ghost" href="${supportUrl}" target="_blank" rel="noopener noreferrer">${this.svgIcon(this.icons.whatsapp, 17)} قل لنا فكرتك</a>
            </div>
            <div class="projects-hero-stats">
              <div><strong>${this.projects.length}</strong><span>مشاريع جاهزة</span></div>
              <div><strong>${usedParts.size}</strong><span>قطعة مرتبطة</span></div>
              <div><strong>1</strong><span>ضغطة لإضافة القطع</span></div>
            </div>
          </div>
          ${this.renderProjectPreview()}
        </div>
      </section>

      <section class="projects-list section" id="projectList" aria-labelledby="projectListTitle">
        <div class="projects-head">
          <div class="projects-head-copy">
            <h2 id="projectListTitle">مشاريع تقدر تخلصها اليوم</h2>
            <p>كل مشروع فيه القطع، خطوات التركيب، ونصيحة عملية قبل ما تبدأ.</p>
          </div>
          <div class="projects-levels" role="group" aria-label="تصفية المشاريع حسب المستوى">
            ${levels.map(level => `<button type="button" class="projects-level${this.state.projectLevel === level.key ? ' active' : ''}" data-level="${level.key}" aria-pressed="${this.state.projectLevel === level.key}" onclick="App.setProjectLevel('${level.key}')">${level.label}<span>${counts[level.key] || 0}</span></button>`).join('')}
          </div>
        </div>
        <div class="projects-grid" id="projectsGrid">${list.map(project => this.projectCard(project)).join('')}</div>
        <p class="projects-empty" id="projectsEmpty" ${list.length ? 'hidden' : ''}>لا توجد مشاريع بهذا المستوى حالياً — جرّب مستوى آخر.</p>
      </section>

      ${this.renderBoardPicker()}

      <section class="projects-reviews section" id="reviews" aria-labelledby="projectsReviewsTitle">
        <div class="projects-subhead center">
          <div>
            <span class="section-badge">آراء العملاء</span>
            <h2 id="projectsReviewsTitle">مشاريع بدأت من هنا</h2>
            <p>تجارب حقيقية من عملاء صمموا مشاريعهم مع iBoardz.</p>
          </div>
        </div>
        <div class="reviews-pro-grid project-reviews-grid">
          ${this.reviews.slice(0, 4).map(review => this.projectReviewCard(review)).join('')}
        </div>
        ${this.reviews.length > 4 ? `<details class="projects-more-reviews">
          <summary>اقرأ ${this.reviews.length - 4} تجارب أخرى ${this.svgIcon('<polyline points="6 9 12 15 18 9"/>', 14)}</summary>
          <div class="reviews-pro-grid project-reviews-grid">
            ${this.reviews.slice(4).map(review => this.projectReviewCard(review)).join('')}
          </div>
        </details>` : ''}
      </section>

      <section class="projects-cta" aria-labelledby="projectsCtaTitle">
        <div class="projects-cta-inner">
          <div>
            <span class="projects-cta-kicker">فكرتك تستاهل</span>
            <h2 id="projectsCtaTitle">مشروعك مو في القائمة؟</h2>
            <p>قل لنا وش تبي تبني وحدد ميزانيتك، ونرشح لك القطع المناسبة ونرسل لك قائمة كاملة تشتريها بضغطة.</p>
          </div>
          <div class="projects-cta-actions">
            <a class="projects-cta-btn primary" href="${supportUrl}" target="_blank" rel="noopener noreferrer">${this.svgIcon(this.icons.whatsapp, 17)} راسلنا على واتساب</a>
            <a class="projects-cta-btn ghost" href="${this.esc(this.pagePath('contact'))}">صفحة التواصل ${arrow}</a>
          </div>
        </div>
      </section>
    </div>`;
  },

  renderContact() {
    return `<div class="section-contact">
      <div class="section-header reveal">
        <div class="section-badge">نحن هنا لمساعدتك</div>
        <h1 class="section-title">تواصل معنا</h1>
        <p class="section-subtitle">نرحب بتواصلك في أي وقت</p>
      </div>
      <div class="contact-cards reveal">
        <a href="${this.wa()}" target="_blank" rel="noopener noreferrer" class="contact-card whatsapp">
          <div class="contact-icon whatsapp-icon">${this.svgIcon(this.icons.phone, 20, '#fff')}</div>
          <div><div class="contact-label">واتساب</div><div class="contact-value phone">${this.meta.whatsappDisplay}</div></div>
        </a>
        <a href="mailto:${this.meta.email}" class="contact-card email">
          <div class="contact-icon email-icon">${this.svgIcon(this.icons.envelope, 20, '#fff')}</div>
          <div><div class="contact-label">البريد الإلكتروني</div><div class="contact-value">${this.meta.email}</div></div>
        </a>
      </div>
      <div class="contact-form reveal">
        <h2>أرسل لنا رسالة</h2>
        <form onsubmit="return App.handleContact(event)">
          <div class="form-group"><label for="contactName">الاسم</label><input type="text" id="contactName" class="form-input" placeholder="اسمك الكامل" required></div>
          <div class="form-group"><label for="contactEmail">البريد الإلكتروني</label><input type="email" id="contactEmail" class="form-input" placeholder="email@example.com" style="direction:ltr;text-align:right"></div>
          <div class="form-group"><label for="contactMsg">الرسالة</label><textarea rows="5" id="contactMsg" class="form-input" placeholder="اكتب رسالتك هنا..." required></textarea></div>
          <button type="submit" class="submit-btn" id="contactSubmitBtn">إرسال الرسالة</button>
        </form>
      </div>
      <div class="work-hours reveal"><h3>ساعات العمل</h3><p>السبت - الخميس: 9 صباحاً - 11 مساءً</p><p style="margin-bottom:0">الجمعة: 4 مساءً - 11 مساءً</p></div>

      <div class="faq-section reveal">
        <div class="section-header">
          <div class="section-badge">إجابات سريعة</div>
          <h2 class="section-title">الأسئلة الشائعة</h2>
        </div>
        <details class="faq-item">
          <summary>كم يستغرق الشحن داخل السعودية؟<span class="faq-plus">${this.svgIcon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 16)}</span></summary>
          <p>يتم تجهيز طلبك وشحنه عبر شركات الشحن المعتمدة، وتختلف مدة التوصيل حسب المدينة. نتابع كل شحنة حتى وصولها إليك.</p>
        </details>
        <details class="faq-item">
          <summary>ما طرق الدفع المتوفرة؟<span class="faq-plus">${this.svgIcon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 16)}</span></summary>
          <p>نوفر الدفع عبر مدى، Apple Pay، STC Pay، والتحويل البنكي. يمكنك تأكيد الطلب عبر واتساب واختيار الطريقة الأنسب لك.</p>
        </details>
        <details class="faq-item">
          <summary>هل يمكنني استبدال أو استرجاع منتج؟<span class="faq-plus">${this.svgIcon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 16)}</span></summary>
          <p>نعم، يمكنك طلب الاستبدال أو الاسترجاع خلال سبعة أيام من الاستلام بشرط أن يكون المنتج بحالته الأصلية مع كامل ملحقاته وتغليفه.</p>
        </details>
        <details class="faq-item">
          <summary>هل توفرون قطعاً مخصصة أو خدمة طباعة ثلاثية الأبعاد؟<span class="faq-plus">${this.svgIcon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 16)}</span></summary>
          <p>نعم، نوفر خدمة طباعة ثلاثية الأبعاد احترافية بمقاسات حسب الطلب. أرسل تصميمك أو فكرتك عبر واتساب للحصول على عرض سعر.</p>
        </details>
      </div>
    </div>`;
  },

  renderTerms() {
    return `<div class="terms-page">
      <div class="terms-hero">
        <div class="terms-hero-icon"><svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="40" fill="rgba(255,149,0,0.1)"/><rect x="22" y="15" width="36" height="50" rx="4" fill="none" stroke="#ff9500" stroke-width="2"/><line x1="30" y1="27" x2="50" y2="27" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="34" x2="50" y2="34" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="41" x2="44" y2="41" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/><circle cx="55" cy="55" r="12" fill="#ff9500"/><path d="M50 55l3 3 7-7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h1 class="terms-hero-title">الشروط والأحكام</h1>
        <p class="terms-hero-sub">آخر تحديث: أكتوبر 2026</p>
        <div class="terms-hero-badges">
          <span class="terms-badge">${this.svgIcon('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', 14)} موثوق وآمن</span>
          <span class="terms-badge">${this.svgIcon('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 14)} محدّث باستمرار</span>
          <span class="terms-badge">${this.svgIcon('<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>', 14)} حقوق العميل محفوظة</span>
        </div>
      </div>
      <div class="terms-container">
        <h2 class="sr-only">مقدمة الشروط</h2>
        <div class="terms-intro-card">
          <div class="terms-intro-icon">${this.svgIcon('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>', 32, '#ff9500')}</div>
          <div><h3>مقدمة</h3><p>تمت صياغة الشروط والأحكام للتأكد من معرفة العميل التامة بحقوقه وواجباته قبل التعامل مع المتجر. يتعهد المتجر بالالتزام بالفقرات التالية في كافة العمليات في هذا المتجر الإلكتروني.</p></div>
        </div>
        <div class="terms-section">
          <div class="terms-section-header">
            <div class="terms-section-icon icon-orange">${this.svgIcon(this.icons.box, 28, '#ff9500')}</div>
            <div><span class="terms-section-num">01</span><h2>المنتجات</h2></div>
          </div>
          <div class="terms-items">
            <div class="terms-item"><div class="terms-item-icon">${this.svgIcon('<polyline points="20 6 9 17 4 12"/>', 20, '#22c55e')}</div><p>جميع المنتجات في الموقع جديدة وغير مستخدمة ويتم شحنها بنفس حالة استلامها من المصنع أو المورد.</p></div>
            <div class="terms-item"><div class="terms-item-icon">${this.svgIcon('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>', 20, '#3b82f6')}</div><p>كافة المعلومات الفنية موجودة في الصفحة الخاصة بكل منتج. يحق للعميل طلب معلومات إضافية قبل عملية الشراء، وعدم إلمامه بالتفاصيل يجعله يتحمل كامل المسؤولية عن أي سوء فهم.</p></div>
            <div class="terms-item"><div class="terms-item-icon">${this.svgIcon('<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>', 20, '#e74c3c')}</div><p>لا يحق للمتجر إضافة صور غير حقيقية للمنتج أو صور تمت معالجتها بطريقة تجعلها مختلفة عن شكلها في الواقع.</p></div>
            <div class="terms-item"><div class="terms-item-icon">${this.svgIcon('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>', 20, '#f59e0b')}</div><p>ألوان المنتجات تعتمد على دقة وإعدادات الشاشة المستخدمة في العرض، وأي اختلاف من جهة العميل يعتبر خارج صلاحيات المتجر.</p></div>
          </div>
        </div>
        <div class="terms-section">
          <div class="terms-section-header">
            <div class="terms-section-icon icon-blue">${this.svgIcon(this.icons.truck, 28, '#3b82f6')}</div>
            <div><span class="terms-section-num">02</span><h2>الشحن والتوصيل</h2></div>
          </div>
          <h3 class="sr-only">تفاصيل الشحن والتوصيل</h3>
          <div class="terms-grid-2">
            <div class="terms-grid-card"><div class="terms-grid-icon blue">${this.svgIcon(this.icons.truck, 24, '#3b82f6')}</div><h4>أفضل الشركات</h4><p>يتم تقديم خدمة الشحن والتوصيل بواسطة أفضل الشركات المتواجدة في المنطقة.</p></div>
            <div class="terms-grid-card"><div class="terms-grid-icon blue">${this.svgIcon(this.icons.box, 24, '#3b82f6')}</div><h4>تغليف آمن</h4><p>يقوم المتجر بالتأكد من تغليف المنتجات بطريقة لا تجعلها عرضة للتلف بسهولة.</p></div>
            <div class="terms-grid-card"><div class="terms-grid-icon blue">${this.svgIcon(this.icons.shield, 24, '#3b82f6')}</div><h4>ضمان الوصول</h4><p>يضمن المتجر استلام العميل للمنتجات بصورة جيدة وغير تالفة حتى ولو كان الخطأ من شركة الشحن.</p></div>
            <div class="terms-grid-card"><div class="terms-grid-icon blue">${this.svgIcon(this.icons.mapPin, 24, '#3b82f6')}</div><h4>متابعة الشحنة</h4><p>تتم متابعة كل الشحنات الصادرة من المتجر حتى وصولها للعميل.</p></div>
          </div>
        </div>
        <div class="terms-section">
          <div class="terms-section-header">
            <div class="terms-section-icon icon-green">${this.svgIcon('<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>', 28, '#22c55e')}</div>
            <div><span class="terms-section-num">03</span><h2>سياسة الاستبدال والاسترجاع</h2></div>
          </div>
          <div class="terms-highlight-box green">${this.svgIcon('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>', 22, '#16a34a')}<div><strong>إثبات عملية الشراء مطلوب</strong><p>يجب إبراز الفاتورة الأصلية للاستفادة من خدمات الاستبدال أو الاسترجاع.</p></div></div>
          <h3 class="sr-only">مراحل الاستبدال والاسترجاع</h3>
          <div class="terms-timeline">
            <div class="terms-timeline-item"><div class="terms-timeline-dot green"></div><div class="terms-timeline-content"><h4>مدة 7 أيام</h4><p>يمكن استبدال أو استرجاع المنتج خلال سبعة أيام من تاريخ الشراء مع استيفاء الشروط المطلوبة.</p></div></div>
            <div class="terms-timeline-item"><div class="terms-timeline-dot orange"></div><div class="terms-timeline-content"><h4>شروط حالة المنتج</h4><p>يجب أن يكون المنتج في حالته الأصلية مع كامل الملحقات والتغليف الأصلي.</p></div></div>
            <div class="terms-timeline-item"><div class="terms-timeline-dot red"></div><div class="terms-timeline-content"><h4>المنتجات المفتوحة</h4><p>لا يمكن استرجاع المنتجات التي تم فتحها أو استخدامها ما لم يتبين وجود عيب مصنعي.</p></div></div>
          </div>
          <div class="terms-exclusions">
            <div class="terms-exclusions-title">${this.svgIcon('<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>', 18, '#e74c3c')} المنتجات غير القابلة للاسترجاع أو الاستبدال</div>
            <div class="terms-exclusions-list">
              ${['سوء الاستخدام أو الكسر أو العبث بالمنتج', 'فتح المنتج بطريقة غير طبيعية', 'عدم اتباع تعليمات التشغيل أو التركيب', 'تعرض المنتج للماء في حال لم يكن مقاومًا له', 'إجراء أي صيانة خارجية غير معتمدة', 'تعطل الجهاز نتيجة استخدام إكسسوارات غير متوافقة', 'القطع واللوحات الإلكترونية التي تحتوي على SIM أو SIM IC'].map(t => `<div class="terms-exclusion-item">${this.svgIcon('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 16, '#e74c3c')}<span>${t}</span></div>`).join('')}
            </div>
          </div>
        </div>
        <div class="terms-section">
          <div class="terms-section-header">
            <div class="terms-section-icon icon-purple">${this.svgIcon(this.icons.shield, 28, '#8b5cf6')}</div>
            <div><span class="terms-section-num">04</span><h2>الضمان على المنتجات</h2></div>
          </div>
          <h3 class="sr-only">تفاصيل الضمان</h3>
          <div class="terms-warranty-cards">
            <div class="terms-warranty-card"><div class="terms-warranty-icon">${this.svgIcon(this.icons.clipboard, 26, '#8b5cf6')}</div><h4>تفاصيل الضمان</h4><p>يتم توضيح تفاصيل الضمان في صفحة المنتج نفسه. في حال عدم ذكر أي تفاصيل، يُعتبر المنتج بدون ضمان.</p></div>
            <div class="terms-warranty-card"><div class="terms-warranty-icon">${this.svgIcon(this.icons.clock, 26, '#8b5cf6')}</div><h4>مدة الإصلاح</h4><p>يستغرق زمن الإصلاح (14) يومًا كحد أقصى للأعطال المشمولة بالضمان.</p></div>
            <div class="terms-warranty-card"><div class="terms-warranty-icon">${this.svgIcon(this.icons.wrench, 26, '#8b5cf6')}</div><h4>تغطية الضمان</h4><p>يغطي الضمان إصلاح أو استبدال قطع الغيار مجانًا في حال وجود عيب مصنعي فقط.</p></div>
          </div>
          <div class="terms-highlight-box purple">${this.svgIcon('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>', 22, '#7c3aed')}<div><strong>شروط الضمان الزمني</strong><p>سنة واحدة كحد أدنى — سنتان في حال استيفاء شروط ضمان وزارة التجارة حسب الأنظمة المعمول بها.</p></div></div>
          <div class="terms-items" style="margin-top:20px">
            ${['إساءة استخدام المنتج أو عدم التقيد بتعليمات دليل الاستخدام.', 'الكسور أو الضربات أو تعرض المنتج لسوائل أو رطوبة أو حرارة عالية.', 'محاولات الإصلاح من جهات غير معتمدة أو استخدام قطع غير معتمدة.', 'مسح ملفات نظام التشغيل أو الأعطال الناتجة عن الفيروسات.', 'القطع المنفردة التي لا تُعد وحدة متكاملة، والمكونات التي تتطلب تجميعًا إضافيًا.'].map(t => `<div class="terms-item"><div class="terms-item-icon">${this.svgIcon('<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>', 20, '#e74c3c')}</div><p>${t}</p></div>`).join('')}
          </div>
          <div class="terms-note">${this.svgIcon('<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', 18, '#ff9500')}<p>بعد مرور أول أسبوع من استلام المنتج، يتحمل العميل قيمة شحن المنتج إلى مقر المتجر أو أحد الوكلاء المعتمدين.</p></div>
        </div>
        <div class="terms-section">
          <div class="terms-section-header">
            <div class="terms-section-icon icon-blue">${this.svgIcon('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>', 28, '#3b82f6')}</div>
            <div><span class="terms-section-num">05</span><h2>الخصوصية وحماية البيانات</h2></div>
          </div>
          <div class="terms-items">
            <div class="terms-item"><div class="terms-item-icon">${this.svgIcon('<polyline points="20 6 9 17 4 12"/>', 20, '#22c55e')}</div><p>نستخدم بياناتك (الاسم، رقم الجوال، عنوان التوصيل) فقط لتجهيز الطلب والتواصل معك بشأنه، ولا نشاركها مع أي طرف خارج نطاق الشحن.</p></div>
            <div class="terms-item"><div class="terms-item-icon">${this.svgIcon('<polyline points="20 6 9 17 4 12"/>', 20, '#22c55e')}</div><p>المحادثات عبر واتساب والبريد الإلكتروني تُستخدم لخدمة العميل ومتابعة الطلبات، ويمكنك طلب حذف بياناتك في أي وقت.</p></div>
            <div class="terms-item"><div class="terms-item-icon">${this.svgIcon('<polyline points="20 6 9 17 4 12"/>', 20, '#22c55e')}</div><p>لا نحتفظ ببيانات البطاقات البنكية؛ تتم عمليات الدفع عبر مزودي الدفع المعتمدين فقط.</p></div>
          </div>
        </div>
        <div class="terms-section terms-general">
          <div class="terms-section-header">
            <div class="terms-section-icon icon-orange">${this.svgIcon('<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>', 28, '#ff9500')}</div>
            <div><span class="terms-section-num">06</span><h2>الأحكام العامة</h2></div>
          </div>
          <div class="terms-general-content">
            <p>إرسال العميل للطلب يعني موافقته على كافة البنود والشروط بلا استثناء. يحق لـ <strong style="color:#ff9500">iBoardz</strong> تحديث وتغيير الشروط والأحكام في أي وقت، ويتم تفعيلها فور نشرها.</p>
            <div class="terms-general-steps">
              <div class="terms-general-step"><div class="terms-step-circle">1</div><span>قراءة الشروط قبل الشراء</span></div>
              <div class="terms-general-arrow">←</div>
              <div class="terms-general-step"><div class="terms-step-circle">2</div><span>الموافقة عند إتمام الطلب</span></div>
              <div class="terms-general-arrow">←</div>
              <div class="terms-general-step"><div class="terms-step-circle">3</div><span>الالتزام بالشروط كاملاً</span></div>
            </div>
          </div>
        </div>
        <div class="terms-cta">
          ${this.svgIcon(this.icons.phone, 40, '#ff9500')}
          <h3>هل لديك استفسار؟</h3>
          <p>فريقنا جاهز للإجابة على جميع تساؤلاتك</p>
          <div class="terms-cta-btns">
            <a href="${this.wa()}" target="_blank" class="terms-cta-btn primary">${this.svgIcon(this.icons.whatsapp, 18, 'currentColor', 'currentColor')} تواصل عبر واتساب</a>
            <a class="terms-cta-btn secondary" href="${this.esc(this.pagePath('contact'))}">${this.svgIcon(this.icons.envelope, 18)} أرسل رسالة</a>
          </div>
        </div>
      </div>
    </div>`;
  },

  // ============================================================
  // 13. CAROUSEL / EFFECTS
  // ============================================================
  setCi(i) {
    this.state.ci = i;
    const imgs = document.querySelectorAll('.carousel > img');
    const dots = document.querySelectorAll('.carousel-dot');
    imgs.forEach((img, idx) => { img.style.opacity = idx === i ? 1 : 0; });
    dots.forEach((dot, idx) => { dot.className = 'carousel-dot' + (idx === i ? ' active' : ''); });
    this.startCarousel();
  },

  startCarousel() {
    if (this.carouselTimer) clearInterval(this.carouselTimer);
    if (!document.querySelector('.carousel')) return;
    this.carouselTimer = setInterval(() => {
      const next = (this.state.ci + 1) % 2;
      this.state.ci = next;
      const imgs = document.querySelectorAll('.carousel > img');
      const dots = document.querySelectorAll('.carousel-dot');
      imgs.forEach((img, i) => { img.style.opacity = i === next ? 1 : 0; });
      dots.forEach((dot, i) => { dot.className = 'carousel-dot' + (i === next ? ' active' : ''); });
    }, 5000);
  },

  setupScrollReveal() {
    if (this._revealObserver) this._revealObserver.disconnect();
    this._revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); this._revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => this._revealObserver.observe(el));
  },

  setupBackToTop() {
    if (this._backToTopSetup) return;
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    this._backToTopSetup = true;
    window.addEventListener('scroll', () => { btn.classList.toggle('visible', window.scrollY > 400); }, { passive: true });
  },

  setupHeaderScroll() {
    if (this._headerScrollSetup) return;
    const header = document.getElementById('header');
    if (!header) return;
    this._headerScrollSetup = true;
    window.addEventListener('scroll', () => { header.classList.toggle('scrolled', window.scrollY > 50); }, { passive: true });
  },

  setupReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduced-motion');
    }
  },

  // ============================================================
  // 14. EVENTS / INIT
  // ============================================================
  _setupKeyboard() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (this.state.selProd || this.state.selService) this.closeModal();
        else if (this._suggestOpen) this.closeSearch();
        else if (this.state.cartOpen) this.closeCart();
        else if (this.state.menuOpen) this.closeMenu();
        else if (this.state.filtersOpen) this.toggleFilters(false);
        return;
      }
      // "/" focuses search like the big stores
      if (e.key === '/' && !this.state.cartOpen && !this.state.selProd) {
        const tag = (document.activeElement && document.activeElement.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        this._searchOrigin = 'header';
        if (!this._headerSearchOpen && window.innerWidth <= 768) this.toggleHeaderSearch();
        const input = document.getElementById('headerSearchInput');
        if (input) { input.focus(); input.select(); }
      }
    });
  },

  _setupClickOutside() {
    document.addEventListener('click', e => {
      const dropdown = document.getElementById('dropdown');
      const menuBtn = document.querySelector('.menu-btn');
      if (this.state.menuOpen && dropdown && !dropdown.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
        this.closeMenu();
      }
      const panel = document.getElementById('searchSuggest');
      if (this._suggestOpen && panel && !panel.contains(e.target)) {
        const headerField = document.getElementById('headerSearch');
        const inHeader = headerField && headerField.contains(e.target);
        const pageBox = document.querySelector('.search-bar');
        const inPage = pageBox && pageBox.contains(e.target);
        if (!inHeader && !inPage) this.closeSearch();
      }
    });
  },

  _setupResize() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this._headerSearchOpen) {
        this._headerSearchOpen = false;
        const el = document.getElementById('headerSearch');
        if (el) el.classList.remove('open');
      }
      if (window.innerWidth > 980 && this.state.filtersOpen) this.toggleFilters(false);
      if (this._suggestOpen) this._positionSuggest(this._currentSearchAnchor());
    });
    // keep the panel glued to its input while the page scrolls
    window.addEventListener('scroll', () => {
      if (!this._suggestOpen) return;
      const anchor = this._currentSearchAnchor();
      const rect = anchor && anchor.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) this.closeSearch();
      else this._positionSuggest(anchor);
    }, { passive: true });
  },

  toggleHeaderSearch() {
    const el = document.getElementById('headerSearch');
    const inp = document.getElementById('headerSearchInput');
    if (!el || !inp) return;
    if (window.innerWidth <= 768) {
      this._headerSearchOpen = !this._headerSearchOpen;
      el.classList.toggle('open', this._headerSearchOpen);
      if (this._headerSearchOpen) {
        this._searchOrigin = 'header';
        setTimeout(() => { inp.focus(); this.renderSuggestions(inp.value); }, 120);
      } else {
        this.closeSearch();
      }
    } else {
      this._searchOrigin = 'header';
      inp.focus();
      inp.select();
      this.renderSuggestions(inp.value);
    }
  },

  async init() {
    // Old query-string links (/?product=2, /?cat=mcu, /?shop=1 …) are moved to
    // the matching directory path before anything is rendered.
    if (this.legacyRedirect()) return;

    this.siteOrigin = String(this.siteOrigin || 'https://iboardz.netlify.app').replace(/\/+$/, '');
    this.buildSearchIndex();
    this.loadCart();
    this.setTheme(this.getTheme());
    this.setupReducedMotion();
    this.readPageContext();
    this.readQueryState();
    this.localizeLinks();

    this.render();
    this.renderCart();
    this.updateUrl();
    this.setupSectionScroll();
    // Switching sections should feel like a swap of the grid, not a new page.
    this.restoreSectionScroll();
    if (this.pageType === 'home') this.injectStructuredData();
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    this._setupKeyboard();
    this._setupClickOutside();
    this._setupResize();
    this.syncSearchInputs();
    this.closeSearch();

    // The static catalog paints instantly; live prices/stock are merged after.
    const updated = await this.syncCatalog();
    if (updated) {
      this.buildSearchIndex();
      this.loadCart();
      if (this.pageType === 'product') {
        const slug = document.body.dataset.product || '';
        this.state.currentProduct = this.products.find(p => String(p.slug) === String(slug)) || null;
        this.render();
      } else if (this.isListingPage()) {
        this.updateProductsView();
        this.alignSectionScroll();
      } else if (this.pageType === 'home' || this.pageType === 'projects') {
        this.render();
      }
      this.renderCart();
      this.syncSearchInputs();
    }
  },

  // ============================================================
  // 15. STRUCTURED DATA
  // ============================================================
  injectStructuredData() {
    try {
      const origin = 'https://iboardz.netlify.app';
      const items = this.products.map(p => ({
        '@type': 'Product',
        '@id': `${origin}/product/${encodeURIComponent(p.slug)}/#product`,
        name: p.name,
        sku: p.sku || String(p.id),
        description: p.desc,
        image: `${origin}/${encodeURI('images/' + p.img)}`,
        category: this.catLabel(p.cat),
        brand: { '@type': 'Brand', name: 'iBoardz' },
        itemCondition: 'https://schema.org/NewCondition',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'SAR',
          price: p.price,
          availability: this.getStock(p) === 0 ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
          url: `${origin}/product/${encodeURIComponent(p.slug)}/`,
          seller: { '@type': 'Organization', name: 'iBoardz' },
        },
      }));
      const services = this.services.map(s => ({
        '@type': 'Service',
        name: s.name,
        alternateName: s.nameEn,
        description: s.summary,
        image: `${origin}/${encodeURI('images/' + s.img)}`,
        serviceType: s.name,
        provider: { '@type': 'Organization', name: 'iBoardz', url: origin },
        areaServed: 'SA',
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: 'https://wa.me/' + this.meta.whatsapp,
          servicePhone: this.meta.whatsappDisplay,
        },
      }));

      const payload = {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'ItemList', name: 'منتجات iBoardz', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, item: it })) },
          ...services,
        ],
      };
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(payload);
      document.head.appendChild(script);
    } catch {}
  },
};

// also reachable as window.App for the console, tests and any integration
window.App = App;

App.init();
