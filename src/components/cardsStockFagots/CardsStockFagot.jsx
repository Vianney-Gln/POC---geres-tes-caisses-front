// import react hooks
import React from 'react';
//import Routing Link
import { Link } from 'react-router-dom';
// import PropTypes
import PropTypes from 'prop-types';
// import style css
import './cardsStockFagot.scss';

const CardsStockFagot = ({ stock }) => {
  return (
    <Link to={`/fagot-content/${stock.id}`}>
      <li className="card-fagot">
        <span>{stock.uuid}</span>
        <span>{stock.fagotType}</span>
      </li>
    </Link>
  );
};

CardsStockFagot.propTypes = {
  stock: PropTypes.object
};

export default CardsStockFagot;
