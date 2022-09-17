import React, { useContext, useEffect, useState } from 'react';
//import useNavigate
import { useNavigate } from 'react-router-dom';
// import context
import ContextArticles from '../../context/ContextArticles';
// import style css
import './reception.scss';
// import Components
import NewLineForm from '../NewLineForm/NewLineForm';
import ModalComponent from '../Modal/ModalComponent';
// import service
import validateReception from '../../services/reception';

const Reception = () => {
  // docTitle
  document.title = 'Gestion des caisses - réception';
  // Context
  const contextArticles = useContext(ContextArticles);
  const { setActivate } = contextArticles;
  // States
  const [dataInputs, setDataInputs] = useState([{ uuid: '', id_article: '' }]); // state input data - array with objects
  const [open, setOpen] = useState(false); // state managing the modal
  const [message, setMessage] = useState(''); // state managing success or fail message
  const [error, setError] = useState(false); // this state bool manage the color of modal icons(error or success)
  // UseNavigate
  const navigate = useNavigate();

  // function closing the modal
  const openModal = () => {
    setOpen(true);
  };
  // function opening the modal
  const closeModal = () => {
    setOpen(false);
  };

  // Function adding a new object in the state array dataInputs
  const addNewLine = () => {
    const newDataInputs = [...dataInputs];
    newDataInputs.push({ uuid: '', id_article: '' });
    setDataInputs(newDataInputs);
  };

  // function desactivate the Menu-Left on component mounting
  useEffect(() => {
    setActivate(false);
  }, []);

  const runValidateReception = () => {
    validateReception(dataInputs)
      .then(() => {
        setError(false);
        setMessage(`Réception créée avec succès! Redirection en cours...`);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch(() => {
        setError(true);
        setMessage("L'application à rencontré une erreur, la réception n'a pas été créée.");
      });
  };
  return (
    <>
      <ModalComponent
        error={error}
        message={message}
        open={open}
        openModal={openModal}
        closeModal={closeModal}
        contentLabel="Modal-reception"
      />
      <div className="container-reception">
        <h2>Reception</h2>
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
                  />
                ))
              : ''}
          </div>
          <div className="container-button-submit">
            <button onClick={openModal} className="button-submit" type="submit">
              Valider la réception
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Reception;
