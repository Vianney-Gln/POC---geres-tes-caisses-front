// imports hooks
import React, { createContext, useState, useEffect, useContext } from 'react';
// import proptypes
import PropTypes from 'prop-types';
// import services
import { getCountTotal, getCountFagot, getCountVrac } from '../services/stock.js';
// Import component context
import ContextFagots from './ContextFagots.jsx';
// create context
const ContextStock = createContext(null);

export const ContextStockProvider = ({ children }) => {
  // States
  const [typeStock, setTypeStock] = useState('caisses-vrac'); // state getting the type of stock (vrac, total, fagots) --- default caisses-vrac
  const [numberBoxes, setNumberBoxes] = useState(null); // state getting the bumber of boxes
  const [idArticleCount, setIdArticleCount] = useState(null); //state id article argument getCount() functions

  // Get other Context -- Use restart Effect from ContextFagots to restart API calls
  const { restartEffect } = useContext(ContextFagots);

  // function getting the number of boxes depending of stock type and articles
  useEffect(() => {
    switch (typeStock) {
      case 'caisses-vrac':
        getCountVrac(idArticleCount)
          .then((result) => setNumberBoxes(result.nbVrac))
          .catch((err) => console.log(err));
        break;
      case 'caisses-total':
        getCountTotal(idArticleCount)
          .then((result) => setNumberBoxes(result.numberTotal))
          .catch((err) => console.log(err));
        break;
      case 'fagots':
        getCountFagot(idArticleCount)
          .then((result) => setNumberBoxes(result.nbFagots))
          .catch((err) => console.log(err));
        break;
    }
  }, [typeStock, idArticleCount, restartEffect]);

  return (
    <ContextStock.Provider
      value={{
        typeStock,
        setTypeStock,
        numberBoxes,
        setIdArticleCount
      }}>
      {children}
    </ContextStock.Provider>
  );
};

ContextStockProvider.propTypes = {
  children: PropTypes.node
};

export default ContextStock;
