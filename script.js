// iBoardz - ARDUINO FUTURE
const PRODUCTS = [
  { id:2, name:'ESP32 DEV MODEL', price:39, op:60, cat:'mcu', specs:['واي فاي + بلوتوث','USB Type-C','340KB SRAM','48MHz processor','18 GPIO pin'], desc:'نسخة مطورة من ESP32 مع منفذ USB-C', pop:true, badge:'مميز' },
  { id:3, name:'ARDUINO UNO R3', price:32, op:50, cat:'mcu', specs:['ATmega328P','16MHz clock','32KB Flash','14 Digital I/O','6 Analog Inputs'], desc:'المتحكم الأشهر في العالم، مثالي للمبتدئين', pop:true, badge:'الأكثر مبيعاً' },
  { id:4, name:'ESP32 C3 MINI', price:29, op:45, cat:'mcu', specs:['RISC-V 160MHz','400KB SRAM','WiFi 4 + BT5','22 GPIO pin','حجم صغير جداً'], desc:'متحكم صغير الحجم بكفاءة عالية' },
  { id:5, name:'ESP8266 D1 BOARD', price:29, op:42, cat:'mcu', specs:['ESP8266 WiFi','80MHz clock','11 GPIO pin','ADC مدمج','USB Micro'], desc:'لوحة تطوير اقتصادية مع واي فاي' },
  { id:6, name:'ESP32 D1 BOARD', price:39, op:58, cat:'mcu', specs:['ESP32 Dual Core','WiFi + BLE','30 GPIO pin','520KB SRAM','USB Type-C'], desc:'لوحة D1 المطورة مع ESP32', pop:true, badge:'مميز' },
  { id:7, name:'MAX 30102', price:25, op:40, cat:'sensor', specs:['مستشعر نبضات','IR + Red LED','I2C Interface','18-bit ADC','استهلاك منخفض'], desc:'مستشعر نبضات القلب والأكسجين في الدم' },
  { id:8, name:'HC-SR04 ULTRASONIC', price:18, op:28, cat:'sensor', specs:['قياس مسافة 2-400cm','دقة 3mm','Trigger + Echo','جهد عمل 5V','زاوية 15°'], desc:'مستشعر الموجات فوق الصوتية لقياس المسافة', pop:true, badge:'الأكثر طلباً' },
  { id:9, name:'DHT11 SENSOR', price:16, op:25, cat:'sensor', specs:['حرارة 0-50°C','رطوبة 20-90%','دقة ±2°C','Digital Output','جهد 3.3-5V'], desc:'مستشعر الحرارة والرطوبة', pop:true, badge:'الأكثر مبيعاً' },
  { id:10, name:'Capacitive Moisture Sensor V2.0', price:20, op:32, cat:'sensor', specs:['قياس رطوبة التربة','Analog Output','مقاوم للتآكل','جهد 3.3-5V','طراز V2.0'], desc:'مستشعر رطوبة التربة السعوي' },
  { id:11, name:'MPU6050 SENSOR', price:23, op:36, cat:'sensor', specs:['جيروسكوب 3 محاور','مقياس تسارع 3 محاور','I2C Interface','16-bit ADC','استهلاك منخفض'], desc:'مستشعر الحركة والتسارع' },
  { id:12, name:'MATRIX KEYBOARD 3x4', price:14, op:22, cat:'sensor', specs:['12 مفتاح','3 صفوف × 4 أعمدة','Flexible Film','سهل التوصيل','استهلاك منخفض'], desc:'لوحة مفاتيح مرنة 3×4' },
  { id:14, name:'WATER PUMP', price:21, op:35, cat:'sensor', specs:['جهد 3-6V','تدفق 80-120 L/H','مقاوم للتآكل','صغير الحجم','DC Motor'], desc:'مضخة مياه صغيرة للمشاريع' },
  { id:15, name:'SERVO MOTOR', price:16, op:25, cat:'sensor', specs:['زاوية 0-180°','عزم 1.8kg/cm','جهد 4.8-6V','PWM Control','SG90 Micro'], desc:'محرك سيرفو صغير للتحكم بالزاوية', pop:true, badge:'الأكثر مبيعاً' },
  { id:16, name:'MATRIX KEYBOARD 4x4', price:19, op:30, cat:'sensor', specs:['16 مفتاح','4 صفوف × 4 أعمدة','Flexible Film','سهل التوصيل','استهلاك منخفض'], desc:'لوحة مفاتيح مرنة 4×4' },
  { id:17, name:'TDS METER V1.0', price:39, op:55, cat:'sensor', specs:['قياس TDS','Analog Output','جهد 3.3-5V','دقة ±10%','مقاوم للماء'], desc:'مستشعر قياس جودة الماء' },
  { id:18, name:'AHT20+BMP280', price:22, op:35, cat:'sensor', specs:['حرارة + رطوبة + ضغط','I2C Interface','دقة عالية','استهلاك منخفض','حجم صغير'], desc:'مستشعر حرارة ورطوبة وضغط جوي مدمج' },
  { id:19, name:'L298N MOTOR DRIVER', price:19, op:30, cat:'sensor', specs:['يتحكم بمحركين DC','جهد 5-35V','تيار 2A لكل محرك','PWM Control','حماية من الحرارة'], desc:'متحكم محركات DC و Stepper' },
  { id:20, name:'MICRO SD CARD READER', price:16, op:25, cat:'sensor', specs:['SPI Interface','يدعم SD/SDHC','جهد 3.3-5V','سرعة عالية','حجم صغير'], desc:'قارئ بطاقات Micro SD للمشاريع' },
  { id:21, name:'DS18B20 SENSOR', price:18, op:28, cat:'sensor', specs:['حرارة -55°C إلى 125°C','1-Wire Interface','دقة ±0.5°C','مقاوم للماء','جهد 3-5.5V'], desc:'مستشعر حرارة مقاوم للماء' },
];

