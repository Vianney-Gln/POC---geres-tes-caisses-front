import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getCountTotal, getCountBundle, getCountVrac } from '../services/stock.js';
import ContextBundles from './ContextBundles.jsx';

const ContextStock = createContext(null);

export const ContextStockProvider = ({ children }) => {
  const [typeStock, setTypeStock] = useState('caisses-vrac');
  const [numberBoxes, setNumberBoxes] = useState(null);
  const [idArticleForCountFunctions, setIdArticleCountForCountFunctions] = useState(null);

  // Get other Context -- Use restart Effect from ContextBundles to restart API calls
  const { restartEffect } = useContext(ContextBundles);

  // function getting the number of boxes depending of stock type and articles
  useEffect(() => {
    switch (typeStock) {
      case 'caisses-vrac':
        getCountVrac(idArticleForCountFunctions)
          .then((result) => setNumberBoxes(result.nbVrac))
          .catch((err) => console.log(err));
        break;
      case 'caisses-total':
        getCountTotal(idArticleForCountFunctions)
          .then((result) => setNumberBoxes(result.numberTotal))
          .catch((err) => console.log(err));
        break;
      case 'fagots':
        getCountBundle(idArticleForCountFunctions)
          .then((result) => setNumberBoxes(result.nbFagots))
          .catch((err) => console.log(err));
        break;
    }
  }, [typeStock, idArticleForCountFunctions, restartEffect]);

  return (
    <ContextStock.Provider
      value={{
        typeStock,
        setTypeStock,
        numberBoxes,
        setIdArticleCountForCountFunctions
      }}>
      {children}
    </ContextStock.Provider>
  );
};

ContextStockProvider.propTypes = {
  children: PropTypes.node
};

export default ContextStock;
