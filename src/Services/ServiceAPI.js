import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

const mealsAPI = axios.create({
    baseURL: API_URL,
});

export const searchMeals = (query) => mealsAPI.get(`/search.php?s=${query}`);
export const getCategories = () => mealsAPI.get(`categories.php`);
export const filterCatergory = (category) => mealsAPI.get(`/filter.php?c=${category}`);
export const getMealDetails = (mealId) => mealsAPI.get(`/lookup.php?i=${mealId}`);
export const getIngredients = () => mealsAPI.get(`/list.php?i=list`);
export const filterByIngredient = (ingredient) =>mealsAPI.get(`/filter.php?i=${ingredient}`);




export default mealsAPI;