const REVIEWS = [
  { stars:5, text:'منتجات أصلية وجودة ممتازة، التوصيل كان سريع جداً. أنصح بالشراء من iBoardz.', name:'أحمد المالكي', role:'مهندس إلكترونيات' },
  { stars:5, text:'أفضل متجر للأردوينو في المنطقة، الأسعار منافسة والدعم الفني محترف.', name:'سارة الزهراني', role:'طالبة هندسة' },
  { stars:5, text:'تجربة شراء رائعة، حصلت على كل ما أحتاجه لمشروع التخرج. شكراً للفريق.', name:'محمد العتيبي', role:'مطور IoT' },
];

const FEATURES = [
  { num:'01', t:'منتجات أصلية', d:'جميع المنتجات أصلية ومضمونة 100% من موردين معتمدين.' },
  { num:'02', t:'شحن سريع', d:'شحن لجميع مناطق المملكة خلال 2-5 أيام عمل.' },
  { num:'03', t:'دعم فني', d:'فريق دعم متخصص لمساعدتك في مشاريعك الإلكترونية.' },
  { num:'04', t:'أسعار منافسة', d:'أفضل الأسعار مع عروض وخصومات دائمة.' },
];

const state = {
  page: 'home',
  cart: JSON.parse(localStorage.getItem('iboardz_cart') || '[]'),
  filter: 'all',
  ci: 0,
};

const $ = (s) => document.querySelector(s);
const fmt = (n) => n.toLocaleString('ar-SA');
const saveCart = () => localStorage.setItem('iboardz_cart', JSON.stringify(state.cart));

// ===== NAV =====
function nav(page) {
  state.page = page;
  closeMenu();
  window.scrollTo(0, 0);
  render();
}

function toggleMenu(e) {
  e?.stopPropagation();
  const dd = $('#dropdown'), bd = $('#menuBackdrop');
  if (dd.style.display === 'block') return closeMenu();
  dd.innerHTML = ['home','products','about','contact','terms'].map(p => {
    const labels = { home:'الرئيسية', products:'المنتجات', about:'عن المتجر', contact:'تواصل معنا', terms:'الشروط والأحكام' };
    return `<button class="${state.page===p?'active':''}" onclick="nav('${p}')">${labels[p]}</button>`;
  }).join('');
  dd.style.display = 'block';
  bd.style.display = 'block';
}
function closeMenu() {
  const dd = $('#dropdown'), bd = $('#menuBackdrop');
  if (dd) dd.style.display = 'none';
  if (bd) bd.style.display = 'none';
}

