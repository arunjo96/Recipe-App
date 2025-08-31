import { useState, useEffect } from "react";

const FAVORITES_KEY = "favoriteMeals";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (meal) => {
    if (!favorites.find((fav) => fav.idMeal === meal.idMeal)) {
      setFavorites([...favorites, meal]);
    }
  };

  const removeFavorite = (idMeal) => {
    setFavorites(favorites.filter((fav) => fav.idMeal !== idMeal));
  };

  const isFavorite = (idMeal) => favorites.some((fav) => fav.idMeal === idMeal);

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
