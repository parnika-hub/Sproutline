// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function TagChip({ tag }) {
  const map = {
    Plantable: 'plantable',
    Recycled: 'recycled',
    Bamboo: 'bamboo',
    Cork: 'cork',
    Refillable: 'refillable',
    Compostable: 'compostable',
    'Plastic-free': 'plastic-free',
  };
  return (
    <span className={`tag-chip tag-${map[tag] || 'recycled'}`}>{tag}</span>
  );
}

function getCardImageStyle(product) {
  if (product.id === 'p001' || product.images?.[0]?.includes('seed-paper-notebook')) {
    return { objectFit: 'cover', objectPosition: 'center 35%' };
  }
  if (product.id === 'p002' || product.images?.[0]?.includes('bamboo-ruler-set')) {
    return { objectFit: 'cover', objectPosition: 'center' };
  }
  return { objectFit: 'cover', objectPosition: 'center top' };
}

export default function ProductCard({ product, compact = false }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const imgStyle = getCardImageStyle(product);

  return (
    <article className={`product-card card ${compact ? 'product-card--compact' : ''}`}>
      <Link
        to={`/product/${product.id}`}
        className="product-card__img-wrap"
        tabIndex={-1}
        aria-hidden="true"
      >
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-card__img"
            style={imgStyle}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="product-card__placeholder img-placeholder"
          style={{ display: product.images?.[0] ? 'none' : 'flex' }}
          aria-hidden="true"
        >
          🌱
        </div>
      </Link>

      <div className="product-card__body">
        <TagChip tag={product.tag} />
        <Link to={`/product/${product.id}`} className="product-card__name-link">
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <div className="product-card__footer">
          <span className="product-card__price">Rs {product.price}</span>
          <button
            className="btn btn-primary btn-sm product-card__add"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
