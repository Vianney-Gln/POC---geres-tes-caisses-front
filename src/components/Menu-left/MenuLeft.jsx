import React from 'react';
// style css
import './menuLeft.scss';

const MenuLeft = () => {
  return (
    <div className="menu-left">
      <select>
        <option>Caisses vracs</option>
        <option>Caisses total</option>
        <option>Fagots</option>
      </select>
    </div>
  );
};

export default MenuLeft;
