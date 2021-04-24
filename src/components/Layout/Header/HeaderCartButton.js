import React, { useState, useEffect, useContext } from 'react';
import CartIcon from '../../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../../store/CartContext/CartContext';

const HeaderCartButton = ({ onClick }) => {
  const [buttonHighlighted, setButtonHighlighted] = useState(false);
  const context = useContext(CartContext);
  const { items } = context;
  const numberOfCartItems = items.reduce(
    (total, item) => total + item.amount,
    0
  );

  const btnClasses = `${classes.button} ${
    buttonHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setButtonHighlighted(true);
    const timer = setTimeout(() => {
      setButtonHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button
      className={btnClasses}
      onClick={items.length > 0 ? onClick : () => {}}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
