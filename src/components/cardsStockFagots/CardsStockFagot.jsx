// import react hooks
import React, { useEffect, useState } from 'react';
//import Routing Link
import { Link } from 'react-router-dom';
// import PropTypes
import PropTypes from 'prop-types';
// import style css
import './cardsStockFagot.scss';
// import service
import { getCountBoxesByFagot } from '../../services/stock';

const CardsStockFagot = ({ stock, fagotId }) => {
  const [nbBoxe, setNbBoxe] = useState(null);
  useEffect(() => {
    getCountBoxesByFagot(fagotId).then((result) => setNbBoxe(result.nbBoxes));
  }, []);
  return (
    <Link to={`/fagot-content/${fagotId}`}>
      <li className="card-fagot">
        <span>{stock.uuid}</span>
        <span>{stock.fagotType}</span>
        <span className="nbr-boxes">Nombre de caisses: {nbBoxe}/10</span>
      </li>
    </Link>
  );
};

CardsStockFagot.propTypes = {
  stock: PropTypes.object,
  fagotId: PropTypes.number
};

export default CardsStockFagot;
