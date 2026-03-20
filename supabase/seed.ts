/**
 * Seed script — inserts mock data into Supabase.
 * Run with:  npx tsx supabase/seed.ts
 */
import { createClient } from '@supabase/supabase-js';
import { mockCategories, mockSubcategories, mockProducts } from '../src/data/mockData';

const url = process.env.VITE_SUPABASE_URL || 'https://hpjrnhqocohzqhbxnnjv.supabase.co';
const key = process.env.SUPABASE_SERVICE_KEY || '';   // use service role key for seeding

if (!key) {
  console.error('Set SUPABASE_SERVICE_KEY env var (Settings > API > service_role secret)');
  process.exit(1);
}

const sb = createClient(url, key);

async function seed() {
  console.log('Seeding categories…');
  const { error: e1 } = await sb.from('categories').upsert(
    mockCategories.map(c => ({
      id: c.id, name: c.name, key: c.key, icon: c.icon, order: c.order, active: c.active,
    })),
    { onConflict: 'id' }
  );
  if (e1) throw e1;

  console.log('Seeding subcategories…');
  const { error: e2 } = await sb.from('subcategories').upsert(
    mockSubcategories.map(s => ({
      id: s.id, category_id: s.categoryId, name: s.name,
      key: s.key, order: s.order, active: s.active,
    })),
    { onConflict: 'id' }
  );
  if (e2) throw e2;

  console.log('Seeding products…');
  const BATCH = 50;
  for (let i = 0; i < mockProducts.length; i += BATCH) {
    const batch = mockProducts.slice(i, i + BATCH);
    const { error: e3 } = await sb.from('products').upsert(
      batch.map(p => ({
        id: p.id, sku: p.sku, name: p.name,
        category_id: p.categoryId, subcategory_id: p.subcategoryId ?? null,
        category_name: p.categoryName ?? null, subcategory_name: p.subcategoryName ?? null,
        price: p.price, stock: p.stock, description: p.description ?? null,
        brand: p.brand ?? null, unit_measure: p.unitMeasure ?? null,
        image_url: p.imageUrl ?? null, weight_kg: p.weightKg ?? null,
        iva: p.iva ?? 21, active: p.active,
      })),
      { onConflict: 'id' }
    );
    if (e3) throw e3;
    console.log(`  products ${i + 1}–${Math.min(i + BATCH, mockProducts.length)} done`);
  }

  console.log('✓ Seed complete!');
}

seed().catch(err => { console.error(err); process.exit(1); });
