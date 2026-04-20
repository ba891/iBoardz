// ==================== iBoardz - Main Script ====================

// ==================== DATA ====================
const PRODUCTS = [
  // المتحكمات الدقيقة
  { id:1, name:'ESP32', price:41, oldPrice:65, category:'microcontrollers', image:'images/esp32.png', description:'متكامل مع Wi-Fi و Bluetooth مدمج', specs:['معالج: Dual-core 240MHz','ذاكرة: 520KB SRAM','Wi-Fi: 802.11 b/g/n','Bluetooth: 4.2 + BLE','GPIO: 36 pin','Flash: 4MB'] },
  { id:2, name:'ESP32 DEV MODEL', price:39, oldPrice:60, category:'microcontrollers', image:'images/esp32-dev-model.png', description:'لوحة تطوير ESP32 كاملة', specs:['معالج: Dual-core 240MHz','ذاكرة: 520KB SRAM','USB: Type-C','GPIO: 36 pin','Flash: 4MB','مناسب للمشاريع المتقدمة'] },
  { id:3, name:'ARDUINO UNO R3', price:32, oldPrice:50, category:'microcontrollers', image:'images/arduino-uno-r3.png', description:'اللوحة الأشهر في عالم الأردوينو', specs:['معالج: ATmega328P','سرعة: 16MHz','ذاكرة Flash: 32KB','GPIO: 14 Digital + 6 Analog','USB: Type-B','مثالي للمبتدئين'] },
  { id:4, name:'ESP32 C3 MINI', price:29, oldPrice:45, category:'microcontrollers', image:'images/esp32-c3-mini.png', description:'نسخة مصغرة وعصرية من ESP32', specs:['معالج: RISC-V 160MHz','Wi-Fi + Bluetooth 5','حجم صغير جداً','Flash: 4MB','USB: Type-C','مثالي للمشاريع المدمجة'] },
  { id:5, name:'ESP8266 D1 BOARD', price:29, oldPrice:45, category:'microcontrollers', image:'images/esp8266-d1-board.png', description:'لوحة Wi-Fi اقتصادية', specs:['معالج: ESP8266 80MHz','Wi-Fi: 802.11 b/g/n','GPIO: 11 pin','Flash: 4MB','متوافق مع Arduino IDE','سعر اقتصادي'] },
  { id:6, name:'ESP32 D1 BOARD', price:39, oldPrice:60, category:'microcontrollers', image:'images/esp32-d1-board.png', description:'لوحة D1 محسّنة مع ESP32', specs:['معالج: Dual-core 240MHz','Wi-Fi + Bluetooth','GPIO: 30 pin','Flash: 4MB','تصميم D1 compatible','أداء ممتاز'] },
  // الحساسات
  { id:7, name:'MAX 30102', price:25, oldPrice:40, category:'sensors', image:'images/max-30102.png', description:'حساس نبضات القلب والأكسجين', specs:['نوع: Pulse Oximeter','قياس: SpO2 + نبض','واجهة: I2C','جهد: 1.8V - 3.3V','LED: Red + IR','مثالي للمشاريع الطبية'] },
  { id:8, name:'HC-SR04 ULTRASONIC', price:18, oldPrice:28, category:'sensors', image:'images/hc-sr04-ultrasonic.png', description:'حساس الموجات فوق الصوتية لقياس المسافة', specs:['نطاق: 2cm - 400cm','دقة: 3mm','جهد: 5V DC','زمن الاستجابة: سريع','واجهة: Digital','مثالي للروبوتات'] },
  { id:9, name:'DHT11 SENSOR', price:16, oldPrice:25, category:'sensors', image:'images/dht11-sensor.png', description:'حساس الحرارة والرطوبة', specs:['حرارة: 0°C - 50°C','رطوبة: 20% - 90%','دقة: ±2°C','جهد: 3.3V - 5V','واجهة: Digital','استخدام سهل'] },
  { id:10, name:'CAPACITIVE MOISTURE SENSOR V2.0', price:20, oldPrice:32, category:'sensors', image:'images/capacitive-moisture-sensor-v2.png', description:'حساس رطوبة التربة السعوي', specs:['نوع: Capacitive','جهد: 3.3V - 5.5V','خرج: Analog','مقاوم للتآكل','عمر أطول','مثالي للزراعة الذكية'] },
  { id:11, name:'MPU6050 SENSOR', price:23, oldPrice:35, category:'sensors', image:'images/mpu6050-sensor.png', description:'حساس التسارع والجيروسكوب', specs:['مقياس تسارع: 3-axis','جيروسكوب: 3-axis','واجهة: I2C','جهد: 3.3V - 5V','دقة عالية','مثالي للطائرات والروبوتات'] },
  { id:12, name:'MATRIX KEYBOARD 3x4', price:14, oldPrice:22, category:'sensors', image:'images/matrix-keypad-3x4.png', description:'لوحة مفاتيح مصفوفية 3x4', specs:['نوع: 3x4 Matrix','عدد الأزرار: 12','واجهة: 7 pin','أزرار: 0-9 + * + #','سهل البرمجة','مناسب للمشاريع البسيطة'] },
  { id:13, name:'V2.0 CAPACITIVE SOIL MOISTURE', price:19, oldPrice:30, category:'sensors', image:'images/capacitive-soil-moisture-v2.png', description:'حساس رطوبة التربة السعوي V2.0', specs:['إصدار: V2.0 محسّن','نوع: Capacitive','جهد: 3.3V - 5.5V','خرج: Analog','مقاوم للتآكل','دقة أعلى'] },
  { id:14, name:'WATER PUMP', price:21, oldPrice:33, category:'sensors', image:'images/water-pump.png', description:'مضخة مياه صغيرة للمشاريع', specs:['جهد: 3V - 6V','تدفق: 80-120 L/H','ارتفاع: 40-110cm','حجم صغير','استهلاك طاقة منخفض','مثالي للزراعة الذكية'] },
  { id:15, name:'SERVO MOTOR', price:16, oldPrice:25, category:'sensors', image:'images/servo-motor.png', description:'محرك سيرفو للتحكم بالزاوية', specs:['زاوية: 0° - 180°','عزم: 1.8 kg/cm','جهد: 4.8V - 6V','سرعة: 0.1s/60°','وزن: 9g','مثالي للروبوتات'] },
  { id:16, name:'MATRIX KEYBOARD 4x4', price:19, oldPrice:30, category:'sensors', image:'images/matrix-keypad-4x4.png', description:'لوحة مفاتيح مصفوفية 4x4', specs:['نوع: 4x4 Matrix','عدد الأزرار: 16','واجهة: 8 pin','أزرار: 0-9 + A-D + * + #','مناسب للمشاريع المعقدة','جودة عالية'] },
  { id:17, name:'TDS METER V1.0', price:39, oldPrice:58, category:'sensors', image:'images/tds-meter-v1.png', description:'حساس قياس نقاء الماء', specs:['قياس: TDS','نطاق: 0 - 1000 ppm','جهد: 3.3V - 5V','خرج: Analog','مثالي لمشاريع الماء','دقة عالية'] },
  { id:18, name:'AHT20 + BMP280', price:22, oldPrice:35, category:'sensors', image:'images/aht20-bmp280.png', description:'حساس حرارة ورطوبة وضغط جوي مدمج', specs:['AHT20: حرارة + رطوبة','BMP280: ضغط جوي','واجهة: I2C','جهد: 3.3V - 5V','دقة عالية جداً','مثالي لمحطات الطقس'] },
  { id:19, name:'L298N MOTOR DRIVER', price:19, oldPrice:30, category:'sensors', image:'images/l298n-motor-driver.png', description:'دريف محرك ثنائي لتحريك محركات DC', specs:['عدد المحركات: 2','جهد: 5V - 35V','تيار: 2A لكل محرك','تحكم باتجاه وسرعة','حماية من الحرارة','مثالي للسيارات والروبوتات'] },
  { id:20, name:'MICRO SD CARD READER', price:16, oldPrice:25, category:'sensors', image:'images/micro-sd-card-reader.png', description:'وحدة قراءة بطاقات SD', specs:['دعم: Micro SD','واجهة: SPI','جهد: 3.3V - 5V','سرعة قراءة عالية','حجم صغير','مثالي لتخزين البيانات'] },
  { id:21, name:'DS18B20 SENSOR', price:18, oldPrice:28, category:'sensors', image:'images/ds18b20-sensor.png', description:'حساس حرارة رقمي عالي الدقة', specs:['نطاق: -55°C to +125°C','دقة: ±0.5°C','واجهة: 1-Wire','جهد: 3.0V - 5.5V','مقاوم للماء','مثالي للمشاريع الخارجية'] },
  { id:22, name:'JUMPER WIRE', price:11, oldPrice:18, category:'sensors', image:'images/jumper-wire.png', description:'أسلاك توصيل متنوعة', specs:['نوع: Male-Male + Male-Female','عدد: 40 سلك','أطوال متنوعة','جودة عالية','ألوان متعددة للتمييز','أساسية لأي مشروع'] },
  { id:23, name:'ACS712 30A RANGE', price:30, oldPrice:48, category:'sensors', image:'images/acs712-30a.png', description:'حساس تيار كهربائي حتى 30 أمبير', specs:['نطاق: ±30A','حساسية: 66mV/A','جهد: 5V','خرج: Analog','عزل كهربائي كامل','مثالي لمشاريع الطاقة'] },
  { id:24, name:'JOYSTICK', price:10, oldPrice:16, category:'sensors', image:'images/joystick.png', description:'جويستيك للتحكم باتجاهين', specs:['محاور: X + Y','زر: مضمن','خرج: Analog','جهد: 3.3V - 5V','سهل الاستخدام','مثالي للألعاب والتحكم'] },
  { id:25, name:'RELAY MODULE HIGH 5V', price:13, oldPrice:20, category:'sensors', image:'images/relay-module-5v.png', description:'موديول ريلي 5V للتحكم بالأحمال', specs:['جهد: 5V','تيار: 10A','قنوات: 1','تحكم: Digital','عزل كهربائي','مثالي للتحكم بالأجهزة'] },
  // الشاشات
  { id:26, name:'SH1107 OLED DISPLAY', price:109, oldPrice:160, category:'displays', image:'images/sh1107-oled-display.png', description:'شاشة OLED عالية الدقة', specs:['دقة: 128x64','واجهة: I2C','لون: أبيض وأزرق','جهد: 3.3V - 5V','تباين عالي','مثالية لعرض البيانات'] },
  { id:27, name:'LCD 1602 WITH I2C', price:27, oldPrice:42, category:'displays', image:'images/lcd-1602-i2c.png', description:'شاشة LCD 1602 مع واجهة I2C', specs:['دقة: 16x2 حرف','واجهة: I2C','إضاءة: خلفية زرقاء','جهد: 5V','سهلة البرمجة','الأكثر استخداماً'] },
  { id:28, name:'SH1107 OLED SCREEN', price:109, oldPrice:160, category:'displays', image:'images/sh1107-oled-screen.png', description:'شاشة SH1107 OLED احترافية', specs:['دقة: 128x64','واجهة: I2C','مقاس: 1.3 بوصة','جهد: 3.3V - 5V','جودة عرض ممتازة','مناسبة للمشاريع المتقدمة'] },
];

