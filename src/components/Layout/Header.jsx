import React from "react";

import mealsImage from "../../assets/meals.jpg";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>React meals</h1>
        <button>Cart</button>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="food on table" />
      </div>
    </React.Fragment>
  );
};

export default Header;
