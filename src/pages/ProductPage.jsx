// src/pages/ProductPage.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductById, getRelated } from '../data/products';
import './ProductPage.css';

const TAG_MAP = {
  Plantable: 'plantable',
  Recycled: 'recycled',
  Bamboo: 'bamboo',
  Cork: 'cork',
  Refillable: 'refillable',
  Compostable: 'compostable',
  'Plastic-free': 'plastic-free',
};

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = getProductById(id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <>
        <Header showBack />
        <main className="page-content">
          <div className="container empty-state">
            <span className="empty-state-icon">🔍</span>
            <h1>Product not found</h1>
            <Link to="/shop" className="btn btn-primary">Browse stationery</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const related = getRelated(id, 4);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Header showBack />
      <main className="page-content product-page" id="main-content">
        <div className="container">
          <div className="product-layout">
            {/* Image */}
            <div className="product-img-col">
              <div
                className="product-main-img-wrap"
                style={product.imageFit === 'contain' ? { background: '#ffffff' } : undefined}
              >
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-main-img"
                    style={{
                      objectFit: product.imageFit || 'cover',
                      objectPosition: product.imagePosition || 'center top',
                      ...(product.imageFit === 'contain' ? { backgroundColor: '#ffffff' } : {}),
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="product-img-placeholder img-placeholder"
                  style={{ display: product.images?.[0] ? 'none' : 'flex' }}
                  aria-hidden="true"
                >
                  🌱
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="product-info-col">
              <span className={`tag-chip tag-${TAG_MAP[product.tag] || 'recycled'}`}>
                {product.tag}
              </span>

              <h1 className="product-name">{product.name}</h1>

              <p className="product-category">
                Category: <strong>{product.category}</strong>
              </p>

              <p className="product-price">Rs {product.price}</p>

              <p className="product-desc">{product.description}</p>

              <div className="product-qty-row">
                <label className="form-label" htmlFor="product-qty">Quantity</label>
                <div className="qty-stepper" id="product-qty-wrap">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    disabled={qty <= 1}
                  >
                    −
                  </button>
                  <span
                    id="product-qty"
                    role="spinbutton"
                    aria-valuenow={qty}
                    aria-valuemin={1}
                    aria-valuemax={99}
                    aria-label="Quantity"
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-cta-row">
                <button
                  className={`btn btn-lg product-add-btn ${added ? 'btn-kraft' : 'btn-primary'}`}
                  onClick={handleAdd}
                  aria-label={added ? 'Added to cart!' : `Add ${product.name} to cart`}
                >
                  {added ? '✓ Added!' : 'Add to cart'}
                </button>
                <Link to="/cart" className="btn btn-secondary btn-lg">
                  View cart
                </Link>
              </div>

              <div className="product-trust-row">
                <span>🌱 Eco-certified</span>
                <span>🚫 Plastic-free shipping</span>
                <span>🚚 Free over Rs 500</span>
              </div>
            </div>
          </div>

          {/* More to explore */}
          <section className="product-related" aria-labelledby="related-heading">
            <h2 id="related-heading" className="product-related-title">More to explore</h2>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
