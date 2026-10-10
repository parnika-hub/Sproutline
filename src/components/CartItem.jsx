// src/components/CartItem.jsx
import { useCart } from '../context/CartContext';
import './CartItem.css';

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div
        className="cart-item__img-wrap"
        style={item.imageFit === 'contain' ? { background: '#ffffff' } : undefined}
      >
        {item.images?.[0] ? (
          <img
            src={item.images[0]}
            alt={item.name}
            className="cart-item__img"
            style={{
              objectFit: item.imageFit || 'cover',
              objectPosition: item.imagePosition || 'center top',
              ...(item.imageFit === 'contain' ? { backgroundColor: '#ffffff' } : {}),
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="cart-item__placeholder img-placeholder"
          style={{ display: item.images?.[0] ? 'none' : 'flex' }}
          aria-hidden="true"
        >
          🌱
        </div>
      </div>

      <div className="cart-item__info">
        <h3 className="cart-item__name">{item.name}</h3>
        <p className="cart-item__unit-price">Rs {item.price} each</p>
      </div>

      <div className="cart-item__controls">
        <div className="qty-stepper" role="group" aria-label={`Quantity for ${item.name}`}>
          <button
            onClick={() => updateQty(item.id, item.quantity - 1)}
            aria-label={`Decrease quantity of ${item.name}`}
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <span aria-live="polite">{item.quantity}</span>
          <button
            onClick={() => updateQty(item.id, item.quantity + 1)}
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>

        <p className="cart-item__total">Rs {item.price * item.quantity}</p>

        <button
          className="cart-item__delete btn btn-ghost btn-sm"
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.name} from cart`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
}
