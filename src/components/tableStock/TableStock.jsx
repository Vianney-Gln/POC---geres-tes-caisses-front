// import rect hooks
import React from 'react';
// import style css
import './tableStock.scss';
// import proptypes
import PropTypes from 'prop-types';

const TableStock = ({ typeStock, stock }) => {
  return (
    <table>
      {typeStock === 'caisses-vrac' ? (
        <caption>Consultation des stocks vrac</caption>
      ) : typeStock === 'caisses-total' ? (
        <caption>consultation des stock total</caption>
      ) : typeStock === 'fagots' ? (
        <caption>consultation des fagots</caption>
      ) : (
        ''
      )}
      <thead>
        <tr align="center">
          <th>identifiant</th>
          <th>désignation</th>
          {typeStock === 'caisses-total' ? <th>fagot</th> : ''}
        </tr>
      </thead>
      <tbody>
        {stock.length < 1 && (
          <tr align="center">
            <td></td>
            <td></td>
            {typeStock === 'caisses-total' ? <td></td> : ''}
          </tr>
        )}
        {stock &&
          stock.map((element, index) => {
            return (
              <tr key={index}>
                <td align="center">{element.uuid}</td>
                <td align="center">{element.name}</td>
                {typeStock === 'caisses-total' ? <td align="center">{element.idFagot}</td> : ''}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
TableStock.propTypes = {
  typeStock: PropTypes.string,
  stock: PropTypes.array
};
export default TableStock;
