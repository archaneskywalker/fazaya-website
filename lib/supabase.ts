import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Only create client if we have valid credentials
const isValidUrl = supabaseUrl.startsWith('https://') && !supabaseUrl.includes('placeholder');

export const supabase = isValidUrl
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
