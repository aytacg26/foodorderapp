import React, { useState, useRef } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/InputV2/Input';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = parseInt(inputRef.current.value);

    if (!enteredAmount || enteredAmount < 0 || enteredAmount > 10) {
      setAmountIsValid(false);
      return;
    }

    setAmountIsValid(true);
    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label='Amount'
        input={{
          id: 'amount',
          type: 'number',
          min: '1',

          step: '1',
          defaultValue: '1',
        }}
      />
      <button> + Add</button>
      {!amountIsValid && (
        <p style={{ color: 'red' }}>Please enter a valid amount (1-10)</p>
      )}
    </form>
  );
};

export default MealItemForm;
