import { useState, useEffect, useCallback } from 'react';

// ==================== TYPES ====================
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  specs: string[];
  description: string;
  popular?: boolean;
  badge?: string;
}

interface CartItem { product: Product; qty: number; }

// ==================== PRODUCT DATA ====================
const products: Product[] = [
  // === MICROCONTROLLERS ===
  { id:1, name:'ESP32', price:41, originalPrice:65, category:'microcontrollers', image:'esp32.png', specs:['واي فاي مدمج','بلوتوث مدمج','240MHz dual-core','520KB SRAM','34 GPIO pin'], description:'متحكم دقيق قوي مع واي فاي وبلوتوث مدمجين', popular:true, badge:'الأكثر طلباً' },
  { id:2, name:'ESP32 DEV MODEL', price:39, originalPrice:60, category:'microcontrollers', image:'esp32-dev-model.png', specs:['واي فاي + بلوتوث','USB Type-C','340KB SRAM','48MHz processor','18 GPIO pin'], description:'نسخة مطورة من ESP32 مع منفذ USB-C', popular:true, badge:'مميز' },
  { id:3, name:'ARDUINO UNO R3', price:32, originalPrice:50, category:'microcontrollers', image:'arduino-uno-r3.png', specs:['ATmega328P','16MHz clock','32KB Flash','14 Digital I/O','6 Analog Inputs'], description:'المتحكم الأشهر في العالم، مثالي للمبتدئين', popular:true, badge:'الأكثر مبيعاً' },
  { id:4, name:'ESP32 C3 MINI', price:29, originalPrice:45, category:'microcontrollers', image:'esp32-c3-mini.png', specs:['RISC-V 160MHz','400KB SRAM','WiFi 4 + BT5','22 GPIO pin','حجم صغير جداً'], description:'متحكم صغير الحجم بكفاءة عالية' },
  { id:5, name:'ESP8266 D1 BOARD', price:29, originalPrice:42, category:'microcontrollers', image:'esp8266-d1-board.png', specs:['ESP8266 WiFi','80MHz clock','11 GPIO pin','ADC مدمج','USB Micro'], description:'لوحة تطوير اقتصادية مع واي فاي' },
  { id:6, name:'ESP32 D1 BOARD', price:39, originalPrice:58, category:'microcontrollers', image:'esp32-d1-board.png', specs:['ESP32 Dual Core','WiFi + BLE','30 GPIO pin','520KB SRAM','USB Type-C'], description:'لوحة D1 المطورة مع ESP32', popular:true, badge:'مميز' },

  // === SENSORS ===
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

  // === DISPLAYS ===
  { id:26, name:'SH1107 OLED DISPLAY', price:109, originalPrice:160, category:'displays', image:'sh1107-oled-display.png', specs:['شاشة OLED 1.3"','دقة 128×64','I2C Interface','تباين عالي جداً','استهلاك منخفض'], description:'شاشة OLED 1.3 بوصة عالية الجودة للمشاريع', popular:true, badge:'مميز' },
  { id:27, name:'LCD 1602 WITH I2C', price:27, originalPrice:40, category:'displays', image:'lcd-1602-i2c.png', specs:['16 حرف × 2 سطر','I2C Interface','إضاءة خلفية زرقاء','جهد 5V','تباين قابل للتعديل'], description:'شاشة LCD مع واجهة I2C سهلة التوصيل' },
  { id:28, name:'SSD1306 OLED 0.96"', price:35, originalPrice:52, category:'displays', image:'ssd1306-oled-096.png', specs:['شاشة OLED 0.96"','دقة 128×64','I2C Interface','أبيض وأزرق','استهلاك منخفض جداً'], description:'شاشة OLED صغيرة ومثالية للمشاريع' },
];

const categories = [
  { key: 'all', label: 'الكل', labelEn: 'All' },
  { key: 'microcontrollers', label: 'المتحكمات الدقيقة', labelEn: 'Microcontrollers' },
  { key: 'sensors', label: 'الحساسات', labelEn: 'Sensors' },
  { key: 'displays', label: 'الشاشات', labelEn: 'Displays' },
];

