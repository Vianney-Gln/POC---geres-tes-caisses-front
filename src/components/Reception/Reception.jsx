import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextArticles from '../../context/ContextArticles';
import './reception.scss';
import NewLineForm from '../NewLineForm/NewLineForm';
import ModalComponent from '../Modal/ModalComponent';
import validateReception from '../../services/reception';
import openModal, { closeModal, validateInput, addNewLine, findDuplicate } from './util';

const Reception = () => {
  document.title = 'Gestion des caisses - réception';
  const contextArticles = useContext(ContextArticles);
  const { setAreActivateFilters } = contextArticles;
  const [dataInputs, setDataInputs] = useState([{ uuid: '', id_article: '' }]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [messageCarateres, setMessageCaracteres] = useState('');
  const [isTypeBoxSelected, setIsTypeBoxSelected] = useState('');

  const navigate = useNavigate();

  // function desactivate the Menu-Left on component mounting
  useEffect(() => {
    setAreActivateFilters(false);
  }, []);

  // Function running validateReception and then manage messages,verify the good conformity from user's input, then redirect to stock page IF no duplicates elements in dataInputs
  const runValidateReception = () => {
    const errorDup = findDuplicate(dataInputs);
    const errorSelectEmpty = dataInputs.find((elt) => elt.id_article === '');
    const errorRegexs = dataInputs.map((elt) => {
      return validateInput(elt, setMessageCaracteres);
    });
    if (errorDup) {
      setError(true);
      setMessage('Vous ne pouvez pas entrer plusieurs fois le même identifiant.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else if (errorSelectEmpty) {
      setError(true);
      setIsTypeBoxSelected('Veuillez remplir le type de caisses svp');
    } else if (!errorRegexs.includes(true)) {
      validateReception(dataInputs)
        .then(() => {
          setError(false);
          setIsTypeBoxSelected('');
          openModal(setModalIsOpen);
          setMessage(`Réception créée avec succès! Redirection en cours...`);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        })
        .catch(() => {
          setIsTypeBoxSelected('');
          openModal(setModalIsOpen);
          setError(true);
          setMessage("L'application à rencontré une erreur, la réception n'a pas été créée.");
        });
    }
  };
  return (
    <>
      <ModalComponent
        error={error}
        message={message}
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
            runValidateReception();
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
