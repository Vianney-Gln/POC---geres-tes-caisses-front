// imports hooks
import React, { createContext, useState } from 'react';
// import proptypes
import PropTypes from 'prop-types';

// create context
const ContextStock = createContext(null);

export const ContextStockProvider = ({ children }) => {
  // States
  const [typeStock, setTypeStock] = useState('caisses-vrac'); // state getting the type of stock (vrac, total, fagots) --- default caisses-vrac

  return (
    <ContextStock.Provider value={{ typeStock, setTypeStock }}>{children}</ContextStock.Provider>
  );
};

ContextStockProvider.propTypes = {
  children: PropTypes.node
};

ContextStock.propTypes = {
  typeStock: PropTypes.string,
  setTypeStock: PropTypes.func
};

export default ContextStock;
