// src/pages/CartPage.jsx
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { cart, cartSubtotal } = useCart();
  const navigate = useNavigate();

  const shipping = cartSubtotal >= 500 ? 0 : 50;
  const total = cartSubtotal + shipping;

  if (cart.length === 0) {
    return (
      <>
        <Header showBack />
        <main className="page-content" id="main-content">
          <div className="container">
            <CheckoutSteps />
            <div className="empty-state">
              <span className="empty-state-icon">🛍️</span>
              <h1>Your cart is empty</h1>
              <p>Looks like you haven't added anything yet. Browse our eco stationery!</p>
              <Link to="/shop" className="btn btn-primary btn-lg">
                Browse stationery
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header showBack />
      <main className="page-content cart-page" id="main-content">
        <div className="container">
          <CheckoutSteps />

          <h1 className="cart-title">Your Cart</h1>

          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items-col">
              <div className="cart-items-list">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Summary */}
            <aside className="cart-summary" aria-label="Order summary">
              <h2 className="cart-summary__title">Order Summary</h2>

              <div className="cart-summary__row">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>Rs {cartSubtotal}</span>
              </div>

              <div className="cart-summary__row">
                <span>
                  Standard shipping
                  {shipping === 0 && (
                    <span className="free-badge"> FREE</span>
                  )}
                </span>
                <span>{shipping === 0 ? 'Rs 0' : `Rs ${shipping}`}</span>
              </div>

              {cartSubtotal < 500 && (
                <p className="cart-summary__free-hint">
                  Add Rs {500 - cartSubtotal} more for free shipping!
                </p>
              )}

              <hr className="divider" />

              <div className="cart-summary__total">
                <span>Total</span>
                <span>Rs {total}</span>
              </div>

              <button
                className="btn btn-primary btn-lg cart-checkout-btn"
                onClick={() => navigate('/shipping')}
              >
                Continue to shipping →
              </button>

              <Link to="/shop" className="cart-continue-link">
                ← Continue shopping
              </Link>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
