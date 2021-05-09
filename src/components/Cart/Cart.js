import React, { useContext, useState } from 'react';
import CartContext from '../../store/CartContext/CartContext';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const Cart = (props) => {
  const context = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const hasItems = context.items.length > 0;

  const cartItemAddHandler = (item) => {
    const addOne = { ...item, amount: 1 };

    context.addItem(addOne);
  };
  const cartItemRemoveHandler = (id) => {
    context.removeItem(id);
  };

  const handleOrderCheckout = () => {
    setShowCheckout(true);
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

  const orderActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={handleOrderCheckout}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div
        className={classes.total}
        style={{
          color:
            Math.abs(context.totalAmount.toFixed(2)) > 0 ? 'black' : '#ccc',
        }}
      >
        <span>Total Amount</span>
        <span>${Math.abs(context.totalAmount.toFixed(2))}</span>
      </div>
      {showCheckout && <Checkout onCancel={props.onClose} />}
      {!showCheckout && orderActions}
    </Modal>
  );
};

export default Cart;
