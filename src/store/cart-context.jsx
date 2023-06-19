import React from "react";

const CartContext = React.createContext({
  items: [],
  tolalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
});

export default CartContext;
