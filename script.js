// ==================== PRODUCTS DATA ====================
const products = [
    // Microcontrollers
    {
        id: 1,
        name: 'ESP32',
        category: 'microcontrollers',
        price: 41,
        originalPrice: 65,
        image: 'images/esp32.png',
        description: 'لوحة تحكم قوية بميزات WiFi و Bluetooth',
        specs: [
            'معالج: Dual-Core Xtensa LX6',
            'الذاكرة: 520 KB SRAM',
            'اتصال: WiFi 802.11 b/g/n و Bluetooth 4.2',
            'الجهد: 3.3V',
            'عدد الدبابيس: 38 دبوس'
        ]
    },
    {
        id: 2,
        name: 'ESP32 DEV MODEL',
        category: 'microcontrollers',
        price: 39,
        originalPrice: 62,
        image: 'images/esp32-dev-model.png',
        description: 'نسخة تطوير من ESP32 مع محول USB',
        specs: [
            'نفس مواصفات ESP32',
            'محول USB CH340 مدمج',
            'خرج 5V للأجهزة الخارجية',
            'حماية من الجهد الزائد',
            'سهل التوصيل والبرمجة'
        ]
    },
    {
        id: 3,
        name: 'ARDUINO UNO R3',
        category: 'microcontrollers',
        price: 32,
        originalPrice: 50,
        image: 'images/arduino-uno-r3.png',
        description: 'لوحة Arduino الأصلية والأكثر استخداماً',
        specs: [
            'معالج: ATmega328P',
            'الذاكرة: 32 KB Flash, 2 KB SRAM',
            'اتصال: USB Type B',
            '14 دبوس digital، 6 دبابيس analog',
            'الجهد: 5V'
        ]
    },
    {
        id: 4,
        name: 'ESP32 C3 MINI',
        category: 'microcontrollers',
        price: 29,
        originalPrice: 45,
        image: 'images/esp32-c3-mini.png',
        description: 'نسخة صغيرة من ESP32 بسعر منخفض',
        specs: [
            'معالج: Single-Core RISC-V',
            'الذاكرة: 400 KB SRAM',
            'اتصال: WiFi و Bluetooth LE',
            'حجم صغير جداً',
            'استهلاك طاقة منخفض'
        ]
    },
    {
        id: 5,
        name: 'ESP8266 D1 BOARD',
        category: 'microcontrollers',
        price: 29,
        originalPrice: 45,
        image: 'images/esp8266-d1-board.png',
        description: 'لوحة تحكم مع اتصال WiFi',
        specs: [
            'معالج: Tensilica L106',
            'الذاكرة: 160 KB SRAM',
            'اتصال: WiFi 802.11 b/g/n',
            'GPIO: 11 دبوس',
            'محول USB مدمج'
        ]
    },
    {
        id: 6,
        name: 'ESP32 D1 BOARD',
        category: 'microcontrollers',
        price: 39,
        originalPrice: 62,
        image: 'images/esp32-d1-board.png',
        description: 'نسخة محسّنة من D1 بقوة ESP32',
        specs: [
            'معالج: Dual-Core Xtensa',
            'الذاكرة: 520 KB SRAM',
            'GPIO: 32 دبوس',
            'محول USB مدمج',
            'اتصال WiFi و Bluetooth'
        ]
    },

    // Sensors
    {
        id: 7,
        name: 'MAX 30102',
        category: 'sensors',
        price: 25,
        originalPrice: 40,
        image: 'images/max-30102.png',
        description: 'حساس قياس نبضات القلب والأكسجين في الدم',
        specs: [
            'دقة عالية في قياس SpO2 و HR',
            'اتصال: I2C',
            'الجهد: 1.8V - 3.3V',
            'حجم صغير',
            'استهلاك طاقة منخفض'
        ]
    },
    {
        id: 8,
        name: 'HC-SR04 ULTRASONIC',
        category: 'sensors',
        price: 18,
        originalPrice: 28,
        image: 'images/hc-sr04-ultrasonic.png',
        description: 'حساس المسافة بالموجات فوق الصوتية',
        specs: [
            'نطاق القياس: 2 سم - 400 سم',
            'دقة: 0.3 سم',
            'اتصال: Digital IO',
            'الجهد: 5V',
            'موثوق وسهل الاستخدام'
        ]
    },
    {
        id: 9,
        name: 'DHT11 SENSOR',
        category: 'sensors',
        price: 16,
        originalPrice: 25,
        image: 'images/dht11-sensor.png',
        description: 'حساس درجة الحرارة والرطوبة',
        specs: [
            'قياس الحرارة: 0°C - 50°C',
            'قياس الرطوبة: 20% - 90%',
            'دقة: ±2°C و ±5%',
            'اتصال: Digital IO',
            'الجهد: 3.3V - 5.5V'
        ]
    },
    {
        id: 10,
        name: 'Capacitive Moisture Sensor V2.0',
        category: 'sensors',
        price: 20,
        originalPrice: 32,
        image: 'images/capacitive-moisture-sensor-v2.png',
        description: 'حساس رطوبة التربة بتقنية السعة',
        specs: [
            'قياس رطوبة دقيق',
            'اتصال: Analog',
            'مقاومة للصدأ',
            'عمر طويل',
            'استهلاك طاقة منخفض'
        ]
    },
    {
        id: 11,
        name: 'MPU6050 SENSOR',
        category: 'sensors',
        price: 23,
        originalPrice: 36,
        image: 'images/mpu6050-sensor.png',
        description: 'حساس التسارع والجيروسكوب 6-Axis',
        specs: [
            'قياس التسارع (±2g إلى ±16g)',
            'قياس الدوران (±250 إلى ±2000°/s)',
            'اتصال: I2C',
            'دقة عالية',
            'الجهد: 3.3V - 5V'
        ]
    },
    {
        id: 12,
        name: 'MATRIX KEYBOARD 3x4',
        category: 'sensors',
        price: 14,
        originalPrice: 22,
        image: 'images/matrix-keypad-3x4.png',
        description: 'لوحة مفاتيح مصفوفية 3x4 (12 زر)',
        specs: [
            '12 زر في مصفوفة 3 صفوف × 4 أعمدة',
            'اتصال: 7 أسلاك',
            'جودة عالية',
            'مناسب للمشاريع',
            'سهل البرمجة'
        ]
    },
    {
        id: 13,
        name: 'V2.0 Capacitive Soil Moisture',
        category: 'sensors',
        price: 19,
        originalPrice: 30,
        image: 'images/capacitive-soil-moisture-v2.png',
        description: 'حساس رطوبة التربة النسخة 2',
        specs: [
            'نطاق الرطوبة: 0% - 100%',
            'دقة عالية',
            'مقاومة للتآكل',
            'قراءة analog',
            'بطاريتين للمقارنة'
        ]
    },
    {
        id: 14,
        name: 'WATER PUMP',
        category: 'sensors',
        price: 21,
        originalPrice: 33,
        image: 'images/water-pump.png',
        description: 'مضخة مياه صغيرة 5V',
        specs: [
            'الجهد: 5V DC',
            'معدل التدفق: 200-240 L/H',
            'تيار: 400 mA',
            'خرج: 8 مم',
            'مادة آمنة للماء النظيف'
        ]
    },
    {
        id: 15,
        name: 'SERVO MOTOR',
        category: 'sensors',
        price: 16,
        originalPrice: 25,
        image: 'images/servo-motor.png',
        description: 'محرك سيرفو 9g صغير',
        specs: [
            'عزم الدوران: 1.5 كجم/سم',
            'السرعة: 0.1 ثانية لـ 60°',
            'الجهد: 4.8V - 6V',
            'نطاق الدوران: 180°',
            'وزن خفيف'
        ]
    },
    {
        id: 16,
        name: 'MATRIX KEYBOARD 4x4',
        category: 'sensors',
        price: 19,
        originalPrice: 30,
        image: 'images/matrix-keypad-4x4.png',
        description: 'لوحة مفاتيح مصفوفية 4x4 (16 زر)',
        specs: [
            '16 زر في مصفوفة 4 صفوف × 4 أعمدة',
            'اتصال: 8 أسلاك',
            'جودة عالية',
            'مناسب للدخول الأمني',
            'سهل الربط'
        ]
    },
    {
        id: 17,
        name: 'TDS METER V1.0',
        category: 'sensors',
        price: 39,
        originalPrice: 62,
        image: 'images/tds-meter-v1.png',
        description: 'حساس جودة المياه (الملوثات الكلية المذابة)',
        specs: [
            'قياس TDS: 0 - 1000 PPM',
            'دقة: ±2%',
            'درجة الحرارة: 0°C - 50°C',
            'اتصال: Analog',
            'مستشعر رقمي موثوق'
        ]
    },
    {
        id: 18,
        name: 'AHT20+BMP280',
        category: 'sensors',
        price: 22,
        originalPrice: 35,
        image: 'images/aht20-bmp280.png',
        description: 'حساس درجة الحرارة والرطوبة والضغط الجوي',
        specs: [
            'AHT20: درجة حرارة ورطوبة دقيقة',
            'BMP280: ضغط جوي وارتفاع',
            'اتصال: I2C',
            'دقة عالية جداً',
            'استهلاك طاقة منخفض'
        ]
    },
    {
        id: 19,
        name: 'L298N MOTOR DRIVER',
        category: 'sensors',
        price: 19,
        originalPrice: 30,
        image: 'images/l298n-motor-driver.png',
        description: 'وحدة تحكم المحركات DC و Stepper',
        specs: [
            'قوة: 2A لكل قنوة',
            'الجهد: 5V - 35V',
            'محركات: حتى 2 محرك DC أو 1 Stepper',
            'PWM للتحكم بالسرعة',
            'مدخل logic: 5V'
        ]
    },
    {
        id: 20,
        name: 'MICRO SD CARD READER',
        category: 'sensors',
        price: 16,
        originalPrice: 25,
        image: 'images/micro-sd-card-reader.png',
        description: 'وحدة قراءة بطاقات microSD',
        specs: [
            'اتصال: SPI',
            'سرعة: حتى 40 Mbit/s',
            'دعم: microSD و microSDHC',
            'الجهد: 3.3V - 5V',
            'حجم صغير'
        ]
    },
    {
        id: 21,
        name: 'DS18B20 SENSOR',
        category: 'sensors',
        price: 18,
        originalPrice: 28,
        image: 'images/ds18b20-sensor.png',
        description: 'حساس درجة الحرارة الرقمي',
        specs: [
            'نطاق القراءة: -55°C إلى +125°C',
            'دقة: ±0.5°C',
            'اتصال: 1-Wire',
            'عدد البتات: 9 إلى 12 بت',
            'الجهد: 3.3V - 5V'
        ]
    },
    {
        id: 22,
        name: 'JUMPER WIRE',
        category: 'sensors',
        price: 11,
        originalPrice: 18,
        image: 'images/jumper-wire.png',
        description: 'أسلاك ربط متعددة الألوان',
        specs: [
            'طول: 10 سم',
            'عدد الأسلاك: 40 سلك',
            'ألوان متنوعة (Male-Female)',
            'جودة عالية',
            'سهل الاستخدام'
        ]
    },
    {
        id: 23,
        name: 'ACS712 30A RANGE',
        category: 'sensors',
        price: 30,
        originalPrice: 48,
        image: 'images/acs712-30a.png',
        description: 'حساس التيار الكهربائي 30A',
        specs: [
            'نطاق: ±30A',
            'دقة: ±1.5%',
            'اتصال: Analog',
            'العزل: 2500V',
            'الجهد: 5V'
        ]
    },
    {
        id: 24,
        name: 'JOYSTICK',
        category: 'sensors',
        price: 10,
        originalPrice: 16,
        image: 'images/joystick.png',
        description: 'عصا تحكم Joystick 2-axis',
        specs: [
            'محاور: X و Y',
            'زر pushbutton مدمج',
            'اتصال: Analog (3 دبابيس)',
            'تأثير ممتص الصدمات',
            'دقيق وسريع الاستجابة'
        ]
    },
    {
        id: 25,
        name: 'RELAY MODULE HIGH 5V',
        category: 'sensors',
        price: 13,
        originalPrice: 20,
        image: 'images/relay-module-5v.png',
        description: 'وحدة Relay للتحكم بالأجهزة',
        specs: [
            'الجهد: 5V',
            'تحويل: 10A @ 250VAC',
            'مؤشر LED',
            'ترانزستور حماية',
            'جودة عالية'
        ]
    },

    // Displays
    {
        id: 26,
        name: 'SH1107 OLED DISPLAY',
        category: 'displays',
        price: 109,
        originalPrice: 170,
        image: 'images/sh1107-oled-display.png',
        description: 'شاشة OLED 1.3 بوصة بدقة عالية',
        specs: [
            'حجم: 1.3 بوصة',
            'دقة: 128 × 64 بكسل',
            'اللون: أحادي اللون',
            'اتصال: I2C أو SPI',
            'استهلاك طاقة منخفض جداً'
        ]
    },
    {
        id: 27,
        name: 'LCD 1602 WITH I2C',
        category: 'displays',
        price: 27,
        originalPrice: 42,
        image: 'images/lcd-1602-i2c.png',
        description: 'شاشة LCD 16x2 مع وحدة I2C',
        specs: [
            'أحرف: 16x2',
            'اتصال: I2C (عنوان: 0x27)',
            'الجهد: 5V',
            'إضاءة خلفية',
            'سهل البرمجة'
        ]
    },
    {
        id: 28,
        name: 'SH1107 OLED SCREEN',
        category: 'displays',
        price: 109,
        originalPrice: 170,
        image: 'images/sh1107-oled-screen.png',
        description: 'شاشة OLED 1.3 بوصة متقدمة',
        specs: [
            'حجم: 1.3 بوصة',
            'دقة: 128 × 64 بكسل',
            'نسبة التباين العالية',
            'استجابة سريعة جداً',
            'مثالي للتطبيقات المتقدمة'
        ]
    }
];

