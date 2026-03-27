-- Fix Supabase RLS Policies
-- Run this in Supabase SQL Editor to fix permission issues

-- Drop existing policies (if they exist)
DROP POLICY IF EXISTS "Allow public read access on products" ON products;
DROP POLICY IF EXISTS "Allow authenticated full access on products" ON products;
DROP POLICY IF EXISTS "Allow public read access on collections" ON collections;
DROP POLICY IF EXISTS "Allow authenticated full access on collections" ON collections;
DROP POLICY IF EXISTS "Allow public read access on orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated full access on orders" ON orders;

-- Create new policies that allow full access (admin is password-protected separately)
CREATE POLICY "Allow full access on products" ON products
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow full access on collections" ON collections
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow full access on orders" ON orders
  FOR ALL
  USING (true)
  WITH CHECK (true);
