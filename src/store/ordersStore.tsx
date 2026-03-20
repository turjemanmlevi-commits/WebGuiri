import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Order } from '../types';
import { mockOrders } from '../data/mockData';
import { supabase, supabaseEnabled } from '../lib/supabase';

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

function toOrder(row: any): Order {
  return {
    id: row.id,
    orderId: row.order_id,
    companyId: row.company_id ?? 'comp-demo',
    companyName: row.company_name,
    companyCif: row.company_cif ?? '',
    companyEmail: row.company_email ?? '',
    companyPhone: row.company_phone ?? '',
    contactPerson: row.contact_person ?? '',
    deliveryAddress: row.delivery_address ?? '',
    items: row.order_items?.map((i: any) => ({
      productId: i.product_id,
      sku: i.sku,
      name: i.name,
      categoryName: i.category_name ?? '',
      quantity: i.quantity,
      unitPrice: Number(i.unit_price),
      subtotal: Number(i.subtotal),
    })) ?? [],
    totalItems: row.total_items,
    totalAmount: Number(row.total_amount),
    notes: row.notes ?? undefined,
    status: row.status,
    createdAt: row.created_at,
    estimatedDelivery: row.estimated_delivery,
  };
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  // Load orders from Supabase on mount
  useEffect(() => {
    if (!supabaseEnabled) return;
    supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setOrders(data.map(toOrder));
      });
  }, []);

  const addOrder = useCallback(async (order: Order) => {
    // Optimistically update local state
    setOrders(prev => [order, ...prev]);

    if (!supabaseEnabled) return;

    // Save to Supabase
    const { error: orderErr } = await supabase.from('orders').insert({
      id: order.id,
      order_id: order.orderId,
      company_id: order.companyId,
      company_name: order.companyName,
      company_cif: order.companyCif,
      company_email: order.companyEmail,
      company_phone: order.companyPhone,
      contact_person: order.contactPerson,
      delivery_address: order.deliveryAddress,
      total_items: order.totalItems,
      total_amount: order.totalAmount,
      notes: order.notes ?? null,
      status: order.status,
      created_at: order.createdAt,
      estimated_delivery: order.estimatedDelivery,
    });
    if (orderErr) { console.error('Error saving order:', orderErr); return; }

    // Save order items
    if (order.items.length > 0) {
      await supabase.from('order_items').insert(
        order.items.map(i => ({
          order_id: order.id,
          product_id: i.productId,
          sku: i.sku,
          name: i.name,
          category_name: i.categoryName,
          quantity: i.quantity,
          unit_price: i.unitPrice,
          subtotal: i.subtotal,
        }))
      );
    }
  }, []);

  return React.createElement(OrdersContext.Provider, { value: { orders, addOrder }, children });
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error('useOrders must be used within OrdersProvider');
  return context;
}
