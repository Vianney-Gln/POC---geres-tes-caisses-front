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

export default openModal;
