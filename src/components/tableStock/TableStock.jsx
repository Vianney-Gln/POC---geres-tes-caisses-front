// import rect hooks
import React, { useState } from 'react';
// import style css
import './tableStock.scss';
// import service
import { outOfStock } from '../../services/stock';
// import proptypes
import PropTypes from 'prop-types';
// import Components
import RowTable from '../RowTable/RowTable';
import ModalComponent from '../Modal/ModalComponent';
// import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const TableStock = ({ typeStock, stock, captionName }) => {
  // States
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false); // state managing the modal

  // function closing the modal
  const openModal = () => {
    setOpen(true);
  };
  //function opening the modal
  const closeModal = () => {
    setOpen(false);
  };

  // Function managin caption title
  const manageCaptionTitle = () => {
    if (captionName) return captionName;
    return 'toutes caisses';
  };
  // Function that cancel all selection reseting selected statement
  const cancelSelection = () => {
    setSelected([]);
  };
  // Function managin the display buttons "sortir du stock" et "annuler selection"

  const manageButtons = () => {
    if (location.pathname.includes('/stock')) {
      return '';
    } else if (location.pathname.includes('/out-of-stock')) {
      return (
        <>
          <button onClick={() => cancelSelection()} type="button">
            Annuler selection
          </button>
          <button onClick={() => openModal()} type="button">
            Sortir du stock
          </button>
        </>
      );
    }
  };

  const runOutOfStock = () => {
    const ids = selected.map((el) => el.id);
    outOfStock(ids);
  };

  return (
    <>
      <ModalComponent
        open={open}
        openModal={openModal}
        closeModal={closeModal}
        contentLabel="Modal-outOfStock"
        runOutOfStock={runOutOfStock}
      />
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
            {manageButtons()}
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
            {manageButtons()}
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
                  return el.uuid.includes(search);
                } else {
                  return el;
                }
              })
              .map((element, index) => {
                return (
                  <RowTable
                    setSelected={setSelected}
                    selected={selected}
                    typeStock={typeStock}
                    key={index}
                    element={element}
                  />
                );
              })}
        </tbody>
      </table>
    </>
  );
};
TableStock.propTypes = {
  typeStock: PropTypes.string,
  stock: PropTypes.array,
  manageTitle: PropTypes.func,
  captionName: PropTypes.string
};
export default TableStock;
