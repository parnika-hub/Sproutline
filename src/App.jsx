// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { OrdersProvider } from './context/OrdersContext';
import { CheckoutProvider } from './context/CheckoutContext';
import ScrollToTop from './components/ScrollToTop';
import BottomTabBar from './components/BottomTabBar';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import ReviewPage from './pages/ReviewPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import CreditsPage from './pages/CreditsPage';
import InfoPage from './pages/InfoPage';

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <OrdersProvider>
          <CheckoutProvider>
            <ScrollToTop />
            <div className="app-shell">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/credits" element={<CreditsPage />} />
                <Route path="/shipping-returns" element={<InfoPage type="shipping-returns" />} />
                <Route path="/track-order" element={<InfoPage type="track-order" />} />
                <Route path="/contact" element={<InfoPage type="contact" />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
              <BottomTabBar />
            </div>
          </CheckoutProvider>
        </OrdersProvider>
      </CartProvider>
    </UserProvider>
  );
}
