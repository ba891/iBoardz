/* Quick search quality check — node tests/search-check.js */
const path = require('path');
const S = require(path.join(__dirname, '..', 'assets', 'js', 'search-engine.js'));
const catalog = require(path.join(__dirname, '..', 'catalog-data.js'));

const index = S.build(catalog.products, catalog.categories);

const queries = [
  'اردوينو', 'arduino', 'ESP32', 'esp32', 'esp 32', 'حساس حرارة', 'حراره',
  'شاشة oled', 'شاشه', 'بطاريه 3.7', 'اسلاك', 'أسلاك توصيل', 'مقاوم',
  'سيرفو', 'ريليه', 'ريلاي', 'mq2', 'MQ 135', 'واي فاي', 'wifi',
  'اردوينو uno', 'servo motor', 'breadboard', 'لوح تجارب', 'مضخة مياه',
  'esp3', 'esp32c', 'dth11', 'sirvo', 'hlc-sr04', 'oeld', 'سنسور حراره',
  'زر', 'كرت sd', '良品', 'xyz123', 'g책', '3d printing',
];

console.log('=== QUERIES ===');
queries.forEach(q => {
  const r = S.query(index, q, { limit: 4 });
  const names = r.results.map(x => `${x.product.name}${x.score.toFixed(1)}`);
  console.log(
    (q + '                                        ').slice(0, 16),
    '=> total', String(r.total).padStart(3),
    '|', (r.corrected ? 'didYouMean: ' + r.suggestion : ''),
    '|', names.slice(0, 3).join(' , ')
  );
});

console.log('\n=== NORMALIZATION ===');
['أردوينو', 'إردوينو', 'اردوينو', 'ARDUINO', 'أردوينو ٢', 'اسلاك', 'أسلاك']
  .forEach(v => console.log(v, '->', S.normalize(v)));

console.log('\n=== HIGHLIGHT ===');
console.log(S.highlight('بطارية ليثيوم ايون 3.7V 1800mAh', S.tokenize('بطارية 3.7')));
console.log(S.highlight('ESP32 DEV MODEL', S.tokenize('esp32')));
console.log(S.highlight('<b>x</b>', []));

console.log('\n=== PERF ===');
const t0 = Date.now();
for (let i = 0; i < 200; i++) S.query(index, 'اردوينو uno', { limit: 8 });
console.log('200 queries in', Date.now() - t0, 'ms');