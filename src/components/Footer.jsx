// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container site-footer__grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 28 C16 20, 16 14, 16 8" stroke="#C9A06B" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M16 16 C12 14, 8 10, 10 6 C12 6, 14 10, 16 14" fill="#57d495ff" />
              <path d="M16 12 C20 10, 24 6, 22 2 C20 2, 18 6, 16 10" fill="#B9D1B0" />
            </svg>
            <span>Sproutline</span>
          </div>
          <p className="footer-brand__blurb">
            Thoughtfully made stationery that gives back to the earth. Every notebook planted, every pencil sprouted — writing that grows.
          </p>
          <p className="footer-brand__promise">
            100% plastic-free packaging &nbsp;·&nbsp; FSC-certified paper &nbsp;·&nbsp; Carbon-neutral shipping
          </p>
        </div>

        {/* Shop links */}
        <nav aria-label="Shop links">
          <h3 className="footer-heading">Shop</h3>
          <ul className="footer-links">
            <li><Link to="/shop">All products</Link></li>
            <li><Link to="/shop?cat=Notebooks">Notebooks</Link></li>
            <li><Link to="/shop?cat=Pens+and+pencils">Pens &amp; Pencils</Link></li>
            <li><Link to="/shop?cat=Desk+Essentials">Desk Essentials</Link></li>
          </ul>
        </nav>

        {/* Help */}
        <nav aria-label="Help links">
          <h3 className="footer-heading">Help</h3>
          <ul className="footer-links">
            <li><Link to="/shipping-returns">Shipping &amp; Returns</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/credits">Photo Credits</Link></li>
          </ul>
        </nav>

        {/* Our promise */}
        <div className="footer-promise">
          <h3 className="footer-heading">Our Promise</h3>
          <p>
            Every Sproutline product is made without plastic, shipped in compostable mailers, and designed to outlast trends. When you write with us, you're choosing a healthier planet — one page at a time.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 Sproutline</p>
        </div>
      </div>
    </footer>
  );
}
