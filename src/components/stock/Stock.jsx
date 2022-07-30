// import react hook;
import React, { useState, useEffect, useContext } from 'react';
// import style css;
import './stock.scss';
// service
import getStockVrac, { getStockTotal, getFagots } from '../../services/stock';
// import components context
import ContextStock from '../../context/ContextStock';
// import components
import TableStock from '../tableStock/TableStock';

const Stock = () => {
  // States
  const [stock, setStock] = useState([]); // state getting stock

  // get Context
  const contextStock = useContext(ContextStock);
  const { typeStock } = contextStock;

  // function getting stock calling api

  useEffect(() => {
    if (typeStock === 'caisses-vrac') {
      getStockVrac()
        .then((result) => {
          setStock(result.data);
        })
        .catch((err) => console.log(err));
    } else if (typeStock === 'caisses-total') {
      getStockTotal()
        .then((result) => {
          setStock(result.data);
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (typeStock === 'fagots') {
      getFagots()
        .then((result) => {
          setStock(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setStock([]);
    }
  }, [typeStock]);
  return (
    <div className="container-stock">
      <TableStock stock={stock} />
    </div>
  );
};

export default Stock;
