// src/pages/OrderSuccessPage.jsx
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './OrderSuccessPage.css';

export default function OrderSuccessPage() {
  const { orderId } = useParams();

  return (
    <>
      <Header />
      <main className="page-content order-success-page" id="main-content">
        <div className="container">
          <div className="success-card">
            <div className="success-icon" aria-hidden="true">🌱</div>
            <h1 className="success-title">Order placed!</h1>
            <p className="success-order-id">Order ID: <strong>{orderId}</strong></p>
            <p className="success-message">
              Thank you for choosing Sproutline. Your eco-friendly stationery is being packed in compostable materials and will be on its way soon.
            </p>
            <div className="success-steps">
              <div className="success-step">
                <span className="success-step__icon">✓</span>
                <span>Order confirmed</span>
              </div>
              <div className="success-step success-step--pending">
                <span className="success-step__icon">○</span>
                <span>Packed</span>
              </div>
              <div className="success-step success-step--pending">
                <span className="success-step__icon">○</span>
                <span>Shipped</span>
              </div>
              <div className="success-step success-step--pending">
                <span className="success-step__icon">○</span>
                <span>Delivered</span>
              </div>
            </div>
            <div className="success-cta">
              <Link to="/orders" className="btn btn-primary btn-lg">
                View my orders
              </Link>
              <Link to="/shop" className="btn btn-secondary btn-lg">
                Continue shopping
              </Link>
            </div>
            <p className="success-plant-note">
              🌻 Every Sproutline order plants a tree. Thank you for growing with us.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
