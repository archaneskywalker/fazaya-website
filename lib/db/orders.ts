import { supabase } from '../supabase';

export interface OrderItem {
  id: string;
  name: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  items: OrderItem[];
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderInput {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost?: number;
  total: number;
  paymentMethod: string;
  notes?: string;
}

export async function getAllOrders(): Promise<Order[]> {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  if (!supabase) throw new Error('Supabase not configured');

  const order = {
    id: `ORD-${Date.now()}`,
    customer_name: input.customerName,
    email: input.email,
    phone: input.phone,
    address: input.address,
    city: input.city,
    province: input.province,
    postal_code: input.postalCode,
    items: input.items,
    subtotal: input.subtotal,
    shipping_cost: input.shippingCost ?? 0,
    total: input.total,
    payment_method: input.paymentMethod,
    payment_status: 'pending',
    order_status: 'pending',
    notes: input.notes ?? '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateOrderStatus(id: string, orderStatus: string): Promise<Order> {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('orders')
    .update({
      order_status: orderStatus,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteOrder(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function deleteAllOrders(): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('orders')
    .delete()
    .neq('id', '0000000-0000-0000-0000-000000000000');

  if (error) throw error;
}