// ===== CART =====
function cartCount() { return state.cart.reduce((s,i)=>s+i.qty,0); }
function cartTotal() { return state.cart.reduce((s,i)=>s+i.price*i.qty,0); }
function cartOldTotal() { return state.cart.reduce((s,i)=>s+(i.op||i.price)*i.qty,0); }

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const ex = state.cart.find(x => x.id === id);
  if (ex) ex.qty += 1;
  else state.cart.push({ id:p.id, name:p.name, price:p.price, op:p.op, qty:1 });
  saveCart();
  renderCart();
  closeModal();
}
function changeQty(id, d) {
  const it = state.cart.find(x => x.id === id);
  if (!it) return;
  it.qty += d;
  if (it.qty <= 0) state.cart = state.cart.filter(x => x.id !== id);
  saveCart();
  renderCart();
}
function removeItem(id) {
  state.cart = state.cart.filter(x => x.id !== id);
  saveCart();
  renderCart();
}
function openCart() { $('#cartOverlay').classList.add('open'); renderCart(); }
function closeCart() { $('#cartOverlay').classList.remove('open'); }

function renderCart() {
  const badge = $('#cartBadge');
  const c = cartCount();
  badge.textContent = c;
  badge.style.display = c > 0 ? 'flex' : 'none';
  $('#cartCount').textContent = c;

  const body = $('#cartBody');
  const footer = $('#cartFooter');
  if (state.cart.length === 0) {
    body.innerHTML = `<div class="cart-empty">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
      <p>السلة فارغة</p></div>`;
    footer.style.display = 'none';
    return;
  }
  body.innerHTML = state.cart.map(i => `
    <div class="cart-item">
      <div class="cart-item-img"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="15" r="1"/></svg></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${i.name}</div>
        <div class="cart-item-prices"><span style="color:#ff9500;font-weight:800">${fmt(i.price)} ر.س</span></div>
      </div>
      <div class="cart-qty-controls">
        <button class="qty-btn" onclick="changeQty(${i.id},-1)">−</button>
        <span style="font-weight:700;min-width:20px;text-align:center">${i.qty}</span>
        <button class="qty-btn" onclick="changeQty(${i.id},1)">+</button>
      </div>
      <button class="cart-remove" onclick="removeItem(${i.id})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
      </button>
    </div>`).join('');

  const t = cartTotal(), ot = cartOldTotal(), sv = ot - t;
  const wa = encodeURIComponent('مرحباً، أود تأكيد طلبي:\n\n' +
    state.cart.map(i => `• ${i.name} × ${i.qty} = ${i.price*i.qty} ر.س`).join('\n') +
    `\n\nالإجمالي: ${t} ر.س`);
  footer.style.display = 'block';
  footer.innerHTML = `
    <div class="cart-totals">
      ${sv>0?`<div class="cart-total-row original"><span class="cart-total-label">السعر الأصلي:</span><span class="cart-total-old">${fmt(ot)} ر.س</span></div>`:''}
      <div class="cart-total-row discounted"><span class="cart-total-label">الإجمالي:</span><span class="cart-total-new">${fmt(t)} ر.س</span></div>
      ${sv>0?`<div class="cart-savings-badge"><span class="savings-icon">🎉</span><span class="savings-text">وفّرت ${fmt(sv)} ر.س</span></div>`:''}
    </div>
    <a class="whatsapp-btn" href="https://wa.me/966552645082?text=${wa}" target="_blank">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      إتمام الطلب عبر واتساب
    </a>`;
}

// ===== MODAL =====
function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const off = p.op ? Math.round((1 - p.price/p.op)*100) : 0;
  const overlay = $('#modalOverlay');
  overlay.style.display = 'flex';
  overlay.innerHTML = `
    <div class="modal-backdrop" onclick="closeModal()"></div>
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-img"><svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1"/><circle cx="16" cy="8" r="1"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/><circle cx="12" cy="12" r="2"/></svg></div>
      <div class="modal-body">
        <div class="modal-badges">
          ${p.badge?`<span class="badge badge-orange">${p.badge}</span>`:''}
          ${off>0?`<span class="badge badge-red">خصم ${off}%</span>`:''}
        </div>
        <h2 class="modal-title">${p.name}</h2>
        <p class="modal-desc">${p.desc}</p>
        <div class="modal-prices">
          <span class="modal-new-price">${fmt(p.price)} ر.س</span>
          ${p.op?`<span class="modal-old-price">${fmt(p.op)} ر.س</span>`:''}
        </div>
        <div class="modal-specs">
          <h3>المواصفات الرئيسية</h3>
          ${p.specs.map(s=>`<div class="spec-item"><span class="spec-dot"></span><span class="spec-text">${s}</span></div>`).join('')}
        </div>
        <button class="modal-add-btn" onclick="addToCart(${p.id})">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          أضف إلى السلة
        </button>
      </div>
    </div>`;
}
function closeModal() {
  const o = $('#modalOverlay');
  o.style.display = 'none';
  o.innerHTML = '';
}

