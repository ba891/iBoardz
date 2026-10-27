/**
 * Search + catalog integrity tests.
 *   node --test tests/search.test.js
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const S = require(path.join(ROOT, 'assets', 'js', 'search-engine.js'));
const catalog = require(path.join(ROOT, 'catalog-data.js'));

const index = S.build(catalog.products, catalog.categories);
const top = (q) => {
  const r = S.query(index, q, { limit: 5 });
  return r.results.length ? r.results[0].product.name : '';
};

// ---------------------------------------------------------------- top hits
const EXPECTED_TOP = {
  'اردوينو': 'ARDUINO UNO R3',
  'arduino': 'ARDUINO UNO R3',
  'إردوينو': 'ARDUINO UNO R3',
  'ESP32': 'ESP32 DEV MODEL',
  'esp 32': 'ESP32 DEV MODEL',
  'حساس حرارة': 'DHT11 SENSOR',
  'حراره': 'DHT11 SENSOR',
  'سنسور حراره': 'DHT11 SENSOR',
  'شاشة oled': 'SH1107 OLED DISPLAY',
  'شاشه': 'SH1107 OLED DISPLAY',
  'بطاريه 3.7': 'بطارية ليثيوم ايون 3.7V 1800mAh',
  'اسلاك': 'JUMPER WIRES',
  'أسلاك توصيل': 'JUMPER WIRES',
  'مقاوم': 'مقاومات',
  'سيرفو': 'SERVO MOTOR',
  'ريليه': 'RELAY MODULE HIGH 5V',
  'mq2': 'MQ-2 GAS SENSOR',
  'MQ 135': 'MQ-135 GAS SENSOR',
  'servo motor': 'SERVO MOTOR',
  'breadboard': 'BREADBOARD لوحة تجارب',
  'لوح تجارب': 'BREADBOARD لوحة تجارب',
  'مضخة مياه': 'WATER PUMP',
  'كرت sd': 'MICRO SD CARD READER',
  'زر': 'SWITCH ON/OFF (مفتاح تبديل)',
  // typo tolerance
  'esp3': 'ESP32 C3 MINI',
  'dth11': 'DHT11 SENSOR',
  'sirvo': 'SERVO MOTOR',
  'hlc-sr04': 'HC-SR04 ULTRASONIC',
  'oeld': 'SH1107 OLED DISPLAY',
  'ريلاي': 'RELAY MODULE HIGH 5V',
  // partial words (what the user types before finishing the word)
  'ار': 'ARDUINO UNO R3',
  'ارد': 'ARDUINO UNO R3',
  'سير': 'SERVO MOTOR',
  'حسا': 'حساس التبديل المغناطيسي Dry Reed Pipe Module',
  'mq': 'MQ-2 GAS SENSOR',
  'esp': 'ESP32 DEV MODEL',
};

Object.keys(EXPECTED_TOP).forEach((q) => {
  test(`top hit for "${q}" is ${EXPECTED_TOP[q]}`, () => {
    assert.strictEqual(top(q), EXPECTED_TOP[q]);
  });
});

// ------------------------------------------------------- relevance cut-off
// A global store never returns the whole catalogue for one word: the tail of
// weak matches has to be cut away.
const TIGHT = {
  'حساس حرارة': 6,
  'سنسور حراره': 6,
  'مضخة مياه': 6,
  'شاشة oled': 5,
  'اردوينو uno': 6,
  'حراره': 4,
  'mq2': 3,
  'واي فاي': 6,
  'وifi': 0,
};

Object.keys(TIGHT).forEach((q) => {
  test(`"${q}" returns at most ${TIGHT[q]} results`, () => {
    const total = S.query(index, q, { limit: 0 }).total;
    assert.ok(total <= TIGHT[q], `expected <= ${TIGHT[q]}, got ${total}`);
  });
});

const EXACT_TOTALS = {
  'breadboard': 1,
  'لوح تجارب': 1,
  'MQ 135': 1,
  'dth11': 1,
  'hlc-sr04': 1,
  'xyz123': 0,
  '良品': 0,
  'g책': 0,
  // a lone latin letter is noise, a lone Arabic letter is a real prefix
  's': 0,
};

Object.keys(EXACT_TOTALS).forEach((q) => {
  test(`"${q}" returns exactly ${EXACT_TOTALS[q]} result(s)`, () => {
    assert.strictEqual(S.query(index, q, { limit: 0 }).total, EXACT_TOTALS[q]);
  });
});

// ------------------------------------------------------------- normalising
test('Arabic normalization', () => {
  assert.strictEqual(S.normalize('أردوينو'), 'اردوينو');
  assert.strictEqual(S.normalize('إردوينو'), 'اردوينو');
  assert.strictEqual(S.normalize('ARDUINO'), 'arduino');
  assert.strictEqual(S.normalize('أردوينو ٢'), 'اردوينو 2');
  assert.strictEqual(S.normalize('بِطارِيّة'), 'بطاريه');
  assert.deepStrictEqual(S.tokenize('esp32'), ['esp', '32']);
  assert.deepStrictEqual(S.tokenize('ds18b20'), ['ds', '18', 'b', '20']);
  assert.deepStrictEqual(S.tokenize('mq-2'), ['mq', '2']);
});

test('highlight marks the query and escapes HTML', () => {
  assert.strictEqual(
    S.highlight('ESP32 DEV MODEL', S.tokenize('esp32')),
    '<mark>ESP32</mark> DEV MODEL'
  );
  assert.strictEqual(S.highlight('<b>x</b>', []), '&lt;b&gt;x&lt;/b&gt;');
});

test('a category pool only returns its own products', () => {
  const pool = catalog.products.filter((p) => p.cat === 'mcu');
  const r = S.query(index, 'board', { pool, limit: 0 });
  assert.ok(r.total > 0);
  r.results.forEach((x) => assert.strictEqual(x.product.cat, 'mcu'));
});

test('queries stay instant while typing', () => {
  const t0 = Date.now();
  for (let i = 0; i < 200; i++) S.query(index, 'اردوينو uno', { limit: 8 });
  const ms = Date.now() - t0;
  assert.ok(ms < 1500, `200 queries took ${ms}ms`);
});

// ------------------------------------------------------- catalog integrity
test('every product has a unique id, slug, sku and category', () => {
  const seen = { id: new Set(), slug: new Set(), sku: new Set() };
  catalog.products.forEach((p) => {
    ['id', 'slug', 'sku', 'cat', 'name', 'nameAr'].forEach((k) => {
      assert.ok(p[k] !== undefined && p[k] !== '', `${p.id} missing ${k}`);
    });
    assert.ok(!seen.id.has(p.id), `duplicate id ${p.id}`);
    assert.ok(!seen.slug.has(p.slug), `duplicate slug ${p.slug}`);
    assert.ok(!seen.sku.has(p.sku), `duplicate sku ${p.sku}`);
    seen.id.add(p.id);
    seen.slug.add(p.slug);
    seen.sku.add(p.sku);
    assert.ok(
      catalog.categories.some((c) => c.key === p.cat),
      `${p.id} has unknown category ${p.cat}`
    );
  });
});

test('every product image lives in images/<slug>/ and exists on disk', () => {
  catalog.products.forEach((p) => {
    assert.ok(
      p.img.indexOf('products/' + p.slug + '/') === 0,
      `${p.id}: image "${p.img}" is not inside images/${p.slug}/`
    );
    const abs = path.join(ROOT, 'images', ...p.img.split('/'));
    assert.ok(fs.existsSync(abs), `${p.id}: missing file images/${p.img}`);
  });
});

test('assets referenced by index.html exist', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const re = /(?:href|src)="([^"#:]+)"/g;
  let m;
  const checked = [];
  while ((m = re.exec(html))) {
    const ref = m[1].trim();
    if (!ref || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(ref)) continue;
    const abs = path.join(ROOT, ref.split('?')[0]);
    assert.ok(fs.existsSync(abs), `index.html references missing file: ${ref}`);
    checked.push(ref);
  }
  assert.ok(checked.length >= 4);
});

test('every product and category has a generated path page', () => {
  catalog.products.forEach((p) => {
    const file = path.join(ROOT, 'product', p.slug, 'index.html');
    assert.ok(fs.existsSync(file), `missing product page for ${p.slug}`);
    const html = fs.readFileSync(file, 'utf8');
    assert.ok(html.includes('data-page="product"'), `${p.slug} page has no product page marker`);
    assert.ok(html.includes(`data-product="${p.slug}"`), `${p.slug} page has no product slug`);
    assert.ok(html.includes(`/product/${p.slug}/`), `${p.slug} page has no canonical product URL`);
  });

  catalog.categories.filter((c) => c.key !== 'all').forEach((c) => {
    const file = path.join(ROOT, 'category', c.key, 'index.html');
    assert.ok(fs.existsSync(file), `missing category page for ${c.key}`);
    const html = fs.readFileSync(file, 'utf8');
    assert.ok(html.includes('data-page="category"'), `${c.key} page has no category page marker`);
    assert.ok(html.includes(`data-category="${c.key}"`), `${c.key} page has no category key`);
    assert.ok(html.includes(`/category/${c.key}/`), `${c.key} page has no canonical category URL`);
  });

  ['shop', 'projects', 'contact', 'terms'].forEach((name) => {
    assert.ok(fs.existsSync(path.join(ROOT, name, 'index.html')), `missing /${name}/ page`);
  });
  assert.ok(fs.existsSync(path.join(ROOT, 'features', 'index.html')), 'missing /features/ redirect page');

  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  catalog.products.forEach((p) => {
    assert.ok(sitemap.includes(`https://iboardz.netlify.app/product/${p.slug}/`), `sitemap missing ${p.slug}`);
  });
  assert.ok(sitemap.includes('https://iboardz.netlify.app/projects/'), 'sitemap missing /projects/');
  assert.ok(!sitemap.includes('https://iboardz.netlify.app/features/'), 'sitemap should not list the old /features/ redirect');
});

test('project kits reference real products and have usable steps', () => {
  assert.ok(Array.isArray(catalog.projects) && catalog.projects.length >= 4, 'no projects in the catalog');
  const productsById = new Map(catalog.products.map((p) => [String(p.id), p]));
  const ids = new Set(productsById.keys());
  const keys = new Set();
  catalog.projects.forEach((project) => {
    assert.ok(project.key && !keys.has(project.key), `project key missing or duplicated: ${project.key}`);
    keys.add(project.key);
    assert.ok(project.title && project.summary, `project ${project.key} missing title/summary`);
    assert.ok(['beginner', 'intermediate', 'advanced'].includes(project.level), `project ${project.key} has bad level`);
    assert.ok(Array.isArray(project.parts) && project.parts.length >= 3, `project ${project.key} has too few parts`);
    project.parts.forEach((part) => {
      assert.ok(ids.has(String(part.id)), `project ${project.key} references missing product ${part.id}`);
      assert.ok(Number(part.qty) >= 1, `project ${project.key} has invalid qty for product ${part.id}`);
    });
    const partsTotal = project.parts.reduce((sum, part) => {
      const product = productsById.get(String(part.id));
      return sum + Number(product.price) * Math.max(1, Number(part.qty) || 1);
    }, 0);
    let expectedPrice = Math.max(1, Math.ceil(partsTotal));
    while (!String(expectedPrice).includes('9')) expectedPrice += 1;
    assert.equal(Number(project.price), expectedPrice, `project ${project.key} price should be the next 9-ending number (${expectedPrice})`);
    assert.ok(Array.isArray(project.steps) && project.steps.length >= 3, `project ${project.key} has too few steps`);
    assert.ok(project.tip, `project ${project.key} has no practical tip`);
  });

  const html = fs.readFileSync(path.join(ROOT, 'projects', 'index.html'), 'utf8');
  assert.ok(html.includes('data-page="projects"'), '/projects/ page has no projects marker');
  assert.ok(html.includes('/projects/'), '/projects/ page has no canonical URL');
  assert.ok(html.includes('HowTo'), '/projects/ page is missing the HowTo structured data');
});

test('the 3D printing service ad is present', () => {
  assert.ok(fs.existsSync(path.join(ROOT, 'images', 'services', '3d-printing-service.jpg')));
  assert.ok(Array.isArray(catalog.services) && catalog.services.length >= 1);
  const svc = catalog.services.find((s) => /3d/i.test(s.title + s.id));
  assert.ok(svc, 'no 3D printing service in the catalog');
  assert.ok(fs.existsSync(path.join(ROOT, 'images', svc.img)));
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert.ok(html.indexOf(svc.img) > -1);
});