const reviews = [
  { name: 'mr.stornyt', text: 'جاني المستشعرات وكل الجهاز مع بعض مغلف كويس وشرح لي كل التفاصيل، أنصحكم تتعاملون معه.' },
  { name: 'mr.stornyt', text: 'تعاملت معه لأنه كان عندي هاكاثون ومشروع يبيله برمجة ومستشعرات طبية وشغلات كثيرة، ما قصّر أبداً اشتغل من ذمّته وهو وفّر كل القطع وبرمجها لي، وكان يجاوب على أسئلتي وكل ما أعطيه يضيف شيء إضافي للمشروع وشرح لي بذمّة وضمير، الله يجزاه خير أنصحكم فيه.' },
  { name: 'عميل', text: 'شغله ما شاء الله رهيب.' },
  { name: 'm.ddddi', text: 'صراحة الرجال متعاون جداً وشغله مضمون، سويت عنده مشروع تخرج أردوينو وما قصّر معي في شيء، أنصح بالتعامل معه.' },
  { name: 'عضو #15049', text: 'بصراحة أنصح بالتعامل معه، الرجال خدوم في أيام قليلة وخلص المشروع.' },
  { name: 'أحمد هاني آل عمير', text: 'الرجال واجد طيب وتعامله راقي، يستاهل 10/10 وفنّان في المشاريع.' },
  { name: 'store_nawaf', text: 'الرجال ما قصّر، كان عندي مشروع حاولت تشغيله أكثر من مرّة وجا الرجال وعطاني الكود البرمجي واشتغل معي الحمد لله.' },
];

const featuresData = [
  { title: 'جودة عالية', desc: 'جميع منتجاتنا أصلية ومضمونة' },
  { title: 'أسعار تنافسية', desc: 'أفضل الأسعار في السوق السعودي' },
  { title: 'شحن سريع', desc: 'توصيل سريع لجميع مناطق المملكة' },
  { title: 'دعم فني 24/7', desc: 'فريق دعم متخصص على مدار الساعة' },
  { title: 'ضمان كامل', desc: 'ضمان على جميع المنتجات' },
  { title: 'موارد تعليمية', desc: 'شروحات وأكواد جاهزة لكل منتج' },
];

// ==================== SVG ICONS ====================
const I = {
  home: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  box: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  star: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>,
  cart: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
  plus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  minus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  trash: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  x: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  menu: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  chevR: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  chevL: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  phone: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  envelope: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>,
  whatsapp: <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  truck: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  shield: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  headset: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>,
};

// ==================== STYLES ====================
const s = {
  btn: (bg='#ff9500', c='#fff') => ({
    padding: '10px 24px', background: bg, color: c, border: 'none',
    borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 8,
    transition: 'all 0.2s', fontFamily: "'Tajawal', sans-serif",
  }),
  card: {
    background: '#fff', borderRadius: 16, border: '1px solid #f0f0f0',
    overflow: 'hidden', transition: 'all 0.3s ease',
  },
  section: (max=1200) => ({ maxWidth: max, margin: '0 auto', padding: '48px 24px' }),
  input: {
    width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid #e0e0e0',
    fontSize: 14, boxSizing: 'border-box' as const, outline: 'none',
    fontFamily: "'Tajawal', sans-serif", transition: 'border-color 0.2s',
  },
  badge: (bg='#ff9500', c='#fff') => ({
    display: 'inline-block', background: bg, color: c, fontSize: 11,
    fontWeight: 700, padding: '3px 10px', borderRadius: 6,
  }),
  price: { color: '#ff9500', fontWeight: 800, fontSize: 17 },
  oldPrice: { color: '#ccc', fontSize: 12, textDecoration: 'line-through' },
};

