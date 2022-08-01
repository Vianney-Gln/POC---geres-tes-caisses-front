// imports hooks
import React, { createContext, useState, useEffect } from 'react';
// import proptypes
import PropTypes from 'prop-types';
// import services
import { getCountTotal, getCountFagot, getCountVrac } from '../services/stock.js';
// create context
const ContextStock = createContext(null);

export const ContextStockProvider = ({ children }) => {
  // States
  const [typeStock, setTypeStock] = useState('caisses-vrac'); // state getting the type of stock (vrac, total, fagots) --- default caisses-vrac
  const [numberBoxes, setNumberBoxes] = useState(null); // state getting the bumber of boxes

  // function getting the number of boxes depending of stock type
  useEffect(() => {
    switch (typeStock) {
      case 'caisses-vrac':
        getCountVrac().then((result) => setNumberBoxes(result.nbVrac));
        break;
      case 'caisses-total':
        getCountTotal().then((result) => setNumberBoxes(result.numberTotal));
        break;
      case 'fagots':
        getCountFagot().then((result) => setNumberBoxes(result.nbFagots));
        break;
    }
  }, [typeStock]);

  return (
    <ContextStock.Provider value={{ typeStock, setTypeStock, numberBoxes }}>
      {children}
    </ContextStock.Provider>
  );
};

ContextStockProvider.propTypes = {
  children: PropTypes.node
};

export default ContextStock;
