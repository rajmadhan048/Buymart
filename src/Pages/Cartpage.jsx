// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartCount, cartSubtotal } = useCart();

  return (
    <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
      <h2>Shopping Cart</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '15px', flexWrap: 'wrap' }}>
        
        {/* Left: Cart Items List */}
        <div style={{ flex: 2, background: '#fff', padding: '20px', borderRadius: '4px' }}>
          {cart.length === 0 ? (
            <p style={{ padding: '20px 0', color: '#555' }}>Your Amazon Cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #ddd', padding: '15px 0', alignItems: 'center' }}>
                <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '16px', marginBottom: '5px' }}>{item.title}</h4>
                  <p style={{ color: '#007600', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>In stock</p>
                  
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '2px 10px', background: '#f0f2f2', border: 'none', cursor: 'pointer' }}>-</button>
                      <span style={{ padding: '0 12px' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '2px 10px', background: '#f0f2f2', border: 'none', cursor: 'pointer' }}>+</button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: '#007185', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Subtotal & Checkout Box */}
        <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '4px', height: 'fit-content' }}>
          <h3>Subtotal ({cartCount} items): <span style={{ fontWeight: 'bold' }}>₹{cartSubtotal.toLocaleString('en-IN')}</span></h3>
          <button style={{ width: '100%', background: '#ffd814', border: '1px solid #fcd200', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' }}>
            Proceed to Buy
          </button>
        </div>

      </div>
    </div>
  );
}

export default CartPage;