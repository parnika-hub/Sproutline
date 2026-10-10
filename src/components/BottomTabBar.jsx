// src/components/BottomTabBar.jsx
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './BottomTabBar.css';

export default function BottomTabBar() {
  const { cartCount } = useCart();

  return (
    <nav className="bottom-tab-bar" aria-label="Mobile navigation">
      <div className="bottom-tab-bar__inner">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `bottom-tab-bar__item ${isActive ? 'active' : ''}`
          }
          aria-label="Home"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `bottom-tab-bar__item ${isActive ? 'active' : ''}`
          }
          aria-label="Shop"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
            <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Shop</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `bottom-tab-bar__item ${isActive ? 'active' : ''}`
          }
          aria-label={`Cart, ${cartCount} items`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {cartCount > 0 && (
            <span className="badge tab-badge" aria-hidden="true">{cartCount}</span>
          )}
          <span>Cart</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `bottom-tab-bar__item ${isActive ? 'active' : ''}`
          }
          aria-label="Orders"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <polyline points="10 9 9 9 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `bottom-tab-bar__item ${isActive ? 'active' : ''}`
          }
          aria-label="Account"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Account</span>
        </NavLink>
      </div>
    </nav>
  );
}
