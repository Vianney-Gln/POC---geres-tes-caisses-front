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
import CardsStockFagot from '../cardsStockFagots/CardsStockFagot';

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
      {typeStock === 'caisses-vrac' || typeStock === 'caisses-total' ? (
        <TableStock stock={stock} typeStock={typeStock} />
      ) : typeStock === 'fagots' ? (
        <>
          <ul className="list-cards">
            <h2>Consultation des fagots</h2>
            {stock.length ? stock.map((elt) => <CardsStockFagot key={elt.id} stock={elt} />) : null}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default Stock;
