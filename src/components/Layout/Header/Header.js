import React, { Fragment } from 'react';
import classes from './Header.module.css';
import meals from '../../assets/images/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = ({ onClick }) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={onClick} />
      </header>
      <div className={classes['main-image']}>
        <img
          src={meals}
          alt='A table full of delicious food!'
          title='React Meals'
        />
      </div>
    </Fragment>
  );
};

export default Header;
