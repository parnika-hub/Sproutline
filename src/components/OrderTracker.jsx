// src/components/OrderTracker.jsx
import './OrderTracker.css';

const TRACKING_STEPS = [
  { key: 'placed', label: 'Order Placed' },
  { key: 'confirmed', label: 'Order Confirmed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' },
];

function getStepIndex(status) {
  if (!status) return 0;
  const s = String(status).trim().toLowerCase();
  if (s === 'placed') return 0;
  if (s === 'confirmed' || s === 'packed') return 1;
  if (s === 'shipped') return 2;
  if (s === 'out for delivery') return 3;
  if (s === 'delivered') return 4;
  return 0;
}

export default function OrderTracker({ status }) {
  const currentStepIndex = getStepIndex(status);

  return (
    <div className="order-tracker" aria-label="Order tracking progress">
      <ol className="order-tracker__list">
        {TRACKING_STEPS.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isUpcoming = idx > currentStepIndex;
          const stateText = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';

          return (
            <li
              key={step.key}
              className={`order-tracker__step ${isCompleted ? 'order-tracker__step--completed' : ''} ${isCurrent ? 'order-tracker__step--current' : ''} ${isUpcoming ? 'order-tracker__step--upcoming' : ''}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span className="order-tracker__circle" aria-hidden="true">
                {isCompleted || isCurrent ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  idx + 1
                )}
              </span>
              <span className="order-tracker__label">
                <span className="order-tracker__label-text">{step.label}</span>
                <span className="order-tracker__sr-only visually-hidden sr-only"> {stateText}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
