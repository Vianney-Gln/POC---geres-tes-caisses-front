import React, { useState, useEffect } from 'react';
// import modal
import Modal from 'react-modal';
// import service
import { deleteFagotById } from '../../services/fagot';
// import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTriangleExclamation,
  faSquareCheck,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
// import style css
import './modalComponent.scss';
// import PropTypes
import PropTypes from 'prop-types';

const ModalComponent = ({
  error,
  open,
  closeModal,
  message,
  contentLabel,
  runOutOfStock,
  selected,
  confirmDelete,
  errorDelete,
  messageForBundle,
  setMessageForBundle,
  fagotId,
  handleEffect,
  runUpdateBundleByid,
  updateOperationOk,
  runRemoveBoxeFromBundle
}) => {
  // States
  const [load, setLoad] = useState(false); // states loading while current operation: "défagotage en cours"
  const [widthModal, setWidthModal] = useState('450px');

  // style modal
  const styleModal = {
    content: {
      width: widthModal,
      height: 'auto',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: '30px',
      transform: 'translate(-50%, -50%)'
    }
  };

  // Function managing size of modal depending the size of the device
  useEffect(() => {
    if (window.matchMedia('(max-width:730px)').matches) {
      setWidthModal('80%');
    } else {
      setWidthModal('450px');
    }
  }, []);

  window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width:730px)').matches) {
      setWidthModal('80%');
    } else {
      setWidthModal('450px');
    }
  });

  Modal.setAppElement('#root');

  const runDeleteFagotById = () => {
    deleteFagotById(fagotId)
      .then(() => {
        setLoad(true);
        setTimeout(() => {
          setLoad(false);
          setMessageForBundle('Défagotage effectué');
        }, 4000);
      })
      .then(() => {
        setTimeout(() => {
          handleEffect();
        }, 2000);
      })

      .catch((err) => {
        console.log(err);
        setMessageForBundle('Il y eu une erreur, défagotage non effectué.');
      });
  };

  // Function managing icon, depending of error state
  const manageIcon = () => {
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

  // Function managing the content of the modal

  const manageModalContent = () => {
    if (contentLabel === 'Modal-reception') {
      return (
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={styleModal}
          contentLabel={contentLabel}>
          {manageIcon()}
          <p>{message}</p>
          <button className="button-close" onClick={closeModal}>
            Fermer
          </button>
        </Modal>
      );
    } else if (contentLabel === 'Modal-outOfStock') {
      return (
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={styleModal}
          contentLabel={contentLabel}>
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
    } else if (contentLabel === 'Modal-manage-bundle') {
      return (
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={styleModal}
          contentLabel={contentLabel}>
          {!load && !messageForBundle ? (
            <>
              <i className="symbol blue">
                <FontAwesomeIcon icon={faInfoCircle} />
              </i>
              <p>
                Défagoter n&apos;entrainera pas la suppression des caisses qui lui sont associées
              </p>
              <p>Voulez défagoter?</p>
              <div className="container-duo-btn">
                <button onClick={closeModal}>Annuler</button>
                <button onClick={() => runDeleteFagotById()}>Défagoter</button>
              </div>
            </>
          ) : load && !messageForBundle ? (
            <p>Défagotage en cours...</p>
          ) : !load && messageForBundle ? (
            <>
              <i className="symbol green">
                <FontAwesomeIcon icon={faSquareCheck} />
              </i>
              <p>{messageForBundle}</p>
              <button
                onClick={() => {
                  closeModal();
                  setMessageForBundle('');
                }}
                type="button">
                Continuer
              </button>
            </>
          ) : (
            ''
          )}
        </Modal>
      );
    } else if (contentLabel === 'Modal-bundling') {
      return (
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={styleModal}
          contentLabel={contentLabel}>
          {!message ? (
            <>
              <p>Voulez vous vraiment modifier ce fagot?</p>
              <div className="duo-btn">
                <button
                  onClick={() => {
                    runUpdateBundleByid();
                  }}
                  type="button">
                  Oui
                </button>
                <button onClick={() => closeModal()} type="button">
                  Non
                </button>
              </div>
            </>
          ) : (
            ''
          )}
          {updateOperationOk ? manageIcon() : ''}
          {message ? <p>{message}</p> : ''}
        </Modal>
      );
    } else if (contentLabel === 'Modal-remove-from-bundle') {
      return (
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={styleModal}
          contentLabel={contentLabel}>
          {!message ? (
            <div className="confirmation-modal">
              <p>Voulez vous vraiment retirer cette caisse de ce fagot?</p>
              <div className="duo-btn">
                <button
                  onClick={() => {
                    runRemoveBoxeFromBundle();
                  }}
                  type="button">
                  Oui
                </button>
                <button onClick={() => closeModal()} type="button">
                  Non
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
          {updateOperationOk ? manageIcon() : ''}
          {message ? <p>{message}</p> : ''}
        </Modal>
      );
    }
  };

  return <div className="component-modal">{manageModalContent()}</div>;
};

ModalComponent.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func,
  message: PropTypes.string,
  error: PropTypes.bool,
  contentLabel: PropTypes.string,
  runOutOfStock: PropTypes.func,
  selected: PropTypes.array,
  confirmDelete: PropTypes.string,
  errorDelete: PropTypes.bool,
  messageForBundle: PropTypes.string,
  setMessageForBundle: PropTypes.func,
  fagotId: PropTypes.number,
  handleEffect: PropTypes.func,
  runUpdateBundleByid: PropTypes.func,
  updateOperationOk: PropTypes.bool,
  runRemoveBoxeFromBundle: PropTypes.func
};

export default ModalComponent;
