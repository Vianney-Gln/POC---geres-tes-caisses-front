import React, { useContext } from 'react';
// import react router dom
import { Link } from 'react-router-dom';
// import PropTypes
import PropTypes from 'prop-types';
// import context
import ContextArticles from '../../context/ContextArticles';
// style css
import './menuTop.scss';

// Check if there is filters (by calling articleName), and then check the path to determine the current tabs (stock, reception etc...)
const MenuTop = ({ location }) => {
  const contextArticles = useContext(ContextArticles);
  const { articleName } = contextArticles;

  return (
    <div className="menu-top">
      <nav className="navbar">
        <ul className="list-navbar">
          <Link to="/">
            <li
              className={
                location === '/reception' ? '' : location === '/' || articleName ? 'current' : ''
              }>
              Stock
            </li>
          </Link>
          <Link to="/reception">
            <li className={location === '/reception' ? 'current' : ''}>Réceptions</li>
          </Link>
          <li>Gestion des stocks</li>
        </ul>
      </nav>
    </div>
  );
};

MenuTop.propTypes = {
  location: PropTypes.string
};

export default MenuTop;
