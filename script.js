// ==================== iBoardz - script.js ====================

// ===== DATA =====
const products = [
  // MICROCONTROLLERS
  { id:1, name:'ESP32', price:41, originalPrice:65, category:'microcontrollers', image:'esp32.png', specs:['واي فاي مدمج','بلوتوث مدمج','240MHz dual-core','520KB SRAM','34 GPIO pin'], description:'متحكم دقيق قوي مع واي فاي وبلوتوث مدمجين', popular:true, badge:'الأكثر طلباً' },
  { id:2, name:'ESP32 DEV MODEL', price:39, originalPrice:60, category:'microcontrollers', image:'esp32-dev-model.png', specs:['واي فاي + بلوتوث','USB Type-C','340KB SRAM','48MHz processor','18 GPIO pin'], description:'نسخة مطورة من ESP32 مع منفذ USB-C', popular:true, badge:'مميز' },
  { id:3, name:'ARDUINO UNO R3', price:32, originalPrice:50, category:'microcontrollers', image:'arduino-uno-r3.png', specs:['ATmega328P','16MHz clock','32KB Flash','14 Digital I/O','6 Analog Inputs'], description:'المتحكم الأشهر في العالم، مثالي للمبتدئين', popular:true, badge:'الأكثر مبيعاً' },
  { id:4, name:'ESP32 C3 MINI', price:29, originalPrice:45, category:'microcontrollers', image:'esp32-c3-mini.png', specs:['RISC-V 160MHz','400KB SRAM','WiFi 4 + BT5','22 GPIO pin','حجم صغير جداً'], description:'متحكم صغير الحجم بكفاءة عالية' },
  { id:5, name:'ESP8266 D1 BOARD', price:29, originalPrice:42, category:'microcontrollers', image:'esp8266-d1-board.png', specs:['ESP8266 WiFi','80MHz clock','11 GPIO pin','ADC مدمج','USB Micro'], description:'لوحة تطوير اقتصادية مع واي فاي' },
  { id:6, name:'ESP32 D1 BOARD', price:39, originalPrice:58, category:'microcontrollers', image:'esp32-d1-board.png', specs:['ESP32 Dual Core','WiFi + BLE','30 GPIO pin','520KB SRAM','USB Type-C'], description:'لوحة D1 المطورة مع ESP32', popular:true, badge:'مميز' },

  // SENSORS
  { id:7, name:'MAX 30102', price:25, originalPrice:40, category:'sensors', image:'max-30102.png', specs:['مستشعر نبضات','IR + Red LED','I2C Interface','18-bit ADC','استهلاك منخفض'], description:'مستشعر نبضات القلب والأكسجين في الدم' },
  { id:8, name:'HC-SR04 ULTRASONIC', price:18, originalPrice:28, category:'sensors', image:'hc-sr04-ultrasonic.png', specs:['قياس مسافة 2-400cm','دقة 3mm','Trigger + Echo','جهد عمل 5V','زاوية 15°'], description:'مستشعر الموجات فوق الصوتية لقياس المسافة', popular:true, badge:'الأكثر طلباً' },
  { id:9, name:'DHT11 SENSOR', price:16, originalPrice:25, category:'sensors', image:'dht11-sensor.png', specs:['حرارة 0-50°C','رطوبة 20-90%','دقة ±2°C','Digital Output','جهد 3.3-5V'], description:'مستشعر الحرارة والرطوبة', popular:true, badge:'الأكثر مبيعاً' },
  { id:10, name:'Capacitive Moisture Sensor V2.0', price:20, originalPrice:32, category:'sensors', image:'capacitive-moisture-sensor-v2.png', specs:['قياس رطوبة التربة','Analog Output','مقاوم للتآكل','جهد 3.3-5V','طراز V2.0'], description:'مستشعر رطوبة التربة السعوي' },
  { id:11, name:'MPU6050 SENSOR', price:23, originalPrice:36, category:'sensors', image:'mpu6050-sensor.png', specs:['جيروسكوب 3 محاور','مقياس تسارع 3 محاور','I2C Interface','16-bit ADC','استهلاك منخفض'], description:'مستشعر الحركة والتسارع' },
  { id:12, name:'MATRIX KEYBOARD 3x4', price:14, originalPrice:22, category:'sensors', image:'matrix-keypad-3x4.png', specs:['12 مفتاح','3 صفوف × 4 أعمدة','Flexible Film','سهل التوصيل','استهلاك منخفض'], description:'لوحة مفاتيح مرنة 3×4' },
  { id:13, name:'V2.0 CAPACITIVE SOIL MOISTURE', price:19, originalPrice:30, category:'sensors', image:'capacitive-soil-moisture-v2.png', specs:['قياس رطوبة التربة','Analog Output','طراز V2.0','مقاوم للتآكل','جهد 3.3-5V'], description:'مستشعر رطوبة التربة السعوي V2.0' },
  { id:14, name:'WATER PUMP', price:21, originalPrice:35, category:'sensors', image:'water-pump.png', specs:['جهد 3-6V','تدفق 80-120 L/H','مقاوم للتآكل','صغير الحجم','DC Motor'], description:'مضخة مياه صغيرة للمشاريع' },
  { id:15, name:'SERVO MOTOR', price:16, originalPrice:25, category:'sensors', image:'servo-motor.png', specs:['زاوية 0-180°','عزم 1.8kg/cm','جهد 4.8-6V','PWM Control','SG90 Micro'], description:'محرك سيرفو صغير للتحكم بالزاوية', popular:true, badge:'الأكثر مبيعاً' },
  { id:16, name:'MATRIX KEYBOARD 4x4', price:19, originalPrice:30, category:'sensors', image:'matrix-keypad-4x4.png', specs:['16 مفتاح','4 صفوف × 4 أعمدة','Flexible Film','سهل التوصيل','استهلاك منخفض'], description:'لوحة مفاتيح مرنة 4×4' },
  { id:17, name:'TDS METER V1.0', price:39, originalPrice:55, category:'sensors', image:'tds-meter-v1.png', specs:['قياس TDS','Analog Output','جهد 3.3-5V','دقة ±10%','مقاوم للماء'], description:'مستشعر قياس جودة الماء' },
  { id:18, name:'AHT20+BMP280', price:22, originalPrice:35, category:'sensors', image:'aht20-bmp280.png', specs:['حرارة + رطوبة + ضغط','I2C Interface','دقة عالية','استهلاك منخفض','حجم صغير'], description:'مستشعر حرارة ورطوبة وضغط جوي مدمج' },
  { id:19, name:'L298N MOTOR DRIVER', price:19, originalPrice:30, category:'sensors', image:'l298n-motor-driver.png', specs:['يتحكم بمحركين DC','جهد 5-35V','تيار 2A لكل محرك','PWM Control','حماية من الحرارة'], description:'متحكم محركات DC و Stepper' },
  { id:20, name:'MICRO SD CARD READER', price:16, originalPrice:25, category:'sensors', image:'micro-sd-card-reader.png', specs:['SPI Interface','يدعم SD/SDHC','جهد 3.3-5V','سرعة عالية','حجم صغير'], description:'قارئ بطاقات Micro SD للمشاريع' },
  { id:21, name:'DS18B20 SENSOR', price:18, originalPrice:28, category:'sensors', image:'ds18b20-sensor.png', specs:['حرارة -55°C إلى 125°C','1-Wire Interface','دقة ±0.5°C','مقاوم للماء','جهد 3-5.5V'], description:'مستشعر حرارة رقمي مقاوم للماء' },
  { id:22, name:'JUMPER WIRE', price:11, originalPrice:18, category:'sensors', image:'jumper-wire.png', specs:['40 سلك','Male to Male','Male to Female','Female to Female','طول 20cm'], description:'أسلاك توصيل متنوعة للمشاريع' },
  { id:23, name:'ACS712 30A RANGE', price:30, originalPrice:45, category:'sensors', image:'acs712-30a.png', specs:['قياس تيار ±30A','Analog Output','دقة 66mV/A','جهد 5V','عزل كهربائي'], description:'مستشعر التيار الكهربائي حتى 30 أمبير' },
  { id:24, name:'JOYSTICK', price:10, originalPrice:16, category:'sensors', image:'joystick.png', specs:['محورين X/Y','زر ضغط','Analog Output','جهد 3.3-5V','سهل الاستخدام'], description:'يد تحكم تناظرية للمشاريع' },
  { id:25, name:'RELAY MODULE HIGH 5V', price:13, originalPrice:20, category:'sensors', image:'relay-module-5v.png', specs:['4 قنوات','جهد 5V','حمولة 10A/250VAC','عزل ضوئي','LED مؤشر'], description:'موديول ريليه 4 قنوات للتحكم بالأحمال' },

  // DISPLAYS
  { id:26, name:'SH1107 OLED DISPLAY', price:109, originalPrice:160, category:'displays', image:'sh1107-oled-display.png', specs:['شاشة OLED 1.3"','دقة 128×64','I2C Interface','تباين عالي جداً','استهلاك منخفض'], description:'شاشة OLED 1.3 بوصة عالية الجودة', popular:true, badge:'مميز' },
  { id:27, name:'LCD 1602 WITH I2C', price:27, originalPrice:40, category:'displays', image:'lcd-1602-i2c.png', specs:['16 حرف × 2 سطر','I2C Interface','إضاءة خلفية زرقاء','جهد 5V','تباين قابل للتعديل'], description:'شاشة LCD مع واجهة I2C سهلة التوصيل' },
  { id:28, name:'SSD1306 OLED 0.96"', price:35, originalPrice:52, category:'displays', image:'ssd1306-oled-096.png', specs:['شاشة OLED 0.96"','دقة 128×64','I2C Interface','أبيض وأزرق','استهلاك منخفض جداً'], description:'شاشة OLED صغيرة ومثالية للمشاريع' },
];