// ==================== REVIEWS DATA ====================
const reviews = [
    {
        name: 'mr.stornyt',
        text: 'جاني المستشعرات وكل الجهاز مع بعض مغلف كويس وشرح لي كل التفاصيل، أنصحكم تتعاملون معه.',
        rating: 5
    },
    {
        name: 'mr.stornyt',
        text: 'تعاملت معه لأنه كان عندي هاكاثون ومشروع يبيله برمجة ومستشعرات طبية... ما قصّر أبداً اشتغل من ذمّته... أنصحكم فيه.',
        rating: 5
    },
    {
        name: 'عميل',
        text: 'شغله ما شاء الله رهيب.',
        rating: 5
    },
    {
        name: 'm.ddddi',
        text: 'صراحة الرجال متعاون جداً وشغله مضمون، سويت عنده مشروع تخرج أردوينو وما قصّر معي في شيء، أنصح بالتعامل معه.',
        rating: 5
    },
    {
        name: 'عضو #15049',
        text: 'بصراحة أنصح بالتعامل معه، الرجال خدوم في أيام قليلة وخلص المشروع.',
        rating: 5
    },
    {
        name: 'أحمد هاني آل عمير',
        text: 'الرجال واجد طيب وتعامله راقي، يستاهل 10/10 وفنّان في المشاريع.',
        rating: 5
    },
    {
        name: 'store_nawaf',
        text: 'الرجال ما قصّر، كان عندي مشروع حاولت تشغيله أكثر من مرّة وجا الرجال وعطاني الكود البرمجي واشتغل معي الحمد لله.',
        rating: 5
    }
];

