import React from 'react';
// import style css
import './menuSlideMobile.scss';
import { Link } from 'react-router-dom';
// import PropTypes
import PropTypes from 'prop-types';

const MenuSlideMobile = ({ openSlide, setOpenSlide }) => {
  // Function closing the slide if device is resizing
  window.addEventListener('resize', () => {
    setOpenSlide(false);
  });

  return (
    <div className={openSlide ? 'MenuSlideMobile open' : 'MenuSlideMobile'}>
      <i onClick={() => setOpenSlide(false)} className="cross">
        X
      </i>
      <ul className="list-nav">
        <Link to="/bundling/create-bundle">
          <li onClick={() => setOpenSlide(false)}>Création de fagot vide</li>
        </Link>
        <Link to="/bundling/bundle">
          <li onClick={() => setOpenSlide(false)}>Mise en fagot</li>
        </Link>
      </ul>
    </div>
  );
};

MenuSlideMobile.propTypes = {
  openSlide: PropTypes.bool,
  setOpenSlide: PropTypes.func
};

export default MenuSlideMobile;