const categories = [
  { key:'all', label:'الكل' },
  { key:'microcontrollers', label:'المتحكمات الدقيقة' },
  { key:'sensors', label:'الحساسات' },
  { key:'displays', label:'الشاشات' },
];

const reviews = [
  { name:'mr.stornyt', text:'جاني المستشعرات وكل الجهاز مع بعض مغلف كويس وشرح لي كل التفاصيل، أنصحكم تتعاملون معه.' },
  { name:'mr.stornyt', text:'تعاملت معه لأنه كان عندي هاكاثون ومشروع يبيله برمجة ومستشعرات طبية وشغلات كثيرة، ما قصّر أبداً اشتغل من ذمّته وهو وفّر كل القطع وبرمجها لي، وكان يجاوب على أسئلتي وكل ما أعطيه يضيف شيء إضافي للمشروع وشرح لي بذمّة وضمير، الله يجزاه خير أنصحكم فيه.' },
  { name:'عميل', text:'شغله ما شاء الله رهيب.' },
  { name:'m.ddddi', text:'صراحة الرجال متعاون جداً وشغله مضمون، سويت عنده مشروع تخرج أردوينو وما قصّر معي في شيء، أنصح بالتعامل معه.' },
  { name:'عضو #15049', text:'بصراحة أنصح بالتعامل معه، الرجال خدوم في أيام قليلة وخلص المشروع.' },
  { name:'أحمد هاني آل عمير', text:'الرجال واجد طيب وتعامله راقي، يستاهل 10/10 وفنّان في المشاريع.' },
  { name:'store_nawaf', text:'الرجال ما قصّر، كان عندي مشروع حاولت تشغيله أكثر من مرّة وجا الرجال وعطاني الكود البرمجي واشتغل معي الحمد لله.' },
];