// ==================== CART MANAGEMENT ====================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    renderCartItems();
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            quantity: 1
        });
    }
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        updateCart();
    }
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartSaved = document.getElementById('cartSaved');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">السلة فارغة</p>';
        cartTotal.textContent = '0 ر.س';
        cartSaved.textContent = '0 ر.س';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E'">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} ر.س</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotal = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const saved = originalTotal - total;

    cartTotal.textContent = `${total} ر.س`;
    cartSaved.textContent = `${saved} ر.س`;
}

// ==================== NAVIGATION ====================
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const navMenu = document.getElementById('navMenu');
const menuBtn = document.getElementById('menuBtn');
const navClose = document.getElementById('navClose');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
const navbar = document.getElementById('navbar');
const logo = document.querySelector('.logo');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

navClose.addEventListener('click', () => {
    navMenu.classList.remove('open');
});

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    logo.classList.add('hidden');
    navbar.classList.add('logo-hidden');
});

cartClose.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    logo.classList.remove('hidden');
    navbar.classList.remove('logo-hidden');
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    logo.classList.remove('hidden');
    navbar.classList.remove('logo-hidden');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        
        navMenu.classList.remove('open');
    });
});

// ==================== CAROUSEL ====================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const dotsContainer = document.getElementById('dots');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[n].classList.add('active');
    
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === n);
    });
    
    currentSlide = n;
}

