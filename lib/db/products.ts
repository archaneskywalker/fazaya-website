import { supabase } from '../supabase';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price: number | null;
  collection: string;
  colors: string[];
  image: string;
  images: string[];
  description: string;
  material: string;
  care: string;
  size: string;
  is_new: boolean;
  is_promo: boolean;
  rating: number | null;
  sold: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  collection: string;
  colors: string[];
  image: string;
  images?: string[];
  description: string;
  material: string;
  care: string;
  size: string;
  isNew: boolean;
  isPromo: boolean;
  rating?: number | null;
  sold?: number;
}

export async function getAllProducts(): Promise<Product[]> {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  if (!supabase) throw new Error('Supabase not configured');

  const product = {
    id: crypto.randomUUID(),
    name: input.name,
    slug: input.slug,
    price: input.price,
    original_price: input.originalPrice ?? null,
    collection: input.collection,
    colors: input.colors || [],
    image: input.image,
    images: input.images || [],
    description: input.description || '',
    material: input.material || '',
    care: input.care || '',
    size: input.size || '115cm x 115cm',
    is_new: input.isNew,
    is_promo: input.isPromo,
    rating: input.rating ?? null,
    sold: input.sold ?? 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  console.log('Inserting product:', product);

  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }
  return data;
}

export async function updateProduct(id: string, updates: Partial<CreateProductInput>): Promise<Product> {
  if (!supabase) throw new Error('Supabase not configured');

  const updateData: any = { ...updates, updated_at: new Date().toISOString() };

  // Map field names to snake_case
  if (updateData.originalPrice !== undefined) {
    updateData.original_price = updateData.originalPrice;
    delete updateData.originalPrice;
  }
  if (updateData.isNew !== undefined) {
    updateData.is_new = updateData.isNew;
    delete updateData.isNew;
  }
  if (updateData.isPromo !== undefined) {
    updateData.is_promo = updateData.isPromo;
    delete updateData.isPromo;
  }

  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
