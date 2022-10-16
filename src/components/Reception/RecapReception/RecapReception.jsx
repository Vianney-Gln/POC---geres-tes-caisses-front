import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../../Modal/ModalComponent';
import ContextArticles from '../../../context/ContextArticles';
import ContextReception from '../../../context/ContextReception';
import getTodaysDate, { getDesignationBoxes } from './util';
import openModal, { closeModal } from '../util';
import './recapReception.scss';

const RecapReception = () => {
  const { setAreActivateFilters } = useContext(ContextArticles);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { error, messageServer, dataInputs } = useContext(ContextReception);

  const navigate = useNavigate();

  // Desactivate the MenuLeft on component mounting
  useEffect(() => {
    setAreActivateFilters(false);
  }, []);
  return (
    <>
      <ModalComponent
        error={error}
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
                <>
                  <tr>
                    <td>{elt.uuid}</td>
                    <td>{getDesignationBoxes(Number(elt.id_article))}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <div className="duo-btn">
          <button type="button">Confirmer la réception</button>
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
