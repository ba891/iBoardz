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
  popularSearches: window.IBOARDZ_CATALOG && window.IBOARDZ_CATALOG.popularSearches ? window.IBOARDZ_CATALOG.popularSearches : [],
  meta: (window.IBOARDZ_CATALOG && window.IBOARDZ_CATALOG.meta) || { whatsapp: '966552645082', whatsappDisplay: '+966 552 645 082', email: 'iBoardz@outlook.com' },

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

  features: [
    { title: 'جودة عالية', desc: 'جميع منتجاتنا أصلية ومضمونة' },
    { title: 'أسعار تنافسية', desc: 'أفضل الأسعار في السوق السعودي' },
    { title: 'شحن سريع', desc: 'توصيل سريع لجميع مناطق المملكة' },
    { title: 'دعم فني 24/7', desc: 'فريق دعم متخصص على مدار الساعة' },
    { title: 'ضمان كامل', desc: 'ضمان على جميع المنتجات' },
    { title: 'موارد تعليمية', desc: 'شروحات وأكواد جاهزة لكل منتج' },
  ],

  navItems: [
    { key: 'home', label: 'الرئيسية' },
    { key: 'products', label: 'المنتجات' },
    { key: 'features', label: 'المميزات' },
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
    tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    award: '<circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"/>',
    mapPin: '<path d="M21 10c0 6.5-9 12-9 12s-9-5.5-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
    clipboard: '<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
    wrench: '<path d="M20.5 6.5a5 5 0 01-7.6 4.3l-8.8 8.8a2 2 0 11-2.8-2.8l8.8-8.8A5 5 0 0117 6.5l-2.9 2.9 2.5 2.5 2.9-2.9a5 5 0 01-1.5 1.5z"/>',
  },

  // ===== 2. STATE =====
  state: {
    page: 'home', menuOpen: false, cartOpen: false, cart: [],
    filter: 'all', search: '', sort: 'relevance', ci: 0, selProd: null,
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
  RECENT_KEY: 'iboardz-recent-searches',
  AD_KEY: 'iboardz-ad-3d-dismissed',

  // ===== 3. HELPERS =====
  catLabel(key) {
    const cat = this.catalog.categories.find(c => c.key === key);
    return cat ? cat.label : key;
  },

  cats() {
    return this.catalog.categories.map(c => ({ key: c.key, label: c.label, icon: this.catIcons[c.key] || this.catIcons.all }));
  },

  imgPath(rel) { return 'images/' + String(rel).replace(/^images\//, ''); },

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

  // ===== 4. PERSISTENCE =====
  async syncCatalog() {
    try {
      const response = await fetch('/api/catalog');
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
  _navigateTo(page, opts = {}) {
    this.state.page = page;
    this.state.menuOpen = false;
    this.state.filter = 'all';
    this.closeSearch();
    if (!opts.preserveSearch) {
      this.state.search = '';
      this.state.sort = 'relevance';
      this.syncSearchInputs();
    }
    this.closeMenu();
    const main = document.getElementById('mainContent');
    main.style.opacity = '0';
    main.style.transform = 'translateY(12px)';
    setTimeout(() => {
      this.render();
      requestAnimationFrame(() => {
        main.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        main.style.opacity = '1';
        main.style.transform = 'translateY(0)';
        setTimeout(() => { main.style.transition = ''; }, 400);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 180);
  },

  nav(page) { this._navigateTo(page); },

  toggleMenu(e) {
    if (e) e.stopPropagation();
    this.state.menuOpen = !this.state.menuOpen;
    this.renderMenu();
    const btn = document.querySelector('.menu-btn');
    if (btn) btn.setAttribute('aria-expanded', String(this.state.menuOpen));
    if (this.state.menuOpen) this.lockBody(); else this.unlockBody();
  },

  closeMenu() {
    this.state.menuOpen = false;
    this.renderMenu();
    this.unlockBody();
  },

  openCart() {
    this.state.cartOpen = true;
    this.renderCart();
    this.lockBody();
  },

  closeCart() {
    this.state.cartOpen = false;
    this.renderCart();
    this.unlockBody();
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
  showProduct(id) {
    this.state.selProd = this.products.find(p => String(p.id) === String(id));
    this.renderModal();
    if (this.state.selProd) this.lockBody();
  },

  closeModal() {
    this.state.selProd = null;
    this.renderModal();
    this.unlockBody();
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
  },

  /** Main entry point used by both the header and the page search box. */
  search(rawValue, origin) {
    const value = typeof rawValue === 'string' ? rawValue : '';
    const trimmed = value.trim();
    this.state.search = trimmed;
    if (origin) this._searchOrigin = origin;
    if (!this.searchIndex) this.buildSearchIndex();

    if (this.state.page !== 'products') {
      // _navigateTo closes the panel, so the suggestions are rendered after it —
      // otherwise the very first keystroke from another page shows nothing.
      this._navigateTo('products', { preserveSearch: true });
      this.syncSearchInputs();
      this.updateUrl();
      this.renderSuggestions(trimmed);
      return;
    }

    this.renderSuggestions(trimmed);
    if (origin === 'header') this.syncSearchInputs();
    this.updateProductsView();
    this.updateUrl();
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
    this.pushRecent(query);
    this.search(query, this._searchOrigin);
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
          html += `<button class="sg-item" onclick="App.showProduct(${p.id})" data-idx="${idx}">
              <span class="sg-thumb">${this.imgTag(this.imgPath(p.img), p.name, 34)}</span>
              <span class="sg-meta">
                <span class="sg-name">${IBSearch.highlight(p.name, hit.matchedTokens)}</span>
                <span class="sg-sub">${this.esc(sub)}</span>
              </span>
              <span class="sg-price">⃁ ${p.price}</span>
            </button>`;
        });
        const total = productHits.total;
        html += `<button class="sg-all" onclick="App.applySuggestion(this.dataset.q)" data-q="${this.esc(q)}">
            عرض كل النتائج (${total}) ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 16)}
          </button>`;
      } else if (productHits.corrected) {
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

    panel.innerHTML = html;
    panel.hidden = false;
    panel.classList.toggle('empty', !q);
    this._suggestActive = -1;
    this._suggestOpen = true;
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
    const input = this._currentSearchInput();
    if (input) input.setAttribute('aria-expanded', 'false');
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
        this.closeSearch();
        this.pushRecent(this.state.search);
      }
    }
  },

  focusSearch() {
    const input = this._currentSearchInput();
    if (input) this.renderSuggestions(this.state.search);
  },

  // ---- products page ----------------------------------------
  updateProductsView() {
    if (this.state.page !== 'products') return;
    const pool = this.state.filter === 'all'
      ? this.products.slice()
      : this.products.filter(p => p.cat === this.state.filter);

    let list = pool;
    let hit = { total: pool.length, tokens: [], suggestion: '', corrected: false };
    if (this.searchIndex && this.state.search) {
      const res = IBSearch.query(this.searchIndex, this.state.search, { pool, limit: 0 });
      list = res.results.map(r => r.product);
      hit = res;
    }
    this._lastResult = hit;

    const sorter = this._sorter(this.state.search ? this.state.sort : (this.state.sort === 'relevance' ? 'popular' : this.state.sort));
    list.sort(sorter);

    const grid = document.getElementById('productsResults');
    if (grid) {
      grid.innerHTML = this.renderResults(list, hit);
      grid.classList.remove('enter');
      void grid.offsetWidth;
      grid.classList.add('enter');
    }
    const count = document.getElementById('productsCount');
    if (count) count.textContent = this.state.search ? `${list.length} نتيجة` : `${list.length} منتج`;
    document.querySelectorAll('#filterBar .filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === this.state.filter);
    });
    document.querySelectorAll('#sortBar .sort-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.sort === this.state.sort);
    });
    this.syncSearchInputs();
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
    this.updateProductsView();
    this.updateUrl();
  },

  setFilter(cat) {
    this.state.filter = cat;
    this.updateProductsView();
  },

  showService(id) {
    const service = this.services.find(s => String(s.id) === String(id));
    if (!service) return;
    this.closeSearch();
    this.state.selService = service;
    this.renderServiceModal();
    this.lockBody();
  },

  // ---- URL (?q=&cat=&sort=) --------------------------------
  updateUrl() {
    if (!window.history || !window.history.replaceState) return;
    const url = new URL(window.location.href);
    const q = this.state.search;
    const cat = this.state.filter;
    const sort = this.state.sort;
    if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
    if (cat && cat !== 'all') url.searchParams.set('cat', cat); else url.searchParams.delete('cat');
    if (sort && sort !== 'relevance') url.searchParams.set('sort', sort); else url.searchParams.delete('sort');
    window.history.replaceState({}, '', url.toString());
  },

  readUrl() {
    if (!window.URLSearchParams) return false;
    const params = new URLSearchParams(window.location.search);
    const q = (params.get('q') || '').trim();
    const cat = params.get('cat') || 'all';
    const sort = params.get('sort') || 'relevance';
    const validSort = this.sorts.some(s => s.key === sort);
    this.state.sort = validSort ? sort : 'relevance';
    if (this.catalog.categories.some(c => c.key === cat)) this.state.filter = cat;
    if (q) {
      this.state.search = q;
      return true;
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
    const m = { home: 'home', products: 'box', features: 'star', contact: 'envelope', terms: 'shield' };
    if (this.state.menuOpen) {
      dd.innerHTML = this.navItems.map(n =>
        `<button class="${this.state.page === n.key ? 'active' : ''}" onclick="App.nav('${n.key}')">${this.svgIcon(this.icons[m[n.key] || 'envelope'])} ${n.label}</button>`
      ).join('');
      requestAnimationFrame(() => {
        if (!this.state.menuOpen) return;
        dd.classList.add('open');
        bd.classList.add('open');
      });
    } else {
      dd.classList.remove('open');
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
        <button class="cart-remove" onclick="App.removeCart(${item.product.id}${item.color == null ? '' : ',' + JSON.stringify(item.color).replace(/"/g, '&quot;')})">${this.svgIcon('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>', 16)}</button>
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
    <a href="${this.wa(waText)}" target="_blank" rel="noopener noreferrer"><button class="whatsapp-btn">${this.svgIcon(this.icons.whatsapp, 20, '#25D366', '#25D366')} اطلب عبر واتساب</button></a>`;
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
    m.style.display = 'flex';
    m.innerHTML = `<div class="modal-backdrop" onclick="App.closeModal()"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="App.closeModal()">${this.svgIcon('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 20)}</button>
        <div class="modal-img">${this.imgTag(this.imgPath(p.img), p.name, 160)}</div>
        <div class="modal-body">
          <div class="modal-badges">
            <span class="badge badge-orange">${this.catLabel(p.cat)}</span>
            ${p.badge ? `<span class="badge badge-red">${this.esc(p.badge)}</span>` : ''}
            <span class="badge badge-orange">-${this.disc(p)}%</span>
          </div>
          <h2 class="modal-title">${this.esc(p.name)}</h2>
          ${p.nameAr ? `<p class="modal-name-ar">${this.esc(p.nameAr)}</p>` : ''}
          <p class="modal-desc">${this.esc(p.desc)}</p>
          ${p.customInput
            ? `<div class="modal-color-picker"><label class="modal-color-label">${this.esc(p.customInput.label || 'القيمة:')}</label><input type="text" id="prodCustomValue" class="modal-custom-input" placeholder="${this.esc(p.customInput.placeholder || '')}" autocomplete="off"></div>`
            : p.colorOptions
              ? `<div class="modal-color-picker"><label class="modal-color-label">${this.esc(p.optionLabel || 'اختر اللون المناسب:')}</label><div class="modal-color-options">${p.colorOptions.map(c => `<label class="modal-color-option"><input type="radio" name="prodOption" value="${this.esc(c)}" class="modal-color-radio"><span class="modal-color-swatch" data-color="${this.esc(c)}">${this.esc(c)}</span></label>`).join('')}</div></div>`
            : ''}
          <div class="modal-prices"><span class="modal-new-price">⃁ ${p.price}</span><span class="modal-old-price">⃁ ${p.op}</span></div>
          <div class="modal-specs"><h3>المواصفات التقنية:</h3>${p.specs.map(s => `<div class="spec-item"><div class="spec-dot"></div><span class="spec-text">${this.esc(s)}</span></div>`).join('')}</div>
          <button class="modal-add-btn" onclick="App.addCartWithColor(${p.id})">أضف إلى السلة ${this.svgIcon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 16)}</button>
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
    return `<img src="${this.esc(src)}" alt="${this.esc(alt)}" loading="lazy" decoding="async" onerror="this.style.display='none'" class="img-tag" style="min-height:${minH}px">`;
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
      : `App.addCart(App.products.find(x=>x.id===${p.id}), null, event)`;
    return `<div class="product-card">
      <div class="product-img${large ? ' product-img-large' : ''}" onclick="App.showProduct(${p.id})">
        ${this.imgTag(this.imgPath(p.img), p.name, 100)}
        ${p.badge ? `<span class="product-badge badge-primary">${this.esc(p.badge)}</span>` : ''}
        <span class="discount-badge">-${this.disc(p)}%</span>
      </div>
      <div class="product-info">
        <h3 class="product-name" onclick="App.showProduct(${p.id})">${name}</h3>
        <div class="product-bottom">
          <div class="product-prices">
            <span class="price">⃁ ${p.price}</span>
            <span class="old-price">⃁ ${p.op}</span>
          </div>
          <button class="add-btn" onclick="event.stopPropagation();${addAction}" aria-label="أضف للسلة">${this.svgIcon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 16)}</button>
        </div>
      </div>
    </div>`;
  },

  renderMain() {
    const main = document.getElementById('mainContent');
    const fl = document.getElementById('footerLinks');
    if (fl) fl.innerHTML = this.navItems.map(n => `<button onclick="App.nav('${n.key}')">${n.label}</button>`).join('');

    if (this.state.page === 'home') main.innerHTML = this.renderHome();
    else if (this.state.page === 'products') main.innerHTML = this.renderProducts();
    else if (this.state.page === 'features') main.innerHTML = this.renderFeatures();
    else if (this.state.page === 'terms') main.innerHTML = this.renderTerms();
    else if (this.state.page === 'contact') main.innerHTML = this.renderContact();

    setTimeout(() => this.setupScrollReveal(), 100);
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

    <div class="carousel">
      <img src="images/banners/add.jpg" alt="iBoardz - متجر إلكترونيات وأردوينو" width="1100" height="620" fetchpriority="high" style="opacity:${this.state.ci === 0 ? 1 : 0}" decoding="async">
      <img src="images/banners/add1.jpg" alt="iBoardz - عروض المنتجات" width="1100" height="619" loading="lazy" style="opacity:${this.state.ci === 1 ? 1 : 0}" decoding="async">
      <button class="carousel-arrow prev" onclick="App.setCi(${(this.state.ci - 1 + 2) % 2})" aria-label="السابق">${this.svgIcon('<polyline points="9 18 15 12 9 6"/>', 22)}</button>
      <button class="carousel-arrow next" onclick="App.setCi(${(this.state.ci + 1) % 2})" aria-label="التالي">${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 22)}</button>
      <div class="carousel-dots">
        <button class="carousel-dot${this.state.ci === 0 ? ' active' : ''}" onclick="App.setCi(0)" aria-label="الشريحة 1"></button>
        <button class="carousel-dot${this.state.ci === 1 ? ' active' : ''}" onclick="App.setCi(1)" aria-label="الشريحة 2"></button>
      </div>
    </div>

    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">${this.marqueeItems()}${this.marqueeItems()}</div>
    </div>

    <div class="quick-features reveal">
      <div class="quick-features-inner">
        <div class="quick-feature"><div class="quick-feature-icon">${this.svgIcon(this.icons.truck, 28)}</div><div><h3>شحن سريع</h3><p>توصيل لجميع مناطق المملكة</p></div></div>
        <div class="quick-feature"><div class="quick-feature-icon">${this.svgIcon(this.icons.shield, 28)}</div><div><h3>ضمان كامل</h3><p>ضمان على جميع المنتجات</p></div></div>
        <div class="quick-feature"><div class="quick-feature-icon">${this.svgIcon(this.icons.headset, 28)}</div><div><h3>دعم فني</h3><p class="phone"><a href="tel:+${this.meta.whatsapp}">${this.meta.whatsappDisplay}</a></p></div></div>
      </div>
    </div>

    <div class="section reveal">
      <div class="section-header">
        <div class="section-badge">الأكثر مبيعاً</div>
        <h2 class="section-title">الأكثر رواجاً</h2>
        <p class="section-subtitle">المنتجات الأكثر طلباً من عملائنا</p>
      </div>
      <div class="products-grid">${this.products.filter(p => p.pop).map(p => this.productCard(p)).join('')}</div>
      <div style="text-align:center;margin-top:40px"><button class="show-all-btn" onclick="App.nav('products')">عرض جميع المنتجات ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 22)}</button></div>
    </div>

    ${ad ? this.renderAdSection(ad) : ''}

    <div class="section reveal section-alt-bg">
      <div class="section-header">
        <div class="section-badge">آراء العملاء</div>
        <h2 class="section-title">ماذا يقول عملاؤنا</h2>
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
      <div style="text-align:center;margin-top:40px"><button class="show-all-btn" onclick="App.nav('features')">عرض جميع التقييمات ${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 22)}</button></div>
    </div>`;
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
  renderProducts() {
    const q = this.state.search;
    const pool = this.state.filter === 'all' ? this.products.slice() : this.products.filter(p => p.cat === this.state.filter);
    let list = pool;
    let hit = { total: pool.length, tokens: [], suggestion: '', corrected: false };
    if (this.searchIndex && q) {
      const res = IBSearch.query(this.searchIndex, q, { pool });
      list = res.results.map(r => r.product);
      hit = res;
    }
    list.sort(this._sorter(q ? this.state.sort : (this.state.sort === 'relevance' ? 'popular' : this.state.sort)));
    this._lastResult = hit;

    return `<div class="section">
      <div class="products-head reveal">
        <h1>المنتجات</h1>
        <p class="products-subtitle">ابحث عن القطعة التي تحتاجها بالاسم أو بالوصف — النتائج فورية</p>
      </div>

      <div class="search-bar">
        <input type="search" id="productsSearchInput" placeholder="مثال: حساس حرارة، ESP32، بطارية 3.7V…" value="${this.esc(q)}"
          oninput="App.searchDebounced(this.value,'page')" onfocus="App.focusSearch()" onkeydown="App.searchKeydown(event)"
          autocomplete="off" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="false" aria-controls="searchSuggest" aria-autocomplete="list" aria-label="ابحث عن منتج">
        <span class="search-icon">${this.svgIcon(this.icons.search, 20)}</span>
        <button class="search-clear" data-search-clear onclick="App.clearSearch('page')" aria-label="مسح البحث" ${q ? '' : 'hidden'}>${this.svgIcon(this.icons.close, 16)}</button>
      </div>

      <div class="filter-bar" id="filterBar">
        ${this.cats().map(c => {
          const count = c.key === 'all' ? this.products.length : this.products.filter(p => p.cat === c.key).length;
          return `<button class="filter-btn${this.state.filter === c.key ? ' active' : ''}" data-cat="${c.key}" onclick="App.setFilter('${c.key}')"><span class="filter-ico">${this.svgIcon(c.icon, 15)}</span>${c.label}<span class="filter-count">${count}</span></button>`;
        }).join('')}
      </div>

      <div class="sort-bar" id="sortBar">
        <span class="sort-label">ترتيب حسب:</span>
        ${this.sorts.map(s => `<button class="sort-btn${this.state.sort === s.key ? ' active' : ''}" data-sort="${s.key}" onclick="App.setSort('${s.key}')">${s.label}</button>`).join('')}
        <span class="products-count" id="productsCount">${q ? list.length + ' نتيجة' : list.length + ' منتج'}</span>
      </div>

      <div id="productsResults" class="enter">${this.renderResults(list, hit)}</div>
    </div>`;
  },

  renderResults(list, hit) {
    const q = this.state.search;
    const tokens = q ? IBSearch.tokenize(q) : [];
    const serviceHits = (q && this.serviceIndex)
      ? IBSearch.query(this.serviceIndex, q, { limit: 2 }).results.map(r => r.product.service)
      : [];

    let html = '';

    if (hit.corrected) {
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
        <p style="font-size:13px">جرّب كلمة مختلفة أو تصفّح الأقسام</p>
        <div class="empty-actions">
          <button class="show-all-btn" onclick="App.clearSearch('page')">مسح البحث</button>
        </div>
        <div class="empty-suggest">
          <h4>بحث شائع</h4>
          <div class="sg-chips">${this.popularSearches.map(s => `<button class="sg-chip" onclick="App.applySuggestion(this.dataset.q)" data-q="${this.esc(s)}">${this.esc(s)}</button>`).join('')}</div>
          <h4>تصفح الأقسام</h4>
          <div class="sg-chips">${this.cats().filter(c => c.key !== 'all').map(c => `<button class="sg-chip" onclick="App.setFilter('${c.key}')">${c.label}</button>`).join('')}</div>
        </div>
      </div>`;
      return html;
    }

    html += `<div class="products-grid-large">${list.map(p => this.productCard(p, true, tokens)).join('')}</div>`;
    return html;
  },

  renderFeatures() {
    return `<div class="section-full">
      <div class="section-header reveal">
        <div class="section-badge">لماذا نحن؟</div>
        <h1 class="section-title">لماذا <span style="direction:ltr;display:inline-block">iBoardz</span>؟</h1>
        <p class="section-subtitle">مميزات تجعلنا الخيار الأول لعشاق الإلكترونيات</p>
      </div>
      <div class="features-grid">${this.features.map((f, i) => `<div class="feature-card reveal"><div class="feature-num">${i + 1}</div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join('')}</div>

      <div class="section-header reveal" style="margin-top:48px;margin-bottom:32px">
        <div class="section-badge">آراء العملاء</div>
        <h2 style="font-size:28px;font-weight:900;margin:0 0 6px">ماذا يقول عملاؤنا</h2>
        <p style="color:#999;font-size:15px">تجارب حقيقية من عملاء <strong style="direction:ltr;display:inline-block;color:#ff9500">iBoardz</strong></p>
      </div>

      <div class="reviews-pro reveal" style="max-width:1100px;margin:0 auto">
        <div class="reviews-pro-grid">${this.reviews.map(r => `<div class="review-pro-card reveal">
          <div class="review-pro-quote">"</div>
          <div class="review-pro-stars">${this.renderStars(r.stars || 5)}</div>
          <p class="review-pro-text">${r.text}</p>
          <div class="review-decor-pro"><span class="review-decor-line"></span><span class="review-decor-icon">${this.svgIcon('<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>', 14, '#ff9500')}</span><span class="review-decor-line"></span></div>
        </div>`).join('')}</div>
      </div>
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
          <div class="form-group"><label>الاسم</label><input type="text" id="contactName" class="form-input" placeholder="اسمك الكامل" required></div>
          <div class="form-group"><label>البريد الإلكتروني</label><input type="email" id="contactEmail" class="form-input" placeholder="email@example.com" style="direction:ltr;text-align:right"></div>
          <div class="form-group"><label>الرسالة</label><textarea rows="5" id="contactMsg" class="form-input" placeholder="اكتب رسالتك هنا..." required></textarea></div>
          <button type="submit" class="submit-btn" id="contactSubmitBtn">إرسال الرسالة</button>
        </form>
      </div>
      <div class="work-hours reveal"><h3>ساعات العمل</h3><p>السبت - الخميس: 9 صباحاً - 11 مساءً</p><p style="margin-bottom:0">الجمعة: 4 مساءً - 11 مساءً</p></div>
    </div>`;
  },

  renderTerms() {
    return `<div class="terms-page">
      <div class="terms-hero">
        <div class="terms-hero-icon"><svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="40" fill="rgba(255,149,0,0.1)"/><rect x="22" y="15" width="36" height="50" rx="4" fill="none" stroke="#ff9500" stroke-width="2"/><line x1="30" y1="27" x2="50" y2="27" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="34" x2="50" y2="34" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="41" x2="44" y2="41" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/><circle cx="55" cy="55" r="12" fill="#ff9500"/><path d="M50 55l3 3 7-7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h1 class="terms-hero-title">الشروط والأحكام</h1>
        <p class="terms-hero-sub">آخر تحديث: يناير 2025</p>
        <div class="terms-hero-badges">
          <span class="terms-badge">${this.svgIcon('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', 14)} موثوق وآمن</span>
          <span class="terms-badge">${this.svgIcon('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 14)} محدّث باستمرار</span>
          <span class="terms-badge">${this.svgIcon('<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>', 14)} حقوق العميل محفوظة</span>
        </div>
      </div>
      <div class="terms-container">
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
        <div class="terms-section terms-general">
          <div class="terms-section-header">
            <div class="terms-section-icon icon-orange">${this.svgIcon('<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>', 28, '#ff9500')}</div>
            <div><span class="terms-section-num">05</span><h2>الأحكام العامة</h2></div>
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
            <a href="${this.wa()}" target="_blank" class="terms-cta-btn primary">${this.svgIcon(this.icons.whatsapp, 18, '#fff', '#fff')} تواصل عبر واتساب</a>
            <button class="terms-cta-btn secondary" onclick="App.nav('contact')">${this.svgIcon(this.icons.envelope, 18)} أرسل رسالة</button>
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
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => { btn.classList.toggle('visible', window.scrollY > 400); }, { passive: true });
  },

  setupHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
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
    this.buildSearchIndex();
    await this.syncCatalog();
    this.loadCart();
    this.setTheme(this.getTheme());
    this.setupReducedMotion();

    const fromUrl = this.readUrl();
    if (fromUrl) this.state.page = 'products';

    this.render();
    this.renderCart();
    this.injectStructuredData();
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    setTimeout(() => this.setupScrollReveal(), 200);

    this._setupKeyboard();
    this._setupClickOutside();
    this._setupResize();
    this.syncSearchInputs();

    // if the URL carried a query, run it through the pipeline once
    if (fromUrl) {
      this._searchOrigin = 'header';
      this.updateProductsView();
      this.closeSearch();
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
        '@id': `${origin}/#product-${p.id}`,
        name: p.name,
        sku: p.sku || String(p.id),
        description: p.desc,
        image: `${origin}/images/${p.img}`,
        category: this.catLabel(p.cat),
        offers: {
          '@type': 'Offer',
          priceCurrency: 'SAR',
          price: p.price,
          availability: this.getStock(p) === 0 ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
          url: `${origin}/?q=${encodeURIComponent(p.name)}`,
        },
      }));
      const services = this.services.map(s => ({
        '@type': 'Service',
        name: s.name,
        alternateName: s.nameEn,
        description: s.summary,
        image: `${origin}/images/${s.img}`,
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