const featuresData = [
  { title:'جودة عالية', desc:'جميع منتجاتنا أصلية ومضمونة' },
  { title:'أسعار تنافسية', desc:'أفضل الأسعار في السوق السعودي' },
  { title:'شحن سريع', desc:'توصيل سريع لجميع مناطق المملكة' },
  { title:'دعم فني 24/7', desc:'فريق دعم متخصص على مدار الساعة' },
  { title:'ضمان كامل', desc:'ضمان على جميع المنتجات' },
  { title:'موارد تعليمية', desc:'شروحات وأكواد جاهزة لكل منتج' },
];

// ===== STATE =====
let currentPage = 'home';
let menuOpen = false;
let cartOpen = false;
let cart = [];
let currentFilter = 'all';
let carouselIdx = 0;
const carouselImgs = ['add.png', 'add1.png'];
let carouselTimer = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderPage();
  startCarousel();
  document.addEventListener('click', handleOutsideClick);
});

// ===== CART PERSISTENCE =====
function loadCart() {
  try {
    const saved = localStorage.getItem('iboardz-cart');
    if (saved) cart = JSON.parse(saved);
  } catch(e) {}
  updateCartCount();
}

function saveCart() {
  localStorage.setItem('iboardz-cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cart-count');
  if (el) {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ===== CART OPERATIONS =====
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: product.image, qty: 1 });
  }
  saveCart();
  renderCartItems();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCartItems();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCartItems();
}

function getTotalItems() { return cart.reduce((s, i) => s + i.qty, 0); }
function getTotalPrice() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function getTotalSaved() { return cart.reduce((s, i) => s + (i.originalPrice - i.price) * i.qty, 0); }

