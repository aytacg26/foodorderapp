import React from 'react';
import classes from './Loader.module.css';

const Loader = () => {
  return (
    <div className={classes.Loader}>
      <div className={classes['lds-roller']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