const CATEGORIES = [
  { key:'all', label:'الكل' },
  { key:'microcontrollers', label:'المتحكمات الدقيقة' },
  { key:'sensors', label:'الحساسات' },
  { key:'displays', label:'الشاشات' },
];

const POPULAR_IDS = [3,1,9,8,2,15,26,25];

const REVIEWS = [
  { name:'mr.stornyt', stars:5, text:'جاني المستشعرات وكل الجهاز مع بعض مغلف كويس وشرح لي كل التفاصيل، أنصحكم تتعاملون معه.' },
  { name:'mr.stornyt', stars:5, text:'تعاملت معه لأنه كان عندي هاكاثون ومشروع يبيله برمجة ومستشعرات طبية وشغلات كثيرة، ما قصّر أبداً اشتغل من ذمّته وهو وفّر كل القطع وبرمجها لي، وبرضو كان يجاوب على أسئلتي وكل ما أعطيه يضيف شيء إضافي للمشروع وشرح لي بذمّة وضمير، الله يجزاه خير أنصحكم فيه.' },
  { name:'عميل', stars:5, text:'شغله ما شاء الله رهيب.' },
  { name:'m.ddddi', stars:5, text:'صراحة الرجال متعاون جداً وشغله مضمون، سويت عنده مشروع تخرج أردوينو وما قصّر معي في شيء، أنصح بالتعامل معه.' },
  { name:'عضو #15049', stars:5, text:'بصراحة أنصح بالتعامل معه، الرجال خدوم في أيام قليلة وخلص المشروع.' },
  { name:'أحمد هاني آل عمير', stars:5, text:'الرجال واجد طيب وتعامله راقي، يستاهل 10/10 وفنّان في المشاريع.' },
  { name:'store_nawaf', stars:5, text:'الرجال ما قصّر، كان عندي مشروع حاولت تشغيله أكثر من مرّة وجا الرجال وعطاني الكود البرمجي واشتغل معي الحمد لله.' },
];