// ===== CART UI =====
function toggleCart() {
  cartOpen = !cartOpen;
  const overlay = document.getElementById('cart-overlay');
  const sidebar = document.getElementById('cart-sidebar');
  if (cartOpen) {
    overlay.classList.add('open');
    sidebar.classList.add('open');
    renderCartItems();
  } else {
    overlay.classList.remove('open');
    sidebar.classList.remove('open');
  }
}

function openCart() {
  if (!cartOpen) {
    cartOpen = true;
    document.getElementById('cart-overlay').classList.add('open');
    document.getElementById('cart-sidebar').classList.add('open');
    renderCartItems();
  }
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const footer = document.getElementById('cart-footer');
  
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg><p>السلة فارغة</p><small>أضف منتجات للبدء</small></div>';
    footer.style.display = 'none';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="images/${item.image}" alt="${item.name}" onerror="this.style.display='none'">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-prices">
          <span class="price-new" style="font-size:14px">${item.price} ر.س</span>
          <span class="price-old" style="font-size:11px">${item.originalPrice} ر.س</span>
        </div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  const saved = getTotalSaved();
  const savedEl = document.getElementById('cart-saved');
  if (saved > 0) {
    savedEl.innerHTML = `<span>🎉 وفّرت ${saved} ر.س بفضل الخصومات!</span>`;
    savedEl.style.display = 'flex';
  } else {
    savedEl.style.display = 'none';
  }

  document.getElementById('cart-total-items').textContent = getTotalItems();
  document.getElementById('cart-total-price').textContent = getTotalPrice() + ' ر.س';

  const msg = 'مرحباً، أريد طلب:\n' + cart.map(i => `${i.name} × ${i.qty} = ${i.price * i.qty} ر.س`).join('\n') + '\nالمجموع: ' + getTotalPrice() + ' ر.س';
  document.getElementById('whatsapp-link').href = `https://wa.me/966552645082?text=${encodeURIComponent(msg)}`;

  footer.style.display = 'block';
}

// ===== MENU =====
function toggleMenu() {
  menuOpen = !menuOpen;
  const menu = document.getElementById('dropdown-menu');
  if (menuOpen) {
    menu.classList.add('open');
    updateMenuActive();
  } else {
    menu.classList.remove('open');
  }
}

function updateMenuActive() {
  document.querySelectorAll('.dropdown-menu button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === currentPage);
  });
}

function handleOutsideClick(e) {
  const menu = document.getElementById('dropdown-menu');
  const menuBtn = document.querySelector('.menu-btn');
  if (menuOpen && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menuOpen = false;
    menu.classList.remove('open');
  }
}

// ===== NAVIGATION =====
function navigate(page) {
  currentPage = page;
  menuOpen = false;
  document.getElementById('dropdown-menu').classList.remove('open');
  updateMenuActive();
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== PRODUCT MODAL =====
function openProductModal(productId) {
  const p = products.find(pr => pr.id === productId);
  if (!p) return;
  
  const catLabel = categories.find(c => c.key === p.category)?.label || '';
  const discount = Math.round((1 - p.price / p.originalPrice) * 100);

  const modal = document.getElementById('product-modal');
  const body = document.getElementById('modal-body');

  body.innerHTML = `
    <div class="modal-img-area">
      <img src="images/${p.image}" alt="${p.name}" onerror="this.style.display='none'">
    </div>
    <div class="modal-body-inner">
      <div class="modal-badges">
        <span class="modal-cat-badge">${catLabel}</span>
        ${p.badge ? `<span class="modal-badge-tag">${p.badge}</span>` : ''}
        <span class="modal-disc-badge">-${discount}%</span>
      </div>
      <h2 class="modal-title">${p.name}</h2>
      <p class="modal-desc">${p.description}</p>
      <div class="modal-prices">
        <span class="modal-new-price">${p.price} ر.س</span>
        <span class="modal-old-price">${p.originalPrice} ر.س</span>
      </div>
      <div class="modal-specs">
        <h3>المواصفات التقنية:</h3>
        ${p.specs.map(spec => `<div class="modal-spec-item"><div class="modal-spec-dot"></div><span>${spec}</span></div>`).join('')}
      </div>
      <button class="modal-add-btn" onclick="addToCart(${p.id}); closeProductModal();">
        أضف إلى السلة
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </div>
  `;

  modal.classList.add('open');
}

function closeProductModal() {
  document.getElementById('product-modal').classList.remove('open');
}

// ===== CAROUSEL =====
function startCarousel() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    carouselIdx = (carouselIdx + 1) % carouselImgs.length;
    updateCarousel();
  }, 4000);
}

