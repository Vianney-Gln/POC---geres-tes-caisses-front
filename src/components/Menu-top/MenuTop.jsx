import React from 'react';
// style css
import './menuTop.scss';

const MenuTop = () => {
  return (
    <div className="menu-top">
      <nav className="navbar">
        <ul className="list-navbar">
          <li>Consulter les stocks</li>
          <li>Gérer les stocks</li>
          <li>Création d&apos;articles</li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuTop;
