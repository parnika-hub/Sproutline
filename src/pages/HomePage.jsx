// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import ScrollExpand from '../components/reactbits/ScrollExpand';
import MaskedHeading from '../components/reactbits/MaskedHeading';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';
import './HomePage.css';

const BESTSELLERS = products.slice(0, 4);

const TRUST_POINTS = [
  {
    icon: '🚫',
    title: 'Plastic-Free Packing',
    desc: 'Every order ships in compostable mailers and recycled kraft tissue. Zero plastic, ever.',
  },
  {
    icon: '🌱',
    title: 'Plantable Products',
    desc: "Our seed-paper notebooks and plantable pencils let you grow herbs and wildflowers when you're done.",
  },
  {
    icon: '🚚',
    title: 'Free Shipping over Rs 500',
    desc: 'Standard delivery is on us when your order crosses Rs 500. Express is always available.',
  },
];

export default function HomePage() {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero */}
        <section aria-label="Hero">
          <ScrollExpand
            src="/images/hero-eco.jpg"
            alt="Flat lay of eco-friendly stationery on a wooden desk"
            title="Write on paper that grows back"
            scrollHint="Scroll"
          >
            <p className="hero-tagline">Recycled, plantable, plastic-free — stationery with a second life.</p>
            <Link to="/shop" className="btn btn-kraft btn-lg">
              Shop stationery
            </Link>
          </ScrollExpand>
        </section>

        {/* Bestsellers */}
        <section className="home-section" aria-labelledby="bestsellers-heading">
          <div className="container">
            <div className="section-header">
              <div>
                <MaskedHeading
                  imageSrc="/images/leaves-texture.jpg"
                  ariaLabel="Bestsellers"
                  reveal="rise"
                >
                  Bestsellers
                </MaskedHeading>
                <p className="section-subtitle">Our most-loved eco picks, tried and trusted.</p>
              </div>
              <Link to="/shop" className="btn btn-secondary">
                View all →
              </Link>
            </div>
            <div className="product-grid">
              {BESTSELLERS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Trust points */}
        <section className="trust-section" aria-label="Why Sproutline">
          <div className="container">
            <div className="trust-grid">
              {TRUST_POINTS.map((pt) => (
                <div key={pt.title} className="trust-card">
                  <span className="trust-card__icon" aria-hidden="true">{pt.icon}</span>
                  <h3 className="trust-card__title">{pt.title}</h3>
                  <p className="trust-card__desc">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Promise band */}
        <section className="promise-band" aria-labelledby="promise-heading">
          <div className="container promise-band__inner">
            <div className="promise-band__text">
              <MaskedHeading
                imageSrc="/images/leaves-texture.jpg"
                ariaLabel="Plant what you finish"
                reveal="rise"
              >
                Plant what you finish
              </MaskedHeading>
              <p className="promise-band__desc">
                Every Sproutline notebook is made from seed-paper or FSC-certified recycled stock. When your pages run out, bury them in soil — within weeks, wildflowers, basil, or tomatoes will push through. Nothing goes to landfill.
              </p>
              <ul className="promise-list" role="list">
                <li>✦ 100% post-consumer recycled or seed-embedded paper</li>
                <li>✦ Vegetable-based inks, no bleaching</li>
                <li>✦ Compostable packaging — arrives plastic-free</li>
                <li>✦ Every order plants a tree with our NGO partners</li>
              </ul>
              <Link to="/shop" className="btn btn-primary">
                Shop the range
              </Link>
            </div>
            <div className="promise-band__photo-wrap" aria-hidden="true">
              <img
                src="/images/ecofriendly-panel.jpg"
                alt="Hands holding a green heart inside a recycling symbol over a forest"
                className="promise-band__photo"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
