// src/pages/OrdersPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useOrders } from '../context/OrdersContext';
import './OrdersPage.css';

const STATUS_COLORS = {
  Placed: { bg: '#e8f5e9', color: '#2e7d32' },
  Packed: { bg: '#fff8e1', color: '#f57f17' },
  Shipped: { bg: '#e3f2fd', color: '#1565c0' },
  Delivered: { bg: '#f3e5f5', color: '#6a1b9a' },
};

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS.Placed;

  const shippingLabel = order.delivery === 'express'
    ? '⚡ Express (1–2 days)'
    : '🚚 Standard (3–6 days)';

  return (
    <article className="order-card" aria-label={`Order ${order.id}`}>
      {/* Card header — always visible */}
      <div className="order-card__header">
        <div className="order-card__meta">
          <span className="order-card__id">{order.id}</span>
          <span className="order-card__date">
            {new Date(order.date).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric',
            })}
          </span>
        </div>
        <div className="order-card__right">
          <span
            className="order-card__status"
            style={{ background: statusStyle.bg, color: statusStyle.color }}
          >
            {order.status}
          </span>
          <button
            className="order-card__expand-btn"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-controls={`order-details-${order.id}`}
          >
            {expanded ? 'Hide details' : 'View details'}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Summary row — always visible */}
      <div className="order-card__summary">
        <div className="order-card__items-preview">
          {order.items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="order-card__thumb-wrap"
              style={item.imageFit === 'contain' ? { background: '#ffffff' } : undefined}
            >
              {item.images?.[0] ? (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="order-card__thumb"
                  style={{
                    objectFit: item.imageFit || 'cover',
                    objectPosition: item.imagePosition || 'center top',
                    ...(item.imageFit === 'contain' ? { backgroundColor: '#ffffff' } : {}),
                  }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                />
              ) : null}
              <div
                className="order-card__thumb-placeholder img-placeholder"
                style={{ display: item.images?.[0] ? 'none' : 'flex', fontSize: '1rem' }}
                aria-hidden="true"
              >
                🌱
              </div>
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="order-card__thumb-more">+{order.items.length - 3}</div>
          )}
        </div>
        <span className="order-card__total">Rs {order.total}</span>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div
          className="order-card__details"
          id={`order-details-${order.id}`}
          aria-hidden={!expanded}
        >
          <hr className="divider" />

          {/* Items list */}
          <h3 className="order-details__subtitle">Items</h3>
          <div className="order-details__items">
            {order.items.map((item) => (
              <div key={item.id} className="order-details__item">
                <div
                  className="order-details__item-img-wrap"
                  style={item.imageFit === 'contain' ? { background: '#ffffff' } : undefined}
                >
                  {item.images?.[0] ? (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="order-details__item-img"
                      style={{
                        objectFit: item.imageFit || 'cover',
                        objectPosition: item.imagePosition || 'center top',
                        ...(item.imageFit === 'contain' ? { backgroundColor: '#ffffff' } : {}),
                      }}
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  <div
                    className="img-placeholder"
                    style={{ display: item.images?.[0] ? 'none' : 'flex', position: 'absolute', inset: 0, fontSize: '1rem' }}
                    aria-hidden="true"
                  >
                    🌱
                  </div>
                </div>
                <div className="order-details__item-info">
                  <span className="order-details__item-name">{item.name}</span>
                  <span className="order-details__item-qty">Qty: {item.quantity}</span>
                </div>
                <span className="order-details__item-price">Rs {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Address */}
          <h3 className="order-details__subtitle">Delivery address</h3>
          <div className="order-details__address">
            <p><strong>{order.address.fullName}</strong></p>
            <p>{order.address.address}</p>
            <p>{order.address.city} — {order.address.pin}</p>
            <p>📞 {order.address.phone}</p>
          </div>

          {/* Delivery + Total */}
          <div className="order-details__footer">
            <span className="order-details__delivery">{shippingLabel}</span>
            <div className="order-details__totals">
              <span>Subtotal: Rs {order.subtotal}</span>
              <span>Shipping: {order.shippingCost === 0 ? 'Free' : `Rs ${order.shippingCost}`}</span>
              <strong>Total: Rs {order.total}</strong>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <>
      <Header showBack />
      <main className="page-content orders-page" id="main-content">
        <div className="container">
          <div className="orders-header">
            <h1 className="orders-title">My Orders</h1>
            <p className="orders-subtitle">
              {orders.length > 0
                ? `${orders.length} order${orders.length !== 1 ? 's' : ''} placed`
                : 'Track your eco stationery orders here'}
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state-icon">📦</span>
              <h2>No orders yet</h2>
              <p>Your orders will appear here once you've made a purchase.</p>
              <Link to="/shop" className="btn btn-primary btn-lg">
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
