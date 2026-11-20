// src/components/ProductCard.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Star } from 'lucide-react';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div>
        <img src={product.image} alt={product.title} className="product-img" />
        <h3 className="product-title">{product.title}</h3>
        
        {/* Rating Stars */}
        <div className="product-rating">
          <Star size={16} fill="#ffa41c" color="#ffa41c" />
          <span>{product.rating}</span>
          <span style={{ color: '#007185', fontSize: '12px' }}>({product.reviewsCount})</span>
        </div>

        {/* Price */}
        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>

        {/* Prime Badge condition */}
        {product.isPrime && <p className="prime-badge">prime <span style={{ color: '#555', fontWeight: 'normal' }}>FREE Delivery by Amazon</span></p>}
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={() => addToCart(product)}
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;