// ==================== APP ====================
export default function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState('all');
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const carouselImgs = ['add.png', 'add1.png'];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('iboardz-cart');
      if (saved) setCartItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('iboardz-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx(p => (p + 1) % carouselImgs.length), 4000);
    return () => clearInterval(t);
  }, []);

  const addToCart = useCallback((p: Product) => {
    setCartItems(prev => {
      const ex = prev.find(i => i.product.id === p.id);
      if (ex) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product: p, qty: 1 }];
    });
    setCartOpen(true);
    setTimeout(() => setCartOpen(false), 1500);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems(prev => prev.filter(i => i.product.id !== id));
  }, []);

  const updateQty = useCallback((id: number, d: number) => {
    setCartItems(prev => prev.map(i => i.product.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  }, []);

  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);
  const totalSaved = cartItems.reduce((s, i) => s + (i.product.originalPrice - i.product.price) * i.qty, 0);

  const navigate = (p: string) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
  const popularProducts = products.filter(p => p.popular);

  const navItems = [
    { key: 'home', label: 'الرئيسية', icon: I.home },
    { key: 'products', label: 'المنتجات', icon: I.box },
    { key: 'features', label: 'المميزات', icon: I.star },
    { key: 'contact', label: 'تواصل معنا', icon: I.mail },
  ];

  const getDiscount = (p: Product) => Math.round((1 - p.price / p.originalPrice) * 100);

  return (
    <div style={{ fontFamily: "'Tajawal', sans-serif", direction: 'rtl', minHeight: '100vh', background: '#fafafa', color: '#1a1a2e' }}>
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet" />

      {/* ===== HEADER ===== */}
      <header style={{
        position: 'fixed', top: 0, right: 0, left: 0, height: 70, background: '#fff',
        borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 24px', zIndex: 1000,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)', direction: 'ltr',
      }}>
        {/* LOGO */}
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => navigate('home')}
        >
          <div style={{ display: 'inline-flex', alignItems: 'baseline', whiteSpace: 'nowrap', letterSpacing: '-0.5px', direction: 'ltr' }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#ff9500', lineHeight: '1' }}>i</span>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#1a1a2e', lineHeight: '1' }}>Boardz</span>
          </div>
          <img
            src="images/logo.png"
            alt="iBoardz"
            style={{ height: 44, objectFit: 'contain', display: 'none', marginRight: 8 }}
            onLoad={(e: any) => { e.target.style.display = 'block'; if (e.target.previousElementSibling) (e.target.previousElementSibling as HTMLElement).style.display = 'none'; }}
            onError={(e: any) => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* CART + MENU */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, direction: 'rtl' }}>
          <button onClick={() => setCartOpen(true)} style={{
            position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
            color: '#333', padding: 8, display: 'flex', alignItems: 'center',
          }}>
            {I.cart}
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: 0, right: 0, background: '#ff9500', color: '#fff',
                borderRadius: '50%', width: 20, height: 20, fontSize: 11, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{totalItems}</span>
            )}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: '#ff9500', border: 'none', borderRadius: 12, padding: '10px 14px',
            cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center',
          }}>
            {I.menu}
          </button>
        </div>
      </header>

      {/* ===== DROPDOWN MENU ===== */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 74, right: 24, background: '#fff', borderRadius: 14,
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)', zIndex: 999, minWidth: 220,
          overflow: 'hidden', animation: 'fadeIn 0.2s ease',
        }}>
          {navItems.map(item => (
            <button key={item.key} onClick={() => navigate(item.key)} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '14px 20px', border: 'none',
              background: page === item.key ? '#fff8f0' : 'transparent',
              color: page === item.key ? '#ff9500' : '#333',
              fontWeight: page === item.key ? 700 : 500, cursor: 'pointer', fontSize: 15,
              borderBottom: '1px solid #f5f5f5', fontFamily: "'Tajawal', sans-serif",
            }}>
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ===== CART SIDEBAR ===== */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        display: cartOpen ? 'flex' : 'none',
      }}>
        <div onClick={() => setCartOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '100%', maxWidth: 420,
          background: '#fff', boxShadow: '8px 0 40px rgba(0,0,0,0.12)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 24px', borderBottom: '1px solid #eee',
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>سلة التسوق ({totalItems})</h2>
            <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: 4 }}>{I.x}</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#bbb' }}>
                <div style={{ marginBottom: 12 }}>{I.box}</div>
                <p style={{ fontSize: 16 }}>السلة فارغة</p>
                <p style={{ fontSize: 13, marginTop: 4 }}>أضف منتجات للبدء</p>
              </div>
            ) : cartItems.map(item => (
              <div key={item.product.id} style={{
                display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid #f5f5f5', alignItems: 'center',
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 12, background: '#f8f8f8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden',
                }}>
                  <img src={`images/${item.product.image}`} alt="" style={{ width: 48, height: 48, objectFit: 'contain' }}
                    onError={(e: any) => { e.target.style.display = 'none'; }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.product.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <span style={{ ...s.price, fontSize: 15 }}>{item.product.price} ر.س</span>
                    <span style={s.oldPrice}>{item.product.originalPrice} ر.س</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button onClick={() => updateQty(item.product.id, -1)} style={{
                    width: 30, height: 30, borderRadius: 8, border: '1px solid #ddd',
                    background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#333',
                  }}>{I.minus}</button>
                  <span style={{ fontWeight: 800, minWidth: 20, textAlign: 'center', fontSize: 15 }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.product.id, 1)} style={{
                    width: 30, height: 30, borderRadius: 8, border: '1px solid #ddd',
                    background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#333',
                  }}>{I.plus}</button>
                  <button onClick={() => removeFromCart(item.product.id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', padding: 4, marginRight: 2,
                  }}>{I.trash}</button>
                </div>
              </div>
            ))}
          </div>
          {cartItems.length > 0 && (
            <div style={{ borderTop: '1px solid #eee', padding: 20 }}>
              {totalSaved > 0 && (
                <div style={{
                  background: '#e8f5e9', borderRadius: 10, padding: '12px 16px', marginBottom: 14,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ fontSize: 18 }}>🎉</span>
                  <span style={{ color: '#2e7d32', fontWeight: 700, fontSize: 14 }}>وفّرت {totalSaved} ر.س بفضل الخصومات!</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontWeight: 700, fontSize: 17 }}>المجموع:</span>
                <span style={{ fontWeight: 900, fontSize: 20, color: '#ff9500' }}>{totalPrice} ر.س</span>
              </div>
              <a href={`https://wa.me/966552645082?text=${encodeURIComponent('مرحباً، أريد طلب:\n' + cartItems.map(i => `${i.product.name} × ${i.qty} = ${i.product.price * i.qty} ر.س`).join('\n') + '\nالمجموع: ' + totalPrice + ' ر.س')}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: '#25D366', color: '#fff', padding: '14px', borderRadius: 12,
                  fontWeight: 700, fontSize: 16, textDecoration: 'none', width: '100%',
                  boxSizing: 'border-box',
                }}>
                {I.whatsapp} اطلب عبر واتساب
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ===== PRODUCT DETAIL MODAL ===== */}
      {selectedProduct && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1500,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{
            position: 'relative', background: '#fff', borderRadius: 20, maxWidth: 520,
            width: '100%', maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
          }}>
            <button onClick={() => setSelectedProduct(null)} style={{
              position: 'absolute', top: 14, left: 14, background: '#f5f5f5', border: 'none',
              borderRadius: '50%', width: 38, height: 38, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
            }}>{I.x}</button>
            <div style={{
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: 40,
              display: 'flex', justifyContent: 'center', borderRadius: '20px 20px 0 0',
            }}>
              <img src={`images/${selectedProduct.image}`} alt={selectedProduct.name}
                style={{ maxHeight: 200, objectFit: 'contain' }}
                onError={(e: any) => { e.target.style.display = 'none'; }} />
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={s.badge('#fff5e6', '#ff9500')}>
                  {categories.find(c => c.key === selectedProduct.category)?.label}
                </span>
                {selectedProduct.badge && <span style={s.badge('#fff0f0', '#e74c3c')}>{selectedProduct.badge}</span>}
                <span style={s.badge('#f0f0f0', '#666')}>-{getDiscount(selectedProduct)}%</span>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>{selectedProduct.name}</h2>
              <p style={{ color: '#666', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{selectedProduct.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: '#ff9500' }}>{selectedProduct.price} ر.س</span>
                <span style={{ fontSize: 18, color: '#ccc', textDecoration: 'line-through' }}>{selectedProduct.originalPrice} ر.س</span>
              </div>
              <div style={{
                background: '#f8f9fa', borderRadius: 14, padding: 20, marginBottom: 24,
                border: '1px solid #f0f0f0',
              }}>
                <h3 style={{ fontWeight: 800, marginBottom: 12, fontSize: 16, color: '#1a1a2e' }}>المواصفات التقنية:</h3>
                {selectedProduct.specs.map((spec, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                    borderBottom: i < selectedProduct.specs.length - 1 ? '1px solid #eee' : 'none',
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff9500', flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: '#444' }}>{spec}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                style={{
                  ...s.btn(), width: '100%', padding: '16px 24px', fontSize: 17,
                  justifyContent: 'center', borderRadius: 14,
                }}>
                أضف إلى السلة {I.plus}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main style={{ paddingTop: 70 }}>

        {/* ========== HOME ========== */}
        {page === 'home' && (
          <>
            {/* HERO CAROUSEL */}
            <div style={{
              position: 'relative', width: '100%', maxWidth: 1100, margin: '0 auto',
              aspectRatio: '2.8/1', overflow: 'hidden', background: '#1a1a2e', borderRadius: 0,
            }}>
              {carouselImgs.map((img, i) => (
                <img key={img} src={`images/${img}`} alt=""
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover', opacity: carouselIdx === i ? 1 : 0,
                    transition: 'opacity 1s ease',
                  }}
                  onError={(e: any) => { e.target.style.display = 'none'; }} />
              ))}
              {/* Overlay text */}
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(26,26,46,0.85) 0%, rgba(26,26,46,0.5) 100%)',
              }}>
                <h1 style={{
                  fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, color: '#fff',
                  margin: 0, whiteSpace: 'nowrap', letterSpacing: '-1px',
                }}>
                  <span style={{ color: '#ff9500' }}>i</span><span style={{ color: '#fff' }}>Boardz</span>
                </h1>
                <p style={{
                  color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(14px, 2.5vw, 20px)',
                  marginTop: 4, fontWeight: 500, letterSpacing: '4px',
                }}>
                  ARDUINO <span style={{ color: '#ff9500', fontWeight: 700 }}>FUTURE</span>
                </p>
              </div>
              {/* Arrows */}
              <button onClick={() => setCarouselIdx(p => (p - 1 + carouselImgs.length) % carouselImgs.length)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%',
                  width: 40, height: 40, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>{I.chevR}</button>
              <button onClick={() => setCarouselIdx(p => (p + 1) % carouselImgs.length)}
                style={{
                  position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%',
                  width: 40, height: 40, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>{I.chevL}</button>
              {/* Dots */}
              <div style={{
                position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: 8,
              }}>
                {carouselImgs.map((_, i) => (
                  <button key={i} onClick={() => setCarouselIdx(i)} style={{
                    width: carouselIdx === i ? 28 : 10, height: 10, borderRadius: 5,
                    background: carouselIdx === i ? '#ff9500' : 'rgba(255,255,255,0.5)',
                    border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                  }} />
                ))}
              </div>
            </div>

            {/* QUICK FEATURES BAR */}
            <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{
                ...s.section(1100), padding: '28px 24px',
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20,
              }}>
                {[
                  { icon: I.truck, t: 'شحن سريع', d: 'توصيل لجميع مناطق المملكة' },
                  { icon: I.shield, t: 'ضمان كامل', d: 'ضمان على جميع المنتجات' },
                  { icon: I.headset, t: 'دعم فني', d: '+966 552 645 082' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 12, background: '#fff8f0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>{item.icon}</div>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>{item.t}</h3>
                      <p style={{ color: '#888', fontSize: 13, margin: '2px 0 0' }}>{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* POPULAR PRODUCTS */}
            <div style={s.section()}>
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <div style={{
                  display: 'inline-block', background: '#fff5e6', color: '#ff9500', fontSize: 13,
                  fontWeight: 700, padding: '4px 16px', borderRadius: 20, marginBottom: 10,
                }}>الأكثر مبيعاً</div>
                <h2 style={{ fontSize: 32, fontWeight: 900, margin: '8px 0 0' }}>الأكثر رواجاً</h2>
                <p style={{ color: '#999', fontSize: 15, marginTop: 6 }}>المنتجات الأكثر طلباً من عملائنا</p>
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20,
              }}>
                {popularProducts.map(p => (
                  <div key={p.id} style={s.card}
                    onClick={() => setSelectedProduct(p)}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'none'; el.style.boxShadow = 'none'; }}>
                    <div style={{
                      position: 'relative', background: 'linear-gradient(135deg, #f8f9fa, #fff)',
                      padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      minHeight: 160, cursor: 'pointer',
                    }}>
                      <img src={`images/${p.image}`} alt={p.name}
                        style={{ maxHeight: 130, objectFit: 'contain', transition: 'transform 0.3s' }}
                        onError={(e: any) => { e.target.style.display = 'none'; }} />
                      {p.badge && <span style={{
                        ...s.badge('#ff9500', '#fff'),
                        position: 'absolute', top: 10, right: 10,
                      }}>{p.badge}</span>}
                      <span style={{
                        position: 'absolute', top: 10, left: 10,
                        ...s.badge('#fff0f0', '#e74c3c'),
                      }}>-{getDiscount(p)}%</span>
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, minHeight: 36 }}>{p.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={s.price}>{p.price} ر.س</span>
                        <span style={s.oldPrice}>{p.originalPrice} ر.س</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 36 }}>
                <button onClick={() => navigate('products')} style={{
                  ...s.btn(), padding: '14px 40px', fontSize: 16, borderRadius: 14,
                }}>عرض جميع المنتجات</button>
              </div>
            </div>
          </>
        )}

        {/* ========== PRODUCTS ========== */}
        {page === 'products' && (
          <div style={s.section()}>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: 34, fontWeight: 900, margin: '0 0 4px' }}>المنتجات</h1>
              <p style={{ color: '#999', fontSize: 15, margin: 0 }}>جميع الأسعار هي أسعار بعد الخصم</p>
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button key={cat.key} onClick={() => setFilter(cat.key)} style={{
                  padding: '10px 24px', borderRadius: 24, border: 'none', fontSize: 14,
                  fontWeight: filter === cat.key ? 700 : 500, cursor: 'pointer',
                  background: filter === cat.key ? '#ff9500' : '#fff',
                  color: filter === cat.key ? '#fff' : '#555',
                  transition: 'all 0.2s', fontFamily: "'Tajawal', sans-serif",
                  boxShadow: filter === cat.key ? '0 4px 12px rgba(255,149,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)',
                }}>{cat.label}</button>
              ))}
            </div>

            {/* Products Grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20,
            }}>
              {filteredProducts.map(p => (
                <div key={p.id} style={s.card}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'none'; el.style.boxShadow = 'none'; }}>
                  <div style={{
                    position: 'relative', background: 'linear-gradient(135deg, #f8f9fa, #fff)',
                    padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: 170, cursor: 'pointer',
                  }} onClick={() => setSelectedProduct(p)}>
                    <img src={`images/${p.image}`} alt={p.name}
                      style={{ maxHeight: 140, objectFit: 'contain', transition: 'transform 0.3s' }}
                      onError={(e: any) => { e.target.style.display = 'none'; }} />
                    <span style={{ position: 'absolute', top: 10, left: 10, ...s.badge('#fff0f0', '#e74c3c') }}>
                      -{getDiscount(p)}%
                    </span>
                    {p.badge && <span style={{ position: 'absolute', top: 10, right: 10, ...s.badge() }}>{p.badge}</span>}
                  </div>
                  <div style={{ padding: '14px 18px' }}>
                    <h3 style={{
                      fontSize: 13, fontWeight: 700, marginBottom: 10, minHeight: 36,
                      cursor: 'pointer', lineHeight: 1.5,
                    }} onClick={() => setSelectedProduct(p)}>{p.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={s.price}>{p.price} ر.س</span>
                        <span style={s.oldPrice}>{p.originalPrice} ر.س</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} style={{
                        width: 38, height: 38, borderRadius: 10, background: '#ff9500', color: '#fff',
                        border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s',
                        boxShadow: '0 2px 8px rgba(255,149,0,0.3)',
                      }}>{I.plus}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== FEATURES ========== */}
        {page === 'features' && (
          <div style={s.section(1000)}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{
                display: 'inline-block', background: '#fff5e6', color: '#ff9500', fontSize: 13,
                fontWeight: 700, padding: '4px 16px', borderRadius: 20, marginBottom: 10,
              }}>لماذا نحن؟</div>
              <h1 style={{ fontSize: 34, fontWeight: 900, margin: '8px 0 0' }}>لماذا <span style={{ direction: 'ltr', display: 'inline-block' }}>iBoardz</span>؟</h1>
              <p style={{ color: '#999', fontSize: 15, marginTop: 6 }}>مميزات تجعلنا الخيار الأول لعشاق الإلكترونيات</p>
            </div>

            {/* Features */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18, marginBottom: 56,
            }}>
              {featuresData.map((f, i) => (
                <div key={i} style={{
                  padding: 28, background: '#fff', borderRadius: 16,
                  border: '1px solid #f0f0f0', transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, background: '#fff5e6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ff9500', fontWeight: 900, fontSize: 18, marginBottom: 12,
                  }}>{i + 1}</div>
                  <h3 style={{ fontWeight: 800, marginBottom: 6, fontSize: 17 }}>{f.title}</h3>
                  <p style={{ color: '#777', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 6px' }}>آراء عملائنا</h2>
              <p style={{ color: '#999', fontSize: 15 }}>ماذا يقول عملاؤنا عن تجربتهم</p>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18,
            }}>
              {reviews.map((r, i) => (
                <div key={i} style={{
                  padding: 24, background: '#fff', borderRadius: 16,
                  border: '1px solid #f0f0f0',
                }}>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#ff9500', fontSize: 16 }}>★</span>)}
                  </div>
                  <p style={{ color: '#444', fontSize: 14, lineHeight: 1.8, marginBottom: 16, margin: 0 }}>
                    "{r.text}"
                  </p>
                  <div style={{
                    borderTop: '1px solid #f0f0f0', paddingTop: 14, display: 'flex',
                    alignItems: 'center', gap: 10, marginTop: 16,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', background: '#ff9500',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 14,
                    }}>{r.name.charAt(0)}</div>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#444' }}>{r.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== CONTACT ========== */}
        {page === 'contact' && (
          <div style={s.section(800)}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{
                display: 'inline-block', background: '#fff5e6', color: '#ff9500', fontSize: 13,
                fontWeight: 700, padding: '4px 16px', borderRadius: 20, marginBottom: 10,
              }}>نحن هنا لمساعدتك</div>
              <h1 style={{ fontSize: 34, fontWeight: 900, margin: '8px 0 0' }}>تواصل معنا</h1>
              <p style={{ color: '#999', fontSize: 15, marginTop: 6 }}>نرحب بتواصلك في أي وقت</p>
            </div>

            {/* Contact Cards */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 36,
            }}>
              <a href="https://wa.me/966552645082" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: 24, background: '#f0fdf4',
                borderRadius: 16, textDecoration: 'none', border: '1px solid #dcfce7', transition: 'all 0.2s',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, background: '#25D366', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>{I.phone}</div>
                <div>
                  <div style={{ fontWeight: 800, color: '#1a1a2e', fontSize: 16, marginBottom: 2 }}>واتساب</div>
                  <div style={{ color: '#666', fontSize: 14, direction: 'ltr' }}>+966 552 645 082</div>
                </div>
              </a>
              <a href="mailto:iBoardz@outlook.com" style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: 24, background: '#eff6ff',
                borderRadius: 16, textDecoration: 'none', border: '1px solid #dbeafe', transition: 'all 0.2s',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, background: '#3b82f6', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>{I.envelope}</div>
                <div>
                  <div style={{ fontWeight: 800, color: '#1a1a2e', fontSize: 16, marginBottom: 2 }}>البريد الإلكتروني</div>
                  <div style={{ color: '#666', fontSize: 14, direction: 'ltr' }}>iBoardz@outlook.com</div>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <div style={{
              background: '#fff', borderRadius: 20, padding: 32,
              border: '1px solid #f0f0f0', marginBottom: 24,
            }}>
              <h2 style={{ fontWeight: 800, marginBottom: 24, fontSize: 20 }}>أرسل لنا رسالة</h2>
              <form onSubmit={e => e.preventDefault()}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>الاسم</label>
                  <input type="text" placeholder="اسمك الكامل" style={s.input}
                    onFocus={e => e.currentTarget.style.borderColor = '#ff9500'}
                    onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>البريد الإلكتروني</label>
                  <input type="email" placeholder="email@example.com" style={{ ...s.input, direction: 'ltr', textAlign: 'right' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#ff9500'}
                    onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>الرسالة</label>
                  <textarea rows={5} placeholder="اكتب رسالتك هنا..." style={{ ...s.input, resize: 'vertical' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#ff9500'}
                    onBlur={e => e.currentTarget.style.borderColor = '#e0e0e0'} />
                </div>
                <button type="submit" style={{
                  ...s.btn(), width: '100%', padding: '16px', fontSize: 17,
                  justifyContent: 'center', borderRadius: 14,
                }}>إرسال الرسالة</button>
              </form>
            </div>

            {/* Work Hours */}
            <div style={{
              padding: 24, background: '#fff9f0', borderRadius: 16, border: '1px solid #ffe0b2', textAlign: 'center',
            }}>
              <h3 style={{ fontWeight: 800, marginBottom: 10, fontSize: 17 }}>ساعات العمل</h3>
              <p style={{ color: '#666', fontSize: 14, marginBottom: 4 }}>السبت - الخميس: 9 صباحاً - 11 مساءً</p>
              <p style={{ color: '#666', fontSize: 14, margin: 0 }}>الجمعة: 4 مساءً - 11 مساءً</p>
            </div>
          </div>
        )}
      </main>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: '#1a1a2e', color: '#fff', padding: '48px 24px 24px', marginTop: 0 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, marginBottom: 32 }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{
                fontSize: 28, fontWeight: 900, marginBottom: 8, display: 'inline-flex',
                alignItems: 'baseline', whiteSpace: 'nowrap', letterSpacing: '-0.5px', direction: 'ltr',
              }}>
                <span style={{ color: '#ff9500' }}>i</span><span>Boardz</span>
              </div>
              <p style={{ color: '#888', fontSize: 14, marginBottom: 4, letterSpacing: '3px', direction: 'ltr', textAlign: 'right' }}>
                ARDUINO <span style={{ color: '#ff9500' }}>FUTURE</span>
              </p>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
                منصتك الأولى لمكونات الإلكترونيات والبرمجة في المملكة العربية السعودية
              </p>
            </div>
            <div style={{ flex: 1, minWidth: 150 }}>
              <h4 style={{ fontWeight: 800, marginBottom: 16, color: '#ff9500', fontSize: 16 }}>روابط سريعة</h4>
              {navItems.map(item => (
                <button key={item.key} onClick={() => navigate(item.key)} style={{
                  display: 'block', background: 'none', border: 'none', color: '#aaa',
                  padding: '5px 0', cursor: 'pointer', fontSize: 14,
                  fontFamily: "'Tajawal', sans-serif", textAlign: 'right',
                }}>{item.label}</button>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h4 style={{ fontWeight: 800, marginBottom: 16, color: '#ff9500', fontSize: 16 }}>تواصل معنا</h4>
              <p style={{ color: '#aaa', fontSize: 14, marginBottom: 6, direction: 'ltr', textAlign: 'right' }}>
                واتساب: +966 552 645 082
              </p>
              <p style={{ color: '#aaa', fontSize: 14, direction: 'ltr', textAlign: 'right' }}>
                البريد: iBoardz@outlook.com
              </p>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20,
            textAlign: 'center', color: '#555', fontSize: 13,
          }}>
            <span style={{ direction: 'ltr', display: 'inline-block' }}>© 2025 iBoardz</span> - جميع الحقوق محفوظة
          </div>
        </div>
      </footer>

      {/* CLOSE MENU ON OUTSIDE CLICK */}
      {menuOpen && <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />}
    </div>
  );
}
