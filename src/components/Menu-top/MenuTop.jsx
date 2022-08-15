import React from 'react';
// import react router dom
import { Link } from 'react-router-dom';
// import PropTypes
import PropTypes from 'prop-types';
// style css
import './menuTop.scss';

// Check if there is filters (by calling articleName), and then check the path to determine the current tabs (stock, reception etc...)
const MenuTop = ({ location }) => {
  return (
    <div className="menu-top">
      <nav className="navbar">
        <ul className="list-navbar">
          <Link to="/">
            <li className={location.includes('/stock') ? 'current' : ''}>Stock</li>
          </Link>
          <Link to="/reception">
            <li className={location.includes('/reception') ? 'current' : ''}>Réceptions</li>
          </Link>
          <Link to="/out-of-stock">
            <li className={location.includes('/out-of-stock') ? 'current' : ''}>Sortie de stock</li>
          </Link>
          <Link to="/bundling">
            <li>Fagotage</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

MenuTop.propTypes = {
  location: PropTypes.string
};

export default MenuTop;
