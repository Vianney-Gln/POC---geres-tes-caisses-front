// import rect hooks
import React, { useContext } from 'react';
// import style css
import './tableStock.scss';
// import proptypes
import PropTypes from 'prop-types';
// import Components
import ContextArticles from '../../context/ContextArticles';

const TableStock = ({ typeStock, stock, manageTitle }) => {
  // context
  const contextArticles = useContext(ContextArticles);
  const { idArticles } = contextArticles;

  return (
    <table className="table-stock">
      {typeStock === 'caisses-vrac' ? (
        <caption>{`Stock vrac${manageTitle(idArticles)}`}</caption>
      ) : typeStock === 'caisses-total' ? (
        <caption>{`Stock total${manageTitle(idArticles)}`}</caption>
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
                {typeStock === 'caisses-total' ? (
                  <td align="center">
                    {element.idFagot ? 'fag-' + element.idFagot : 'non fagotée'}
                  </td>
                ) : (
                  ''
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
TableStock.propTypes = {
  typeStock: PropTypes.string,
  stock: PropTypes.array,
  manageTitle: PropTypes.func
};
export default TableStock;
