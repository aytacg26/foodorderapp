import React, { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartContext/CartProvider';

const App = () => {
  const [showCart, setShowCart] = useState(false);

  const handleCart = () => {
    setShowCart((prevState) => !prevState);
  };

  return (
    <CartProvider>
      {showCart && <Cart onClose={handleCart} />}
      <Header onClick={handleCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
