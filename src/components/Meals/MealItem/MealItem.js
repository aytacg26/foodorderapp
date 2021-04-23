import React from 'react';
import classes from './MealItem.module.css';

const MealItem = ({ meal }) => {
  const { name, description, price } = meal;

  return (
    <li>
      <div className={classes.MealItem}>
        <span className={classes.MealName}>{name}</span>
        <span className={classes.Desc}>{description}</span>
        <span className={classes.MealPrice}>${price}</span>
      </div>
    </li>
  );
};

export default MealItem;
