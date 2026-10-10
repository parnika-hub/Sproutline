// src/pages/ReviewPage.jsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { useOrders } from '../context/OrdersContext';
import './ReviewPage.css';

export default function ReviewPage() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart } = useCart();
  const { shippingInfo, clearShipping } = useCheckout();
  const { placeOrder } = useOrders();

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0) navigate('/cart', { replace: true });
  }, [cart, navigate]);

  // Redirect to shipping if address not filled
  useEffect(() => {
    if (!shippingInfo.fullName || !shippingInfo.address) {
      navigate('/shipping', { replace: true });
    }
  }, [shippingInfo, navigate]);

  const shipping =
    shippingInfo.delivery === 'express'
      ? 120
      : cartSubtotal >= 500
      ? 0
      : 50;
  const total = cartSubtotal + shipping;

  const handlePlaceOrder = () => {
    const order = placeOrder({
      items: cart,
      address: shippingInfo,
      delivery: shippingInfo.delivery,
      subtotal: cartSubtotal,
    });
    clearCart();
    clearShipping();
    navigate(`/order-success/${order.id}`);
  };

  return (
    <>
      <Header showBack />
      <main className="page-content review-page" id="main-content">
        <div className="container">
          <CheckoutSteps />
          <h1 className="checkout-page-title">Review Order</h1>

          <div className="review-layout">
            <div className="review-main">
              {/* Items */}
              <section className="review-section" aria-labelledby="review-items-heading">
                <div className="review-section__header">
                  <h2 id="review-items-heading" className="review-section__title">Items</h2>
                  <Link to="/cart" className="review-edit-link">Edit cart</Link>
                </div>
                <div className="review-items">
                  {cart.map((item) => (
                    <div key={item.id} className="review-item">
                      <div className="review-item__img-wrap">
                        {item.images?.[0] ? (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="review-item__img"
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                          />
                        ) : null}
                        <div
                          className="review-item__placeholder img-placeholder"
                          style={{ display: item.images?.[0] ? 'none' : 'flex' }}
                          aria-hidden="true"
                        >
                          🌱
                        </div>
                      </div>
                      <div className="review-item__info">
                        <span className="review-item__name">{item.name}</span>
                        <span className="review-item__qty">Qty: {item.quantity}</span>
                      </div>
                      <span className="review-item__price">Rs {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Shipping address */}
              <section className="review-section" aria-labelledby="review-addr-heading">
                <div className="review-section__header">
                  <h2 id="review-addr-heading" className="review-section__title">Delivery address</h2>
                  <Link to="/shipping" className="review-edit-link">Edit</Link>
                </div>
                <div className="review-address">
                  <p className="review-address__name">{shippingInfo.fullName}</p>
                  <p>{shippingInfo.address}</p>
                  <p>{shippingInfo.city} — {shippingInfo.pin}</p>
                  <p>📞 {shippingInfo.phone}</p>
                </div>
              </section>

              {/* Delivery type */}
              <section className="review-section" aria-labelledby="review-del-heading">
                <div className="review-section__header">
                  <h2 id="review-del-heading" className="review-section__title">Delivery</h2>
                  <Link to="/shipping" className="review-edit-link">Edit</Link>
                </div>
                <p className="review-delivery">
                  {shippingInfo.delivery === 'express'
                    ? '⚡ Express (1–2 days) — Rs 120'
                    : `🚚 Standard (3–6 days) — ${shipping === 0 ? 'Free' : 'Rs 50'}`}
                </p>
              </section>
            </div>

            {/* Totals sidebar */}
            <aside className="review-summary" aria-label="Price summary">
              <h2 className="cart-summary__title">Price Breakdown</h2>
              <div className="cart-summary__row">
                <span>Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>Rs {cartSubtotal}</span>
              </div>
              <div className="cart-summary__row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `Rs ${shipping}`}</span>
              </div>
              <hr className="divider" />
              <div className="cart-summary__total">
                <span>Total</span>
                <span>Rs {total}</span>
              </div>

              <button
                className="btn btn-primary btn-lg review-place-btn"
                onClick={handlePlaceOrder}
              >
                Place order 🌱
              </button>
              <p className="review-disclaimer">
                By placing your order, you agree to our eco-commitment — all packaging is compostable.
              </p>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
