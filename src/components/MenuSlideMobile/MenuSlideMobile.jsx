import React from 'react';
// import style css
import './menuSlideMobile.scss';
// import PropTypes
import PropTypes from 'prop-types';

const MenuSlideMobile = ({ openSlide, setOpenSlide }) => {
  // Function closing the slide if device is resizing
  window.addEventListener('resize', () => {
    console.log(openSlide);
    setOpenSlide(false);
  });

  return (
    <div className={openSlide ? 'MenuSlideMobile open' : 'MenuSlideMobile'}>
      <i onClick={() => setOpenSlide(false)} className="cross">
        X
      </i>
      <ul className="list-nav">
        <li>choix 1</li>
        <li>choix 2</li>
      </ul>
    </div>
  );
};

MenuSlideMobile.propTypes = {
  openSlide: PropTypes.bool,
  setOpenSlide: PropTypes.func
};

export default MenuSlideMobile;
