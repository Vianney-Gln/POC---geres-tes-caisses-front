import manageErrorsServer from '../../../Helper/ManageErrorsServer/ManageErrorsServer';
import validateReception from '../../../services/reception';

const getTodaysDate = () => {
  const date = new Date();
  console.log(date.now);
  const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return dateStr;
};

/**
 * Function running validateReception and then manage messages,verify the good conformity from user's input, then redirect to stock page IF no duplicates elements in dataInputs
 * @param {array} dataInputs
 * @param {function} setError
 * @param {function} setIsTypeBoxSelected
 * @param {function} openModal
 * @param {function} setModalIsOpen
 * @param {function} setMessageServer
 * @param {function} handleRestartEffect
 * @param {function} navigate
 */
export const runValidateReception = (
  dataInputs,
  setError,
  setIsTypeBoxSelected,
  openModal,
  setModalIsOpen,
  setMessageServer,
  handleRestartEffect,
  navigate
) => {
  validateReception(dataInputs)
    .then(() => {
      setError(false);
      setIsTypeBoxSelected('');
      openModal(setModalIsOpen);
      setMessageServer(`Réception créée avec succès! Redirection en cours...`);
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
      setTimeout(() => {
        setMessageServer('');
        setModalIsOpen(false);
      }, 3000);
    });
};

export default getTodaysDate;
