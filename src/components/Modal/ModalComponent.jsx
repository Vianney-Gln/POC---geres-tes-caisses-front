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
const ModalComponent = ({ error, open, closeModal, message }) => {
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

  // function managing icon, depending of error state
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

  return (
    <div className="component-modal">
      <Modal isOpen={open} onRequestClose={closeModal} style={styleModal} contentLabel="Info Modal">
        {manageIcon()}
        <p>{message}</p>
        <button onClick={closeModal}>Fermer</button>
      </Modal>
    </div>
  );
};

ModalComponent.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func,
  message: PropTypes.string,
  error: PropTypes.bool
};

export default ModalComponent;
