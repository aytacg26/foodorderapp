import React, { useContext } from 'react';
import CartContext from '../../../store/CartContext/CartContext';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = ({ meal }) => {
  const context = useContext(CartContext);
  const { id, name, description, price } = meal;

  const addToCartHandler = (amount) => {
    const item = { id, name, price, amount };
    context.addItem(item);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>${price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
