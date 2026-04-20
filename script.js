// ==================== DATA ====================
const products = [
  // MICROCONTROLLERS
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
  { id:25, name:'RELAY MODULE HIGH 5V', price:13, originalPrice:20, category:'sensors', image:'relay-module-5v.png', specs:['4 قنوات','جهد 5V','حمولة 10A/250VAC','عزل ضوئي','LED مؤشر'], description:'موديول ريليه 4 قنوات للتحكم بالأحمال', popular:true, badge:'الأكثر طلباً' },
  // DISPLAYS
  { id:26, name:'SH1107 OLED DISPLAY', price:109, originalPrice:160, category:'displays', image:'sh1107-oled-display.png', specs:['شاشة OLED 1.3"','دقة 128×64','I2C Interface','تباين عالي جداً','استهلاك منخفض'], description:'شاشة OLED 1.3 بوصة عالية الجودة للمشاريع', popular:true, badge:'مميز' },
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

const features = [
  { title:'جودة عالية', desc:'جميع منتجاتنا أصلية ومضمونة' },
  { title:'أسعار تنافسية', desc:'أفضل الأسعار في السوق السعودي' },
  { title:'شحن سريع', desc:'توصيل سريع لجميع مناطق المملكة' },
  { title:'دعم فني 24/7', desc:'فريق دعم متخصص على مدار الساعة' },
  { title:'ضمان كامل', desc:'ضمان على جميع المنتجات' },
  { title:'موارد تعليمية', desc:'شروحات وأكواد جاهزة لكل منتج' },
];

const navItems = [
  { key:'home', label:'الرئيسية', icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
  { key:'products', label:'المنتجات', icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' },
  { key:'features', label:'المميزات', icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
  { key:'contact', label:'تواصل معنا', icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>' },
];

// ==================== STATE ====================
let state = {
  page: 'home',
  menuOpen: false,
  cartOpen: false,
  cart: [],
  filter: 'all',
  carouselIdx: 0,
  selectedProduct: null,
};

// ==================== HELPERS ====================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const discount = (p) => Math.round((1 - p.price / p.originalPrice) * 100);
const totalItems = () => state.cart.reduce((s, i) => s + i.qty, 0);
const totalPrice = () => state.cart.reduce((s, i) => s + i.product.price * i.qty, 0);
const totalSaved = () => state.cart.reduce((s, i) => s + (i.product.originalPrice - i.product.price) * i.qty, 0);
const totalOriginal = () => state.cart.reduce((s, i) => s + i.product.originalPrice * i.qty, 0);

function saveCart() {
  try { localStorage.setItem('iboardz-cart', JSON.stringify(state.cart)); } catch(e) {}
}
function loadCart() {
  try {
    const saved = localStorage.getItem('iboardz-cart');
    if (saved) state.cart = JSON.parse(saved);
  } catch(e) {}
}

function navigate(page) {
  state.page = page;
  state.menuOpen = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

function addToCart(product) {
  const existing = state.cart.find(i => i.product.id === product.id);
  if (existing) { existing.qty++; }
  else { state.cart.push({ product, qty: 1 }); }
  saveCart();
  state.cartOpen = true;
  render();
  setTimeout(() => { if (state.cartOpen) { state.cartOpen = false; render(); } }, 2000);
}

function removeFromCart(id) {
  state.cart = state.cart.filter(i => i.product.id !== id);
  saveCart(); render();
}

function updateQty(id, delta) {
  const item = state.cart.find(i => i.product.id === id);
  if (item) { item.qty = Math.max(1, item.qty + delta); saveCart(); render(); }
}

function getFilteredProducts() {
  return state.filter === 'all' ? products : products.filter(p => p.category === state.filter);
}

function getPopularProducts() {
  return products.filter(p => p.popular);
}

// ==================== SVG ICONS ====================
const icons = {
  cart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
  menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  x: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  minus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  trash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
  chevR: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
  chevL: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
  phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
  envelope: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>',
  whatsapp: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
  truck: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  shield: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  headset: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>',
  box: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
};

// ==================== RENDER FUNCTIONS ====================

function renderHeader() {
  const ti = totalItems();
  return `
    <header class="header">
      <div class="logo" onclick="navigate('home')">
        <div class="logo-text">
          <span class="i">i</span><span class="boardz">Boardz</span>
        </div>
        <img class="logo-img" src="images/logo.png" alt="iBoardz"
          onload="this.style.display='block'; this.previousElementSibling.style.display='none';"
          onerror="this.style.display='none';">
      </div>
      <div class="header-actions">
        <button class="menu-btn" onclick="state.menuOpen=!state.menuOpen; render();">
          ${icons.menu}
        </button>
        <button class="cart-btn" onclick="state.cartOpen=true; render();">
          ${icons.cart}
          ${ti > 0 ? `<span class="cart-badge">${ti}</span>` : ''}
        </button>
      </div>
    </header>
  `;
}

function renderDropdown() {
  if (!state.menuOpen) return '';
  return `
    <div class="dropdown-menu">
      ${navItems.map(item => `
        <button class="${state.page === item.key ? 'active' : ''}"
          onclick="navigate('${item.key}')">
          ${item.icon} ${item.label}
        </button>
      `).join('')}
    </div>
  `;
}

function renderCart() {
  const items = state.cart;
  const ti = totalItems();
  const tp = totalPrice();
  const ts = totalSaved();
  const to = totalOriginal();
  const whatsappText = encodeURIComponent(
    'مرحباً، أريد طلب:\n' +
    items.map(i => `${i.product.name} × ${i.qty} = ${i.product.price * i.qty} ر.س`).join('\n') +
    '\nالمجموع: ' + tp + ' ر.س'
  );

  return `
    <div class="cart-overlay ${state.cartOpen ? 'open' : ''}">
      <div class="cart-backdrop" onclick="state.cartOpen=false; render();"></div>
      <div class="cart-panel">
        <div class="cart-header">
          <h2>سلة التسوق (${ti})</h2>
          <button class="cart-close" onclick="state.cartOpen=false; render();">${icons.x}</button>
        </div>
        <div class="cart-body">
          ${items.length === 0 ? `
            <div class="cart-empty">
              ${icons.box}
              <p style="font-size:16px; margin-top:12px;">السلة فارغة</p>
              <p style="font-size:13px;">أضف منتجات للبدء</p>
            </div>
          ` : items.map(item => `
            <div class="cart-item">
              <div class="cart-item-img">
                <img src="images/${item.product.image}" alt=""
                  onerror="this.style.display='none';">
              </div>
              <div class="cart-item-info">
                <div class="cart-item-name">${item.product.name}</div>
                <div class="cart-item-prices">
                  <span class="price" style="font-size:15px;">${item.product.price} ر.س</span>
                  <span class="old-price">${item.product.originalPrice} ر.س</span>
                </div>
              </div>
              <div class="cart-qty-controls">
                <button class="qty-btn" onclick="updateQty(${item.product.id}, -1)">${icons.minus}</button>
                <span style="font-weight:800; min-width:20px; text-align:center; font-size:15px;">${item.qty}</span>
                <button class="qty-btn" onclick="updateQty(${item.product.id}, 1)">${icons.plus}</button>
                <button class="cart-remove" onclick="removeFromCart(${item.product.id})">${icons.trash}</button>
              </div>
            </div>
          `).join('')}
        </div>
        ${items.length > 0 ? `
          <div class="cart-footer">
            <div class="cart-totals">
              <div class="cart-total-row original">
                <span class="cart-total-label">الإجمالي قبل الخصم:</span>
                <span class="cart-total-old">${to} ر.س</span>
              </div>
              <div class="cart-total-row discounted">
                <span class="cart-total-label">الإجمالي بعد الخصم:</span>
                <span class="cart-total-new">${tp} ر.س</span>
              </div>
              ${ts > 0 ? `
                <div class="cart-savings-badge">
                  <span style="font-size:18px;">🎉</span>
                  <span class="savings-text">وفّرت ${ts} ر.س</span>
                </div>
              ` : ''}
            </div>
            <a href="https://wa.me/966552645082?text=${whatsappText}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
              ${icons.whatsapp} اطلب عبر واتساب
            </a>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderProductModal() {
  const p = state.selectedProduct;
  if (!p) return '';
  const cat = categories.find(c => c.key === p.category);
  return `
    <div class="modal-overlay">
      <div class="modal-backdrop" onclick="state.selectedProduct=null; render();"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="state.selectedProduct=null; render();">${icons.x}</button>
        <div class="modal-img">
          <img src="images/${p.image}" alt="${p.name}" onerror="this.style.display='none';">
        </div>
        <div class="modal-body">
          <div class="modal-badges">
            <span class="badge badge-orange">${cat ? cat.label : ''}</span>
            ${p.badge ? `<span class="badge badge-red">${p.badge}</span>` : ''}
            <span class="badge badge-gray">-${discount(p)}%</span>
          </div>
          <h2 class="modal-title">${p.name}</h2>
          <p class="modal-desc">${p.description}</p>
          <div class="modal-prices">
            <span class="modal-new-price">${p.price} ر.س</span>
            <span class="modal-old-price">${p.originalPrice} ر.س</span>
          </div>
          <div class="modal-specs">
            <h3>المواصفات التقنية:</h3>
            ${p.specs.map(spec => `
              <div class="spec-item">
                <div class="spec-dot"></div>
                <span class="spec-text">${spec}</span>
              </div>
            `).join('')}
          </div>
          <button class="modal-add-btn" onclick="addToCart(products.find(x=>x.id===${p.id})); state.selectedProduct=null; render();">
            أضف إلى السلة ${icons.plus}
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderHome() {
  const popular = getPopularProducts();
  const carouselImgs = ['add.png', 'add1.png'];

  return `
    <!-- HERO CAROUSEL -->
    <div class="carousel" id="carousel">
      ${carouselImgs.map((img, i) => `
        <img src="images/${img}" alt="" style="opacity:${state.carouselIdx === i ? 1 : 0};"
          onerror="this.style.display='none';">
      `).join('')}
      <div class="carousel-overlay">
        <h1 class="carousel-title">
          <span class="i">i</span><span class="boardz">Boardz</span>
        </h1>
        <p class="carousel-subtitle">
          ARDUINO <span class="future">FUTURE</span>
        </p>
      </div>
      <button class="carousel-arrow prev" onclick="state.carouselIdx=(state.carouselIdx-1+2)%2; render();">${icons.chevR}</button>
      <button class="carousel-arrow next" onclick="state.carouselIdx=(state.carouselIdx+1)%2; render();">${icons.chevL}</button>
      <div class="carousel-dots">
        ${carouselImgs.map((_, i) => `
          <button class="carousel-dot ${state.carouselIdx === i ? 'active' : ''}"
            onclick="state.carouselIdx=${i}; render();"></button>
        `).join('')}
      </div>
    </div>

    <!-- QUICK FEATURES BAR -->
    <div class="quick-features">
      <div class="quick-features-inner">
        <div class="quick-feature">
          <div class="quick-feature-icon">${icons.truck}</div>
          <div><h3>شحن سريع</h3><p>توصيل لجميع مناطق المملكة</p></div>
        </div>
        <div class="quick-feature">
          <div class="quick-feature-icon">${icons.shield}</div>
          <div><h3>ضمان كامل</h3><p>ضمان على جميع المنتجات</p></div>
        </div>
        <div class="quick-feature">
          <div class="quick-feature-icon">${icons.headset}</div>
          <div><h3>دعم فني</h3><p>+966 552 645 082</p></div>
        </div>
      </div>
    </div>

    <!-- POPULAR PRODUCTS -->
    <div class="section">
      <div class="section-header">
        <div class="section-badge">الأكثر مبيعاً</div>
        <h2 class="section-title">الأكثر رواجاً</h2>
        <p class="section-subtitle">المنتجات الأكثر طلباً من عملائنا</p>
      </div>
      <div class="products-grid">
        ${popular.map(p => `
          <div class="product-card">
            <div class="product-img" onclick="state.selectedProduct=products.find(x=>x.id===${p.id}); render();">
              <img src="images/${p.image}" alt="${p.name}" onerror="this.style.display='none';">
              ${p.badge ? `<span class="product-badge badge-primary">${p.badge}</span>` : ''}
              <span class="discount-badge">-${discount(p)}%</span>
            </div>
            <div class="product-info">
              <h3 class="product-name" onclick="state.selectedProduct=products.find(x=>x.id===${p.id}); render();">${p.name}</h3>
              <div class="product-bottom">
                <div class="product-prices">
                  <span class="price">${p.price} ر.س</span>
                  <span class="old-price">${p.originalPrice} ر.س</span>
                </div>
                <button class="add-btn" onclick="addToCart(products.find(x=>x.id===${p.id}));">${icons.plus}</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="text-align:center; margin-top:36px;">
        <button class="show-all-btn" onclick="navigate('products')">عرض جميع المنتجات</button>
      </div>
    </div>
  `;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  return `
    <div class="section">
      <div style="margin-bottom:32px;">
        <h1 style="font-size:34px; font-weight:900; margin:0 0 4px;">المنتجات</h1>
        <p style="color:#999; font-size:15px; margin:0;">جميع الأسعار هي أسعار بعد الخصم</p>
      </div>
      <div class="filter-bar">
        ${categories.map(cat => `
          <button class="filter-btn ${state.filter === cat.key ? 'active' : ''}"
            onclick="state.filter='${cat.key}'; render();">${cat.label}</button>
        `).join('')}
      </div>
      <div class="products-grid-large">
        ${filtered.map(p => `
          <div class="product-card">
            <div class="product-img product-img-large" onclick="state.selectedProduct=products.find(x=>x.id===${p.id}); render();">
              <img src="images/${p.image}" alt="${p.name}" onerror="this.style.display='none';">
              <span class="discount-badge">-${discount(p)}%</span>
              ${p.badge ? `<span class="product-badge badge-primary">${p.badge}</span>` : ''}
            </div>
            <div class="product-info">
              <h3 class="product-name" onclick="state.selectedProduct=products.find(x=>x.id===${p.id}); render();">${p.name}</h3>
              <div class="product-bottom">
                <div class="product-prices">
                  <span class="price">${p.price} ر.س</span>
                  <span class="old-price">${p.originalPrice} ر.س</span>
                </div>
                <button class="add-btn" onclick="event.stopPropagation(); addToCart(products.find(x=>x.id===${p.id}));">${icons.plus}</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderFeatures() {
  return `
    <div class="section-narrow">
      <div class="section-header">
        <div class="section-badge">لماذا نحن؟</div>
        <h1 class="section-title">لماذا <span style="direction:ltr; display:inline-block;">iBoardz</span>؟</h1>
        <p class="section-subtitle">مميزات تجعلنا الخيار الأول لعشاق الإلكترونيات</p>
      </div>
      <div class="features-grid">
        ${features.map((f, i) => `
          <div class="feature-card">
            <div class="feature-num">${i + 1}</div>
            <h3>${f.title}</h3>
            <p>${f.desc}</p>
          </div>
        `).join('')}
      </div>
      <div class="section-header" style="margin-bottom:32px;">
        <h2 style="font-size:28px; font-weight:900; margin:0 0 6px;">آراء عملائنا</h2>
        <p style="color:#999; font-size:15px;">ماذا يقول عملاؤنا عن تجربتهم</p>
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
    <div class="section-contact">
      <div class="section-header">
        <div class="section-badge">نحن هنا لمساعدتك</div>
        <h1 class="section-title">تواصل معنا</h1>
        <p class="section-subtitle">نرحب بتواصلك في أي وقت</p>
      </div>
      <div class="contact-cards">
        <a href="https://wa.me/966552645082" target="_blank" rel="noopener noreferrer" class="contact-card whatsapp">
          <div class="contact-icon whatsapp-icon">${icons.phone}</div>
          <div>
            <div class="contact-label">واتساب</div>
            <div class="contact-value">+966 552 645 082</div>
          </div>
        </a>
        <a href="mailto:iBoardz@outlook.com" class="contact-card email">
          <div class="contact-icon email-icon">${icons.envelope}</div>
          <div>
            <div class="contact-label">البريد الإلكتروني</div>
            <div class="contact-value">iBoardz@outlook.com</div>
          </div>
        </a>
      </div>
      <div class="contact-form">
        <h2>أرسل لنا رسالة</h2>
        <form onsubmit="event.preventDefault();">
          <div class="form-group">
            <label>الاسم</label>
            <input type="text" class="form-input" placeholder="اسمك الكامل">
          </div>
          <div class="form-group">
            <label>البريد الإلكتروني</label>
            <input type="email" class="form-input" placeholder="email@example.com" style="direction:ltr; text-align:right;">
          </div>
          <div class="form-group">
            <label>الرسالة</label>
            <textarea rows="5" class="form-input" placeholder="اكتب رسالتك هنا..."></textarea>
          </div>
          <button type="submit" class="submit-btn">إرسال الرسالة</button>
        </form>
      </div>
      <div class="work-hours">
        <h3>ساعات العمل</h3>
        <p>السبت - الخميس: 9 صباحاً - 11 مساءً</p>
        <p style="margin-bottom:0;">الجمعة: 4 مساءً - 11 مساءً</p>
      </div>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-col">
            <div class="footer-logo">
              <span class="i">i</span><span class="boardz">Boardz</span>
            </div>
            <div class="footer-subtitle">
              ARDUINO <span class="future">FUTURE</span>
            </div>
            <p class="footer-desc">منصتك الأولى لمكونات الإلكترونيات والبرمجة في المملكة العربية السعودية</p>
          </div>
          <div class="footer-col">
            <h4>روابط سريعة</h4>
            <div class="footer-links">
              ${navItems.map(item => `
                <button onclick="navigate('${item.key}')">${item.label}</button>
              `).join('')}
            </div>
          </div>
          <div class="footer-col">
            <h4>تواصل معنا</h4>
            <div class="footer-contact">
              <p>واتساب: +966 552 645 082</p>
              <p>البريد: iBoardz@outlook.com</p>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2025 iBoardz</span> - جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  `;
}

// ==================== MAIN RENDER ====================
function render() {
  const app = document.getElementById('app');
  let pageContent = '';
  switch (state.page) {
    case 'home': pageContent = renderHome(); break;
    case 'products': pageContent = renderProducts(); break;
    case 'features': pageContent = renderFeatures(); break;
    case 'contact': pageContent = renderContact(); break;
  }

  app.innerHTML = `
    ${renderHeader()}
    ${renderDropdown()}
    ${renderCart()}
    ${renderProductModal()}
    <main class="main">${pageContent}</main>
    ${renderFooter()}
    ${state.menuOpen ? '<div style="position:fixed; inset:0; z-index:998;" onclick="state.menuOpen=false; render();"></div>' : ''}
  `;
}

// ==================== INIT ====================
function init() {
  loadCart();
  render();

  // Auto carousel
  setInterval(() => {
    state.carouselIdx = (state.carouselIdx + 1) % 2;
    const imgs = document.querySelectorAll('#carousel > img');
    const dots = document.querySelectorAll('.carousel-dot');
    imgs.forEach((img, i) => { img.style.opacity = state.carouselIdx === i ? 1 : 0; });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', state.carouselIdx === i);
    });
  }, 4000);

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (state.menuOpen && !e.target.closest('.dropdown-menu') && !e.target.closest('.menu-btn')) {
      state.menuOpen = false;
      render();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
