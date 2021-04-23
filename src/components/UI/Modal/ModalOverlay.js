import React, { Fragment } from 'react';
import Backdrop from './Backdrop';
import classes from './Modal.module.css';

const ModalOverlay = ({ children, onClick }) => {
  return (
    <Fragment>
      <Backdrop className={classes.backdrop} onClick={onClick} />
      <div className={classes.modal}>
        <div className={classes.content}>{children}</div>
      </div>
    </Fragment>
  );
};

export default ModalOverlay;
