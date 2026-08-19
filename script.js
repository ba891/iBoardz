const App = {
  // ===== DATA =====
  products: [
    { id:2, name:'ESP32 DEV MODEL', price:39.75, op:60, cat:'mcu', img:'esp32-dev-model.png', specs:['واي فاي + بلوتوث','USB Type-C','340KB SRAM','48MHz processor','18 GPIO pin'], desc:'نسخة مطورة من ESP32 مع منفذ USB-C', pop:true, badge:'مميز' },
    { id:3, name:'ARDUINO UNO R3', price:32.75, op:50, cat:'mcu', img:'arduino-uno-r3.png', specs:['ATmega328P','16MHz clock','32KB Flash','14 Digital I/O','6 Analog Inputs'], desc:'المتحكم الأشهر في العالم، مثالي للمبتدئين', pop:true, badge:'الأكثر مبيعاً' },
    { id:4, name:'ESP32 C3 MINI', price:29.75, op:45, cat:'mcu', img:'esp32-c3-mini.png', specs:['RISC-V 160MHz','400KB SRAM','WiFi 4 + BT5','22 GPIO pin','حجم صغير جداً'], desc:'متحكم صغير الحجم بكفاءة عالية' },
    { id:5, name:'ESP8266 D1 BOARD', price:29.75, op:42, cat:'mcu', img:'esp8266-d1-board.png', specs:['ESP8266 WiFi','80MHz clock','11 GPIO pin','ADC مدمج','USB Micro'], desc:'لوحة تطوير اقتصادية مع واي فاي' },
    { id:6, name:'ESP32 D1 BOARD', price:39.75, op:58, cat:'mcu', img:'esp32-d1-board.png', specs:['ESP32 Dual Core','WiFi + BLE','30 GPIO pin','520KB SRAM','USB Type-C'], desc:'لوحة D1 المطورة مع ESP32', pop:true, badge:'مميز' },
    { id:7, name:'MAX 30102', price:25.75, op:40, cat:'sensor', img:'max-30102.png', specs:['مستشعر نبضات','IR + Red LED','I2C Interface','18-bit ADC','استهلاك منخفض'], desc:'مستشعر نبضات القلب والأكسجين في الدم' },
    { id:8, name:'HC-SR04 ULTRASONIC', price:18.75, op:28, cat:'sensor', img:'hc-sr04-ultrasonic.png', specs:['قياس مسافة 2-400cm','دقة 3mm','Trigger + Echo','جهد عمل 5V','زاوية 15°'], desc:'مستشعر الموجات فوق الصوتية لقياس المسافة', pop:true, badge:'الأكثر طلباً' },
    { id:9, name:'DHT11 SENSOR', price:16.75, op:25, cat:'sensor', img:'dht11-sensor.png', specs:['حرارة 0-50°C','رطوبة 20-90%','دقة ±2°C','Digital Output','جهد 3.3-5V'], desc:'مستشعر الحرارة والرطوبة', pop:true, badge:'الأكثر مبيعاً' },
    { id:10, name:'Capacitive Moisture Sensor V2.0', price:20.75, op:32, cat:'sensor', img:'capacitive-moisture-sensor-v2.png', specs:['قياس رطوبة التربة','Analog Output','مقاوم للتآكل','جهد 3.3-5V','طراز V2.0'], desc:'مستشعر رطوبة التربة السعوي' },
    { id:11, name:'MPU6050 SENSOR', price:23.75, op:36, cat:'sensor', img:'mpu6050-sensor.png', specs:['جيروسكوب 3 محاور','مقياس تسارع 3 محاور','I2C Interface','16-bit ADC','استهلاك منخفض'], desc:'مستشعر الحركة والتسارع' },
    { id:12, name:'MATRIX KEYBOARD 3x4', price:14.75, op:22, cat:'input', img:'matrix-keypad-3x4.png', specs:['12 مفتاح','3 صفوف × 4 أعمدة','Flexible Film','سهل التوصيل','استهلاك منخفض'], desc:'لوحة مفاتيح مرنة 3×4' },
    { id:14, name:'WATER PUMP', price:21.75, op:35, cat:'motor', img:'water-pump.png', specs:['جهد 3-6V','تدفق 80-120 L/H','مقاوم للتآكل','صغير الحجم','DC Motor'], desc:'مضخة مياه صغيرة للمشاريع' },
    { id:15, name:'SERVO MOTOR', price:16.75, op:25, cat:'motor', img:'servo-motor.png', specs:['زاوية 0-180°','عزم 1.8kg/cm','جهد 4.8-6V','PWM Control','SG90 Micro'], desc:'محرك سيرفو صغير للتحكم بالزاوية', pop:true, badge:'الأكثر مبيعاً' },
    { id:16, name:'MATRIX KEYBOARD 4x4', price:19.75, op:30, cat:'input', img:'matrix-keypad-4x4.png', specs:['16 مفتاح','4 صفوف × 4 أعمدة','Flexible Film','سهل التوصيل','استهلاك منخفض'], desc:'لوحة مفاتيح مرنة 4×4' },
    { id:17, name:'TDS METER V1.0', price:39.75, op:55, cat:'sensor', img:'tds-meter-v1.png', specs:['قياس TDS','Analog Output','جهد 3.3-5V','دقة ±10%','مقاوم للماء'], desc:'مستشعر قياس جودة الماء' },
    { id:18, name:'AHT20+BMP280', price:22.75, op:35, cat:'sensor', img:'aht20-bmp280.png', specs:['حرارة + رطوبة + ضغط','I2C Interface','دقة عالية','استهلاك منخفض','حجم صغير'], desc:'مستشعر حرارة ورطوبة وضغط جوي مدمج' },
    { id:19, name:'L298N MOTOR DRIVER', price:19.75, op:30, cat:'motor', img:'l298n-motor-driver.png', specs:['يتحكم بمحركين DC','جهد 5-35V','تيار 2A لكل محرك','PWM Control','حماية من الحرارة'], desc:'متحكم محركات DC و Stepper' },
    { id:20, name:'MICRO SD CARD READER', price:16.75, op:25, cat:'accessory', img:'micro-sd-card-reader.png', specs:['SPI Interface','يدعم SD/SDHC','جهد 3.3-5V','سرعة عالية','حجم صغير'], desc:'قارئ بطاقات Micro SD للمشاريع' },
    { id:21, name:'DS18B20 SENSOR', price:18.75, op:28, cat:'sensor', img:'ds18b20-sensor.png', specs:['حرارة -55°C إلى 125°C','1-Wire Interface','دقة ±0.5°C','مقاوم للماء','جهد 3-5.5V'], desc:'مستشعر حرارة رقمي مقاوم للماء' },
    { id:22, name:'JUMPER WIRES', price:11.75, op:18, cat:'accessory', img:'jumperwires.jpg', specs:['3 أنواع توصيل متوفرة','40 سلك لكل مجموعة','طول 20cm','جودة عالية ومقاومة للالتواء','يعمل مع جميع اللوحات'], desc:'أسلاك توصيل متنوعة لمشاريعك - اختر نوع التوصيل المناسب', colorOptions:['Male to Male','Male to Female','Female to Female'], optionLabel:'اختر نوع التوصيل:' },
    { id:23, name:'ACS712 30A RANGE', price:30.75, op:45, cat:'sensor', img:'acs712-30a.png', specs:['قياس تيار ±30A','Analog Output','دقة 66mV/A','جهد 5V','عزل كهربائي'], desc:'مستشعر التيار الكهربائي حتى 30 أمبير' },
    { id:24, name:'JOYSTICK', price:10.75, op:16, cat:'input', img:'joystick.png', specs:['محورين X/Y','زر ضغط','Analog Output','جهد 3.3-5V','سهل الاستخدام'], desc:'يد تحكم تناظرية للمشاريع' },
    { id:25, name:'RELAY MODULE HIGH 5V', price:13.75, op:20, cat:'motor', img:'relay-module-5v.png', specs:['4 قنوات','جهد 5V','حمولة 10A/250VAC','عزل ضوئي','LED مؤشر'], desc:'موديول ريليه 4 قنوات للتحكم بالأحمال', pop:true, badge:'الأكثر طلباً' },
    { id:26, name:'SH1107 OLED DISPLAY', price:109.75, op:160, cat:'display', img:'sh1107-oled-display.png', specs:['شاشة OLED 1.3"','دقة 128×64','I2C Interface','تباين عالي جداً','استهلاك منخفض'], desc:'شاشة OLED 1.3 بوصة عالية الجودة للمشاريع', pop:true, badge:'مميز' },
    { id:27, name:'LCD 1602 WITH I2C', price:27.75, op:40, cat:'display', img:'lcd-1602-i2c.png', specs:['16 حرف × 2 سطر','I2C Interface','إضاءة خلفية زرقاء','جهد 5V','تباين قابل للتعديل'], desc:'شاشة LCD مع واجهة I2C سهلة التوصيل' },
    { id:28, name:'SSD1306 OLED 0.96"', price:35.75, op:52, cat:'display', img:'ssd1306-oled-096.png', specs:['شاشة OLED 0.96"','دقة 128×64','I2C Interface','أبيض وأزرق','استهلاك منخفض جداً'], desc:'شاشة OLED صغيرة ومثالية للمشاريع' },
    { id:29, name:'LED صغيرة (جميع الألوان)', price:1.25, op:2, cat:'accessory', img:'led.png', specs:['ألوان متوفرة: أحمر، أخضر، أزرق، أصفر، أبيض','جهد 2-3V','تيار 20mA','قطر 5mm','اختر اللون من القائمة أعلاه'], desc:'LED صغيرة 5mm بجميع الألوان - اختر اللون المناسب لمشروعك', colorOptions:['أحمر','أخضر','أزرق','أصفر','أبيض'] },
    { id:30, name:'RAIN WATER LEVEL DETECTION SENSOR MODULE 3-5VDC', price:14.75, op:22, cat:'sensor', img:'rainsensor.jpg', specs:['جهد 3.3-5V','مخرج Analog + Digital','مقاوم للماء','لوحة حساسة للماء','مقارن LM393'], desc:'مستشعر كشف المطر ومستوى المياه' },
    { id:31, name:'DS1302 RTC Real Time Clock Module', price:17.75, op:25, cat:'accessory', img:'ds1302.jpg', specs:['RTC DS1302','واجهة SPI','بطارية احتياطية','حفظ الوقت وال تاريخ','جهد 3.3-5V'], desc:'وحدة الوقت الحقيقي RTC مع بطارية احتياطية' },
    { id:32, name:'Piezo Buzzer (جرس صوتي)', price:5.75, op:8, cat:'motor', img:'buzzer.jpg', specs:['جهد 3.5-5V','تردد 2300Hz','مستمر الصوت','حجم صغير','سهل التوصيل'], desc:'جرس بيزو كهربائي لإصدار صوت التنبيه في المشاريع' },
    { id:33, name:'TTP223 TOUCH SENSOR', price:5.75, op:9, cat:'sensor', img:'ttp223.jpeg', specs:['حساس لمس سعوي','جهد 2-5.5V','مخرج رقمي (HIGH عند اللمس)','يعمل مع Arduino و ESP32','حجم صغير وسهل التوصيل'], desc:'حساس لمس سعوي يكشف لمسة الإصبع بدون أي ضغط', pop:true },
  ],

  cats: [
    { key:'all', label:'الكل', icon:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>' },
    { key:'mcu', label:'المتحكمات الدقيقة', icon:'<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4"/><path d="M13 2v3M17 2v3M7 2v3M21 13h-3M21 17h-3M21 7h-3M3 13h3M3 17h3M3 7h3M13 22v-3M17 22v-3M7 22v-3"/>' },
    { key:'sensor', label:'الحساسات', icon:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>' },
    { key:'display', label:'الشاشات', icon:'<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>' },
    { key:'motor', label:'المحركات والمشغلات', icon:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' },
    { key:'input', label:'أدوات الإدخال', icon:'<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/>' },
    { key:'accessory', label:'الإكسسوارات والتوصيل', icon:'<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>' },
  ],

  reviews: [
    { text:'جاني المستشعرات وكل الجهاز مع بعض مغلف كويس وشرح لي كل التفاصيل، أنصحكم تتعاملون معه.', stars:5 },
    { text:'تعاملت معه لأنه كان عندي هاكاثون ومشروع يبيله برمجة ومستشعرات طبية وشغلات كثيرة، ما قصّر أبداً اشتغل من ذمّته وهو وفّر كل القطع وبرمجها لي، وكان يجاوب على أسئلتي وكل ما أعطيه يضيف شيء إضافي للمشروع وشرح لي بذمّة وضمير، الله يجزاه خير أنصحكم فيه.', stars:5 },
    { text:'شغله ما شاء الله رهيب.', stars:5 },
    { text:'صراحة الرجال متعاون جداً وشغله مضمون، سويت عنده مشروع تخرج أردوينو وما قصّر معي في شيء، أنصح بالتعامل معه.', stars:5 },
    { text:'بصراحة أنصح بالتعامل معه، الرجال خدوم في أيام قليلة وخلص المشروع.', stars:5 },
    { text:'الرجال واجد طيب وتعامله راقي، يستاهل 10/10 وفنّان في المشاريع.', stars:5 },
    { text:'الرجال ما قصّر، كان عندي مشروع حاولت تشغيله أكثر من مرّة وجا الرجال وعطاني الكود البرمجي واشتغل معي الحمد لله.', stars:5 },
    { text:'Perfect 👌🏼', stars:5 },
    { text:'ممتازه جداً', stars:5 },
    { text:'احترام يجيب بسرعه', stars:5 },
  ],

  features: [
    { title:'جودة عالية', desc:'جميع منتجاتنا أصلية ومضمونة' },
    { title:'أسعار تنافسية', desc:'أفضل الأسعار في السوق السعودي' },
    { title:'شحن سريع', desc:'توصيل سريع لجميع مناطق المملكة' },
    { title:'دعم فني 24/7', desc:'فريق دعم متخصص على مدار الساعة' },
    { title:'ضمان كامل', desc:'ضمان على جميع المنتجات' },
    { title:'موارد تعليمية', desc:'شروحات وأكواد جاهزة لكل منتج' },
  ],

  navItems: [
    { key:'home', label:'الرئيسية' },
    { key:'products', label:'المنتجات' },
    { key:'features', label:'المميزات' },
    { key:'contact', label:'تواصل معنا' },
    { key:'terms', label:'الشروط والأحكام' },
  ],

  icons: {
    home:'<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    box:'<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    envelope:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',
    truck:'<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    headset:'<path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>',
    phone:'<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>',
    whatsapp:'<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>',
  },

  avatarGradients: [
    'linear-gradient(135deg,#ff9500,#ffb14d)',
    'linear-gradient(135deg,#8b5cf6,#a78bfa)',
    'linear-gradient(135deg,#3b82f6,#60a5fa)',
    'linear-gradient(135deg,#ec4899,#f472b6)',
    'linear-gradient(135deg,#22c55e,#4ade80)',
    'linear-gradient(135deg,#f59e0b,#fbbf24)',
    'linear-gradient(135deg,#ef4444,#f87171)',
  ],

  reviewIcons: {
    thumbs:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>',
    project:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  },

  // ===== STATE =====
  state: { page:'home', menuOpen:false, cartOpen:false, cart:[], filter:'all', search:'', ci:0, selProd:null },
  carouselTimer: null,
  _bodyLockCount: 0,
  _revealObserver: null,
  _headerSearchOpen: false,
  _lastAdd: null,

  // ===== HELPERS =====
  disc(p) { return Math.round((1 - p.price / p.op) * 100); },

  totalItems() { return this.state.cart.reduce((s, i) => s + i.qty, 0); },

  totalPrice() { return this.state.cart.reduce((s, i) => s + i.product.price * i.qty, 0); },

  totalOriginal() { return this.state.cart.reduce((s, i) => s + i.product.op * i.qty, 0); },

  totalSaved() { return this.totalOriginal() - this.totalPrice(); },

  // ===== PERSISTENCE =====
  loadCart() {
    try { const s = localStorage.getItem('iboardz-cart'); if (s) this.state.cart = JSON.parse(s); } catch {}
  },

  saveCart() {
    try { localStorage.setItem('iboardz-cart', JSON.stringify(this.state.cart)); } catch {}
  },

  // ===== THEME =====
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

  // ===== NAVIGATION =====
  _navigateTo(page, opts = {}) {
    this.state.page = page; this.state.menuOpen = false; this.state.filter = 'all';
    if (!opts.preserveSearch) this.state.search = '';
    this.closeMenu();
    const main = document.getElementById('mainContent');
    main.style.opacity = '0'; main.style.transform = 'translateY(12px)';
    setTimeout(() => {
      this.render();
      requestAnimationFrame(() => {
        main.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        main.style.opacity = '1'; main.style.transform = 'translateY(0)';
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
    if (this.state.menuOpen) this.lockBody();
    else this.unlockBody();
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ===== BODY LOCK =====
  lockBody() {
    this._bodyLockCount++;
    if (this._bodyLockCount === 1) {
      document.body.style.overflow = 'hidden';
    }
  },

  unlockBody() {
    this._bodyLockCount = Math.max(0, this._bodyLockCount - 1);
    if (this._bodyLockCount === 0) {
      document.body.style.overflow = '';
    }
  },

  // ===== CART ACTIONS =====
  addCart(prod, color) {
    const key = prod.id + (color ? '|' + color : '');
    const now = Date.now();
    if (this._lastAdd && this._lastAdd.key === key && now - this._lastAdd.t < 600) return;
    this._lastAdd = { key, t: now };
    const ex = color
      ? this.state.cart.find(i => i.product.id === prod.id && i.color === color)
      : this.state.cart.find(i => i.product.id === prod.id);
    if (ex) {
      ex.qty++;
      this.showToast(`تم زيادة الكمية: ${prod.name} ×${ex.qty}`, 'success');
    } else {
      const item = { product: prod, qty: 1 };
      if (color) item.color = color;
      this.state.cart.push(item);
      this.showToast(`تمت الإضافة: ${prod.name}${color ? ' - ' + color : ''}`, 'success', true);
    }
    this.saveCart();
    this.updateBadge();
    this.renderCart();
  },

  addCartWithColor(id) {
    const prod = this.products.find(x => x.id === id);
    const sel = document.querySelector('input[name="prodOption"]:checked');
    const color = sel ? sel.value : null;
    if (prod.colorOptions && !color) {
      this.showToast('الرجاء اختيار اللون أولاً', 'error');
      return;
    }
    this.addCart(prod, color);
    this.closeModal();
  },

  removeCart(id) {
    this.state.cart = this.state.cart.filter(i => i.product.id !== id);
    this.saveCart();
    this.updateBadge();
    this.renderCart();
  },

  updQty(id, d) {
    const item = this.state.cart.find(i => i.product.id === id);
    if (item) item.qty = Math.max(1, item.qty + d);
    this.saveCart();
    this.renderCart();
  },

  updateBadge() {
    const b = document.getElementById('cartBadge');
    const t = this.totalItems();
    if (t > 0) { b.style.display = 'flex'; b.textContent = t; }
    else { b.style.display = 'none'; }
  },

  // ===== CONTACT =====
  handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const msg = document.getElementById('contactMsg').value.trim();
    if (!name || !msg) return;
    const text = encodeURIComponent(`الاسم: ${name}\nالبريد: ${email || 'غير مذكور'}\n\nالرسالة:\n${msg}`);
    const btn = document.getElementById('contactSubmitBtn');
    btn.textContent = 'جاري الإرسال...'; btn.disabled = true;
    window.open(`https://wa.me/966552645082?text=${text}`, '_blank');
    setTimeout(() => { btn.textContent = 'إرسال الرسالة'; btn.disabled = false; }, 2000);
    this.showToast('تم تحويلك إلى واتساب لإتمام الإرسال', 'info');
  },

  // ===== TOAST =====
  showToast(msg, type = 'success', showCartBtn = false) {
    const container = document.getElementById('toastContainer');
    [...container.querySelectorAll('.toast')].forEach(c => { if (c.dataset.msg === msg) c.remove(); });
    const el = document.createElement('div');
    el.dataset.msg = msg;
    el.className = `toast ${type}`;
    const icons = {
      success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
      error: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    };
    el.innerHTML = `${icons[type] || icons.success} ${msg}`;
    if (showCartBtn && this.state.cart.length > 0) {
      el.innerHTML += ` <button class="toast-cart-btn" onclick="App.openCart()">عرض السلة</button>`;
    }
    container.appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 3500);
  },

  // ===== MODAL =====
  showProduct(id) {
    this.state.selProd = this.products.find(p => p.id === id);
    this.renderModal();
    if (this.state.selProd) this.lockBody();
  },

  closeModal() {
    this.state.selProd = null;
    this.renderModal();
    this.unlockBody();
  },

  // ===== SEARCH =====
  headerSearch(v) {
    this.state.search = v.trim().toLowerCase();
    if (this.state.page === 'products') {
      this.renderMain();
      this.setupScrollReveal();
    } else {
      this._navigateTo('products', { preserveSearch: true });
    }
  },

  toggleHeaderSearch() {
    const el = document.getElementById('headerSearch');
    const inp = document.getElementById('headerSearchInput');
    if (window.innerWidth <= 768) {
      this._headerSearchOpen = !this._headerSearchOpen;
      el.classList.toggle('open', this._headerSearchOpen);
      if (this._headerSearchOpen) setTimeout(() => inp.focus(), 100);
      else inp.value = '';
    }
  },

  setSearch(v) {
    this.state.search = v.trim().toLowerCase();
    this.renderMain();
    this.setupScrollReveal();
  },

  setFilter(f) {
    this.state.filter = f;
    this.renderMain();
    this.setupScrollReveal();
  },

  // ===== RENDER =====
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

    overlay.className = 'cart-overlay' + (this.state.cartOpen ? ' open' : '');
    count.textContent = this.totalItems();

    if (this.state.cart.length === 0) {
      body.innerHTML = `<div class="cart-empty">${this.svgIcon(this.icons.box, 40, 'var(--text-muted,#ccc)')}<p style="font-size:16px;margin-top:12px">السلة فارغة</p><p style="font-size:13px">أضف منتجات للبدء</p></div>`;
      footer.style.display = 'none';
    } else {
      body.innerHTML = this.state.cart.map(item => `<div class="cart-item">
        <div class="cart-item-img">${this.imgTag(`images/${item.product.img}`, item.product.name, 40)}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.product.name}${item.color ? `<span class="cart-item-color"> - ${item.color}</span>` : ''}</div>
          <div class="cart-item-prices"><span class="price" style="font-size:15px">${item.product.price} ر.س</span><span class="old-price">${item.product.op} ر.س</span></div>
        </div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="App.updQty(${item.product.id},-1)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
          <span style="font-weight:800;min-width:20px;text-align:center;font-size:15px">${item.qty}</span>
          <button class="qty-btn" onclick="App.updQty(${item.product.id},1)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
          <button class="cart-remove" onclick="App.removeCart(${item.product.id})"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
        </div>
      </div>`).join('');

      const tp = this.totalPrice(), top2 = this.totalOriginal(), ts = this.totalSaved();
      const waText = encodeURIComponent('مرحباً، أريد طلب:\n' + this.state.cart.map(i => `${i.product.name}${i.color ? ' - ' + i.color : ''} × ${i.qty} = ${i.product.price * i.qty} ر.س`).join('\n') + '\nالمجموع: ' + tp + ' ر.س');

      footer.style.display = 'block';
      footer.innerHTML = `<div class="cart-totals">
        <div class="cart-total-row original"><span class="cart-total-label">الإجمالي قبل الخصم:</span><span class="cart-total-old">${top2} ر.س</span></div>
        <div class="cart-total-row discounted"><span class="cart-total-label">الإجمالي بعد الخصم:</span><span class="cart-total-new">${tp} ر.س</span></div>
        ${ts > 0 ? `<div class="cart-savings-badge"><span class="savings-icon">🎉</span><span class="savings-text">وفّرت ${ts} ر.س</span></div>` : ''}
      </div>
      <a href="https://wa.me/966552645082?text=${waText}" target="_blank" rel="noopener noreferrer"><button class="whatsapp-btn">${this.svgIcon(this.icons.whatsapp, 20, '#25D366', '#25D366')} اطلب عبر واتساب</button></a>`;
    }
  },

  renderModal() {
    const m = document.getElementById('modalOverlay');
    if (!this.state.selProd) { m.style.display = 'none'; return; }
    const p = this.state.selProd;
    const cat = this.cats.find(c => c.key === p.cat);
    m.style.display = 'flex';
    m.innerHTML = `<div class="modal-backdrop" onclick="App.closeModal()"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="App.closeModal()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        <div class="modal-img">${this.imgTag(`images/${p.img}`, p.name, 160)}</div>
        <div class="modal-body">
          <div class="modal-badges">
            <span class="badge badge-orange">${cat?.label || ''}</span>
            ${p.badge ? `<span class="badge badge-red">${p.badge}</span>` : ''}
            <span class="badge badge-orange">-${this.disc(p)}%</span>
          </div>
          <h2 class="modal-title">${p.name}</h2>
          <p class="modal-desc">${p.desc}</p>
          ${p.colorOptions ? `<div class="modal-color-picker"><label class="modal-color-label">${p.optionLabel || 'اختر اللون المناسب:'}</label><div class="modal-color-options">${p.colorOptions.map(c => `<label class="modal-color-option"><input type="radio" name="prodOption" value="${c}" class="modal-color-radio"><span class="modal-color-swatch" data-color="${c}">${c}</span></label>`).join('')}</div></div>` : ''}
          <div class="modal-prices"><span class="modal-new-price">${p.price} ر.س</span><span class="modal-old-price">${p.op} ر.س</span></div>
          <div class="modal-specs"><h3>المواصفات التقنية:</h3>${p.specs.map(s => `<div class="spec-item"><div class="spec-dot"></div><span class="spec-text">${s}</span></div>`).join('')}</div>
          <button class="modal-add-btn" onclick="App.addCartWithColor(${p.id})">أضف إلى السلة <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
        </div>
      </div>`;
  },

  // ===== SVG HELPERS =====
  svgIcon(d, s = 18, stroke = 'currentColor', fill = 'none') {
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  },

  imgTag(src, alt, minH = 60) {
    return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" onerror="this.style.display='none'" class="img-tag" style="min-height:${minH}px">`;
  },

  starSVG(filled, size = 18) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${filled ? '#ff9500' : 'none'}" stroke="${filled ? 'none' : 'var(--star-empty,#ddd)'}" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  },

  renderStars(n, size = 18) {
    return Array(5).fill(0).map((_, i) => this.starSVG(i < n, size)).join('');
  },

  // ===== PRODUCT CARD =====
  productCard(p, large) {
    return `<div class="product-card">
      <div class="product-img${large ? ' product-img-large' : ''}" onclick="App.showProduct(${p.id})">
        ${this.imgTag(`images/${p.img}`, p.name, 100)}
        ${p.badge ? `<span class="product-badge badge-primary">${p.badge}</span>` : ''}
        <span class="discount-badge">-${this.disc(p)}%</span>
      </div>
      <div class="product-info">
        <h3 class="product-name" onclick="App.showProduct(${p.id})">${p.name}</h3>
        <div class="product-bottom">
          <div class="product-prices">
            <span class="price">${p.price} ر.س</span>
            <span class="old-price">${p.op} ر.س</span>
          </div>
          <button class="add-btn" onclick="event.stopPropagation();${p.colorOptions ? `App.showProduct(${p.id})` : `App.addCart(App.products.find(x=>x.id===${p.id}))`}" aria-label="أضف للسلة"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
        </div>
      </div>
    </div>`;
  },

  // ===== RENDER MAIN =====
  renderMain() {
    const main = document.getElementById('mainContent');
    const fl = document.getElementById('footerLinks');
    fl.innerHTML = this.navItems.map(n => `<button onclick="App.nav('${n.key}')">${n.label}</button>`).join('');

    if (this.state.page === 'home') main.innerHTML = this.renderHome();
    else if (this.state.page === 'products') main.innerHTML = this.renderProducts();
    else if (this.state.page === 'features') main.innerHTML = this.renderFeatures();
    else if (this.state.page === 'terms') main.innerHTML = this.renderTerms();
    else if (this.state.page === 'contact') main.innerHTML = this.renderContact();

    setTimeout(() => this.setupScrollReveal(), 100);
  },

  // ===== PAGES =====
  renderHome() {
    return `
    <div class="carousel">
      <img src="images/add.jpg" alt="iBoardz - متجر إلكترونيات وأردوينو" width="1100" height="620" fetchpriority="high" style="opacity:${this.state.ci === 0 ? 1 : 0}" decoding="async">
      <img src="images/add1.jpg" alt="iBoardz - عروض المنتجات" width="1100" height="619" loading="lazy" style="opacity:${this.state.ci === 1 ? 1 : 0}" decoding="async">
      <button class="carousel-arrow prev" onclick="App.setCi(${(this.state.ci - 1 + 2) % 2})">${this.svgIcon('<polyline points="9 18 15 12 9 6"/>', 22)}</button>
      <button class="carousel-arrow next" onclick="App.setCi(${(this.state.ci + 1) % 2})">${this.svgIcon('<polyline points="15 18 9 12 15 6"/>', 22)}</button>
      <div class="carousel-dots">
        <button class="carousel-dot${this.state.ci === 0 ? ' active' : ''}" onclick="App.setCi(0)"></button>
        <button class="carousel-dot${this.state.ci === 1 ? ' active' : ''}" onclick="App.setCi(1)"></button>
      </div>
    </div>

    <div class="marquee">
      <div class="marquee-track">
        <span class="marquee-item">🚚 توصيل سريع لجميع مناطق المملكة</span>
        <span class="marquee-item">🛡️ ضمان كامل على جميع المنتجات</span>
        <span class="marquee-item">🎧 دعم فني 24/7</span>
        <span class="marquee-item">💰 خصومات تصل إلى -40%</span>
        <span class="marquee-item">⭐ منتجات أصلية ومضمونة</span>
      </div>
    </div>

    <div class="quick-features reveal">
      <div class="quick-features-inner">
        <div class="quick-feature"><div class="quick-feature-icon">${this.svgIcon(this.icons.truck, 28, '#ff9500')}</div><div><h3>شحن سريع</h3><p>توصيل لجميع مناطق المملكة</p></div></div>
        <div class="quick-feature"><div class="quick-feature-icon">${this.svgIcon(this.icons.shield, 28, '#ff9500')}</div><div><h3>ضمان كامل</h3><p>ضمان على جميع المنتجات</p></div></div>
        <div class="quick-feature"><div class="quick-feature-icon">${this.svgIcon(this.icons.headset, 28, '#ff9500')}</div><div><h3>دعم فني</h3><p>+966 552 645 082</p></div></div>
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

  renderProducts() {
    let filtered = this.state.filter === 'all' ? [...this.products] : this.products.filter(p => p.cat === this.state.filter);
    if (this.state.search) filtered = filtered.filter(p => p.name.toLowerCase().includes(this.state.search) || p.desc.includes(this.state.search));
    filtered.sort((a, b) => a.price - b.price);
    return `<div class="section">
      <div class="reveal" style="margin-bottom:24px"><h1 style="font-size:34px;font-weight:900;margin:0 0 4px">المنتجات</h1></div>
      <div class="search-bar">
        <input type="text" placeholder="ابحث عن منتج..." value="${this.state.search}" oninput="App.setSearch(this.value)" autocomplete="off">
        <span class="search-icon">${this.svgIcon('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', 20)}</span>
      </div>
      <div class="filter-bar">${this.cats.map(c => {
        const count = c.key === 'all' ? this.products.length : this.products.filter(p => p.cat === c.key).length;
        return `<button class="filter-btn${this.state.filter === c.key ? ' active' : ''}" onclick="App.setFilter('${c.key}')"><span class="filter-ico">${this.svgIcon(c.icon, 15)}</span>${c.label}<span class="filter-count">${count}</span></button>`;
      }).join('')}</div>
      ${filtered.length === 0
        ? `<div class="products-empty">${this.svgIcon('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', 48)}<p style="margin-top:12px;font-size:16px">لا توجد منتجات مطابقة</p><p style="font-size:13px">حاول تغيير معايير البحث</p></div>`
        : `<div class="products-count">${filtered.length} منتج</div><div class="products-grid-large">${filtered.map(p => this.productCard(p, true)).join('')}</div>`
      }
    </div>`;
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
        <div class="reviews-pro-grid">${this.reviews.map((r, i) => `<div class="review-pro-card reveal">
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
        <a href="https://wa.me/966552645082" target="_blank" rel="noopener noreferrer" class="contact-card whatsapp">
          <div class="contact-icon whatsapp-icon">${this.svgIcon(this.icons.phone, 20, '#fff')}</div>
          <div><div class="contact-label">واتساب</div><div class="contact-value">+966 552 645 082</div></div>
        </a>
        <a href="mailto:iBoardz@outlook.com" class="contact-card email">
          <div class="contact-icon email-icon">${this.svgIcon(this.icons.envelope, 20, '#fff')}</div>
          <div><div class="contact-label">البريد الإلكتروني</div><div class="contact-value">iBoardz@outlook.com</div></div>
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
            <div class="terms-section-icon icon-orange">${this.svgIcon('<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/>', 28, '#ff9500')}</div>
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
            <div class="terms-section-icon icon-blue">${this.svgIcon('<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>', 28, '#3b82f6')}</div>
            <div><span class="terms-section-num">02</span><h2>الشحن والتوصيل</h2></div>
          </div>
          <div class="terms-grid-2">
            <div class="terms-grid-card"><div class="terms-grid-icon">🚚</div><h4>أفضل الشركات</h4><p>يتم تقديم خدمة الشحن والتوصيل بواسطة أفضل الشركات المتواجدة في المنطقة.</p></div>
            <div class="terms-grid-card"><div class="terms-grid-icon">📦</div><h4>تغليف آمن</h4><p>يقوم المتجر بالتأكد من تغليف المنتجات بطريقة لا تجعلها عرضة للتلف بسهولة.</p></div>
            <div class="terms-grid-card"><div class="terms-grid-icon">✅</div><h4>ضمان الوصول</h4><p>يضمن المتجر استلام العميل للمنتجات بصورة جيدة وغير تالفة حتى ولو كان الخطأ من شركة الشحن.</p></div>
            <div class="terms-grid-card"><div class="terms-grid-icon">📍</div><h4>متابعة الشحنة</h4><p>تتم متابعة كل الشحنات الصادرة من المتجر حتى وصولها للعميل.</p></div>
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
            <div class="terms-section-icon icon-purple">${this.svgIcon('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>', 28, '#8b5cf6')}</div>
            <div><span class="terms-section-num">04</span><h2>الضمان على المنتجات</h2></div>
          </div>
          <div class="terms-warranty-cards">
            <div class="terms-warranty-card"><div class="terms-warranty-icon">📋</div><h4>تفاصيل الضمان</h4><p>يتم توضيح تفاصيل الضمان في صفحة المنتج نفسه. في حال عدم ذكر أي تفاصيل، يُعتبر المنتج بدون ضمان.</p></div>
            <div class="terms-warranty-card"><div class="terms-warranty-icon">⏱️</div><h4>مدة الإصلاح</h4><p>يستغرق زمن الإصلاح (14) يومًا كحد أقصى للأعطال المشمولة بالضمان.</p></div>
            <div class="terms-warranty-card"><div class="terms-warranty-icon">🔧</div><h4>تغطية الضمان</h4><p>يغطي الضمان إصلاح أو استبدال قطع الغيار مجانًا في حال وجود عيب مصنعي فقط.</p></div>
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
          ${this.svgIcon('<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>', 40, '#ff9500')}
          <h3>هل لديك استفسار؟</h3>
          <p>فريقنا جاهز للإجابة على جميع تساؤلاتك</p>
          <div class="terms-cta-btns">
            <a href="https://wa.me/966552645082" target="_blank" class="terms-cta-btn primary">${this.svgIcon('<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>', 18, '#fff', '#fff')} تواصل عبر واتساب</a>
            <button class="terms-cta-btn secondary" onclick="App.nav('contact')">${this.svgIcon('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>', 18)} أرسل رسالة</button>
          </div>
        </div>
      </div>
    </div>`;
  },

  // ===== CAROUSEL =====
  setCi(i) {
    this.state.ci = i;
    const imgs = document.querySelectorAll('.carousel > img');
    const dots = document.querySelectorAll('.carousel-dot');
    imgs.forEach((img, idx) => img.style.opacity = idx === i ? 1 : 0);
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
      imgs.forEach((img, i) => img.style.opacity = i === next ? 1 : 0);
      dots.forEach((dot, i) => { dot.className = 'carousel-dot' + (i === next ? ' active' : ''); });
    }, 4000);
  },

  // ===== EFFECTS =====
  setupScrollReveal() {
    if (this._revealObserver) { this._revealObserver.disconnect(); }
    this._revealObserver = new IntersectionObserver((entries) => {
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

  // ===== KEYBOARD =====
  _setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.state.selProd) this.closeModal();
        else if (this.state.cartOpen) this.closeCart();
        else if (this.state.menuOpen) this.closeMenu();
      }
    });
  },

  // ===== CLICK OUTSIDE =====
  _setupClickOutside() {
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('dropdown');
      const menuBtn = document.querySelector('.menu-btn');
      if (this.state.menuOpen && dropdown && !dropdown.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
        this.closeMenu();
      }
    });
  },

  // ===== RESIZE =====
  _setupResize() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this._headerSearchOpen) {
        this._headerSearchOpen = false;
        document.getElementById('headerSearch')?.classList.remove('open');
      }
    });
  },

  // ===== INIT =====
  init() {
    this.loadCart();
    this.setTheme(this.getTheme());
    this.setupReducedMotion();
    this.render();
    this.renderCart();
    this.injectStructuredData();
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    setTimeout(() => this.setupScrollReveal(), 200);
    this._setupKeyboard();
    this._setupClickOutside();
    this._setupResize();
  },

  // ===== STRUCTURED DATA =====
  injectStructuredData() {
    try {
      const items = this.products.map(p => ({
        '@type': 'Product',
        name: p.name,
        description: p.desc,
        image: 'images/' + p.img,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'SAR',
          price: p.price,
          availability: 'https://schema.org/InStock'
        }
      }));
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, item: it })) });
      document.head.appendChild(script);
    } catch {}
  }
};

App.init();
