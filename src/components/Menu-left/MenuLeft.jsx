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
      <ul className="list-article">
        <li>première article</li>
        <li>deuxième article</li>
        <li>troisième article</li>
      </ul>
      <div className="quantity">
        <p>Nombre caisses:</p>
      </div>
    </div>
  );
};

export default MenuLeft;