function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
}

// Initialize carousel
slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
});

document.getElementById('prevBtn').addEventListener('click', prevSlide);
document.getElementById('nextBtn').addEventListener('click', nextSlide);

setInterval(nextSlide, 4000);

// ==================== PRODUCTS RENDERING ====================
function renderProducts(filteredProducts = products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = filteredProducts.map(product => {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        return `
            <div class="product-card" onclick="showProductDetails(${product.id})">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%25%22 height=%22100%25%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2218%22 fill=%22%23999%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E${product.image}%3C/text%3E%3C/svg%3E'">
                    <span class="discount-badge">-${discount}%</span>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category === 'microcontrollers' ? 'متحكمات' : product.category === 'sensors' ? 'حساسات' : 'شاشات'}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-prices">
                        <div class="original-price">${product.originalPrice} ر.س</div>
                        <div class="current-price">${product.price} ر.س</div>
                    </div>
                    <button class="add-btn" onclick="event.stopPropagation(); addToCart(products.find(p => p.id === ${product.id}))">
                        <i class="fas fa-plus"></i> أضف
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ==================== PRODUCT DETAILS MODAL ====================
const modal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const saved = product.originalPrice - product.price;

    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductCategory').textContent = 
        product.category === 'microcontrollers' ? 'متحكمات' : 
        product.category === 'sensors' ? 'حساسات' : 'شاشات';
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalOriginalPrice').textContent = `${product.originalPrice} ر.س`;
    document.getElementById('modalCurrentPrice').textContent = `${product.price} ر.س`;
    document.getElementById('modalDiscountPercentage').textContent = `-${discount}%`;
    document.getElementById('modalSaved').textContent = `وفّرت ${saved} ر.س 🎉`;

    const specsList = document.getElementById('modalSpecifications');
    specsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');

    document.getElementById('modalAddBtn').onclick = () => {
        addToCart(product);
        modal.classList.remove('open');
        modalOverlay.classList.remove('open');
    };

    modal.classList.add('open');
    modalOverlay.classList.add('open');
}

modalClose.addEventListener('click', () => {
    modal.classList.remove('open');
    modalOverlay.classList.remove('open');
});

modalOverlay.addEventListener('click', () => {
    modal.classList.remove('open');
    modalOverlay.classList.remove('open');
});

// ==================== CATEGORY FILTERS ====================
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        const filtered = category === 'all' ? products : products.filter(p => p.category === category);
        renderProducts(filtered);
    });
});

// ==================== TOP PRODUCTS SECTION ====================
function renderTopProducts() {
    const topProductIds = [3, 1, 9, 8, 2, 26, 25, 24];
    const topProducts = topProductIds.map(id => products.find(p => p.id === id));
    
    const grid = document.getElementById('topProductsGrid');
    grid.innerHTML = topProducts.map(product => {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        return `
            <div class="product-card" onclick="showProductDetails(${product.id})">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E'">
                    <span class="discount-badge">-${discount}%</span>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category === 'microcontrollers' ? 'متحكمات' : product.category === 'sensors' ? 'حساسات' : 'شاشات'}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-prices">
                        <div class="original-price">${product.originalPrice} ر.س</div>
                        <div class="current-price">${product.price} ر.س</div>
                    </div>
                    <button class="add-btn" onclick="event.stopPropagation(); addToCart(products.find(p => p.id === ${product.id}))">
                        <i class="fas fa-plus"></i> أضف
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ==================== REVIEWS RENDERING ====================
function renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    grid.innerHTML = reviews.map(review => {
        const initials = review.name.split(' ').map(w => w[0]).join('').toUpperCase();
        return `
            <div class="review-card">
                <div class="review-stars">${'⭐'.repeat(review.rating)}</div>
                <p class="review-text">"${review.text}"</p>
                <div class="review-author">
                    <div class="review-avatar">${initials}</div>
                    <div class="review-name">${review.name}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ==================== VIEW ALL PRODUCTS ====================
document.getElementById('viewAllBtn').addEventListener('click', () => {
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById('products').classList.add('active');
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    const whatsappUrl = `https://wa.me/966552645082?text=اسمي: ${name}%0Aالبريد: ${email}%0Aالهاتف: ${phone}%0Aالرسالة: ${message}`;
    window.open(whatsappUrl, '_blank');
    
    contactForm.reset();
});

// ==================== ORDER BUTTON ====================
document.getElementById('orderBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('السلة فارغة');
        return;
    }
    
    const cartText = cart.map(item => `${item.name} x${item.quantity}`).join('%0A');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = `طلب جديد:%0A${cartText}%0A%0Aالمجموع: ${total} ر.س`;
    
    const whatsappUrl = `https://wa.me/966552645082?text=${message}`;
    window.open(whatsappUrl, '_blank');
});

// ==================== INITIALIZATION ====================
renderProducts();
renderTopProducts();
renderReviews();
updateCartUI();

console.log('iBoardz Store Loaded Successfully! ✨');