const FEATURES = [
  { icon:'trophy', title:'جودة عالية', desc:'جميع منتجاتنا أصلية ومعتمدة', color:'#eab308' },
  { icon:'wallet', title:'أسعار تنافسية', desc:'أفضل الأسعار في السوق مع خصومات مستمرة', color:'#22c55e' },
  { icon:'truck', title:'شحن سريع', desc:'توصيل سريع لجميع مناطق المملكة', color:'#3b82f6' },
  { icon:'headphones', title:'دعم فني متواصل', desc:'فريق دعم متخصص متاح على مدار الساعة', color:'#a855f7' },
  { icon:'shield', title:'ضمان كامل', desc:'ضمان على جميع المنتجات', color:'#14b8a6' },
  { icon:'book', title:'موارد تعليمية', desc:'شروحات وأكواد جاهزة لكل منتج', color:'#ef4444' },
];

const GRADIENTS = {
  microcontrollers: ['grad-mc1','grad-mc2','grad-mc3'],
  sensors: ['grad-sn1','grad-sn2','grad-sn3'],
  displays: ['grad-dp1','grad-dp2','grad-dp3'],
};

// ==================== STATE ====================
let currentPage = 'home';
let currentFilter = 'all';
let carouselIdx = 0;
let cart = [];
let menuOpen = false;
let toastTimeout = null;

