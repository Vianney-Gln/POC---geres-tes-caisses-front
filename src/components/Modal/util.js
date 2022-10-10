// import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

/**
 * Function managing icon, depending of error state
 * @param {bool} error
 * @returns
 */
const manageIcon = (error) => {
  if (error)
    return (
      <i className="symbol red">
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </i>
    );
  return (
    <i className="symbol green">
      <FontAwesomeIcon icon={faSquareCheck} />
    </i>
  );
};
/**
 * Function deleting a bundle without deleteting boxes inside, then manage error or success messages
 * @param {function} deleteBundleById
 * @param {number} fagotId
 * @param {function} setMessageForBundle
 * @param {function} setError
 * @param {function} setIsOperationOk
 * @param {function} handleEffect
 * @param {function} closeModal
 */
export const runDeleteBundleById = (
  deleteBundleById,
  fagotId,
  setMessageForBundle,
  setError,
  setIsOperationOk,
  handleEffect,
  closeModal
) => {
  deleteBundleById(fagotId)
    .then(() => {
      setMessageForBundle('Défagotage en cours...');
      setError(false);
      setTimeout(() => {
        setIsOperationOk(true);
        setMessageForBundle('Défagotage effectué');
      }, 3000);
      setTimeout(() => {
        handleEffect();
        setIsOperationOk(false);
        setMessageForBundle('');
        closeModal();
      }, 6000);
    })
    .catch(() => {
      setMessageForBundle('Défagotage en cours...');
      setError(true);
      setTimeout(() => {
        setIsOperationOk(true);
        setMessageForBundle('Il y a eu une erreur, défagotage non effectué.');
      }, 3000);
      setTimeout(() => {
        setIsOperationOk(false);
        setMessageForBundle('');
        closeModal();
        setError(false);
      }, 6000);
    });
};

export default manageIcon;
