import React, { useContext } from "react";

import styles from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);

  const numberOfCartItems = ctx.items.reduce((currNumber, item) => {
    return currNumber + item.quantity;
  }, 0);

  return (
    <button onClick={props.onShowCart} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
