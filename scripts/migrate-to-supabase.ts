/**
 * Migration Script: JSON to Supabase
 *
 * This script reads existing data from JSON files and imports it into Supabase.
 *
 * Usage:
 * 1. Make sure you have set up Supabase and run the supabase-schema.sql
 * 2. Set your environment variables in .env.local:
 *    - NEXT_PUBLIC_SUPABASE_URL
 *    - NEXT_PUBLIC_SUPABASE_ANON_KEY
 * 3. Run: npx tsx scripts/migrate-to-supabase.ts
 */

import { readFileSync } from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Read JSON files
const dataDir = path.join(process.cwd(), 'data');

function readJSON<T>(filename: string): T[] {
  const filePath = path.join(dataDir, filename);
  try {
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.warn(`⚠️  Could not read ${filename}:`, error);
    return [];
  }
}

async function migrateProducts() {
  console.log('\n📦 Migrating products...');
  const products = readJSON('products.json');

  if (products.length === 0) {
    console.log('   No products to migrate');
    return;
  }

  // Map field names to match database schema
  const productsToInsert = products.map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price || 0,
    original_price: p.originalPrice || null,
    collection: p.collection || '',
    colors: p.colors || [],
    image: p.image || '',
    images: p.images || [],
    description: p.description || '',
    material: p.material || '',
    care: p.care || '',
    size: p.size || '115cm x 115cm',
    is_new: p.isNew || false,
    is_promo: p.isPromo || false,
    rating: p.rating || null,
    sold: p.sold || 0,
    created_at: p.createdAt || new Date().toISOString(),
    updated_at: p.updatedAt || new Date().toISOString(),
  }));

  // Insert in batches to avoid rate limits
  const batchSize = 50;
  for (let i = 0; i < productsToInsert.length; i += batchSize) {
    const batch = productsToInsert.slice(i, i + batchSize);
    const { error } = await supabase.from('products').insert(batch);
    if (error) {
      console.error('   ❌ Error inserting products:', error.message);
    } else {
      console.log(`   ✅ Inserted ${Math.min(i + batchSize, productsToInsert.length)} / ${productsToInsert.length} products`);
    }
  }
}

async function migrateCollections() {
  console.log('\n📁 Migrating collections...');
  const collections = readJSON('collections.json');

  if (collections.length === 0) {
    console.log('   No collections to migrate');
    return;
  }

  const collectionsToInsert = collections.map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || '',
    image: c.image || '',
    product_count: c.productCount || 0,
    created_at: c.createdAt || new Date().toISOString(),
  }));

  const { error } = await supabase.from('collections').insert(collectionsToInsert);
  if (error) {
    console.error('   ❌ Error inserting collections:', error.message);
  } else {
    console.log(`   ✅ Inserted ${collectionsToInsert.length} collections`);
  }
}

async function migrateOrders() {
  console.log('\n🛒 Migrating orders...');
  const orders = readJSON('orders.json');

  if (orders.length === 0) {
    console.log('   No orders to migrate');
    return;
  }

  const ordersToInsert = orders.map((o: any) => ({
    id: o.id,
    customer_name: o.customerName,
    email: o.email,
    phone: o.phone,
    address: o.address,
    city: o.city,
    province: o.province,
    postal_code: o.postalCode,
    items: o.items,
    subtotal: o.subtotal,
    shipping_cost: o.shippingCost || 0,
    total: o.total,
    payment_method: o.paymentMethod,
    payment_status: o.paymentStatus || 'pending',
    order_status: o.orderStatus || 'pending',
    notes: o.notes || '',
    created_at: o.createdAt || new Date().toISOString(),
    updated_at: o.updatedAt || new Date().toISOString(),
  }));

  const { error } = await supabase.from('orders').insert(ordersToInsert);
  if (error) {
    console.error('   ❌ Error inserting orders:', error.message);
  } else {
    console.log(`   ✅ Inserted ${ordersToInsert.length} orders`);
  }
}

async function main() {
  console.log('🚀 Starting migration to Supabase...\n');

  // Test connection
  const { error: testError } = await supabase.from('products').select('count').limit(1);
  if (testError) {
    console.error('❌ Cannot connect to Supabase:', testError.message);
    console.error('Make sure you have run the supabase-schema.sql in your Supabase SQL Editor');
    process.exit(1);
  }
  console.log('✅ Connected to Supabase\n');

  // Run migrations
  await migrateProducts();
  await migrateCollections();
  await migrateOrders();

  console.log('\n✅ Migration completed!\n');
  console.log('⚠️  IMPORTANT: After migration, your data is now in Supabase.');
  console.log('   The JSON files in /data are no longer used on production.');
  console.log('   You can now deploy to Vercel.\n');
}

main().catch(console.error);
