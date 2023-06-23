import React, { useEffect, useState } from "react";

import styles from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://food-order-app-backend-ce228-default-rtdb.firebaseio.com/Meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      let mealsArray = [];

      for (const key in responseData) {
        mealsArray.push({
          id: key,
          ...responseData[key],
        });
      }

      setMeals(mealsArray);
      setIsLoading(false);
    }

    fetchData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.errorState}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