function updateCarousel() {
  const imgs = document.querySelectorAll('.carousel img');
  const dots = document.querySelectorAll('.carousel-dot');
  imgs.forEach((img, i) => img.classList.toggle('active', i === carouselIdx));
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === carouselIdx);
    dot.style.width = i === carouselIdx ? '28px' : '10px';
  });
}

function prevSlide() {
  carouselIdx = (carouselIdx - 1 + carouselImgs.length) % carouselImgs.length;
  updateCarousel();
  startCarousel();
}

function nextSlide() {
  carouselIdx = (carouselIdx + 1) % carouselImgs.length;
  updateCarousel();
  startCarousel();
}

function goToSlide(i) {
  carouselIdx = i;
  updateCarousel();
  startCarousel();
}

// ===== RENDER PAGES =====
function renderPage() {
  const main = document.getElementById('main-content');
  switch(currentPage) {
    case 'home': main.innerHTML = renderHome(); break;
    case 'products': main.innerHTML = renderProducts(); break;
    case 'features': main.innerHTML = renderFeatures(); break;
    case 'contact': main.innerHTML = renderContact(); break;
    default: main.innerHTML = renderHome();
  }
}

function getDiscount(p) { return Math.round((1 - p.price / p.originalPrice) * 100); }

function renderProductCard(p, showBadge) {
  return `
    <div class="product-card">
      <div class="product-img-area" onclick="openProductModal(${p.id})">
        <img src="images/${p.image}" alt="${p.name}" onerror="this.style.display='none'">
        <span class="product-badge badge-discount">-${getDiscount(p)}%</span>
        ${showBadge && p.badge ? `<span class="product-badge badge-popular">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name" onclick="openProductModal(${p.id})">${p.name}</h3>
        <div class="product-bottom">
          <div class="product-prices">
            <span class="price-new">${p.price} ر.س</span>
            <span class="price-old">${p.originalPrice} ر.س</span>
          </div>
          <button class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderHome() {
  const popular = products.filter(p => p.popular);
  
  return `
    <!-- CAROUSEL -->
    <div class="carousel">
      ${carouselImgs.map(img => `<img src="images/${img}" alt="" onerror="this.style.display='none'">`).join('')}
      <div class="carousel-overlay">
        <h1 class="carousel-title" dir="ltr"><span style="color:#ff9500">i</span><span style="color:#fff">Boardz</span></h1>
        <p class="carousel-sub" dir="ltr">ARDUINO <span style="color:#ff9500;font-weight:700">FUTURE</span></p>
      </div>
      <button class="carousel-arrow prev" onclick="prevSlide()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <button class="carousel-arrow next" onclick="nextSlide()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="carousel-dots">
        ${carouselImgs.map((_, i) => `<button class="carousel-dot ${i === 0 ? 'active' : ''}" style="width:${i === 0 ? '28px' : '10px'}" onclick="goToSlide(${i})"></button>`).join('')}
      </div>
    </div>

    <!-- QUICK FEATURES -->
    <div class="quick-features">
      <div class="quick-features-inner">
        <div class="qf-item">
          <div class="qf-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <div>
            <h3>شحن سريع</h3>
            <p>توصيل لجميع مناطق المملكة</p>
          </div>
        </div>
        <div class="qf-item">
          <div class="qf-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          </div>
          <div>
            <h3>ضمان كامل</h3>
            <p>ضمان على جميع المنتجات</p>
          </div>
        </div>
        <div class="qf-item">
          <div class="qf-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
          </div>
          <div>
            <h3>دعم فني</h3>
            <p>+966 552 645 082</p>
          </div>
        </div>
      </div>
    </div>

    <!-- POPULAR -->
    <div class="section">
      <div class="text-center" style="margin-bottom:36px">
        <div class="section-label" style="display:inline-block">الأكثر مبيعاً</div>
        <h2 class="section-title">الأكثر رواجاً</h2>
        <p class="section-sub">المنتجات الأكثر طلباً من عملائنا</p>
      </div>
      <div class="products-grid">
        ${popular.map(p => renderProductCard(p, true)).join('')}
      </div>
      <div class="text-center" style="margin-top:36px">
        <button class="btn" onclick="navigate('products')">عرض جميع المنتجات</button>
      </div>
    </div>
  `;
}

function renderProducts() {
  const filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
  
  return `
    <div class="section">
      <div style="margin-bottom:32px">
        <h1 style="font-size:34px;font-weight:900;margin:0 0 4px">المنتجات</h1>
        <p style="color:#999;font-size:15px;margin:0">جميع الأسعار هي أسعار بعد الخصم</p>
      </div>

      <!-- FILTER -->
      <div class="filter-pills">
        ${categories.map(cat => `
          <button class="filter-pill ${currentFilter === cat.key ? 'active' : ''}" onclick="setFilter('${cat.key}')">
            ${cat.label}
          </button>
        `).join('')}
      </div>

      <!-- PRODUCTS -->
      <div class="products-grid">
        ${filtered.map(p => renderProductCard(p, true)).join('')}
      </div>
    </div>
  `;
}

function setFilter(key) {
  currentFilter = key;
  renderPage();
}

function renderFeatures() {
  return `
    <div class="section" style="max-width:1000px">
      <div class="text-center" style="margin-bottom:40px">
        <div class="section-label" style="display:inline-block">لماذا نحن؟</div>
        <h1 class="section-title">لماذا <span dir="ltr" style="display:inline-block">iBoardz</span>؟</h1>
        <p class="section-sub">مميزات تجعلنا الخيار الأول لعشاق الإلكترونيات</p>
      </div>

      <!-- FEATURES -->
      <div class="features-grid">
        ${featuresData.map((f, i) => `
          <div class="feature-card">
            <div class="feature-num">${i + 1}</div>
            <h3>${f.title}</h3>
            <p>${f.desc}</p>
          </div>
        `).join('')}
      </div>

      <!-- REVIEWS -->
      <div class="text-center" style="margin-bottom:32px">
        <h2 style="font-size:28px;font-weight:900;margin:0 0 6px">آراء عملائنا</h2>
        <p style="color:#999;font-size:15px">ماذا يقول عملاؤنا عن تجربتهم</p>
      </div>
      <div class="reviews-grid">
        ${reviews.map(r => `
          <div class="review-card">
            <div class="review-stars">
              ${[1,2,3,4,5].map(() => '<span>★</span>').join('')}
            </div>
            <p class="review-text">"${r.text}"</p>
            <div class="review-author">
              <div class="review-avatar">${r.name.charAt(0)}</div>
              <span class="review-name">${r.name}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderContact() {
  return `
    <div class="section" style="max-width:800px">
      <div class="text-center" style="margin-bottom:36px">
        <div class="section-label" style="display:inline-block">نحن هنا لمساعدتك</div>
        <h1 class="section-title">تواصل معنا</h1>
        <p class="section-sub">نرحب بتواصلك في أي وقت</p>
      </div>

      <!-- CONTACT CARDS -->
      <div class="contact-cards">
        <a href="https://wa.me/966552645082" target="_blank" class="contact-card whatsapp">
          <div class="contact-icon green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </div>
          <div>
            <h4>واتساب</h4>
            <p dir="ltr">+966 552 645 082</p>
          </div>
        </a>
        <a href="mailto:iBoardz@outlook.com" class="contact-card email">
          <div class="contact-icon blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>
          </div>
          <div>
            <h4>البريد الإلكتروني</h4>
            <p dir="ltr">iBoardz@outlook.com</p>
          </div>
        </a>
      </div>

      <!-- FORM -->
      <div class="contact-form">
        <h2>أرسل لنا رسالة</h2>
        <form onsubmit="event.preventDefault(); alert('تم إرسال رسالتك بنجاح!');">
          <div class="form-group">
            <label>الاسم</label>
            <input type="text" class="form-input" placeholder="اسمك الكامل">
          </div>
          <div class="form-group">
            <label>البريد الإلكتروني</label>
            <input type="email" class="form-input" placeholder="email@example.com" dir="ltr" style="text-align:right">
          </div>
          <div class="form-group">
            <label>الرسالة</label>
            <textarea rows="5" class="form-input" placeholder="اكتب رسالتك هنا..."></textarea>
          </div>
          <button type="submit" class="submit-btn">إرسال الرسالة</button>
        </form>
      </div>

      <!-- WORK HOURS -->
      <div class="work-hours">
        <h3>ساعات العمل</h3>
        <p>السبت - الخميس: 9 صباحاً - 11 مساءً</p>
        <p>الجمعة: 4 مساءً - 11 مساءً</p>
      </div>
    </div>
  `;
}
