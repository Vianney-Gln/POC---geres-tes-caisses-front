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
  if (dataInput.uuid.match(regex)) {
    createBundle(dataInput)
      .then(() => {
        setError(false);
        setMessage('Fagot créé avec succés.');
        setTimeout(() => {
          setDataInput({ uuid: '', id_article: '' });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setMessage("Il y a eu une erreur, le fagot n'a pas été créé.");
      });
  } else {
    setError(true);
    setMessage("L'identifiant doit commencé par Fag-");
  }
};

export default getDataInputs;
