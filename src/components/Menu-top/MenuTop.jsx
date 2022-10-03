import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './menuTop.scss';
import ContextStock from '../../context/ContextStock';

const MenuTop = ({ location, setOpenSlide }) => {
  const contextStock = useContext(ContextStock);
  const { setTypeStock } = contextStock;

  return (
    <div className="menu-top">
      <nav className="navbar">
        <ul className="list-navbar">
          <Link to="/">
            <li onClick={() => setTypeStock('caisses-vrac')}>
              <span className={location.includes('/stock') ? 'current' : ''}>Stock</span>
            </li>
          </Link>
          <Link to="/reception">
            <li>
              <span className={location.includes('/reception') ? 'current' : ''}>Réceptions</span>
            </li>
          </Link>
          <Link to="/out-of-stock">
            <li onClick={() => setTypeStock('caisses-vrac')}>
              <span className={location.includes('/out-of-stock') ? 'current' : ''}>
                Sortie de stock
              </span>
            </li>
          </Link>
          <li
            className={
              location.includes('/bundling')
                ? 'desktop content-slide-down'
                : 'desktop content-slide-down'
            }>
            <span
              className={
                location.includes('bundling')
                  ? 'desktop current content-slide-down'
                  : 'desktop content-slide-down'
              }>
              Fagotage
            </span>
            <ul className="slide-down">
              <Link to="/bundling/create-bundle">
                <li>Création de fagot vide</li>
              </Link>
              <Link to="/bundling/manage-bundle">
                <li>Gestion des fagots</li>
              </Link>
            </ul>
          </li>
          <li
            onClick={() => setOpenSlide(true)}
            className={
              location.includes('/bundling')
                ? 'mobile current content-slide-down'
                : 'mobile content-slide-down'
            }>
            Fagotage
          </li>
        </ul>
      </nav>
    </div>
  );
};

MenuTop.propTypes = {
  location: PropTypes.string,
  setOpenSlide: PropTypes.func
};

export default MenuTop;