// Load cart from localStorage
try {
  const saved = localStorage.getItem('iboardz_cart');
  if (saved) cart = JSON.parse(saved);
} catch(e) {}

// ==================== NAVIGATION ====================
function navigate(page) {
  currentPage = page;
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });
  // Close mobile menu
  closeMenu();
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Render products if on products page
  if (page === 'products') renderProducts();
  if (page === 'features') renderFeatures();
}

function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById('mobile-menu').classList.toggle('hidden', !menuOpen);
}
function closeMenu() {
  menuOpen = false;
  document.getElementById('mobile-menu').classList.add('hidden');
}

// ==================== CAROUSEL ====================
function updateCarousel() {
  const img = document.getElementById('carousel-img');
  const placeholder = document.querySelector('.carousel-placeholder');
  const src = carouselIdx === 0 ? 'images/add.png' : 'images/add1.png';
  
  const testImg = new Image();
  testImg.onload = function() {
    img.src = src;
    img.classList.remove('hidden');
    placeholder.style.opacity = '0';
  };
  testImg.onerror = function() {
    img.classList.add('hidden');
    placeholder.style.opacity = '1';
  };
  testImg.src = src;
  
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === carouselIdx);
  });
}

function nextSlide() { carouselIdx = (carouselIdx + 1) % 2; updateCarousel(); }
function prevSlide() { carouselIdx = (carouselIdx - 1 + 2) % 2; updateCarousel(); }

// Auto-advance carousel
setInterval(nextSlide, 4000);

// ==================== PRODUCT RENDERING ====================
function getDiscount(old, cur) {
  return Math.round((1 - cur / old) * 100);
}