// ===== CAROUSEL =====
const slides = [
  { title:'iBoardz', sub:'ARDUINO FUTURE' },
  { title:'تخفيضات تصل 40%', sub:'على مجموعة مختارة' },
];
let carouselTimer = null;
function startCarousel() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    state.ci = (state.ci + 1) % slides.length;
    updateCarousel();
  }, 4500);
}
function updateCarousel() {
  document.querySelectorAll('.carousel > img').forEach((img,i) => img.style.opacity = i===state.ci?1:0);
  document.querySelectorAll('.carousel-dot').forEach((d,i) => d.className = 'carousel-dot' + (i===state.ci?' active':''));
}
function setSlide(i) { state.ci = i; updateCarousel(); }
function nextSlide() { state.ci = (state.ci+1) % slides.length; updateCarousel(); }
function prevSlide() { state.ci = (state.ci-1+slides.length) % slides.length; updateCarousel(); }

// ===== ICONS =====
const ICON = {
  truck: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.8"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  headset: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.8"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1v-6h3zM3 19a2 2 0 002 2h1v-6H3z"/></svg>',
  cart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
  arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
};

// ===== RENDER =====
function productCard(p, large=false) {
  const off = p.op ? Math.round((1 - p.price/p.op)*100) : 0;
  return `<div class="product-card">
    <div class="product-img ${large?'product-img-large':''}" onclick="openProduct(${p.id})">
      <svg width="${large?120:100}" height="${large?120:100}" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1"/><circle cx="16" cy="8" r="1"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/><circle cx="12" cy="12" r="2"/></svg>
      ${p.badge?`<span class="product-badge badge-primary">${p.badge}</span>`:''}
      ${off>0?`<span class="discount-badge">-${off}%</span>`:''}
    </div>
    <div class="product-info">
      <div class="product-name" onclick="openProduct(${p.id})">${p.name}</div>
      <div class="product-bottom">
        <div class="product-prices">
          <span class="price">${fmt(p.price)} ر.س</span>
          ${p.op?`<span class="old-price">${fmt(p.op)}</span>`:''}
        </div>
        <button class="add-btn" onclick="addToCart(${p.id})" aria-label="إضافة">${ICON.plus}</button>
      </div>
    </div>
  </div>`;
}

