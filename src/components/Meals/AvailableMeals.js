import React, { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import Loader from '../UI/Loader/Loader';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          `https://react-study-87d75-default-rtdb.europe-west1.firebasedatabase.app/meals.json`
        );

        if (!res.ok) {
          throw new Error(
            'We are sorry, an unexpected server error occured...'
          );
        }

        const data = await res.json();
        const meals = Object.values(data)[0];
        setError(null);
        setMeals(meals);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchMeals();
  }, []);

  let content = null;

  if (error) {
    content = (
      <p style={{ color: 'red', textAlign: 'center', padding: 20 }}>{error}</p>
    );
  } else {
    const mealsList = meals.map((meal) => (
      <MealItem meal={meal} key={meal.id} />
    ));
    content = <ul>{mealsList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>{loading ? <Loader /> : content}</Card>
    </section>
  );
};

export default AvailableMeals;