function getGradient(category, idx) {
  const grads = GRADIENTS[category] || GRADIENTS.sensors;
  return grads[idx % grads.length];
}

function renderProductCard(product, idx) {
  const disc = getDiscount(product.oldPrice, product.price);
  const grad = getGradient(product.category, idx);
  const catLabel = CATEGORIES.find(c => c.key === product.category)?.label || '';
  
  return `
    <div class="product-card">
      <div class="product-image-wrap no-img ${grad}" onclick="openModal(${product.id})">
        <img src="${product.image}" alt="${product.name}"
          onerror="this.style.display='none'; this.parentElement.classList.remove('has-img'); this.parentElement.classList.add('no-img','${grad}');"
          onload="this.parentElement.classList.remove('no-img'); this.parentElement.classList.add('has-img'); this.parentElement.className='product-image-wrap has-img';"
          style="width:100%;height:100%;object-fit:contain;padding:16px;">
        <span class="discount-badge">-${disc}%</span>
      </div>
      <div class="product-info">
        <div class="product-name" onclick="openModal(${product.id})">${product.name}</div>
        <div class="product-price-row">
          <span class="product-price">${product.price}</span>
          <span class="product-currency">ر.س</span>
          <span class="product-old-price">${product.oldPrice}</span>
        </div>
        <button class="add-btn" onclick="addToCart(${product.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          أضف للسلة
        </button>
      </div>
    </div>
  `;
}

function renderPopularProducts() {
  const grid = document.getElementById('popular-grid');
  const products = PRODUCTS.filter(p => POPULAR_IDS.includes(p.id));
  grid.innerHTML = products.map((p, i) => renderProductCard(p, i)).join('');
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const noProducts = document.getElementById('no-products');
  const filtered = currentFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === currentFilter);
  
  grid.innerHTML = filtered.map((p, i) => renderProductCard(p, i)).join('');
  noProducts.classList.toggle('hidden', filtered.length > 0);
}

function renderFilters() {
  const container = document.getElementById('filters');
  container.innerHTML = CATEGORIES.map(c =>
    `<button class="filter-btn ${c.key === currentFilter ? 'active' : ''}" onclick="setFilter('${c.key}')">${c.label}</button>`
  ).join('');
}

function setFilter(key) {
  currentFilter = key;
  renderFilters();
  renderProducts();
}

