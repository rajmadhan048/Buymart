// src/App.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, MapPin, Menu, Star, Trash2, 
  CheckCircle, X 
} from 'lucide-react';

export default function BuyMartApp() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Products & Categories
  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });

    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Search Suggestions Logic
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, products]);

  // Cart Operations
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
    }
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleBuyNow = (product) => {
    addToCart(product);
    setShowCart(false);
    setShowCheckout(true);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="buymart-app">
      
      {/* NAVBAR */}
      <header className="bm-header">
        <div className="bm-navbar">
          
          <div className="bm-logo" onClick={() => { setSelectedCategory('All'); setShowCart(false); setShowCheckout(false); setOrderPlaced(false); }}>
            buymart<span className="bm-logo-domain">.in</span>
          </div>

          <div className="bm-location">
            <MapPin size={18} color="#ccc" />
            <div className="bm-location-text">
              <span className="bm-location-sub">Deliver to</span><br />
              <strong>Chennai 600001</strong>
            </div>
          </div>

          <div className="bm-search-container">
            <div className="bm-search-box">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bm-search-select"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Search BuyMart for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bm-search-input"
              />

              <button className="bm-search-btn">
                <Search size={20} color="#111" />
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="bm-suggestions-dropdown">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => { setSearchQuery(item.title); setSuggestions([]); }}
                    className="bm-suggestion-item"
                  >
                    🔍 {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div onClick={() => setShowAuthModal(true)} className="bm-account">
            <span className="bm-location-sub">
                {user ? `Hello, ${user.name}` : 'Hello, Sign in'}
            </span><br />
            <strong>Account & Lists</strong>
          </div>

          <div onClick={() => { setShowCart(true); setShowCheckout(false); setOrderPlaced(false); }} className="bm-cart-link">
            <ShoppingCart size={32} />
            <span className="bm-cart-badge">{cartCount}</span>
            <span className="bm-cart-text">Cart</span>
          </div>
        </div>

        {/* SUBHEADER / CATEGORIES BAR */}
        <div className="bm-subheader">
          <div className="bm-subheader-all" onClick={() => setSelectedCategory('All')}>
            <Menu size={18} /> All Categories
          </div>
          {categories.map((cat) => (
            <span 
              key={cat} 
              onClick={() => { setSelectedCategory(cat); setShowCart(false); setShowCheckout(false); }}
              className={'bm-category-item ' + (selectedCategory === cat ? 'active' : '')}
            >
              {cat}
            </span>
          ))}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="bm-main-content">
        
        {/* ORDER SUCCESS SCREEN */}
        {orderPlaced ? (
          <div className="bm-success-card">
            <CheckCircle size={64} color="green" style={{ marginBottom: '15px' }} />
            <h2>Order Placed Successfully! 🎉</h2>
            <p style={{ color: '#555', marginTop: '10px' }}>Thank you for shopping on BuyMart. Your Order ID is <strong>#BM-{Math.floor(100000 + Math.random() * 900000)}</strong>.</p>
            <p style={{ fontSize: '14px', color: '#777', marginTop: '5px' }}>Payment Mode: Cash on Delivery (COD)</p>
            <button onClick={() => { setOrderPlaced(false); setCart([]); }} className="btn-add-cart" style={{ marginTop: '20px', padding: '12px 25px' }}>
              Continue Shopping
            </button>
          </div>
        ) : showCheckout ? (
          
          /* CHECKOUT VIEW */
          <div className="bm-layout-flex">
            <div className="bm-flex-left">
              <h3>1. Select Delivery Address</h3>
              <div style={{ margin: '15px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <strong>Madhanraj M</strong> <br />
                Door No. 12, Main Street, T. Nagar, Chennai, Tamil Nadu - 600017 <br />
                Phone: +91 9876543210
              </div>

              <h3>2. Select Payment Method</h3>
              <div style={{ margin: '15px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input type="radio" name="payment" defaultChecked />
                  <strong>Pay on Delivery (Cash/UPI at doorstep)</strong>
                </label>
              </div>
            </div>

            <div className="bm-flex-right">
              <h3>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                <span>Items ({cartCount}):</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', color: 'green' }}>
                <span>Delivery:</span>
                <span>FREE</span>
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', margin: '15px 0', color: '#B12704' }}>
                <span>Order Total:</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <button onClick={() => setOrderPlaced(true)} className="bm-btn-checkout">
                Place Your Order
              </button>
            </div>
          </div>
        ) : showCart ? (

          /* CART VIEW */
          <div className="bm-layout-flex">
            <div className="bm-flex-left">
              <h2>Shopping Cart</h2>
              {cart.length === 0 ? (
                <p style={{ padding: '20px 0' }}>Your BuyMart cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="bm-cart-item">
                    <img src={item.image} alt={item.title} className="bm-cart-item-img" />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '15px', marginBottom: '5px' }}>{item.title}</h4>
                      <p style={{ color: 'green', fontSize: '12px', fontWeight: 'bold' }}>In Stock</p>
                      <div className="bm-qty-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '2px 8px' }}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '2px 8px' }}>+</button>
                        <button onClick={() => updateQuantity(item.id, 0)} className="bm-btn-remove">
                          <Trash2 size={16} /> Remove
                        </button>
                      </div>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="bm-flex-right">
                <h3>Subtotal ({cartCount} items): <span style={{ color: '#B12704' }}>${cartSubtotal.toFixed(2)}</span></h3>
                <button onClick={() => setShowCheckout(true)} className="bm-btn-checkout">
                  Proceed to Buy
                </button>
              </div>
            )}
          </div>
        ) : (

          /* HOME GRID VIEW */
          <div>
            <div className="bm-hero-banner">
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80" alt="Banner" className="bm-banner-img" />
            </div>

            {loading ? (
              <h2 style={{ textAlign: 'center', padding: '40px' }}>Loading products from API... ⏳</h2>
            ) : (
              <div className="bm-products-grid">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="bm-product-card">
                    <div>
                      <img src={p.image} alt={p.title} className="bm-product-img" />
                      <h4 className="bm-product-title">{p.title}</h4>

                      <div className="bm-product-rating">
                        <Star size={14} fill="#ffa41c" />
                        <span>{p.rating?.rate || 4.5}</span>
                        <span className="bm-product-reviews">({p.rating?.count || 120})</span>
                      </div>

                      <div className="bm-product-price">${p.price}</div>
                    </div>

                    <div className="bm-card-actions">
                      <button onClick={() => addToCart(p)} className="btn-add-cart">
                        Add to Cart
                      </button>
                      <button onClick={() => handleBuyNow(p)} className="btn-buy-now">
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className="bm-modal-overlay">
          <div className="bm-modal-card">
            <X size={20} onClick={() => setShowAuthModal(false)} className="bm-modal-close" />
            <h2>{authMode === 'login' ? 'Sign In' : 'Create Account'}</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); setUser({ name: 'Madhanraj' }); setShowAuthModal(false); }} className="bm-auth-form">
              {authMode === 'signup' && (
                <input type="text" placeholder="Your Name" required className="bm-input-field" />
              )}
              <input type="email" placeholder="Email or Mobile Number" required className="bm-input-field" />
              <input type="password" placeholder="Password" required className="bm-input-field" />
              
              <button type="submit" className="btn-add-cart" style={{ borderRadius: '4px', padding: '10px' }}>
                {authMode === 'login' ? 'Continue' : 'Create BuyMart Account'}
              </button>
            </form>

            <p style={{ fontSize: '13px', marginTop: '15px', textAlign: 'center' }}>
              {authMode === 'login' ? "New to BuyMart? " : "Already have an account? "}
              <span 
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                style={{ color: '#007185', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {authMode === 'login' ? 'Create an account' : 'Sign In'}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bm-footer">
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bm-back-to-top">
          Back to top
        </div>

        <div className="bm-footer-grid">
          <div>
            <h4 style={{ marginBottom: '12px' }}>Get to Know Us</h4>
            <p className="bm-footer-link">About BuyMart</p>
            <p className="bm-footer-link">Careers</p>
            <p className="bm-footer-link">Press Releases</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '12px' }}>Connect with Us</h4>
            <p className="bm-footer-link">Facebook</p>
            <p className="bm-footer-link">Twitter</p>
            <p className="bm-footer-link">Instagram</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '12px' }}>Make Money with Us</h4>
            <p className="bm-footer-link">Sell on BuyMart</p>
            <p className="bm-footer-link">Supply to BuyMart</p>
            <p className="bm-footer-link">Become an Affiliate</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '12px' }}>Let Us Help You</h4>
            <p className="bm-footer-link">Your Account</p>
            <p className="bm-footer-link">Returns Centre</p>
            <p className="bm-footer-link">100% Purchase Protection</p>
          </div>
        </div>

        <div className="bm-copyright">
          © 2026, BuyMart.com, Inc. or its affiliates
        </div>
      </footer>
    </div>
  );
}