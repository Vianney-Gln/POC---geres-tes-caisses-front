// import react hooks
import React, { useEffect, useState, useContext } from 'react';
// import Routing Link
import { Link, useParams } from 'react-router-dom';
// import PropTypes
import PropTypes from 'prop-types';
// import style css
import './cardsStockFagot.scss';
// import service
import { getCountBoxesByBundle } from '../../services/stock';
// import comonents
import ModalComponent from '../Modal/ModalComponent';
// Import component context
import ContextArticles from '../../context/ContextArticles';
import ContextStock from '../../context/ContextStock';

const CardsStockFagot = ({ stock, fagotId, handleEffect }) => {
  // States
  const [nbBoxe, setNbBoxe] = useState(null); // nb boxes
  const [open, setOpen] = useState(false); // state managing the modal
  const [messageForBundle, setMessageForBundle] = useState(''); // message only for "défagotage" operation
  const param = useParams();
  // UseParam
  const { operation } = param;

  // Context
  const contextArticles = useContext(ContextArticles);
  const { setIdArticles } = contextArticles;
  const { setIdArticleCount } = useContext(ContextStock);

  // function closing the modal
  const openModal = () => {
    setOpen(true);
  };
  //function opening the modal
  const closeModal = () => {
    setOpen(false);
    setMessageForBundle('');
  };

  useEffect(() => {
    getCountBoxesByBundle(fagotId).then((result) => setNbBoxe(result.nbBoxes));
  }, []);
  return (
    <>
      <ModalComponent
        open={open}
        openModal={openModal}
        closeModal={closeModal}
        contentLabel="Modal-manage-bundle"
        messageForBundle={messageForBundle}
        setMessageForBundle={setMessageForBundle}
        fagotId={fagotId}
        handleEffect={handleEffect}
      />
      {operation === 'manage-bundle' ? (
        <div className="card">
          <li className="card-fagot">
            <span>{stock.uuid}</span>
            <span>{stock.fagotType}</span>
            <span className="nbr-boxes">Nombre de caisses: {nbBoxe}/10</span>
            <div className="duo-btn">
              <button onClick={() => openModal()} type="button">
                Défagoter
              </button>
              <Link
                onClick={() => {
                  setIdArticles(null);
                  setIdArticleCount(null);
                }}
                className="button-like"
                to={`/bundling/bundle/${fagotId}`}>
                Modifier
              </Link>
            </div>
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
  fagotId: PropTypes.number,
  handleEffect: PropTypes.func
};

export default CardsStockFagot;
