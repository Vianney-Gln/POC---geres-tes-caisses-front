import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextArticles from '../../context/ContextArticles';
import './reception.scss';
import NewLineForm from '../NewLineForm/NewLineForm';
import ModalComponent from '../Modal/ModalComponent';
import validateReception from '../../services/reception';

const Reception = () => {
  document.title = 'Gestion des caisses - réception';
  const contextArticles = useContext(ContextArticles);
  const { setActivate } = contextArticles;
  const [dataInputs, setDataInputs] = useState([{ uuid: '', id_article: '' }]); // state input data - array with objects
  const [open, setOpen] = useState(false); // state managing the modal
  const [message, setMessage] = useState(''); // state managing success or fail message
  const [error, setError] = useState(false); // this state bool manage the color of modal icons(error or success)
  const [messageCarateres, setMessageCaracteres] = useState(''); // state managing the message ex: if input uuid != 10 length
  const [isTypeBoxSelected, setIsTypeBoxSelected] = useState(''); // Message error displayed if user dont fill the type box select

  const navigate = useNavigate();

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  /**
   * Validate input verifying the length (10), the begin (current year),and contains only numeric char
   * @param {object} line
   * @returns
   */
  const validateInput = (line) => {
    const year = new Date().getFullYear().toString();
    const regexYear = new RegExp(`^${year}`, 'g');
    const regexNumOnly = new RegExp('^[0-9]+$');
    if (line.uuid.length === 10) {
      if (regexYear.test(line.uuid)) {
        if (regexNumOnly.test(line.uuid)) {
          setMessageCaracteres('');
          return false;
        }
        setMessageCaracteres("L'identifiant ne doit contenir que des caractères numériques");
        return true;
      }
      setMessageCaracteres("L'identifiant doit commencer par l'année actuelle");
      return true;
    }
    setMessageCaracteres("L'identifiant doit être composé de 10 caractères.");
    return true;
  };

  /**
   * // Function adding a new object in the state array dataInputs IF this current line got 10 caracteres, IF NOT, generate an error message
   * @param {number} index
   *  @param {object} line
   */
  const addNewLine = (index, line) => {
    const error = validateInput(line);
    if (!error) {
      setMessageCaracteres('');
      const newDataInputs = [...dataInputs];
      newDataInputs.push({
        uuid: (Number(dataInputs[index].uuid) + 1).toString(),
        id_article: ''
      });
      setDataInputs(newDataInputs);
    }
  };

  // function desactivate the Menu-Left on component mounting
  useEffect(() => {
    setActivate(false);
  }, []);

  // Function checking if there is duplicates into a reception
  const findDuplicate = () => {
    let duplicate = [];
    for (let i = 0; i < dataInputs.length; i++) {
      let count = 0;
      for (let j = 0; j < dataInputs.length; j++) {
        if (dataInputs[i].uuid === dataInputs[j].uuid) {
          count++;
        }
      }
      if (count > 1) {
        duplicate.push({ duplicate: dataInputs[i].uuid });
      }
    }
    if (duplicate.length) {
      return true;
    }

    return false;
  };

  // Function running validateReception and then manage messages,verify the good conformity from user's input, then redirect to stock page IF no duplicates elements in dataInputs
  const runValidateReception = () => {
    const errorDup = findDuplicate();
    const errorSelectEmpty = dataInputs.find((elt) => elt.id_article === '');
    const errorRegexs = dataInputs.map((elt) => {
      return validateInput(elt);
    });
    if (errorDup) {
      setError(true);
      setMessage('Vous ne pouvez pas entrer plusieurs fois le même identifiant.');
    } else if (errorSelectEmpty) {
      setError(true);
      setIsTypeBoxSelected('Veuillez remplir le type de caisses svp');
    } else if (!errorRegexs.includes(true)) {
      validateReception(dataInputs)
        .then(() => {
          setError(false);
          setIsTypeBoxSelected('');
          openModal();
          setMessage(`Réception créée avec succès! Redirection en cours...`);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        })
        .catch(() => {
          setIsTypeBoxSelected('');
          openModal();
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
        open={open}
        openModal={openModal}
        closeModal={closeModal}
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
        </form>
      </div>
    </>
  );
};

export default Reception;
