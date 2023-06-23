import React, { useRef, useState } from "react";

import styles from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = (props) => {
  const [quantityIsValid, setQuantityIsValid] = useState(true);

  const quantityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredQuantity = +quantityInputRef.current.value;

    if (enteredQuantity < 1 || enteredQuantity > 5) {
      return;
    } else {
      setQuantityIsValid(true);
    }

    props.onAddToCart(enteredQuantity);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="Quantity"
        input={{
          type: "number",
          id: "quantity" + props.id,
          name: "quantity",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!quantityIsValid && <p>please enter a valid quantity 1-5</p>}
    </form>
  );
};

export default MealItemForm;
