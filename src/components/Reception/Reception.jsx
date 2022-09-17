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
  const [messageCarateres, setMessageCaracteres] = useState(''); // state managing the message if input uuid != 10 length
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

  /**
   * // Function adding a new object in the state array dataInputs IF this current line got 10 caracteres, IF NOT, generate an error message
   * @param {number} index
   */
  const addNewLine = (index, line) => {
    const year = new Date().getFullYear().toString();
    const regex = new RegExp(`^${year}`, 'g');
    if (line.uuid.length === 10) {
      if (regex.test(line.uuid)) {
        setMessageCaracteres('');
        const newDataInputs = [...dataInputs];
        newDataInputs.push({
          uuid: (Number(dataInputs[index].uuid) + 1).toString(),
          id_article: ''
        });
        setDataInputs(newDataInputs);
      } else {
        setMessageCaracteres("L'identifiant doit commencer par l'année actuelle.");
      }
    } else {
      setMessageCaracteres("L'identifiant doit être composé de 10 caratères.");
    }
  };

  // function desactivate the Menu-Left on component mounting
  useEffect(() => {
    setActivate(false);
  }, []);

  // Function running validateReception and then manage messages, then redirect to stock page
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
          {messageCarateres && <p className="red">{messageCarateres}</p>}
        </form>
      </div>
    </>
  );
};

export default Reception;
