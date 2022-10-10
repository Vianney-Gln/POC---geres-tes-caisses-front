import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './tableStock.scss';
import { outOfStock } from '../../services/stock';
import PropTypes from 'prop-types';
import RowTable from '../RowTable/RowTable';
import ModalComponent from '../Modal/ModalComponent';
import SearchBarre from '../SearchBarre/SearchBarre';
import manageButtons, { manageCaptionTitle } from './util';

const TableStock = ({ typeStock, stock, captionName }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState([]); // state getting data by clicking on a row
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');
  const [errorDelete, setErrorDelete] = useState(false);

  const param = useParams();
  const { operation } = param;

  const navigate = useNavigate();

  // Function closing the modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  // Function opening the modal
  const closeModal = () => {
    setModalIsOpen(false);
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
        open={modalIsOpen}
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
            <span className="title-caption">{`Stock vrac ${manageCaptionTitle(captionName)}`}</span>
            <div className="search-buttons">
              <SearchBarre setSearch={setSearchValue} />
              {manageButtons(setSelected, openModal)}
            </div>
          </caption>
        ) : typeStock === 'caisses-total' ? (
          <caption>
            {`Stock total ${manageCaptionTitle(captionName)}`}
            <div className="div-total-boxes">
              <SearchBarre setSearch={setSearchValue} />
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
                if (searchValue) {
                  return el.uuid.includes(searchValue);
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
