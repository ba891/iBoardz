(function(factory) {
  const catalog = factory();
  if (typeof module === 'object' && module.exports) module.exports = catalog;
  if (typeof window !== 'undefined') window.IBOARDZ_CATALOG = catalog;
})(function() {
  return {
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
      { id:34, name:'SWITCH ON/OFF (مفتاح تبديل)', price:5.75, op:8, cat:'input', img:'switch-on-off.webp', specs:['مفتاح Rocker للتشغيل والإيقاف','حمل حتى 10A / 250VAC','3 أطراف (داخل / خارج / أرضي)','بدون إضاءة LED','حجم صغير يناسب اللوحات'], desc:'مفتاح تبديل On/Off لتشغيل وإيقاف الأحمال الكهربائية في المشاريع' },
      { id:35, name:'TP4056 CHARGER MODULE', price:5.75, op:8, cat:'accessory', img:'tp4056.webp', specs:['شاحن بطاريات ليثيوم Li-ion','تيار الشحن حتى 1A (قابل للضبط)','منفذ إدخال USB Type-C','حماية من الشحن الزائد والتفريغ العميق','أطراف بطارية B+ / B-'], desc:'موديول شحن بطاريات الليثيوم Li-ion بمنفذ USB-C مع حماية كاملة من الشحن الزائد' },
      { id:36, name:'MT3608 DC-DC STEP UP CONVERTER', price:6.75, op:10, cat:'accessory', img:'mt3036.jpg', specs:['رفع الجهد من 2V إلى 24V','تيار خرج حتى 2A','كفاءة تحويل عالية','ضبط الجهد بمقاومة متغيرة','أطراف VIN+ / VIN- / VOUT+ / VOUT-'], desc:'محوّل DC-DC لرفع الجهد حتى 24V باستخدام شريحة MT3608 للأجهزة والمشاريع' },
    ],
  };
});
