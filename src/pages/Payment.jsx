// src/pages/Payment.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { useOrders } from '../context/OrdersContext';
import { sanitizeName } from '../utils/sanitize';
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart } = useCart();
  const { shippingInfo, clearShipping } = useCheckout();
  const { placeOrder } = useOrders();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});

  const [isProcessing, setIsProcessing] = useState(false);
  const isProcessingRef = useRef(false);
  const timerRef = useRef(null);

  const upiInputRef = useRef(null);
  const cardNumberRef = useRef(null);
  const cardNameRef = useRef(null);
  const cardExpiryRef = useRef(null);
  const cardCvvRef = useRef(null);

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

  // Clean up timer and field values on unmount
  useEffect(() => {
    return () => {
      setUpiId('');
      setCardNumber('');
      setCardName('');
      setExpiry('');
      setCvv('');
      setErrors({});
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

  // Validation functions

  const getUpiError = (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Enter your UPI ID';
    }
    const upiRegex = /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z]{2,64}$/;
    if (!upiRegex.test(trimmed)) {
      return 'Enter a valid UPI ID, for example name@bank';
    }
    return '';
  };

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.match(/.{1,4}/g)?.join(' ') || '';
  };

  const getCardNumberError = (val) => {
    const digits = val.replace(/\D/g, '');
    if (!digits) {
      return 'Enter your card number';
    }
    if (digits.length < 16) {
      return 'Card number must be 16 digits';
    }
    return '';
  };

  const formatExpiry = (val) => {
    let cleaned = val;
    if (/^\d\/$/.test(val)) {
      cleaned = '0' + val.charAt(0);
    }
    const digits = cleaned.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    if (digits.length === 2) {
      return `${digits}/`;
    }
    return digits;
  };

  const getExpiryError = (val) => {
    const digits = val.replace(/\D/g, '');
    if (!digits) {
      return 'Enter the expiry date';
    }
    if (digits.length < 4) {
      return 'Enter a valid date as MM/YY';
    }
    const month = parseInt(digits.slice(0, 2), 10);
    const year = parseInt(digits.slice(2, 4), 10);

    if (month < 1 || month > 12) {
      return 'Enter a valid date as MM/YY';
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentCentury = Math.floor(currentYear / 100) * 100;
    const fullExpYear = currentCentury + year;
    const currentMonth = now.getMonth() + 1;

    // Card is valid through the end of its expiry month
    if (fullExpYear < currentYear || (fullExpYear === currentYear && month < currentMonth)) {
      return 'This card has expired';
    }

    return '';
  };

  const formatCvv = (val) => {
    return val.replace(/\D/g, '').slice(0, 3);
  };

  const getCvvError = (val) => {
    const digits = val.replace(/\D/g, '');
    if (!digits) {
      return 'Enter your CVV';
    }
    if (digits.length < 3) {
      return 'CVV must be 3 digits';
    }
    return '';
  };

  // Switch payment method and clear all errors
  const handleMethodChange = (method) => {
    setPaymentMethod(method);
    setErrors({});
  };

  // Blur handlers
  const handleUpiBlur = () => {
    const err = getUpiError(upiId);
    setErrors((prev) => ({ ...prev, upi: err }));
  };

  const handleCardNumberBlur = () => {
    const err = getCardNumberError(cardNumber);
    setErrors((prev) => ({ ...prev, cardNumber: err }));
  };

  const handleExpiryBlur = () => {
    const err = getExpiryError(expiry);
    setErrors((prev) => ({ ...prev, expiry: err }));
  };

  const handleCvvBlur = () => {
    const err = getCvvError(cvv);
    setErrors((prev) => ({ ...prev, cvv: err }));
  };

  // Change handlers: clear error as soon as the field becomes valid
  const handleUpiChange = (e) => {
    const val = e.target.value;
    setUpiId(val);
    if (errors.upi) {
      const err = getUpiError(val);
      if (!err) {
        setErrors((prev) => ({ ...prev, upi: '' }));
      }
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    if (errors.cardNumber) {
      const err = getCardNumberError(formatted);
      if (!err) {
        setErrors((prev) => ({ ...prev, cardNumber: '' }));
      }
    }
  };

  const handleExpiryKeyDown = (e) => {
    if (e.key === 'Backspace') {
      const input = e.currentTarget;
      if (input.selectionStart === input.selectionEnd && input.selectionStart === expiry.length && expiry.endsWith('/')) {
        e.preventDefault();
        const next = expiry.slice(0, -2);
        setExpiry(next);
        if (errors.expiry) {
          const err = getExpiryError(next);
          if (!err) {
            setErrors((prev) => ({ ...prev, expiry: '' }));
          }
        }
      }
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
    if (errors.expiry) {
      const err = getExpiryError(formatted);
      if (!err) {
        setErrors((prev) => ({ ...prev, expiry: '' }));
      }
    }
  };

  const handleCvvChange = (e) => {
    const digits = formatCvv(e.target.value);
    setCvv(digits);
    if (errors.cvv) {
      const err = getCvvError(digits);
      if (!err) {
        setErrors((prev) => ({ ...prev, cvv: '' }));
      }
    }
  };

  const handleCardNameChange = (e) => {
    const input = e.target;
    const originalValue = input.value;
    const selectionStart = input.selectionStart;
    const sanitized = sanitizeName(originalValue);

    const rawBeforeCursor = originalValue.slice(0, selectionStart);
    const sanitizedBeforeCursor = sanitizeName(rawBeforeCursor);
    const newCursorPos = sanitizedBeforeCursor.length;

    setCardName(sanitized);
    if (errors.cardName) {
      if (!/[^a-zA-Z ]/.test(sanitized)) {
        setErrors((prev) => ({ ...prev, cardName: '' }));
      }
    }

    requestAnimationFrame(() => {
      if (input && typeof input.setSelectionRange === 'function') {
        input.setSelectionRange(newCursorPos, newCursorPos);
      }
    });
  };

  const handleCardNameBlur = () => {
    if (/[^a-zA-Z ]/.test(cardName)) {
      setErrors((prev) => ({ ...prev, cardName: 'Name can contain letters and spaces only' }));
    } else if (errors.cardName) {
      setErrors((prev) => ({ ...prev, cardName: '' }));
    }
  };

  const handlePay = (e) => {
    if (e) e.preventDefault();
    if (isProcessingRef.current || isProcessing) return;
    if (cart.length === 0) return;

    if (paymentMethod === 'UPI') {
      const upiErr = getUpiError(upiId);
      if (upiErr) {
        setErrors({ upi: upiErr });
        upiInputRef.current?.focus();
        return;
      }
    } else if (paymentMethod === 'Card') {
      const cardNumErr = getCardNumberError(cardNumber);
      const cardNameErr = /[^a-zA-Z ]/.test(cardName)
        ? 'Name can contain letters and spaces only'
        : '';
      const expiryErr = getExpiryError(expiry);
      const cvvErr = getCvvError(cvv);

      const newErrors = {};
      if (cardNumErr) newErrors.cardNumber = cardNumErr;
      if (cardNameErr) newErrors.cardName = cardNameErr;
      if (expiryErr) newErrors.expiry = expiryErr;
      if (cvvErr) newErrors.cvv = cvvErr;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        if (cardNumErr) {
          cardNumberRef.current?.focus();
        } else if (cardNameErr) {
          cardNameRef.current?.focus();
        } else if (expiryErr) {
          cardExpiryRef.current?.focus();
        } else if (cvvErr) {
          cardCvvRef.current?.focus();
        }
        return;
      }
    }

    setErrors({});
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
      setUpiId('');
      setCardNumber('');
      setCardName('');
      setExpiry('');
      setCvv('');
      setErrors({});
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
                      onChange={() => handleMethodChange('UPI')}
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
                      onChange={() => handleMethodChange('Card')}
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
                      onChange={() => handleMethodChange('Cash on Delivery')}
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
                      ref={upiInputRef}
                      type="text"
                      className={`form-input ${errors.upi ? 'error' : ''}`}
                      placeholder="name@bank"
                      autoComplete="off"
                      spellCheck="false"
                      value={upiId}
                      onChange={handleUpiChange}
                      onBlur={handleUpiBlur}
                      aria-invalid={errors.upi ? 'true' : 'false'}
                      aria-describedby={errors.upi ? 'err-upi-id' : undefined}
                    />
                    {errors.upi && (
                      <p id="err-upi-id" className="form-error" role="alert">
                        {errors.upi}
                      </p>
                    )}
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
                      ref={cardNumberRef}
                      type="text"
                      inputMode="numeric"
                      className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                      placeholder="4242 4242 4242 4242"
                      autoComplete="off"
                      spellCheck="false"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      onBlur={handleCardNumberBlur}
                      maxLength={19}
                      aria-invalid={errors.cardNumber ? 'true' : 'false'}
                      aria-describedby={errors.cardNumber ? 'err-card-number' : undefined}
                    />
                    {errors.cardNumber && (
                      <p id="err-card-number" className="form-error" role="alert">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="card-name" className="form-label">
                      Name on card
                    </label>
                    <input
                      id="card-name"
                      ref={cardNameRef}
                      type="text"
                      className={`form-input ${errors.cardName ? 'error' : ''}`}
                      placeholder="Priya Sharma"
                      autoComplete="off"
                      spellCheck="false"
                      value={cardName}
                      onChange={handleCardNameChange}
                      onInput={handleCardNameChange}
                      onBlur={handleCardNameBlur}
                      aria-invalid={errors.cardName ? 'true' : 'false'}
                      aria-describedby={errors.cardName ? 'err-card-name' : undefined}
                    />
                    {errors.cardName && (
                      <p id="err-card-name" className="form-error" role="alert">
                        {errors.cardName}
                      </p>
                    )}
                  </div>

                  <div className="payment-form-row">
                    <div className="form-group">
                      <label htmlFor="card-expiry" className="form-label">
                        Expiry
                      </label>
                      <input
                        id="card-expiry"
                        ref={cardExpiryRef}
                        type="text"
                        inputMode="numeric"
                        className={`form-input ${errors.expiry ? 'error' : ''}`}
                        placeholder="MM/YY"
                        autoComplete="off"
                        spellCheck="false"
                        value={expiry}
                        onChange={handleExpiryChange}
                        onKeyDown={handleExpiryKeyDown}
                        onBlur={handleExpiryBlur}
                        maxLength={5}
                        aria-invalid={errors.expiry ? 'true' : 'false'}
                        aria-describedby={errors.expiry ? 'err-card-expiry' : undefined}
                      />
                      {errors.expiry && (
                        <p id="err-card-expiry" className="form-error" role="alert">
                          {errors.expiry}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="card-cvv" className="form-label">
                        CVV (demo)
                      </label>
                      <input
                        id="card-cvv"
                        ref={cardCvvRef}
                        type="password"
                        inputMode="numeric"
                        className={`form-input ${errors.cvv ? 'error' : ''}`}
                        placeholder="123"
                        autoComplete="off"
                        spellCheck="false"
                        value={cvv}
                        onChange={handleCvvChange}
                        onBlur={handleCvvBlur}
                        maxLength={3}
                        aria-invalid={errors.cvv ? 'true' : 'false'}
                        aria-describedby={errors.cvv ? 'err-card-cvv' : undefined}
                      />
                      {errors.cvv && (
                        <p id="err-card-cvv" className="form-error" role="alert">
                          {errors.cvv}
                        </p>
                      )}
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
                Demo payment. No real money is charged.
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
