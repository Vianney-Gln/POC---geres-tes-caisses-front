import manageErrorsServer from '../../Helper/ManageErrorsServer/ManageErrorsServer';
import validateReception from '../../services/reception';

// Function opening the modal
const openModal = (setModalIsOpen) => {
  setModalIsOpen(true);
};

// Function closing the modal
export const closeModal = (setModalIsOpen) => {
  setModalIsOpen(false);
};

/**
 * Validate input verifying the length (10), the begin (current year),and contains only numeric char
 * @param {object} line
 * @param {function} setMessageCaracteres
 * @returns
 */
export const validateInput = (line, setMessageCaracteres) => {
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
 * @param {obj} line
 * @param {function} setMessageCaracteres
 * @param {array} dataInputs
 * @param {function} setDataInputs
 */
export const addNewLine = (index, line, setMessageCaracteres, dataInputs, setDataInputs) => {
  const error = validateInput(line, setMessageCaracteres);
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

/**
 * Function checking if there is duplicates into a reception
 * @param {array} dataInputs
 * @returns
 */
export const findDuplicate = (dataInputs) => {
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

/**
 * Function running validateReception and then manage messages,verify the good conformity from user's input, then redirect to stock page IF no duplicates elements in dataInputs
 * @param {array} dataInputs
 * @param {function} setMessageCaracteres
 * @param {function} setError
 * @param {function} setMessage
 * @param {function} setIsTypeBoxSelected
 * @param {function} setModalIsOpen
 * @param {function} navigate
 * @param {function} handleRestartEffect
 * @param {function} setMessageServer
 */
export const runValidateReception = (
  dataInputs,
  setMessageCaracteres,
  setError,
  setMessage,
  setIsTypeBoxSelected,
  setModalIsOpen,
  navigate,
  handleRestartEffect,
  setMessageServer
) => {
  const errorDup = findDuplicate(dataInputs);
  //const errorSelectEmpty = dataInputs.find((elt) => elt.id_article === '');
  // const errorRegexs = dataInputs.map((elt) => {
  //   return validateInput(elt, setMessageCaracteres);
  // });
  if (errorDup) {
    setError(true);
    setMessage('Vous ne pouvez pas entrer plusieurs fois le même identifiant.');
    setTimeout(() => {
      setMessage('');
    }, 3000);
  } //else if (errorSelectEmpty) {
  //setError(true);
  //setIsTypeBoxSelected('Veuillez remplir le type de caisses svp');
  //} else if (!errorRegexs.includes(true)) {
  else {
    validateReception(dataInputs)
      .then(() => {
        setError(false);
        setIsTypeBoxSelected('');
        openModal(setModalIsOpen);
        setMessage(`Réception créée avec succès! Redirection en cours...`);
        setTimeout(() => {
          handleRestartEffect();
          navigate('/');
        }, 3000);
      })
      .catch((err) => {
        setIsTypeBoxSelected('');
        openModal(setModalIsOpen);
        setError(true);
        if (typeof err.response.data === 'string')
          manageErrorsServer(err.response.data, setMessageServer);
        if (typeof err.response.data === 'object') {
          manageErrorsServer(err.response.data[0][0].message, setMessageServer);
        }
      });
  }
};

export default openModal;
