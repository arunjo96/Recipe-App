import { useState, useEffect } from "react";

import { getCategories, searchMeals, filterCatergory } from "../Services/ServiceAPI";
import { Link } from "react-router-dom";



const Header = ({ setMeals }) => {
  const [search, setSearch] = useState("");
  const [mealsCategories, setMealsCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      if (selectedCategory) {
        const res = await filterCatergory(selectedCategory);
        let meals = res.data.meals || [];

      
        if (search) {
          meals = meals.filter((m) =>
            m.strMeal.toLowerCase().includes(search.toLowerCase())
          );
        }
        setMeals(meals);
      } else {
        const res = await searchMeals(search);
        setMeals(res.data.meals || []);
      }
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
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  return (
    <div className="bg-[#FFF8F0] py-3 fixed w-full top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center header_main px-4 sm:justify-between gap-3">
        <Link to="/" className="text-2xl font-bold text-[#E23744]">Recipe App</Link>

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

        <div className="flex items-center gap-6">
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