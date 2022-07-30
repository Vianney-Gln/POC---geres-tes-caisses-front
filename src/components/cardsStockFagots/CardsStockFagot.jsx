// import react hooks
import React from 'react';
// import PropTypes
import PropTypes from 'prop-types';

const CardsStockFagot = ({ stock }) => {
  console.log(stock);
  return <div className="card-fagot">CardsStockFagot</div>;
};

CardsStockFagot.propTypes = {
  stock: PropTypes.array
};

export default CardsStockFagot;
