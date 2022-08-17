import React from 'react';
// import modal
import Modal from 'react-modal';
// import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
// import style css
import './modalComponent.scss';
// import PropTypes
import PropTypes from 'prop-types';
const ModalComponent = ({ error, open, closeModal, message, contentLabel, runOutOfStock }) => {
  // style modal
  const styleModal = {
    content: {
      width: '450px',
      height: '300px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  Modal.setAppElement('#root');

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
          <button onClick={closeModal}>Fermer</button>
        </Modal>
      );
    } else if (contentLabel === 'Modal-outOfStock') {
      return (
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={styleModal}
          contentLabel={contentLabel}>
          <p>Voulez vous vraiment supprimer ces articles? </p>
          <div className="duo-btn">
            <button onClick={runOutOfStock}>Oui</button>
            <button onClick={closeModal}>Non</button>
          </div>
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
  runOutOfStock: PropTypes.func
};

export default ModalComponent;
