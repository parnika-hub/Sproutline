// src/pages/Payment.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { useOrders } from '../context/OrdersContext';
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart } = useCart();
  const { shippingInfo, clearShipping } = useCheckout();
  const { placeOrder } = useOrders();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const isProcessingRef = useRef(false);
  const timerRef = useRef(null);

  // Guard: Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [cart, navigate]);

  // Guard: Redirect to shipping if address not filled
  useEffect(() => {
    if (!shippingInfo.fullName || !shippingInfo.address) {
      navigate('/shipping', { replace: true });
    }
  }, [shippingInfo, navigate]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const shipping =
    shippingInfo.delivery === 'express'
      ? 120
      : cartSubtotal >= 500
      ? 0
      : 50;
  const total = cartSubtotal + shipping;

  const handlePay = (e) => {
    if (e) e.preventDefault();
    if (isProcessingRef.current || isProcessing) return;
    if (cart.length === 0) return;

    isProcessingRef.current = true;
    setIsProcessing(true);

    timerRef.current = setTimeout(() => {
      const order = placeOrder({
        items: cart,
        address: shippingInfo,
        delivery: shippingInfo.delivery,
        subtotal: cartSubtotal,
        paymentMethod,
      });
      clearCart();
      clearShipping();
      navigate(`/order-success/${order.id}`);
    }, 2000);
  };

  if (cart.length === 0 || !shippingInfo.fullName || !shippingInfo.address) {
    return null;
  }

  const deliveryLabel =
    shippingInfo.delivery === 'express'
      ? '⚡ Express (1–2 days)'
      : '🚚 Standard (3–6 days)';

  return (
    <>
      <Header showBack />
      <main className="page-content payment-page" id="main-content">
        <div className="container">
          <CheckoutSteps showPaymentStep />
          <h1 className="checkout-page-title">Payment</h1>

          <div className="payment-layout">
            {/* Left card: Payment Form */}
            <div className="payment-form">
              <h2 className="payment-card-title">Payment</h2>

              {/* Payment Method Radio Options */}
              <fieldset className="payment-choice">
                <legend className="form-label payment-choice__legend">
                  Select payment method
                </legend>
                <div className="payment-options" role="radiogroup" aria-label="Payment method">
                  {/* UPI */}
                  <label
                    htmlFor="pay-upi"
                    className={`payment-option ${paymentMethod === 'UPI' ? 'payment-option--selected' : ''}`}
                  >
                    <input
                      type="radio"
                      id="pay-upi"
                      name="paymentMethod"
                      value="UPI"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="sr-only"
                    />
                    <div className="payment-option__details">
                      <span className="payment-option__radio-indicator" aria-hidden="true" />
                      <strong>UPI</strong>
                    </div>
                  </label>

                  {/* Card */}
                  <label
                    htmlFor="pay-card"
                    className={`payment-option ${paymentMethod === 'Card' ? 'payment-option--selected' : ''}`}
                  >
                    <input
                      type="radio"
                      id="pay-card"
                      name="paymentMethod"
                      value="Card"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="sr-only"
                    />
                    <div className="payment-option__details">
                      <span className="payment-option__radio-indicator" aria-hidden="true" />
                      <strong>Card</strong>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    htmlFor="pay-cod"
                    className={`payment-option ${paymentMethod === 'Cash on Delivery' ? 'payment-option--selected' : ''}`}
                  >
                    <input
                      type="radio"
                      id="pay-cod"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="sr-only"
                    />
                    <div className="payment-option__details">
                      <span className="payment-option__radio-indicator" aria-hidden="true" />
                      <strong>Cash on Delivery</strong>
                    </div>
                  </label>
                </div>
              </fieldset>

              {/* Demo Fields per selected method */}
              {paymentMethod === 'UPI' && (
                <div className="payment-fields" aria-label="UPI details">
                  <div className="form-group">
                    <label htmlFor="upi-id" className="form-label">
                      UPI ID (demo)
                    </label>
                    <input
                      id="upi-id"
                      type="text"
                      className="form-input"
                      placeholder="name@bank"
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="payment-fields" aria-label="Card details">
                  <div className="form-group">
                    <label htmlFor="card-number" className="form-label">
                      Card number (demo)
                    </label>
                    <input
                      id="card-number"
                      type="text"
                      className="form-input"
                      placeholder="4242 4242 4242 4242"
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="card-name" className="form-label">
                      Name on card
                    </label>
                    <input
                      id="card-name"
                      type="text"
                      className="form-input"
                      placeholder="Priya Sharma"
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </div>

                  <div className="payment-form-row">
                    <div className="form-group">
                      <label htmlFor="card-expiry" className="form-label">
                        Expiry
                      </label>
                      <input
                        id="card-expiry"
                        type="text"
                        className="form-input"
                        placeholder="MM/YY"
                        autoComplete="off"
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="card-cvv" className="form-label">
                        CVV (demo)
                      </label>
                      <input
                        id="card-cvv"
                        type="text"
                        className="form-input"
                        placeholder="123"
                        autoComplete="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'Cash on Delivery' && (
                <div className="payment-fields" aria-label="Cash on Delivery details">
                  <p className="payment-cod-note">
                    Pay in cash when your order arrives.
                  </p>
                </div>
              )}

              {/* Demo Notice */}
              <div className="payment-demo-notice" role="note">
                Demo payment. No real money is charged. Please do not enter real card or UPI details.
              </div>

              {/* Pay Button */}
              <button
                type="button"
                className="btn btn-primary btn-lg payment-pay-btn"
                onClick={handlePay}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="payment-processing-content">
                    <span className="payment-spinner" aria-hidden="true" />
                    <span>Processing payment...</span>
                  </span>
                ) : (
                  paymentMethod === 'Cash on Delivery' ? 'Place order' : `Pay Rs ${total}`
                )}
              </button>

              <div aria-live="polite" className="sr-only">
                {isProcessing ? 'Processing payment...' : ''}
              </div>
            </div>

            {/* Right card: Order Summary */}
            <aside className="payment-summary" aria-label="Order summary">
              <h2 className="cart-summary__title">Order Summary</h2>
              <div className="payment-summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="payment-summary-item">
                    <span className="payment-summary-item__qty">×{item.quantity}</span>
                    <span className="payment-summary-item__name">{item.name}</span>
                    <span className="payment-summary-item__price">Rs {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <hr className="divider" />
              <div className="cart-summary__row">
                <span>Delivery method</span>
                <span>{deliveryLabel}</span>
              </div>
              <div className="cart-summary__row">
                <span>Subtotal</span>
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
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
