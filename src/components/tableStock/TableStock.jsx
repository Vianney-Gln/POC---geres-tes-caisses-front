// import rect hooks
import React, { useState } from 'react';
// import react-router-dom
import { useNavigate, useParams } from 'react-router-dom';
// import style css
import './tableStock.scss';
// import service
import { outOfStock } from '../../services/stock';
// import proptypes
import PropTypes from 'prop-types';
// import Components
import RowTable from '../RowTable/RowTable';
import ModalComponent from '../Modal/ModalComponent';
import SearchBarre from '../SearchBarre/SearchBarre';

const TableStock = ({ typeStock, stock, captionName }) => {
  // States
  const [search, setSearch] = useState(''); // string get from the search input
  const [selected, setSelected] = useState([]); // state getting data by clicking on a row
  const [open, setOpen] = useState(false); // state managing the modal
  const [confirmDelete, setConfirmDelete] = useState(''); // Message confirm success or error delete rows
  const [errorDelete, setErrorDelete] = useState(false); // Bool managin content modal in case of error

  // UseParams
  const param = useParams();
  const { operation } = param;

  // UseNavigate
  const navigate = useNavigate();

  // Function closing the modal
  const openModal = () => {
    setOpen(true);
  };
  // Function opening the modal
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
            Valider sorties
          </button>
        </>
      );
    }
  };

  // Function running the service function outOfStock, manage error or success messages and redirect stock page
  const runOutOfStock = () => {
    const ids = selected.map((el) => el.id);
    outOfStock(ids)
      .then(() => {
        setErrorDelete(false);
        setConfirmDelete('Les éléments sont correctements sortis du stock.');
        setTimeout(() => {
          setConfirmDelete('redirection page stock en cours...');
        }, 2000);
      })
      .then(() => {
        setTimeout(() => {
          navigate('/');
        }, 4000);
      })
      .catch(() => {
        setErrorDelete(true);
        setConfirmDelete('Il y eu une erreur durant la suppression');
      });
  };

  return (
    <>
      <ModalComponent
        open={open}
        openModal={openModal}
        closeModal={closeModal}
        contentLabel="Modal-outOfStock"
        runOutOfStock={runOutOfStock}
        selected={selected}
        confirmDelete={confirmDelete}
        errorDelete={errorDelete}
      />
      <table className="table-stock">
        {typeStock === 'caisses-vrac' ? (
          <caption>
            {`Stock vrac ${manageCaptionTitle()}`}
            <div className="search-buttons">
              <SearchBarre setSearch={setSearch} />
              {manageButtons()}
            </div>
          </caption>
        ) : typeStock === 'caisses-total' ? (
          <caption>
            {`Stock total ${manageCaptionTitle()}`}
            <div className="div-total-boxes">
              <SearchBarre setSearch={setSearch} />
              {manageButtons()}
            </div>
          </caption>
        ) : (
          ''
        )}
        <thead>
          <tr align="center">
            <th>identifiant</th>
            <th>désignation</th>
            {operation === 'bundle' && <th>Action</th>}
            {typeStock === 'caisses-total' ? <th>fagot</th> : ''}
          </tr>
        </thead>
        <tbody>
          {stock.length < 1 && (
            <tr align="center">
              <td></td>
              <td></td>
              {operation === 'bundle' && <td></td>}
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
                    operation={operation}
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
