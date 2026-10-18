// src/context/OrdersContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext(null);

function loadOrders() {
  try {
    const saved = localStorage.getItem('sproutline_orders');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    localStorage.setItem('sproutline_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = ({ items, address, delivery, subtotal, paymentMethod }) => {
    const shippingCost =
      delivery === 'express'
        ? 120
        : subtotal >= 500
        ? 0
        : 50;
    const total = subtotal + shippingCost;
    const orderId = 'SPR-' + Date.now().toString(36).toUpperCase();
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      items,
      address,
      delivery,
      subtotal,
      shippingCost,
      total,
      status: 'Placed',
      ...(paymentMethod ? { paymentMethod } : {}),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used inside OrdersProvider');
  return ctx;
};
