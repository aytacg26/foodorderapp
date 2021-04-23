import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from './ModalOverlay';

const Modal = (props) => {
  const content = (
    <ModalOverlay onClick={props.onClick}>{props.children}</ModalOverlay>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-root'));
};

export default Modal;
