import React, { useContext } from 'react';
import useInputValidator from '../../hooks/inputValidator';
import classes from './Checkout.module.css';
import cartContext from '../../store/CartContext/CartContext';

const Checkout = (props) => {
  const context = useContext(cartContext);

  const {
    value: name,
    hasError: hasNameError,
    isEmpty: isNameEmpty,
    onValueBlur: onNameBlur,
    handleValueChange: handleNameChange,
    clearValue: clearName,
    callError: callNameError,
  } = useInputValidator(null, { builtInFn: 'name' });

  const {
    value: street,
    hasError: hasStreetError,
    isEmpty: isStreetEmpty,
    onValueBlur: onStreetBlur,
    handleValueChange: handleStreetChange,
    clearValue: clearStreet,
    callError: callStreetError,
  } = useInputValidator(null, { builtInFn: 'text' });

  const {
    value: postalCode,
    hasError: hasPostalCodeError,
    isEmpty: isPostalCodeEmpty,
    onValueBlur: onPostalCodeBlur,
    handleValueChange: handlePostalCodeChange,
    clearValue: clearPostalCode,
    callError: callPostalCodeError,
  } = useInputValidator(null, { builtInFn: 'text' });

  const {
    value: city,
    hasError: hasCityError,
    isEmpty: isCityEmpty,
    onValueBlur: onCityBlur,
    handleValueChange: handleCityChange,
    clearValue: clearCity,
    callError: callCityError,
  } = useInputValidator(null, { builtInFn: 'text' });

  const confirmHandler = (e) => {
    e.preventDefault();

    if (
      isNameEmpty ||
      isStreetEmpty ||
      isCityEmpty ||
      isPostalCodeEmpty ||
      hasNameError ||
      hasStreetError ||
      hasPostalCodeError ||
      hasCityError
    ) {
      (hasNameError || isNameEmpty) && callNameError();
      (hasStreetError || isStreetEmpty) && callStreetError();
      (hasPostalCodeError || isPostalCodeEmpty) && callPostalCodeError();
      (hasCityError || isCityEmpty) && callCityError();

      return;
    }

    const orderData = {
      orderId: `order-${new Date().getTime()}-${new Date().getFullYear()}-${new Date().getDate()}-${name.toLowerCase()}`,
      name,
      street,
      postalCode,
      city,
      orderDate: new Date(),
      order: context.items,
    };

    console.log(orderData);
    clearName();
    clearStreet();
    clearPostalCode();
    clearCity();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={
          hasNameError
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }
      >
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={name}
          title='Please enter your name'
          placeholder='Name'
          onChange={handleNameChange}
          onBlur={onNameBlur}
        />
      </div>
      <div
        className={
          hasStreetError
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }
      >
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          value={street}
          title='Please enter your street'
          placeholder='Street'
          onChange={handleStreetChange}
          onBlur={onStreetBlur}
        />
      </div>
      <div
        className={
          hasPostalCodeError
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }
      >
        <label htmlFor='postal-code'>Postal Code</label>
        <input
          type='text'
          id='postal-code'
          value={postalCode}
          title='Please enter your postal code'
          placeholder='Postal Code'
          onChange={handlePostalCodeChange}
          onBlur={onPostalCodeBlur}
        />
      </div>
      <div
        className={
          hasCityError
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }
      >
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          value={city}
          title='Please enter your city'
          placeholder='City'
          onChange={handleCityChange}
          onBlur={onCityBlur}
        />
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirm</button>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
