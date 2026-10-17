/**
 * One-off (but re-runnable) migration: the dashboard's seeded database still
 * referenced the old flat image names ("esp32-dev-model.png").
 *
 * Since every product now lives in images/products/<slug>/<file>, this script
 * rewrites `img` for every catalog record from the storefront catalog
 * (catalog-data.js), which is the single source of truth.
 *
 *   node scripts/migrate-store-images.js [--dry]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DB = path.join(ROOT, '..', 'store-dashboard', 'data', 'store.json');
const catalog = require(path.join(ROOT, 'catalog-data.js'));

const dry = process.argv.includes('--dry');
const bySku = new Map(catalog.products.map((p) => [p.sku, p]));
const byId = new Map(catalog.products.map((p) => [String(p.id), p]));

const db = JSON.parse(fs.readFileSync(DB, 'utf8'));
let changed = 0;
const problems = [];

(db.catalog || []).forEach((row) => {
  const product = bySku.get(row.sku) || byId.get(String(row.id));
  if (!product) {
    problems.push(`no catalog product for sku=${row.sku} id=${row.id}`);
    return;
  }
  const file = path.join(ROOT, 'images', ...product.img.split('/'));
  if (!fs.existsSync(file)) problems.push(`missing file for ${product.sku}: images/${product.img}`);
  if (row.img !== product.img) {
    row.img = product.img;
    changed++;
  }
});

console.log(`catalog records: ${(db.catalog || []).length}`);
console.log(`img values updated: ${changed}`);
if (problems.length) {
  console.log('problems:');
  problems.forEach((p) => console.log('  - ' + p));
}

if (!dry) {
  db.updatedAt = new Date().toISOString();
  fs.writeFileSync(DB, JSON.stringify(db, null, 2) + '\n', 'utf8');
  console.log('store.json written');
} else {
  console.log('dry run — nothing written');
}

process.exit(problems.length ? 1 : 0);
