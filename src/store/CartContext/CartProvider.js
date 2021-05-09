import { useReducer } from 'react';
import { cartReducer } from './cartReducer';
import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART } from './Types';
import CartContext from './CartContext';

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItemToCartHandler = (item) => {
    dispatch({ type: ADD_ITEM, payload: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
