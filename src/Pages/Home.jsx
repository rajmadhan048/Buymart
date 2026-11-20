// src/pages/Home.jsx
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

function Home() {
  const { searchQuery, selectedCategory } = useCart();

  // Filter products based on search bar & category
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <HeroBanner />
      <div className="products-container">
        {filteredProducts.length === 0 ? (
          <h2 style={{ textAlign: 'center', padding: '40px', color: '#555' }}>No products found! 🔍</h2>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;