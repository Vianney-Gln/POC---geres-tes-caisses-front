/**
 * Function getting data from inputs
 * @param {string} value
 * @param {string} key
 * @param {array} dataInput
 * @param {function} setDataInput
 */
const getDataInputs = (value, key, dataInput, setDataInput) => {
  const copy = { ...dataInput };
  copy[key] = value;
  setDataInput(copy);
};

/**
 * Function submitting form and verify if uuid is starting by Fag-
 * @param {event} e
 * @param {obj} dataInput
 * @param {function} createBundle
 * @param {function} setError
 * @param {function} setMessage
 * @param {function} setDataInput
 */
export const handleForm = (e, dataInput, createBundle, setError, setMessage, setDataInput) => {
  e.preventDefault();
  const regex = /^Fag-/;
  const numRegex = /[0-9]+$/;
  if (
    dataInput.uuid.match(regex) &&
    dataInput.uuid.match(numRegex) &&
    dataInput.uuid.length === 7
  ) {
    createBundle(dataInput)
      .then(() => {
        setError(false);
        setMessage('Fagot créé avec succés.');
        setTimeout(() => {
          setDataInput({ uuid: '', id_article: '' });
        }, 1000);
      })
      .catch(() => {
        setError(true);
        setMessage("Il y a eu une erreur, le fagot n'a pas été créé.");
      });
  } else {
    setError(true);
    setMessage("L'identifiant doit être de la forme Fag-000");
  }
};

export default getDataInputs;
