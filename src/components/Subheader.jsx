// src/components/SubHeader.jsx
import React from 'react';
import { Menu } from 'lucide-react';

function SubHeader() {
  const menuItems = ["Fresh", "Amazon Pay", "Sell", "Best Sellers", "Today's Deals", "Mobiles", "Electronics", "Customer Service"];

  return (
    <div className="subheader">
      <div className="subheader-menu">
        <Menu size={18} />
        <span>All</span>
      </div>
      {menuItems.map((item, idx) => (
        <span key={idx} className="subheader-item">{item}</span>
      ))}
    </div>
  );
}

export default SubHeader;