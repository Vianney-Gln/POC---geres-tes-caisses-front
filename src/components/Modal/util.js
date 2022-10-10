import Modal from 'react-modal';
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

/**
 * Function generate the vue modal reception
 * @param {bool} open
 * @param {function} closeModal
 * @param {object} styleModal
 * @param {string} contentLabel
 * @param {function} manageIcon
 * @param {bool} error
 * @param {string} message
 * @param {function} setModalIsOpen
 * @returns
 */
export const modalReception = (
  open,
  closeModal,
  styleModal,
  contentLabel,
  manageIcon,
  error,
  message,
  setModalIsOpen
) => {
  return (
    <Modal isOpen={open} onRequestClose={closeModal} style={styleModal} contentLabel={contentLabel}>
      {manageIcon(error)}
      <p>{message}</p>
      <button className="button-close" onClick={() => closeModal(setModalIsOpen)}>
        Fermer
      </button>
    </Modal>
  );
};

/**
 * Function generate the vue modal out of stock
 * @param {bool} open
 * @param {function} closeModal
 * @param {object} styleModal
 * @param {string} contentLabel
 * @param {string} confirmDelete
 * @param {bool} errorDelete
 * @param {array} selected
 * @param {function} runOutOfStock
 * @returns
 */
export const modalOutOfStock = (
  open,
  closeModal,
  styleModal,
  contentLabel,
  confirmDelete,
  errorDelete,
  selected,
  runOutOfStock
) => {
  return (
    <Modal isOpen={open} onRequestClose={closeModal} style={styleModal} contentLabel={contentLabel}>
      {confirmDelete && errorDelete ? (
        <>
          <p>{confirmDelete}</p>
          <button onClick={() => closeModal()} type="button">
            Ok
          </button>
        </>
      ) : confirmDelete ? (
        <p>{confirmDelete}</p>
      ) : (
        <>
          <p>
            {selected.length
              ? 'Voulez vous vraiment supprimer ces articles?'
              : 'Veuillez sélectionner au moins un article.'}
          </p>
          <div className="duo-btn">
            {selected.length ? (
              <>
                <button onClick={runOutOfStock}>Oui</button>
                <button onClick={closeModal}>Non</button>
              </>
            ) : (
              <button onClick={closeModal} type="button">
                Ok
              </button>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default manageIcon;
