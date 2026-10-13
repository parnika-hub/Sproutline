// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import LogoMark from './LogoMark';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container site-footer__grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <LogoMark size={36} onDark />
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
