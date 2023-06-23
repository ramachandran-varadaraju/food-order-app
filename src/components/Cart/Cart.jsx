import React, { useContext, useState } from "react";

import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, quantity: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button onClick={props.onHideCart} className={styles["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-backend-ce228-default-rtdb.firebaseio.com/Orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userData: userData,
          totalAmount: ctx.totalAmount.toFixed(2),
          orderItems: ctx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
  };

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${ctx.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onHideCart} onSubmit={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
