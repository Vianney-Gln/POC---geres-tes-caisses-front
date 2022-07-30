// import react hooks
import React from 'react';
// import PropTypes
import PropTypes from 'prop-types';
// import style css
import './cardsStockFagot.scss';

const CardsStockFagot = ({ stock }) => {
  return (
    <li className="card-fagot">
      <span>{stock.uuid}</span>
      <span>{stock.fagotType}</span>
    </li>
  );
};

CardsStockFagot.propTypes = {
  stock: PropTypes.object
};

export default CardsStockFagot;
