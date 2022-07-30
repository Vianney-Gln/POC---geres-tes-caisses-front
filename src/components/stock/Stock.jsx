// import react hook;
import React, { useState, useEffect } from 'react';
// import style css;
import './stock.scss';
// service
import getStockVrac from '../../services/stock';

const Stock = () => {
  // States
  const [stock, setStock] = useState([]); // state getting stock

  // function getting stock calling api

  useEffect(() => {
    getStockVrac()
      .then((result) => {
        setStock(result.data);
        console.log(stock);
      })
      .catch((err) => console.log(err));
  }, []);
  return <div className="container-stock">Stock</div>;
};

export default Stock;
