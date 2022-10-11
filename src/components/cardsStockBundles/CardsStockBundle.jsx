import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './cardsStockBundle.scss';
import { getCountBoxesByBundle } from '../../services/stock';
import ModalComponent from '../Modal/ModalComponent';
import ContextArticles from '../../context/ContextArticles';
import ContextStock from '../../context/ContextStock';

const CardsStockBundle = ({ stock, fagotId, handleEffect }) => {
  const [nbBoxe, setNbBoxe] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [messageForBundle, setMessageForBundle] = useState('');
  const [error, setError] = useState(false);
  const [isOperationOk, setIsOperationOk] = useState(false);

  const param = useParams();
  const { operation } = param;

  const navigate = useNavigate();

  const contextArticles = useContext(ContextArticles);
  const { setIdArticles } = contextArticles;
  const { setIdArticleCountForCountFunctions, restartEffect } = useContext(ContextStock);

  // function closing the modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  // function opening the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setMessageForBundle('');
  };

  // Function getting the number of boxes in a fagot on mounting component
  useEffect(() => {
    getCountBoxesByBundle(fagotId).then((result) => setNbBoxe(result.nbBoxes));
  }, [restartEffect]);
  return (
    <>
      <ModalComponent
        open={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        contentLabel="Modal-manage-bundle"
        messageForBundle={messageForBundle}
        setMessageForBundle={setMessageForBundle}
        fagotId={fagotId}
        handleEffect={handleEffect}
        error={error}
        setError={setError}
        isOperationOk={isOperationOk}
        setIsOperationOk={setIsOperationOk}
        navigate={navigate}
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
              <button type="button">
                <Link
                  onClick={() => {
                    setIdArticles(null);
                    setIdArticleCountForCountFunctions(null);
                  }}
                  className="button-like"
                  to={`/bundling/bundle/${fagotId}`}>
                  Modifier
                </Link>
              </button>
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

CardsStockBundle.propTypes = {
  stock: PropTypes.object,
  fagotId: PropTypes.number,
  handleEffect: PropTypes.func
};

export default CardsStockBundle;
