import React from 'react';
// import modal
import Modal from 'react-modal';
// import PropTypes
import PropTypes from 'prop-types';
const ModalComponent = ({ open, closeModal, message }) => {
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

  return (
    <div>
      <Modal isOpen={open} onRequestClose={closeModal} style={styleModal} contentLabel="Info Modal">
        <p>{message}</p>
      </Modal>
    </div>
  );
};

ModalComponent.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func,
  message: PropTypes.string
};

export default ModalComponent;
