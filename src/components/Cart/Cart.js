import React, { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/CartContext/CartContext';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import Checkout from './Checkout';
import Loader from '../UI/Loader/Loader';

const Cart = (props) => {
  const context = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleOrder = async (orderData) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://react-study-87d75-default-rtdb.europe-west1.firebasedatabase.app/orders.json`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!res.ok) {
        throw new Error('An unexpected error occured...');
      } else {
        setLoading(false);
        setSubmitted(true);
        console.log(res);
        context.clearCart();
        const closeTimer = setTimeout(() => {
          props.onClose();
          clearTimeout(closeTimer);
        }, 3500);
      }
    } catch (error) {
      console.error(error.message);
    }
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

  let content = (
    <Fragment>
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
      {showCheckout && (
        <Checkout onConfirm={handleOrder} onCancel={props.onClose} />
      )}
      {!showCheckout && orderActions}
    </Fragment>
  );

  if (loading) {
    content = <Loader />;
  }

  if (submitted) {
    content = (
      <p className={classes.submitted}>
        Your order successfully submitted. Your meal will be ready and delivered
        within 45 minutes
      </p>
    );
  }

  return <Modal onClick={props.onClose}>{content}</Modal>;
};

export default Cart;
