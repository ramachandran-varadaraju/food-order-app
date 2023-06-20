import React, { useContext } from "react";

import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

const MealItem = (props) => {
  const price = `$ ${props.meal.price.toFixed(2)}`;

  const ctx = useContext(CartContext);

  const addToCartHandler = (quantity) => {
    ctx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      price: props.meal.price,
      quantity: quantity,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={styles.description}>{props.meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.meal.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
