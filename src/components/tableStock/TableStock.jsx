// import rect hooks
import React, { useState } from 'react';
// import style css
import './tableStock.scss';
// import proptypes
import PropTypes from 'prop-types';
// import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const TableStock = ({ typeStock, stock, captionName }) => {
  // States
  const [search, setSearch] = useState('');

  // function managin caption title
  const manageCaptionTitle = () => {
    if (captionName) return captionName;
    return 'toutes caisses';
  };
  return (
    <table className="table-stock">
      {typeStock === 'caisses-vrac' ? (
        <caption>
          {`Stock vrac ${manageCaptionTitle()}`}
          <label htmlFor="search">
            <i>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </i>
            <input
              name="search"
              placeholder="recherche par identifiant"
              className="input-search"
              onChange={(e) => setSearch(e.target.value)}
              type="search"></input>
          </label>
        </caption>
      ) : typeStock === 'caisses-total' ? (
        <caption>
          {`Stock total ${manageCaptionTitle()}`}
          <label htmlFor="search">
            <i>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </i>
            <input
              name="search"
              placeholder="recherche par identifiant"
              className="input-search"
              onChange={(e) => setSearch(e.target.value)}
              type="search"></input>
          </label>
        </caption>
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
          stock
            .filter((el) => {
              if (search) {
                console.log(el.uuid.includes(search));
                return el.uuid.includes(search);
              } else {
                return el;
              }
            })
            .map((element, index) => {
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
  manageTitle: PropTypes.func,
  captionName: PropTypes.string
};
export default TableStock;
