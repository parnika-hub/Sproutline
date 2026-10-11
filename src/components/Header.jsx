// src/components/Header.jsx
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import LogoMark from './LogoMark';
import './Header.css';

function SproutlineLogo() {
  return (
    <Link to="/" className="header-logo" aria-label="Sproutline — home">
      <LogoMark size={36} />
      <span className="header-logo__name">Sproutline</span>
    </Link>
  );
}

export default function Header({ showBack = false }) {
  const { cartCount } = useCart();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const isInner = showBack || ['/cart', '/shipping', '/review', '/orders', '/shop'].some(
    (p) => location.pathname.startsWith(p)
  ) || location.pathname.startsWith('/product') || location.pathname.startsWith('/order-success');

  return (
    <header className="site-header" role="banner">
      <div className="container site-header__inner">
        {/* Back button */}
        {isInner && (
          <button
            className="header-back btn btn-ghost btn-sm"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        )}

        <SproutlineLogo />

        {/* Desktop nav */}
        <nav className="header-nav" aria-label="Main navigation">
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `header-nav__link ${isActive ? 'active' : ''}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `header-nav__link ${isActive ? 'active' : ''}`
            }
          >
            Orders
          </NavLink>
        </nav>

        {/* Right actions */}
        <div className="header-actions">
          {/* Cart */}
          <Link
            to="/cart"
            className="header-cart-btn"
            aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {cartCount > 0 && (
              <span className="badge" aria-hidden="true">{cartCount}</span>
            )}
          </Link>

          {/* Account */}
          <div className="header-account" onMouseLeave={() => setAccountOpen(false)}>
            {user ? (
              <button
                className="header-user-btn"
                onClick={() => setAccountOpen((o) => !o)}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
              >
                <span className="header-user-avatar" aria-hidden="true">
                  {user.name[0].toUpperCase()}
                </span>
                <span className="header-user-name">{user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">
                Log in
              </Link>
            )}

            {accountOpen && user && (
              <div className="header-dropdown" role="menu" aria-label="Account menu">
                <div className="header-dropdown__email">{user.email || 'Guest'}</div>
                <Link to="/orders" className="header-dropdown__item" role="menuitem" onClick={() => setAccountOpen(false)}>
                  My Orders
                </Link>
                <button
                  className="header-dropdown__item header-dropdown__item--danger"
                  role="menuitem"
                  onClick={() => { logout(); setAccountOpen(false); navigate('/'); }}
                >
                  Log out
                </button>
              </div>
            )}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="header-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="header-mobile-menu" aria-label="Mobile navigation">
          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/orders" onClick={() => setMenuOpen(false)}>Orders</NavLink>
          <NavLink to="/cart" onClick={() => setMenuOpen(false)}>Cart {cartCount > 0 && `(${cartCount})`}</NavLink>
          {user ? (
            <button onClick={() => { logout(); setMenuOpen(false); navigate('/'); }}>
              Log out ({user.name})
            </button>
          ) : (
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>Log in</NavLink>
          )}
        </nav>
      )}
    </header>
  );
}
