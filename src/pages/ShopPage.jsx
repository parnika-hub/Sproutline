// src/pages/ShopPage.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './ShopPage.css';

export default function ShopPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlCat = params.get('cat');
  const [activeCategory, setActiveCategory] = useState(() => {
    return urlCat && categories.includes(urlCat) ? urlCat : 'All';
  });

  // If user navigated via query param changes
  useEffect(() => {
    if (urlCat && categories.includes(urlCat)) {
      setActiveCategory(urlCat);
    }
  }, [urlCat]);

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main className="page-content shop-page" id="main-content">
        <div className="container">
          {/* Page title */}
          <div className="shop-header">
            <h1 className="shop-title">Eco Stationery Shop</h1>
            <p className="shop-subtitle">
              Every product here is recycled, plantable, or plastic-free — usually all three.
            </p>
          </div>

          {/* Category filters */}
          <div className="shop-filters" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${activeCategory === cat ? 'filter-chip--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
            <span className="shop-count" aria-live="polite">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Product grid */}
          {filtered.length > 0 ? (
            <div className="product-grid shop-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state-icon">🔍</span>
              <h2>No products found</h2>
              <p>Try a different filter.</p>
              <button className="btn btn-primary" onClick={() => setActiveCategory('All')}>
                Show all
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
