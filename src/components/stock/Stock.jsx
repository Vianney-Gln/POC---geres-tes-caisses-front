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
            stock.map((element) => {
              return (
                <tr key={element.id}>
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
