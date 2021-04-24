import React, { useContext } from 'react';
import CartContext from '../../store/CartContext/CartContext';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';

const Cart = (props) => {
  const context = useContext(CartContext);
  const hasItems = context.items.length > 0;

  const cartItemAddHandler = (item) => {
    const addOne = { ...item, amount: 1 };

    context.addItem(addOne);
  };
  const cartItemRemoveHandler = (id) => {
    context.removeItem(id);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {context.items.map((item) => (
        <CartItem
          price={item.price}
          name={item.name}
          amount={item.amount}
          key={item.id}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${context.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={props.onOrder}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
