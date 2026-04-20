import { useState, useEffect, useCallback } from 'react';

// ===== DATA =====
const products = [
  { id:2, name:'ESP32 DEV MODEL', price:39, originalPrice:60, category:'microcontrollers', image:'esp32-dev-model.png', specs:['واي فاي + بلوتوث','USB Type-C','340KB SRAM','48MHz processor','18 GPIO pin'], description:'نسخة مطورة من ESP32 مع منفذ USB-C', popular:true, badge:'مميز' },
  { id:3, name:'ARDUINO UNO R3', price:32, originalPrice:50, category:'microcontrollers', image:'arduino-uno-r3.png', specs:['ATmega328P','16MHz clock','32KB Flash','14 Digital I/O','6 Analog Inputs'], description:'المتحكم الأشهر في العالم، مثالي للمبتدئين', popular:true, badge:'الأكثر مبيعاً' },
  { id:4, name:'ESP32 C3 MINI', price:29, originalPrice:45, category:'microcontrollers', image:'esp32-c3-mini.png', specs:['RISC-V 160MHz','400KB SRAM','WiFi 4 + BT5','22 GPIO pin','حجم صغير جداً'], description:'متحكم صغير الحجم بكفاءة عالية' },
  { id:5, name:'ESP8266 D1 BOARD', price:29, originalPrice:42, category:'microcontrollers', image:'esp8266-d1-board.png', specs:['ESP8266 WiFi','80MHz clock','11 GPIO pin','ADC مدمج','USB Micro'], description:'لوحة تطوير اقتصادية مع واي فاي' },
  { id:6, name:'ESP32 D1 BOARD', price:39, originalPrice:58, category:'microcontrollers', image:'esp32-d1-board.png', specs:['ESP32 Dual Core','WiFi + BLE','30 GPIO pin','520KB SRAM','USB Type-C'], description:'لوحة D1 المطورة مع ESP32', popular:true, badge:'مميز' },
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

const featuresData = [
  { title:'جودة عالية', desc:'جميع منتجاتنا أصلية ومضمونة' },
  { title:'أسعار تنافسية', desc:'أفضل الأسعار في السوق السعودي' },
  { title:'شحن سريع', desc:'توصيل سريع لجميع مناطق المملكة' },
  { title:'دعم فني 24/7', desc:'فريق دعم متخصص على مدار الساعة' },
  { title:'ضمان كامل', desc:'ضمان على جميع المنتجات' },
  { title:'موارد تعليمية', desc:'شروحات وأكواد جاهزة لكل منتج' },
];

// ===== ICONS =====
const I = ({s}:{s:string}) => <span dangerouslySetInnerHTML={{__html:s}}/>;
const ic = {
  cart:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
  menu:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  x:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  plus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  minus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  trash:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
  chevR:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
  chevL:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
  phone:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
  envelope:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>',
  whatsapp:'<svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
  truck:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  shield:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  headset:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>',
  box:'<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
};

const navItems = [
  { key:'home', label:'الرئيسية', icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
  { key:'products', label:'المنتجات', icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' },
  { key:'features', label:'المميزات', icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
  { key:'contact', label:'تواصل معنا', icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>' },
];

type Product = typeof products[0];
interface CartItem { product: Product; qty: number; }

// ===== MAIN APP =====
export default function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState('all');
  const [ci, setCi] = useState(0); // carousel index
  const [selProd, setSelProd] = useState<Product|null>(null);

  useEffect(() => { try { const s=localStorage.getItem('iboardz-cart'); if(s) setCart(JSON.parse(s)); } catch{} },[]);
  useEffect(() => { try { localStorage.setItem('iboardz-cart',JSON.stringify(cart)); } catch{} },[cart]);
  useEffect(() => { const t=setInterval(()=>setCi(p=>(p+1)%2),4000); return()=>clearInterval(t); },[]);

  const nav = useCallback((p:string)=>{ setPage(p); setMenuOpen(false); window.scrollTo({top:0,behavior:'smooth'}); },[]);
  const addCart = useCallback((prod:Product)=>{
    setCart(prev=>{ const ex=prev.find(i=>i.product.id===prod.id); if(ex) return prev.map(i=>i.product.id===prod.id?{...i,qty:i.qty+1}:i); return[...prev,{product:prod,qty:1}]; });
    setCartOpen(true); setTimeout(()=>setCartOpen(false),2000);
  },[]);
  const removeCart = useCallback((id:number)=>setCart(p=>p.filter(i=>i.product.id!==id)),[]);
  const updQty = useCallback((id:number,d:number)=>setCart(p=>p.map(i=>i.product.id===id?{...i,qty:Math.max(1,i.qty+d)}:i)),[]);
  const disc = (p:Product) => Math.round((1-p.price/p.originalPrice)*100);
  const ti = cart.reduce((s,i)=>s+i.qty,0);
  const tp = cart.reduce((s,i)=>s+i.product.price*i.qty,0);
  const ts = cart.reduce((s,i)=>s+(i.product.originalPrice-i.product.price)*i.qty,0);

  const ProductCard = ({p,large}:{p:Product;large?:boolean})=>(
    <div className="product-card">
      <div className={`product-img${large?' product-img-large':''}`} onClick={()=>setSelProd(p)}>
        <img src={`images/${p.image}`} alt={p.name} onError={e=>{(e.target as HTMLImageElement).style.display='none';}}/>
        {p.badge && <span className="product-badge badge-primary">{p.badge}</span>}
        <span className="discount-badge">-{disc(p)}%</span>
      </div>
      <div className="product-info">
        <h3 className="product-name" onClick={()=>setSelProd(p)}>{p.name}</h3>
        <div className="product-bottom">
          <div className="product-prices">
            <span className="price">{p.price} ر.س</span>
            <span className="old-price">{p.originalPrice} ر.س</span>
          </div>
          <button className="add-btn" onClick={e=>{e.stopPropagation();addCart(p);}}><I s={ic.plus}/></button>
        </div>
      </div>
    </div>
  );

  // PAGES
  const HomePage = ()=>(
    <>
      <div className="carousel">
        {['add.png','add1.png'].map((img,i)=>(
          <img key={img} src={`images/${img}`} alt="" style={{opacity:ci===i?1:0}} onError={e=>{(e.target as HTMLImageElement).style.display='none';}}/>
        ))}
        <div className="carousel-overlay">
          <h1 className="carousel-title"><span className="i">i</span><span className="boardz">Boardz</span></h1>
          <p className="carousel-subtitle">ARDUINO <span className="future">FUTURE</span></p>
        </div>
        <button className="carousel-arrow prev" onClick={()=>setCi(v=>(v-1+2)%2)}><I s={ic.chevR}/></button>
        <button className="carousel-arrow next" onClick={()=>setCi(v=>(v+1)%2)}><I s={ic.chevL}/></button>
        <div className="carousel-dots">
          {[0,1].map(i=><button key={i} className={`carousel-dot${ci===i?' active':''}`} onClick={()=>setCi(i)}/>)}
        </div>
      </div>
      <div className="quick-features">
        <div className="quick-features-inner">
          <div className="quick-feature"><div className="quick-feature-icon"><I s={ic.truck}/></div><div><h3>شحن سريع</h3><p>توصيل لجميع مناطق المملكة</p></div></div>
          <div className="quick-feature"><div className="quick-feature-icon"><I s={ic.shield}/></div><div><h3>ضمان كامل</h3><p>ضمان على جميع المنتجات</p></div></div>
          <div className="quick-feature"><div className="quick-feature-icon"><I s={ic.headset}/></div><div><h3>دعم فني</h3><p>+966 552 645 082</p></div></div>
        </div>
      </div>
      <div className="section">
        <div className="section-header">
          <div className="section-badge">الأكثر مبيعاً</div>
          <h2 className="section-title">الأكثر رواجاً</h2>
          <p className="section-subtitle">المنتجات الأكثر طلباً من عملائنا</p>
        </div>
        <div className="products-grid">
          {products.filter(p=>p.popular).map(p=><ProductCard key={p.id} p={p}/>)}
        </div>
        <div style={{textAlign:'center',marginTop:36}}><button className="show-all-btn" onClick={()=>nav('products')}>عرض جميع المنتجات</button></div>
      </div>
    </>
  );

  const ProductsPage = ()=>(
    <div className="section">
      <div style={{marginBottom:32}}><h1 style={{fontSize:34,fontWeight:900,margin:'0 0 4px'}}>المنتجات</h1><p style={{color:'#999',fontSize:15,margin:0}}>جميع الأسعار هي أسعار بعد الخصم</p></div>
      <div className="filter-bar">
        {categories.map(c=><button key={c.key} className={`filter-btn${filter===c.key?' active':''}`} onClick={()=>setFilter(c.key)}>{c.label}</button>)}
      </div>
      <div className="products-grid-large">
        {(filter==='all'?products:products.filter(p=>p.category===filter)).map(p=><ProductCard key={p.id} p={p} large/>)}
      </div>
    </div>
  );

  const FeaturesPage = ()=>(
    <div className="section-narrow">
      <div className="section-header">
        <div className="section-badge">لماذا نحن؟</div>
        <h1 className="section-title">لماذا <span style={{direction:'ltr',display:'inline-block'}}>iBoardz</span>؟</h1>
        <p className="section-subtitle">مميزات تجعلنا الخيار الأول لعشاق الإلكترونيات</p>
      </div>
      <div className="features-grid">
        {featuresData.map((f,i)=>(
          <div key={i} className="feature-card"><div className="feature-num">{i+1}</div><h3>{f.title}</h3><p>{f.desc}</p></div>
        ))}
      </div>
      <div className="section-header" style={{marginBottom:32}}>
        <h2 style={{fontSize:28,fontWeight:900,margin:'0 0 6px'}}>آراء عملائنا</h2>
        <p style={{color:'#999',fontSize:15}}>ماذا يقول عملاؤنا عن تجربتهم</p>
      </div>
      <div className="reviews-grid">
        {reviews.map((r,i)=>(
          <div key={i} className="review-card">
            <div className="review-stars">{[1,2,3,4,5].map(s=><span key={s}>★</span>)}</div>
            <p className="review-text">"{r.text}"</p>
            <div className="review-author"><div className="review-avatar">{r.name.charAt(0)}</div><span className="review-name">{r.name}</span></div>
          </div>
        ))}
      </div>
    </div>
  );

  const ContactPage = ()=>(
    <div className="section-contact">
      <div className="section-header">
        <div className="section-badge">نحن هنا لمساعدتك</div>
        <h1 className="section-title">تواصل معنا</h1>
        <p className="section-subtitle">نرحب بتواصلك في أي وقت</p>
      </div>
      <div className="contact-cards">
        <a href="https://wa.me/966552645082" target="_blank" rel="noopener noreferrer" className="contact-card whatsapp">
          <div className="contact-icon whatsapp-icon"><I s={ic.phone}/></div>
          <div><div className="contact-label">واتساب</div><div className="contact-value">+966 552 645 082</div></div>
        </a>
        <a href="mailto:iBoardz@outlook.com" className="contact-card email">
          <div className="contact-icon email-icon"><I s={ic.envelope}/></div>
          <div><div className="contact-label">البريد الإلكتروني</div><div className="contact-value">iBoardz@outlook.com</div></div>
        </a>
      </div>
      <div className="contact-form">
        <h2>أرسل لنا رسالة</h2>
        <form onSubmit={e=>e.preventDefault()}>
          <div className="form-group"><label>الاسم</label><input type="text" className="form-input" placeholder="اسمك الكامل"/></div>
          <div className="form-group"><label>البريد الإلكتروني</label><input type="email" className="form-input" placeholder="email@example.com" style={{direction:'ltr',textAlign:'right'}}/></div>
          <div className="form-group"><label>الرسالة</label><textarea rows={5} className="form-input" placeholder="اكتب رسالتك هنا..."></textarea></div>
          <button type="submit" className="submit-btn">إرسال الرسالة</button>
        </form>
      </div>
      <div className="work-hours"><h3>ساعات العمل</h3><p>السبت - الخميس: 9 صباحاً - 11 مساءً</p><p style={{marginBottom:0}}>الجمعة: 4 مساءً - 11 مساءً</p></div>
    </div>
  );

  const cat = selProd ? categories.find(c=>c.key===selProd.category) : null;
  const waText = encodeURIComponent('مرحباً، أريد طلب:\n'+cart.map(i=>`${i.product.name} × ${i.qty} = ${i.product.price*i.qty} ر.س`).join('\n')+'\nالمجموع: '+tp+' ر.س');

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo" onClick={()=>nav('home')}>
          <div className="logo-text"><span className="i">i</span><span className="boardz">Boardz</span></div>
        </div>
         <div className="header-actions">
           <button className="menu-btn" onClick={e=>{e.stopPropagation();setMenuOpen(!menuOpen);}}>
             <I s={ic.menu}/>
           </button>
           <button className="cart-btn" onClick={()=>setCartOpen(true)}>
             <I s={ic.cart}/>{ti>0&&<span className="cart-badge">{ti}</span>}
           </button>
         </div>
      </header>

      {/* DROPDOWN */}
      {menuOpen && (
        <div className="dropdown-menu" onClick={e=>e.stopPropagation()}>
          {navItems.map(item=>(
            <button key={item.key} className={page===item.key?'active':''} onClick={()=>nav(item.key)}>
              <I s={item.icon}/> {item.label}
            </button>
          ))}
        </div>
      )}
      {menuOpen && <div style={{position:'fixed',inset:0,zIndex:998}} onClick={()=>setMenuOpen(false)}/>}

      {/* CART SIDEBAR */}
      <div className={`cart-overlay${cartOpen?' open':''}`}>
        {cartOpen && <div className="cart-backdrop" onClick={()=>setCartOpen(false)}/>}
        <div className="cart-panel">
          <div className="cart-header">
            <h2>سلة التسوق ({ti})</h2>
            <button className="cart-close" onClick={()=>setCartOpen(false)}><I s={ic.x}/></button>
          </div>
          <div className="cart-body">
            {cart.length===0?(
              <div className="cart-empty"><I s={ic.box}/><p style={{fontSize:16,marginTop:12}}>السلة فارغة</p><p style={{fontSize:13}}>أضف منتجات للبدء</p></div>
            ):cart.map(item=>(
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-img"><img src={`images/${item.product.image}`} alt="" onError={e=>{(e.target as HTMLImageElement).style.display='none';}}/></div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.product.name}</div>
                  <div className="cart-item-prices"><span className="price" style={{fontSize:15}}>{item.product.price} ر.س</span><span className="old-price">{item.product.originalPrice} ر.س</span></div>
                </div>
                <div className="cart-qty-controls">
                  <button className="qty-btn" onClick={()=>updQty(item.product.id,-1)}><I s={ic.minus}/></button>
                  <span style={{fontWeight:800,minWidth:20,textAlign:'center',fontSize:15}}>{item.qty}</span>
                  <button className="qty-btn" onClick={()=>updQty(item.product.id,1)}><I s={ic.plus}/></button>
                  <button className="cart-remove" onClick={()=>removeCart(item.product.id)}><I s={ic.trash}/></button>
                </div>
              </div>
            ))}
          </div>
          {cart.length>0&&(
            <div className="cart-footer">
              {ts>0&&<div className="cart-saved"><span style={{fontSize:18}}>🎉</span><span>وفّرت {ts} ر.س بفضل الخصومات!</span></div>}
              <div className="cart-total"><span className="cart-total-label">المجموع:</span><span className="cart-total-price">{tp} ر.س</span></div>
              <a href={`https://wa.me/966552645082?text=${waText}`} target="_blank" rel="noopener noreferrer"><button className="whatsapp-btn"><I s={ic.whatsapp}/> اطلب عبر واتساب</button></a>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT MODAL */}
      {selProd && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={()=>setSelProd(null)}/>
          <div className="modal-content">
            <button className="modal-close" onClick={()=>setSelProd(null)}><I s={ic.x}/></button>
            <div className="modal-img"><img src={`images/${selProd.image}`} alt={selProd.name} onError={e=>{(e.target as HTMLImageElement).style.display='none';}}/></div>
            <div className="modal-body">
              <div className="modal-badges">
                <span className="badge badge-orange">{cat?.label}</span>
                {selProd.badge && <span className="badge badge-red">{selProd.badge}</span>}
                <span className="badge badge-gray">-{disc(selProd)}%</span>
              </div>
              <h2 className="modal-title">{selProd.name}</h2>
              <p className="modal-desc">{selProd.description}</p>
              <div className="modal-prices"><span className="modal-new-price">{selProd.price} ر.س</span><span className="modal-old-price">{selProd.originalPrice} ر.س</span></div>
              <div className="modal-specs">
                <h3>المواصفات التقنية:</h3>
                {selProd.specs.map((sp,i)=><div key={i} className="spec-item"><div className="spec-dot"/><span className="spec-text">{sp}</span></div>)}
              </div>
              <button className="modal-add-btn" onClick={()=>{addCart(selProd);setSelProd(null);}}>أضف إلى السلة <I s={ic.plus}/></button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="main">
        {page==='home' && <HomePage/>}
        {page==='products' && <ProductsPage/>}
        {page==='features' && <FeaturesPage/>}
        {page==='contact' && <ContactPage/>}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-col">
              <div className="footer-logo"><span className="i">i</span><span className="boardz">Boardz</span></div>
              <div className="footer-subtitle">ARDUINO <span className="future">FUTURE</span></div>
              <p className="footer-desc">منصتك الأولى لمكونات الإلكترونيات والبرمجة في المملكة العربية السعودية</p>
            </div>
            <div className="footer-col">
              <h4>روابط سريعة</h4>
              <div className="footer-links">{navItems.map(item=><button key={item.key} onClick={()=>nav(item.key)}>{item.label}</button>)}</div>
            </div>
            <div className="footer-col">
              <h4>تواصل معنا</h4>
              <div className="footer-contact"><p>واتساب: +966 552 645 082</p><p>البريد: iBoardz@outlook.com</p></div>
            </div>
          </div>
          <div className="footer-bottom"><span>© 2025 iBoardz</span> - جميع الحقوق محفوظة</div>
        </div>
      </footer>
    </>
  );
}
