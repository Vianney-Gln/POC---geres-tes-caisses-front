import React, { useState, useEffect } from 'react';
// import modal
import Modal from 'react-modal';
// import service
import { deleteBundleById } from '../../services/bundle';
import { runDeleteBundleById, modalReception, modalOutOfStock } from './util';
// import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import style css
import './modalComponent.scss';
// import PropTypes
import PropTypes from 'prop-types';
import manageIcon from './util';

const ModalComponent = ({
  error,
  setError,
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
  isOperationOk,
  setIsOperationOk,
  removeBoxeFromBundle,
  runRemoveBoxeFromBundle,
  setModalIsOpen,
  currentBoxeId,
  setMessage,
  handleRestartEffect,
  setBoxesToAdd,
  updateBundleById,
  boxesToAdd,
  currBundle
}) => {
  // States

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

  // Function managing the content of the modal

  const manageModalContent = () => {
    if (contentLabel === 'Modal-reception') {
      return modalReception(
        open,
        closeModal,
        styleModal,
        contentLabel,
        manageIcon,
        error,
        message,
        setModalIsOpen
      );
    } else if (contentLabel === 'Modal-outOfStock') {
      return modalOutOfStock(
        open,
        closeModal,
        styleModal,
        contentLabel,
        confirmDelete,
        errorDelete,
        selected,
        runOutOfStock
      );
    } else if (contentLabel === 'Modal-manage-bundle') {
      return (
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={styleModal}
          contentLabel={contentLabel}>
          {!messageForBundle ? (
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
                <button
                  onClick={() =>
                    runDeleteBundleById(
                      deleteBundleById,
                      fagotId,
                      setMessageForBundle,
                      setError,
                      setIsOperationOk,
                      handleEffect,
                      closeModal
                    )
                  }>
                  Défagoter
                </button>
              </div>
            </>
          ) : (
            ''
          )}
          {isOperationOk ? manageIcon(error) : ''}
          {messageForBundle ? <p>{messageForBundle}</p> : ''}
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
                    runUpdateBundleByid(
                      updateBundleById,
                      boxesToAdd,
                      currBundle,
                      setMessage,
                      setError,
                      setIsOperationOk,
                      handleRestartEffect,
                      setBoxesToAdd,
                      closeModal
                    );
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
          {isOperationOk ? manageIcon(error) : ''}
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
                    runRemoveBoxeFromBundle(
                      removeBoxeFromBundle,
                      currentBoxeId,
                      setMessage,
                      setError,
                      setIsOperationOk,
                      handleRestartEffect,
                      setBoxesToAdd,
                      closeModal
                    );
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
          {isOperationOk ? manageIcon(error) : ''}
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
  isOperationOk: PropTypes.bool,
  runRemoveBoxeFromBundle: PropTypes.func,
  setError: PropTypes.func,
  setIsOperationOk: PropTypes.func,
  setModalIsOpen: PropTypes.func,
  removeBoxeFromBundle: PropTypes.func,
  currentBoxeId: PropTypes.number,
  setMessage: PropTypes.func,
  handleRestartEffect: PropTypes.func,
  setBoxesToAdd: PropTypes.func,
  updateBundleById: PropTypes.func,
  boxesToAdd: PropTypes.array,
  currBundle: PropTypes.object
};

export default ModalComponent;
