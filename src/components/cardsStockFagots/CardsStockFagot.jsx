// import react hooks
import React, { useEffect, useState } from 'react';
// import Routing Link
import { Link, useParams } from 'react-router-dom';
// import PropTypes
import PropTypes from 'prop-types';
// import style css
import './cardsStockFagot.scss';
// import service
import { getCountBoxesByFagot } from '../../services/stock';
// import comonents
import ModalComponent from '../Modal/ModalComponent';

const CardsStockFagot = ({ stock, fagotId }) => {
  // States
  const [nbBoxe, setNbBoxe] = useState(null); // nb boxes
  const [open, setOpen] = useState(false); // state managing the modal
  const param = useParams();
  // UseParam
  const { operation } = param;

  // function closing the modal
  const openModal = () => {
    setOpen(true);
  };
  //function opening the modal
  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    getCountBoxesByFagot(fagotId).then((result) => setNbBoxe(result.nbBoxes));
  }, []);
  return (
    <>
      <ModalComponent
        open={open}
        openModal={openModal}
        closeModal={closeModal}
        contentLabel="Modal-manage-bundle"
      />
      {operation === 'manage-bundle' ? (
        <div className="card">
          <li className="card-fagot">
            <span>{stock.uuid}</span>
            <span>{stock.fagotType}</span>
            <span className="nbr-boxes">Nombre de caisses: {nbBoxe}/10</span>
            <button onClick={() => openModal()} type="button">
              Défagoter
            </button>
          </li>
        </div>
      ) : (
        <Link to={`/fagot-content/${fagotId}`}>
          <li className="card-fagot">
            <span>{stock.uuid}</span>
            <span>{stock.fagotType}</span>
            <span className="nbr-boxes">Nombre de caisses: {nbBoxe}/10</span>
          </li>
        </Link>
      )}
    </>
  );
};

CardsStockFagot.propTypes = {
  stock: PropTypes.object,
  fagotId: PropTypes.number
};

export default CardsStockFagot;
