// src/pages/ShippingPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { sanitizeName } from '../utils/sanitize';
import './ShippingPage.css';

export default function ShippingPage() {
  const navigate = useNavigate();
  const { cart, cartSubtotal } = useCart();
  const { shippingInfo, updateShipping } = useCheckout();
  const [errors, setErrors] = useState({});

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) navigate('/cart', { replace: true });
  }, [cart, navigate]);

  // Sanitize pre-filled full name from saved address data
  useEffect(() => {
    if (shippingInfo.fullName) {
      const sanitized = sanitizeName(shippingInfo.fullName);
      if (sanitized !== shippingInfo.fullName) {
        updateShipping({ fullName: sanitized });
      }
    }
  }, []);

  const validate = () => {
    const e = {};
    if (!shippingInfo.fullName.trim()) {
      e.fullName = 'Full name is required';
    } else if (/[^a-zA-Z ]/.test(shippingInfo.fullName)) {
      e.fullName = 'Name can contain letters and spaces only';
    }
    if (!shippingInfo.address.trim()) e.address = 'Address is required';
    if (!shippingInfo.city.trim()) e.city = 'City is required';
    if (!shippingInfo.pin.trim()) e.pin = 'PIN code is required';
    else if (!/^\d{6}$/.test(shippingInfo.pin)) e.pin = 'PIN must be exactly 6 digits';
    if (!shippingInfo.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(shippingInfo.phone)) e.phone = 'Phone number must be exactly 10 digits';
    return e;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    navigate('/review');
  };

  const shipping = shippingInfo.delivery === 'express'
    ? 120
    : cartSubtotal >= 500 ? 0 : 50;
  const total = cartSubtotal + shipping;

  const handleChange = (field, value) => {
    updateShipping({ [field]: value });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleFullNameChange = (e) => {
    const input = e.target;
    const originalValue = input.value;
    const selectionStart = input.selectionStart;
    const sanitized = sanitizeName(originalValue);

    const rawBeforeCursor = originalValue.slice(0, selectionStart);
    const sanitizedBeforeCursor = sanitizeName(rawBeforeCursor);
    const newCursorPos = sanitizedBeforeCursor.length;

    updateShipping({ fullName: sanitized });
    if (errors.fullName) {
      if (!sanitized.trim()) {
        if (errors.fullName === 'Name can contain letters and spaces only') {
          setErrors((prev) => ({ ...prev, fullName: '' }));
        }
      } else if (!/[^a-zA-Z ]/.test(sanitized)) {
        setErrors((prev) => ({ ...prev, fullName: '' }));
      }
    }

    requestAnimationFrame(() => {
      if (input && typeof input.setSelectionRange === 'function') {
        input.setSelectionRange(newCursorPos, newCursorPos);
      }
    });
  };

  const handleFullNameBlur = () => {
    if (/[^a-zA-Z ]/.test(shippingInfo.fullName)) {
      setErrors((prev) => ({ ...prev, fullName: 'Name can contain letters and spaces only' }));
    } else if (errors.fullName === 'Name can contain letters and spaces only') {
      setErrors((prev) => ({ ...prev, fullName: '' }));
    }
  };

  return (
    <>
      <Header showBack />
      <main className="page-content shipping-page" id="main-content">
        <div className="container">
          <CheckoutSteps />
          <h1 className="checkout-page-title">Shipping Details</h1>

          <div className="shipping-layout">
            <form className="shipping-form" onSubmit={handleContinue} noValidate>
              {/* Full name */}
              <div className="form-group">
                <label htmlFor="ship-name" className="form-label">Full name</label>
                <input
                  id="ship-name"
                  type="text"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  value={sanitizeName(shippingInfo.fullName || '')}
                  onChange={handleFullNameChange}
                  onInput={handleFullNameChange}
                  onBlur={handleFullNameBlur}
                  autoComplete="name"
                  placeholder="Priya Sharma"
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                  aria-describedby={errors.fullName ? 'err-name' : undefined}
                />
                {errors.fullName && <p id="err-name" className="form-error">{errors.fullName}</p>}
              </div>

              {/* Address */}
              <div className="form-group">
                <label htmlFor="ship-address" className="form-label">Street address</label>
                <input
                  id="ship-address"
                  type="text"
                  className={`form-input ${errors.address ? 'error' : ''}`}
                  value={shippingInfo.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  autoComplete="street-address"
                  placeholder="Flat 4B, Greenleaf Apartments, MG Road"
                  aria-describedby={errors.address ? 'err-address' : undefined}
                />
                {errors.address && <p id="err-address" className="form-error">{errors.address}</p>}
              </div>

              <div className="shipping-form-row">
                {/* City */}
                <div className="form-group">
                  <label htmlFor="ship-city" className="form-label">City</label>
                  <input
                    id="ship-city"
                    type="text"
                    className={`form-input ${errors.city ? 'error' : ''}`}
                    value={shippingInfo.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    autoComplete="address-level2"
                    placeholder="Mumbai"
                    aria-describedby={errors.city ? 'err-city' : undefined}
                  />
                  {errors.city && <p id="err-city" className="form-error">{errors.city}</p>}
                </div>

                {/* PIN */}
                <div className="form-group">
                  <label htmlFor="ship-pin" className="form-label">PIN code</label>
                  <input
                    id="ship-pin"
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    className={`form-input ${errors.pin ? 'error' : ''}`}
                    value={shippingInfo.pin}
                    onChange={(e) => handleChange('pin', e.target.value)}
                    autoComplete="postal-code"
                    placeholder="400001"
                    aria-describedby={errors.pin ? 'err-pin' : undefined}
                  />
                  {errors.pin && <p id="err-pin" className="form-error">{errors.pin}</p>}
                </div>
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="ship-phone" className="form-label">Phone number</label>
                <input
                  id="ship-phone"
                  type="tel"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  value={shippingInfo.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  aria-describedby={errors.phone ? 'err-phone' : undefined}
                />
                {errors.phone && <p id="err-phone" className="form-error">{errors.phone}</p>}
              </div>

              {/* Delivery choice */}
              <fieldset className="delivery-choice">
                <legend className="form-label">Delivery option</legend>
                <div className="delivery-options">
                  <label
                    htmlFor="del-standard"
                    className={`delivery-option ${shippingInfo.delivery === 'standard' ? 'delivery-option--selected' : ''}`}
                  >
                    <input
                      type="radio"
                      id="del-standard"
                      name="delivery"
                      value="standard"
                      checked={shippingInfo.delivery === 'standard'}
                      onChange={() => updateShipping({ delivery: 'standard' })}
                      className="sr-only"
                    />
                    <div className="delivery-option__details">
                      <strong>Standard (3–6 days)</strong>
                      <span>
                        {cartSubtotal >= 500 ? (
                          <span className="free-badge">FREE</span>
                        ) : (
                          'Rs 50'
                        )}
                      </span>
                    </div>
                  </label>

                  <label
                    htmlFor="del-express"
                    className={`delivery-option ${shippingInfo.delivery === 'express' ? 'delivery-option--selected' : ''}`}
                  >
                    <input
                      type="radio"
                      id="del-express"
                      name="delivery"
                      value="express"
                      checked={shippingInfo.delivery === 'express'}
                      onChange={() => updateShipping({ delivery: 'express' })}
                      className="sr-only"
                    />
                    <div className="delivery-option__details">
                      <strong>Express (1–2 days)</strong>
                      <span>Rs 120</span>
                    </div>
                  </label>
                </div>
              </fieldset>

              <button type="submit" className="btn btn-primary btn-lg shipping-submit">
                Continue to review →
              </button>
            </form>

            {/* Order summary sidebar */}
            <aside className="shipping-summary" aria-label="Order summary">
              <h2 className="cart-summary__title">Order Summary</h2>
              <div className="shipping-summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="shipping-summary-item">
                    <span className="shipping-summary-item__qty">×{item.quantity}</span>
                    <span className="shipping-summary-item__name">{item.name}</span>
                    <span className="shipping-summary-item__price">Rs {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <hr className="divider" />
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