// ==================== FEATURES & REVIEWS ====================
function renderFeatures() {
  const grid = document.getElementById('features-grid');
  grid.innerHTML = FEATURES.map(f => `
    <div class="feature-card">
      <div class="feature-icon" style="color:${f.color}">
        ${getFeatureIcon(f.icon)}
      </div>
      <div class="feature-title">${f.title}</div>
      <div class="feature-desc">${f.desc}</div>
    </div>
  `).join('');
  
  const reviewsGrid = document.getElementById('reviews-grid');
  reviewsGrid.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${r.name.charAt(0)}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-stars">
            ${Array(r.stars).fill('<svg viewBox="0 0 24 24" fill="#ff9500" class="review-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>').join('')}
          </div>
        </div>
      </div>
      <p class="review-text">${r.text}</p>
    </div>
  `).join('');
}

function getFeatureIcon(name) {
  const icons = {
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:32px;height:32px;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:32px;height:32px;"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/><circle cx="16" cy="14" r="1"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:32px;height:32px;"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    headphones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:32px;height:32px;"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:32px;height:32px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:32px;height:32px;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  };
  return icons[name] || '';
}

// ==================== MODAL ====================
function openModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  
  const disc = getDiscount(p.oldPrice, p.price);
  const catLabel = CATEGORIES.find(c => c.key === p.category)?.label || '';
  const grad = getGradient(p.category, 0);
  
  document.getElementById('modal-image').innerHTML = `
    <img src="${p.image}" alt="${p.name}" style="width:128px;height:128px;object-fit:contain;"
      onerror="this.style.display='none'; this.parentElement.classList.add('${grad}'); this.parentElement.style.width='50%';">
  `;
  document.getElementById('modal-category').textContent = catLabel;
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-desc').textContent = p.description;
  document.getElementById('modal-price').textContent = p.price;
  document.getElementById('modal-old-price').textContent = p.oldPrice + ' ر.س';
  document.getElementById('modal-discount').textContent = '-' + disc + '%';
  document.getElementById('modal-saved').innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;"><polyline points="20 6 9 17 4 12"/></svg>
    وفّرت ${p.oldPrice - p.price} ر.س
  `;
  document.getElementById('modal-specs').innerHTML = p.specs.map(s => `<li>${s}</li>`).join('');
  
  const addBtn = document.getElementById('modal-add-btn');
  addBtn.onclick = function() { addToCart(p.id); closeModal(); };
  
  document.getElementById('product-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('product-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// ==================== CART ====================
function addToCart(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  
  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  
  saveCart();
  updateCartCount();
  showToast(p.name);
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  saveCart();
  updateCartCount();
  renderCart();
}

function updateQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartCount();
  renderCart();
}

function saveCart() {
  try { localStorage.setItem('iboardz_cart', JSON.stringify(cart)); } catch(e) {}
}

function updateCartCount() {
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  const badge = document.getElementById('cart-count');
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

function getCartTotal() {
  return cart.reduce((sum, c) => {
    const p = PRODUCTS.find(x => x.id === c.id);
    return sum + (p ? p.price * c.qty : 0);
  }, 0);
}

function getCartSaved() {
  return cart.reduce((sum, c) => {
    const p = PRODUCTS.find(x => x.id === c.id);
    return sum + (p ? (p.oldPrice - p.price) * c.qty : 0);
  }, 0);
}

function renderCart() {
  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');
  
  if (cart.length === 0) {
    itemsEl.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    footerEl.classList.add('hidden');
    return;
  }
  
  itemsEl.classList.remove('hidden');
  emptyEl.classList.add('hidden');
  footerEl.classList.remove('hidden');
  
  itemsEl.innerHTML = cart.map(c => {
    const p = PRODUCTS.find(x => x.id === c.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${p.image}" alt="${p.name}" onerror="this.style.display='none';">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price-row">
            <span class="cart-item-price">${p.price} ر.س</span>
            <span class="cart-item-old">${p.oldPrice}</span>
          </div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateQty(${c.id}, -1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <span class="cart-item-qty">${c.qty}</span>
            <button class="qty-btn" onclick="updateQty(${c.id}, 1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <button class="cart-item-delete" onclick="removeFromCart(${c.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  const total = getCartTotal();
  const saved = getCartSaved();
  
  document.getElementById('cart-total').textContent = total + ' ر.س';
  
  const savedEl = document.getElementById('cart-saved');
  if (saved > 0) {
    savedEl.textContent = 'وفّرت ' + saved + ' ر.س بفضل الخصومات!';
    savedEl.classList.remove('hidden');
  } else {
    savedEl.classList.add('hidden');
  }
  
  // WhatsApp link
  const msg = 'مرحباً، أريد طلب:\n' + cart.map(c => {
    const p = PRODUCTS.find(x => x.id === c.id);
    return p ? '- ' + p.name + ' x' + c.qty + ' = ' + (p.price * c.qty) + ' ر.س' : '';
  }).join('\n') + '\nالمجموع: ' + total + ' ر.س';
  
  document.getElementById('whatsapp-link').href = 'https://wa.me/966552645082?text=' + encodeURIComponent(msg);
}

function openCart() {
  document.getElementById('cart-sidebar').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.add('hidden');
  document.body.style.overflow = '';
}

// ==================== TOAST ====================
function showToast(name) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-name').textContent = name;
  toast.classList.remove('hidden');
  
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}

// ==================== INIT ====================
function init() {
  // Nav button listeners
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.page));
  });
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.page));
  });
  
  // Carousel dot listeners
  document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      carouselIdx = parseInt(dot.dataset.idx);
      updateCarousel();
    });
  });
  
  // Initial renders
  updateCarousel();
  renderPopularProducts();
  renderFilters();
  renderFeatures();
  updateCartCount();
  
  // Check URL hash
  const hash = window.location.hash.replace('#', '');
  if (['home','products','features','contact'].includes(hash)) {
    navigate(hash);
  }
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
