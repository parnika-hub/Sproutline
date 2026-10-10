// src/components/CheckoutSteps.jsx
import { Link, useLocation } from 'react-router-dom';
import './CheckoutSteps.css';

const STEPS = [
  { label: 'Cart', path: '/cart' },
  { label: 'Shipping', path: '/shipping' },
  { label: 'Review', path: '/review' },
];

export default function CheckoutSteps() {
  const location = useLocation();
  const currentIdx = STEPS.findIndex((s) => s.path === location.pathname);

  return (
    <nav className="checkout-steps" aria-label="Checkout progress">
      <ol className="checkout-steps__list">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentIdx;
          const isActive = idx === currentIdx;

          return (
            <li
              key={step.path}
              className={`checkout-steps__step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
            >
              {idx > 0 && (
                <span className="checkout-steps__connector" aria-hidden="true" />
              )}
              <Link
                to={step.path}
                className="checkout-steps__link"
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${idx + 1}: ${step.label}${isDone ? ' (completed)' : isActive ? ' (current)' : ''}`}
              >
                <span className="checkout-steps__num" aria-hidden="true">
                  {isDone ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </span>
                <span className="checkout-steps__label">{step.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