function renderHome() {
  return `
    <div class="carousel">
      <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80" alt="">
      <img src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1600&q=80" style="opacity:0" alt="">
      <div class="carousel-overlay">
        <h1 class="carousel-title"><span class="i">i</span><span class="boardz">Boardz</span></h1>
        <p class="carousel-subtitle">ARDUINO <span class="future">FUTURE</span></p>
      </div>
      <button class="carousel-arrow next" onclick="nextSlide()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="carousel-arrow prev" onclick="prevSlide()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div class="carousel-dots">
        ${slides.map((_,i)=>`<button class="carousel-dot${i===state.ci?' active':''}" onclick="setSlide(${i})"></button>`).join('')}
      </div>
    </div>

    <div class="quick-features">
      <div class="quick-features-inner">
        <div class="quick-feature"><div class="quick-feature-icon">${ICON.truck}</div><div><h3>شحن سريع</h3><p>توصيل خلال 2-5 أيام</p></div></div>
        <div class="quick-feature"><div class="quick-feature-icon">${ICON.shield}</div><div><h3>منتجات أصلية</h3><p>ضمان الجودة 100%</p></div></div>
        <div class="quick-feature"><div class="quick-feature-icon">${ICON.headset}</div><div><h3>دعم فني</h3><p>متاح طوال الأسبوع</p></div></div>
        <div class="quick-feature"><div class="quick-feature-icon">${ICON.cart}</div><div><h3>أسعار منافسة</h3><p>عروض وخصومات دائمة</p></div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <span class="section-badge">منتجاتنا</span>
        <h2 class="section-title">الأكثر مبيعاً</h2>
        <p class="section-subtitle">اكتشف أفضل منتجاتنا المختارة بعناية</p>
      </div>
      <div class="products-grid">
        ${PRODUCTS.filter(p=>p.pop).slice(0,8).map(p=>productCard(p)).join('')}
      </div>
      <div style="text-align:center;margin-top:36px">
        <button class="show-all-btn" onclick="nav('products')">عرض جميع المنتجات ${ICON.arrow}</button>
      </div>
    </div>

    <div class="section" style="background:#fff">
      <div class="section-header">
        <span class="section-badge">آراء العملاء</span>
        <h2 class="section-title">ماذا يقول عملاؤنا</h2>
      </div>
      <div class="reviews-grid-home">
        ${REVIEWS.map(r=>`
          <div class="review-card-home">
            <div class="review-stars-home">${'★'.repeat(r.stars).split('').map(()=>'<span style="color:#ff9500;font-size:18px">★</span>').join('')}</div>
            <p class="review-text-home">"${r.text}"</p>
            <div class="review-author-home">
              <div class="review-avatar-home">${r.name.charAt(0)}</div>
              <div><div class="review-name-home">${r.name}</div><div class="review-role-home">${r.role}</div></div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  `;
}

function renderProducts() {
  const filters = [
    { k:'all', l:'الكل' },
    { k:'mcu', l:'لوحات تحكم' },
    { k:'sensor', l:'مستشعرات' },
  ];
  const list = state.filter==='all' ? PRODUCTS : PRODUCTS.filter(p=>p.cat===state.filter);
  return `
    <div class="section">
      <div class="section-header">
        <span class="section-badge">المتجر</span>
        <h2 class="section-title">جميع المنتجات</h2>
        <p class="section-subtitle">${list.length} منتج متوفر</p>
      </div>
      <div class="filter-bar">
        ${filters.map(f=>`<button class="filter-btn${state.filter===f.k?' active':''}" onclick="setFilter('${f.k}')">${f.l}</button>`).join('')}
      </div>
      <div class="products-grid-large">
        ${list.map(p=>productCard(p,true)).join('')}
      </div>
    </div>`;
}

function renderAbout() {
  return `
    <div class="section-narrow">
      <div class="section-header">
        <span class="section-badge">من نحن</span>
        <h2 class="section-title">قصة iBoardz</h2>
        <p class="section-subtitle">منصتك الأولى لمكونات الإلكترونيات والبرمجة</p>
      </div>
      <div class="features-grid">
        ${FEATURES.map(f=>`<div class="feature-card"><div class="feature-num">${f.num}</div><h3>${f.t}</h3><p>${f.d}</p></div>`).join('')}
      </div>
      <div class="section-header">
        <h2 class="section-title">آراء عملائنا</h2>
      </div>
      <div class="reviews-grid">
        ${REVIEWS.map(r=>`
          <div class="review-card">
            <div class="review-stars">${Array(r.stars).fill('★').join('')}</div>
            <p class="review-text">"${r.text}"</p>
            <div class="review-author">
              <div class="review-avatar">${r.name.charAt(0)}</div>
              <div><div class="review-name">${r.name}</div><div style="color:#999;font-size:12px">${r.role}</div></div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderContact() {
  return `
    <div class="section-contact">
      <div class="section-header">
        <span class="section-badge">تواصل معنا</span>
        <h2 class="section-title">نحن هنا لمساعدتك</h2>
        <p class="section-subtitle">اختر الطريقة الأنسب لك للتواصل</p>
      </div>
      <div class="contact-cards">
        <a href="https://wa.me/966552645082" target="_blank" class="contact-card whatsapp">
          <div class="contact-icon whatsapp-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>
          <div><div class="contact-label">واتساب</div><div class="contact-value">+966 552 645 082</div></div>
        </a>
        <a href="mailto:iBoardz@outlook.com" class="contact-card email">
          <div class="contact-icon email-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg></div>
          <div><div class="contact-label">البريد الإلكتروني</div><div class="contact-value">iBoardz@outlook.com</div></div>
        </a>
      </div>
      <div class="contact-form">
        <h2>أرسل لنا رسالة</h2>
        <form onsubmit="event.preventDefault();alert('شكراً، تم إرسال رسالتك');this.reset();">
          <div class="form-group"><label>الاسم</label><input type="text" class="form-input" placeholder="اسمك الكامل" required></div>
          <div class="form-group"><label>البريد الإلكتروني</label><input type="email" class="form-input" placeholder="email@example.com" style="direction:ltr;text-align:right" required></div>
          <div class="form-group"><label>الرسالة</label><textarea rows="5" class="form-input" placeholder="اكتب رسالتك هنا..." required></textarea></div>
          <button type="submit" class="submit-btn">إرسال الرسالة</button>
        </form>
      </div>
      <div class="work-hours"><h3>ساعات العمل</h3><p>السبت - الخميس: 9 صباحاً - 11 مساءً</p><p style="margin-bottom:0">الجمعة: 4 مساءً - 11 مساءً</p></div>
    </div>`;
}

function renderTerms() {
  return `<div class="terms-page">
    <div class="terms-hero">
      <div class="terms-hero-icon"><svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="40" fill="rgba(255,149,0,0.1)"/><rect x="22" y="15" width="36" height="50" rx="4" fill="none" stroke="#ff9500" stroke-width="2"/><line x1="30" y1="27" x2="50" y2="27" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="34" x2="50" y2="34" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="41" x2="44" y2="41" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/><circle cx="55" cy="55" r="12" fill="#ff9500"/><path d="M50 55l3 3 7-7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <h1 class="terms-hero-title">الشروط والأحكام</h1>
      <p class="terms-hero-sub">آخر تحديث: يناير 2025</p>
      <div class="terms-hero-badges">
        <span class="terms-badge">موثوق وآمن</span>
        <span class="terms-badge">محدّث باستمرار</span>
        <span class="terms-badge">حقوق العميل محفوظة</span>
      </div>
    </div>
    <div class="terms-container">
      <div class="terms-intro-card">
        <div class="terms-intro-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
        <div><h3>مقدمة</h3><p>تمت صياغة الشروط والأحكام للتأكد من معرفة العميل التامة بحقوقه وواجباته قبل التعامل مع المتجر. يتعهد المتجر بالالتزام بالفقرات التالية في كافة العمليات في هذا المتجر الإلكتروني.</p></div>
      </div>

      <div class="terms-section">
        <div class="terms-section-header">
          <div class="terms-section-icon" style="background:#fff5e6"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></div>
          <div><span class="terms-section-num">01</span><h2>المنتجات</h2></div>
        </div>
        <div class="terms-items">
          ${[
            ['#22c55e','جميع المنتجات في الموقع جديدة وغير مستخدمة ويتم شحنها بنفس حالة استلامها من المصنع أو المورد.'],
            ['#3b82f6','كافة المعلومات الفنية موجودة في الصفحة الخاصة بكل منتج. يحق للعميل طلب معلومات إضافية قبل عملية الشراء.'],
            ['#e74c3c','لا يحق للمتجر إضافة صور غير حقيقية للمنتج أو صور تمت معالجتها بطريقة تجعلها مختلفة عن شكلها في الواقع.'],
            ['#f59e0b','ألوان المنتجات تعتمد على دقة وإعدادات الشاشة المستخدمة في العرض، وأي اختلاف من جهة العميل يعتبر خارج صلاحيات المتجر.'],
          ].map(([c,t])=>`<div class="terms-item"><div class="terms-item-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></div><p>${t}</p></div>`).join('')}
        </div>
      </div>

      <div class="terms-section">
        <div class="terms-section-header">
          <div class="terms-section-icon" style="background:#eff6ff"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
          <div><span class="terms-section-num">02</span><h2>الشحن والتوصيل</h2></div>
        </div>
        <div class="terms-grid-2">
          <div class="terms-grid-card"><div class="terms-grid-icon">🚚</div><h4>أفضل الشركات</h4><p>يتم تقديم خدمة الشحن والتوصيل بواسطة أفضل الشركات المتواجدة في المنطقة.</p></div>
          <div class="terms-grid-card"><div class="terms-grid-icon">📦</div><h4>تغليف آمن</h4><p>يقوم المتجر بالتأكد من تغليف المنتجات بطريقة لا تجعلها عرضة للتلف بسهولة.</p></div>
          <div class="terms-grid-card"><div class="terms-grid-icon">✅</div><h4>ضمان الوصول</h4><p>يضمن المتجر استلام العميل للمنتجات بصورة جيدة وغير تالفة.</p></div>
          <div class="terms-grid-card"><div class="terms-grid-icon">📍</div><h4>متابعة الشحنة</h4><p>تتم متابعة كل الشحنات الصادرة من المتجر حتى وصولها للعميل.</p></div>
        </div>
      </div>

      <div class="terms-section">
        <div class="terms-section-header">
          <div class="terms-section-icon" style="background:#f0fdf4"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg></div>
          <div><span class="terms-section-num">03</span><h2>سياسة الاستبدال والاسترجاع</h2></div>
        </div>
        <div class="terms-highlight-box green"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg><div><strong>إثبات عملية الشراء مطلوب</strong><p>يجب إبراز الفاتورة الأصلية للاستفادة من خدمات الاستبدال أو الاسترجاع.</p></div></div>
        <div class="terms-timeline">
          <div class="terms-timeline-item"><div class="terms-timeline-dot green"></div><div class="terms-timeline-content"><h4>مدة 7 أيام</h4><p>يمكن استبدال أو استرجاع المنتج خلال سبعة أيام من تاريخ الشراء مع استيفاء الشروط المطلوبة.</p></div></div>
          <div class="terms-timeline-item"><div class="terms-timeline-dot orange"></div><div class="terms-timeline-content"><h4>شروط حالة المنتج</h4><p>يجب أن يكون المنتج في حالته الأصلية مع كامل الملحقات والتغليف الأصلي.</p></div></div>
          <div class="terms-timeline-item"><div class="terms-timeline-dot red"></div><div class="terms-timeline-content"><h4>المنتجات المفتوحة</h4><p>لا يمكن استرجاع المنتجات التي تم فتحها أو استخدامها ما لم يتبين وجود عيب مصنعي.</p></div></div>
        </div>
      </div>

      <div class="terms-section terms-general">
        <div class="terms-section-header">
          <div class="terms-section-icon" style="background:#fff5e6"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></div>
          <div><span class="terms-section-num">04</span><h2>الأحكام العامة</h2></div>
        </div>
        <div class="terms-general-content">
          <p>إرسال العميل للطلب يعني موافقته على كافة البنود والشروط بلا استثناء. يحق لـ <strong style="color:#ff9500">iBoardz</strong> تحديث وتغيير الشروط والأحكام في أي وقت.</p>
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
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        <h3>هل لديك استفسار؟</h3>
        <p>فريقنا جاهز للإجابة على جميع تساؤلاتك</p>
        <div class="terms-cta-btns">
          <a href="https://wa.me/966552645082" target="_blank" class="terms-cta-btn primary">تواصل عبر واتساب</a>
          <button class="terms-cta-btn secondary" onclick="nav('contact')">أرسل رسالة</button>
        </div>
      </div>
    </div>
  </div>`;
}

function setFilter(f) { state.filter = f; render(); }

function render() {
  const main = $('#mainContent');
  if (state.page === 'home') main.innerHTML = renderHome();
  else if (state.page === 'products') main.innerHTML = renderProducts();
  else if (state.page === 'about') main.innerHTML = renderAbout();
  else if (state.page === 'contact') main.innerHTML = renderContact();
  else if (state.page === 'terms') main.innerHTML = renderTerms();

  // footer links
  const fl = $('#footerLinks');
  if (fl) {
    fl.innerHTML = ['home','products','about','contact','terms'].map(p => {
      const labels = { home:'الرئيسية', products:'المنتجات', about:'عن المتجر', contact:'تواصل معنا', terms:'الشروط والأحكام' };
      return `<button onclick="nav('${p}')">${labels[p]}</button>`;
    }).join('');
  }

  if (state.page === 'home') startCarousel();
  else if (carouselTimer) clearInterval(carouselTimer);
}

// ===== INIT =====
render();
renderCart();
