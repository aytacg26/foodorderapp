import React, { useContext } from 'react';
import CartIcon from '../../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../../store/CartContext/CartContext';

const HeaderCartButton = ({ onClick }) => {
  const context = useContext(CartContext);
  const { items } = context;
  const numberOfCartItems = items.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
