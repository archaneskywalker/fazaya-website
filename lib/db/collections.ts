import { supabase } from '../supabase';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  product_count: number;
  created_at: string;
}

export interface CreateCollectionInput {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export async function getAllCollections(): Promise<Collection[]> {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

export async function createCollection(input: CreateCollectionInput): Promise<Collection> {
  if (!supabase) throw new Error('Supabase not configured');

  const collection = {
    ...input,
    product_count: 0,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('collections')
    .insert([collection])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCollection(id: string, updates: Partial<CreateCollectionInput>): Promise<Collection> {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('collections')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCollection(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
