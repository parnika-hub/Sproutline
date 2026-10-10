// src/pages/InfoPage.jsx
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function InfoPage({ type = 'contact' }) {
  const content = {
    'shipping-returns': {
      title: 'Shipping & Returns',
      subtitle: 'Compostable packaging & gentle return policies',
      sections: [
        {
          heading: 'Shipping Options',
          text: 'We ship nationwide across India. Standard Shipping takes 3–6 business days (free on orders over Rs 500, else Rs 50). Express Shipping takes 1–2 business days (Rs 120 flat).',
        },
        {
          heading: '100% Plastic-Free Packaging',
          text: 'All orders are carefully packed inside biodegradable kraft mailers, padded with shredded post-consumer recycled paper, and sealed with water-activated paper tape.',
        },
        {
          heading: 'Easy 14-Day Returns',
          text: 'If you are not completely delighted with your stationery, contact us within 14 days of delivery. We will arrange a doorstep pickup and issue a full refund.',
        },
      ],
    },
    'track-order': {
      title: 'Track Your Order',
      subtitle: 'Check the real-time fulfillment status of your stationery',
      sections: [
        {
          heading: 'Recent Orders',
          text: 'You can view and track all your orders directly in the My Orders tab. Each order displays its current stage: Placed, Packed, Shipped, or Delivered.',
        },
      ],
      action: {
        text: 'View My Orders',
        link: '/orders',
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: "We'd love to hear from you — whether you have questions or feedback",
      sections: [
        {
          heading: 'Customer Support',
          text: 'Email us at hello@sproutline.eco or reach our helpline at +91 98765 43210 (Mon–Fri, 9am–6pm IST).',
        },
        {
          heading: 'Bulk & Corporate Inquiries',
          text: 'Looking for custom seed-paper notebooks or plantable seed pencils for your school or company? Write to partnerships@sproutline.eco for eco-gifting hampers.',
        },
      ],
    },
  }[type] || {
    title: 'Information',
    subtitle: 'Sproutline Eco-Friendly Stationery',
    sections: [],
  };

  return (
    <>
      <Header showBack />
      <main className="page-content" id="main-content" style={{ paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ marginBottom: '36px' }}>
            <h1 style={{ fontSize: '2.4rem', color: 'var(--forest)', marginBottom: '8px' }}>{content.title}</h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1.1rem' }}>{content.subtitle}</p>
          </div>

          <div style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--mist-dark)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
            {content.sections.map((s) => (
              <div key={s.heading}>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--forest)', marginBottom: '8px' }}>{s.heading}</h2>
                <p style={{ color: 'var(--ink)', lineHeight: '1.7' }}>{s.text}</p>
              </div>
            ))}

            {content.action && (
              <div style={{ marginTop: '12px' }}>
                <Link to={content.action.link} className="btn btn-primary">
                  {content.action.text}
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
