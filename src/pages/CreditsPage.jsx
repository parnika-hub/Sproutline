// src/pages/CreditsPage.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';

const PRODUCT_IMAGES = [
  { file: '/images/seed-paper-notebook.jpg', name: 'Seed-paper notebook', attribution: 'Reference product images provided by the project team' },
  { file: '/images/bamboo-ruler-set.jpg', name: 'Bamboo ruler set', attribution: 'Reference product images provided by the project team' },
  { file: '/images/plantable-pencils.jpg', name: 'Plantable pencils (pack of 10)', attribution: 'Reference product images provided by the project team' },
  { file: '/images/plantable-pen.jpg', name: 'Plantable seed pen (pack of 5)', attribution: 'Reference product images provided by the project team' },
  { file: '/images/cork-desk-organiser.jpg', name: 'Cork desk organiser', attribution: 'Reference product images provided by the project team' },
  { file: '/images/recycled-sticky-notes.jpg', name: 'Recycled sticky notes', attribution: 'Reference product images provided by the project team' },
];

const EDITORIAL_IMAGES = [
  {
    file: '/images/hero-eco.jpg',
    usage: 'Hero Banner (ScrollExpand)',
    source: 'Unsplash',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363',
    author: 'Joanna Kosinska',
    license: 'Unsplash License (Free for commercial/personal use)',
  },
  {
    file: '/images/leaves-texture.jpg',
    usage: 'Section Headings Mask (MaskedHeading)',
    source: 'Unsplash',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
    author: 'Luca Bravo',
    license: 'Unsplash License (Free for commercial/personal use)',
  },
];

export default function CreditsPage() {
  return (
    <>
      <Header showBack />
      <main className="page-content" id="main-content" style={{ paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ marginBottom: '36px' }}>
            <h1 style={{ fontSize: '2.4rem', color: 'var(--forest)', marginBottom: '8px' }}>
              Photo Credits &amp; Attribution
            </h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1.05rem' }}>
              Transparency in our visual media and product photography.
            </p>
          </div>

          {/* Product photos section */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--forest)', marginBottom: '16px' }}>
              Product Photography
            </h2>
            <div
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--mist-dark)',
                display: 'grid',
                gap: '16px',
              }}
            >
              {PRODUCT_IMAGES.map((item) => (
                <div
                  key={item.file}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid var(--mist-dark)',
                  }}
                >
                  <img
                    src={item.file}
                    alt={item.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1rem', color: 'var(--ink)', fontWeight: 700, marginBottom: '4px' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--forest)', fontWeight: 600 }}>
                      {item.attribution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Editorial / Background photos section */}
          <section>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--forest)', marginBottom: '16px' }}>
              Editorial &amp; Graphic Elements
            </h2>
            <div
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--mist-dark)',
                display: 'grid',
                gap: '20px',
              }}
            >
              {EDITORIAL_IMAGES.map((item) => (
                <div
                  key={item.file}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--mist-dark)',
                  }}
                >
                  <img
                    src={item.file}
                    alt={item.usage}
                    style={{
                      width: '72px',
                      height: '72px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.05rem', color: 'var(--forest)', marginBottom: '4px' }}>
                      {item.usage}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', marginBottom: '4px' }}>
                      Photo by {item.author} ({item.source}) · {item.license}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.85rem', color: 'var(--kraft-dark)', textDecoration: 'underline' }}
                    >
                      View on Unsplash ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
