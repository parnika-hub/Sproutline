// src/context/CheckoutContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CheckoutContext = createContext(null);

const DEFAULT_SHIPPING = {
  fullName: '',
  address: '',
  city: '',
  pin: '',
  phone: '',
  delivery: 'standard',
};

function loadShipping() {
  try {
    const saved = localStorage.getItem('sproutline_shipping');
    return saved ? JSON.parse(saved) : DEFAULT_SHIPPING;
  } catch {
    return DEFAULT_SHIPPING;
  }
}

export function CheckoutProvider({ children }) {
  const [shippingInfo, setShippingInfo] = useState(loadShipping);

  useEffect(() => {
    localStorage.setItem('sproutline_shipping', JSON.stringify(shippingInfo));
  }, [shippingInfo]);

  const updateShipping = (data) =>
    setShippingInfo((prev) => ({ ...prev, ...data }));

  const clearShipping = () => {
    setShippingInfo(DEFAULT_SHIPPING);
    localStorage.removeItem('sproutline_shipping');
  };

  return (
    <CheckoutContext.Provider value={{ shippingInfo, updateShipping, clearShipping }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used inside CheckoutProvider');
  return ctx;
};
