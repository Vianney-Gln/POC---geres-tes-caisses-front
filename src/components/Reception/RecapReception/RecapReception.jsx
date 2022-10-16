import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../../Modal/ModalComponent';
import ContextArticles from '../../../context/ContextArticles';
import ContextReception from '../../../context/ContextReception';
import ContextBundles from '../../../context/ContextBundles';
import getTodaysDate, { getDesignationBoxes } from './util';
import openModal, { closeModal } from '../util';
import './recapReception.scss';

const RecapReception = () => {
  const { setAreActivateFilters } = useContext(ContextArticles);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOperationOk, setIsOperationOk] = useState(false);
  const { error, setError, messageServer, dataInputs } = useContext(ContextReception);
  const { handleRestartEffect } = useContext(ContextBundles);

  const navigate = useNavigate();

  // Desactivate the MenuLeft on component mounting
  useEffect(() => {
    setAreActivateFilters(false);
  }, []);

  return (
    <>
      <ModalComponent
        error={error}
        setError={setError}
        isOperationOk={isOperationOk}
        setIsOperationOk={setIsOperationOk}
        handleRestartEffect={handleRestartEffect}
        navigate={navigate}
        message={messageServer}
        open={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        setModalIsOpen={setModalIsOpen}
        contentLabel="Modal-reception"
      />
      <div className="container-recap-reception">
        <table className="table-reception">
          <caption>Confirmation réception du {getTodaysDate()}</caption>
          <thead>
            <tr align="center">
              <th>identifiant</th>
              <th>désignation</th>
            </tr>
          </thead>
          <tbody>
            {dataInputs.map((elt) => {
              return (
                <tr key={elt.uuid}>
                  <td>{elt.uuid}</td>
                  <td>{getDesignationBoxes(Number(elt.id_article))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="duo-btn">
          <button onClick={() => setModalIsOpen(true)} type="button">
            Confirmer la réception
          </button>
          <button
            onClick={() => {
              navigate('../reception');
            }}
            type="button">
            Annuler
          </button>
        </div>
      </div>
    </>
  );
};

export default RecapReception;
