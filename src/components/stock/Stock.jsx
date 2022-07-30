// import react hook;
import React, { useState, useEffect, useContext } from 'react';
// import style css;
import './stock.scss';
// service
import getStockVrac from '../../services/stock';
// import components context
import ContextStock from '../../context/ContextStock';

const Stock = () => {
  // States
  const [stock, setStock] = useState([]); // state getting stock

  // get Context
  const contextStock = useContext(ContextStock);
  const { typeStock } = contextStock;

  // function getting stock calling api

  useEffect(() => {
    console.log(typeStock);
    if (typeStock === 'caisses-vrac') {
      getStockVrac()
        .then((result) => {
          setStock(result.data);
        })
        .catch((err) => console.log(err));
    } else {
      setStock([]);
    }
  }, [typeStock]);
  return (
    <div className="container-stock">
      <table>
        <caption>Consultation des stocks</caption>
        <thead>
          <tr align="center">
            <th>identifiant</th>
            <th>désignation</th>
          </tr>
        </thead>
        <tbody>
          {stock.length < 1 && (
            <tr align="center">
              <td></td>
              <td></td>
            </tr>
          )}
          {stock &&
            stock.map((element, index) => {
              return (
                <tr key={index}>
                  <td align="center">{element.uuid}</td>
                  <td align="center">{element.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
