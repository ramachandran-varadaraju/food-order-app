import React, { useContext, useEffect, useState } from "react";

import styles from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const { items } = ctx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberOfCartItems = ctx.items.reduce((currNumber, item) => {
    return currNumber + item.quantity;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsHighlighted && styles.bump}`;

  return (
    <button onClick={props.onShowCart} className={btnClasses}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
