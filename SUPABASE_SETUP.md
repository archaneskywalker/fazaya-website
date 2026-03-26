# Supabase Setup Guide for Fazaya Website

This guide will help you set up Supabase database for your Fazaya website.

## Step 1: Set Up Supabase Project

### 1.1 Go to Your Supabase Project
Open: https://supabase.com/dashboard/project/jrtjylpwepjgitvgnffn

### 1.2 Run the SQL Schema
1. Click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Click **Run** to execute the SQL

This creates:
- `products` table
- `collections` table
- `orders` table
- Row Level Security policies
- Indexes for performance

### 1.3 Get Your API Credentials
1. Click **Settings** (gear icon) in the left sidebar
2. Click **API**
3. Copy these values:
   - **Project URL** (e.g., `https://jrtjylpwepjgitvgnffn.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 2: Configure Local Environment

Edit `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with the actual values from Step 1.3.

## Step 3: Migrate Existing Data

Run the migration script to copy your existing JSON data to Supabase:

```bash
npx tsx scripts/migrate-to-supabase.ts
```

This will:
- Read products from `data/products.json`
- Read collections from `data/collections.json`
- Read orders from `data/orders.json`
- Insert them into Supabase

## Step 4: Test Locally

```bash
npm run dev
```

Go to:
- http://localhost:3000/admin/products - Should load from Supabase
- http://localhost:3000/admin/collections - Should load from Supabase
- http://localhost:3000/collections/all - Should show products from Supabase

Try creating/editing/deleting a product - it should save to Supabase.

## Step 5: Configure Vercel

### 5.1 Add Environment Variables to Vercel
1. Go to https://vercel.com/archaneskywalkers-projects/fazaya-website/settings/environment-variables
2. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key

### 5.2 Deploy to Vercel
The code is already pushed to GitHub. Vercel will automatically redeploy.

Or trigger a manual deploy:
```bash
git commit --allow-empty -m "Trigger Vercel deploy"
git push origin master
```

## Step 6: Verify Production

After Vercel deploys:
1. Open your production URL
2. Go to `/admin/products`
3. Try adding a new product
4. Check that it appears in the list
5. Try deleting it

## Troubleshooting

### "Supabase not configured" error
Make sure `.env.local` has valid Supabase URL and anon key.

### "Failed to fetch products"
Check that:
1. SQL schema was run successfully in Supabase
2. Environment variables are correct
3. Row Level Security policies are enabled

### Data not showing after migration
Run the migration script again:
```bash
npx tsx scripts/migrate-to-supabase.ts
```

## File Reference

### New Files Created
- `lib/supabase.ts` - Supabase client
- `lib/db/products.ts` - Product database operations
- `lib/db/collections.ts` - Collection database operations
- `lib/db/orders.ts` - Order database operations
- `scripts/migrate-to-supabase.ts` - Data migration script
- `supabase-schema.sql` - Database schema

### Modified Files
- `app/api/admin/products/route.ts`
- `app/api/admin/products/[id]/route.ts`
- `app/api/admin/collections/route.ts`
- `app/api/admin/collections/[id]/route.ts`
- `app/api/admin/orders/route.ts`
- `app/api/admin/orders/[id]/route.ts`
- `app/api/admin/stats/route.ts`
- `app/api/admin/analytics/route.ts`
- `app/api/products/route.ts`
- `app/api/collections/route.ts`
- `.env.local`

## Important Notes

1. **JSON files are no longer used** - After migration, all data is stored in Supabase
2. **Local testing still works** - The build handles missing Supabase credentials gracefully
3. **Vercel requires environment variables** - Add them before testing on production

## Need Help?

- Supabase Dashboard: https://supabase.com/dashboard/project/jrtjylpwepjgitvgnffn
- Vercel Dashboard: https://vercel.com/archaneskywalkers-projects/fazaya-website
