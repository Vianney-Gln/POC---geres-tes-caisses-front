import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextArticles from '../../context/ContextArticles';
import ContextBundles from '../../context/ContextBundles';
import './reception.scss';
import NewLineForm from '../NewLineForm/NewLineForm';
import ModalComponent from '../Modal/ModalComponent';
import openModal, { closeModal, addNewLine, runValidateReception } from './util';

const Reception = () => {
  document.title = 'Gestion des caisses - réception';
  const contextArticles = useContext(ContextArticles);
  const { setAreActivateFilters } = contextArticles;
  const { handleRestartEffect } = useContext(ContextBundles);
  const [dataInputs, setDataInputs] = useState([{ uuid: '', id_article: '' }]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [messageCarateres, setMessageCaracteres] = useState('');
  const [isTypeBoxSelected, setIsTypeBoxSelected] = useState('');
  const [messageServer, setMessageServer] = useState('');

  const navigate = useNavigate();

  // function desactivate the Menu-Left on component mounting
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
      <div className="container-reception">
        <h2>Receptions</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runValidateReception(
              dataInputs,
              setMessageCaracteres,
              setError,
              setMessage,
              setIsTypeBoxSelected,
              setModalIsOpen,
              navigate,
              handleRestartEffect,
              setMessageServer
            );
          }}
          className="form-reception">
          <div className="container-form">
            {dataInputs.length
              ? dataInputs.map((elt, index) => (
                  <NewLineForm
                    dataInputs={dataInputs}
                    setDataInputs={setDataInputs}
                    line={elt}
                    key={index}
                    index={index}
                    addNewLine={addNewLine}
                    setMessageCaracteres={setMessageCaracteres}
                  />
                ))
              : ''}
          </div>
          <div className="container-button-submit">
            <button className="button-submit" type="submit">
              Valider la réception
            </button>
          </div>
          {messageCarateres && <p className="red">{messageCarateres}</p>}
          {isTypeBoxSelected && <p className="red">{isTypeBoxSelected}</p>}
          {message && <p className="red">{message}</p>}
        </form>
      </div>
    </>
  );
};

export default Reception;
