// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cartCount, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <Link to="/" className="nav-logo">
          amazon<span className="nav-logo-in">.in</span>
        </Link>

        {/* Location */}
        <div className="nav-location">
          <MapPin size={18} color="#cccccc" />
          <div className="nav-location-text">
            <p className="nav-location-sub">Delivering to Chennai 600001</p>
            <p className="nav-location-main">Update location</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="nav-search-container">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="nav-search-select"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
          </select>
          <input 
            type="text" 
            placeholder="Search Amazon" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="nav-search-input"
          />
          <button className="nav-search-btn">
            <Search size={20} color="#111" />
          </button>
        </div>

        {/* Account Details */}
        <div className="nav-account">
          <div className="nav-account-item">
            <p className="nav-location-sub">Hello, Sign in</p>
            <p className="nav-location-main">Account & Lists</p>
          </div>
          <div className="nav-account-item">
            <p className="nav-location-sub">Returns</p>
            <p className="nav-location-main">& Orders</p>
          </div>
        </div>

        {/* Cart Link */}
        <Link to="/cart" className="nav-cart">
          <ShoppingCart size={32} color="#ffffff" />
          <span className="nav-cart-badge">{cartCount}</span>
          <span className="nav-cart-text">Cart</span>
        </Link>

      </div>
    </header>
  );
}

export default Navbar;