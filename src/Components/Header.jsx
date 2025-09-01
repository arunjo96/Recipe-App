

import { useState, useEffect } from "react";
import {
  getCategories,
  getIngredients,
  searchMeals,
  filterCatergory,
  filterByIngredient,
} from "../Services/ServiceAPI";
import { Link } from "react-router-dom";

const Header = ({ setMeals }) => {
  const [search, setSearch] = useState("");
  const [mealsCategories, setMealsCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        const categories = res.data.categories.map((cat) => cat.strCategory);
        setMealsCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchIngredients = async () => {
      try {
        const res = await getIngredients();
        const ingredient = res.data.meals.map((i) => i.strIngredient);
        setIngredients(ingredient);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchCategories();
    fetchIngredients();
  }, []);

  const fetchData = async () => {
    try {
      let meals = [];

      if (selectedCategory) {
        const res = await filterCatergory(selectedCategory);
        meals = res.data.meals || [];
      }

      if (selectedIngredient) {
        const res = await filterByIngredient(selectedIngredient);
        meals = res.data.meals || [];
      }

      if (!selectedCategory && !selectedIngredient) {
        const res = await searchMeals(search);
        meals = res.data.meals || [];
      }

      if (search && meals.length > 0) {
        meals = meals.filter((m) =>
          m.strMeal.toLowerCase().includes(search.toLowerCase())
        );
      }

      setMeals(meals);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedIngredient("");
    fetchData();
  };

  const handleIngredientChange = (value) => {
    setSelectedIngredient(value);
    setSelectedCategory(""); 
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, selectedIngredient]);

  return (
    <div className="bg-[#FFF8F0] py-3 fixed w-full top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center header_main px-4 sm:justify-between gap-3">
        <Link to="/" className="text-2xl font-bold text-[#E23744]">
          Recipe App
        </Link>

        <form onSubmit={handleSearch} className="flex gap-3 sm:items-center">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-300 text-[#1C1C1C] rounded-md w-full sm:w-72 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#FC8019] text-md font-semibold hover:bg-orange-600 transition cursor-pointer text-white rounded-md"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-6 filter_div">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-3 py-2 outline-none text-white rounded-lg cursor-pointer bg-[#FC8019] focus:ring-2 focus:ring-orange-300"
          >
            <option value="">All Categories</option>
            {mealsCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedIngredient}
            onChange={(e) => handleIngredientChange(e.target.value)}
            className="px-3 py-2 outline-none text-white rounded-lg cursor-pointer bg-[#FC8019] focus:ring-2 focus:ring-red-300"
          >
            <option value="">All Ingredients</option>
            {ingredients.slice(0, 50).map((ing) => (
              <option key={ing} value={ing}>
                {ing}
              </option>
            ))}
          </select>

          <Link
            to="/favorites"
            className="hover:underline hover:text-[#FC8019] text-gray-700 font-semibold"
          >
            Favorites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
