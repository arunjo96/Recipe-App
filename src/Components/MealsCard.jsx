import { Link } from "react-router-dom";
import { useState } from "react";
import { useFavorites } from "../Hooks/Favorite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const MealsCard = ({ meals }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [toast, setToast] = useState(null); 
  

  const handleFavorite = (meal) => {
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal);
      setToast({ type: "error", text: "Removed from favorites" });
    } else {
      addFavorite(meal);
      setToast({ type: "success", text: "Added to favorites" });
    }

    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 relative meals_card_main">
      {toast && (
        <div
          className={`fixed top-5 right-5 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg z-50 text-sm ${
            toast.type === "success"
              ? "bg-[#FC8019] text-white"
              : "bg-[#E23744] text-white"
          }`}
        >
          <FontAwesomeIcon
            icon={toast.type === "success" ? faCheckCircle : faTimesCircle}
            className="text-lg"
          />
          {toast.text}
        </div>
      )}

      {meals && meals.length > 0 ? (
        meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="flex flex-col items-center border bg-[#FFF8F0] border-gray-200 rounded-md p-4 relative  hover:shadow-lg hover:scale-101 transition"
          >
            <Link to={`/recipe/${meal.idMeal}`} className="text-center">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-90 h-60  object-cover rounded-lg"
              />
              <h2 className="mt-2 text-lg font-semibold text-center">
                {meal.strMeal}
              </h2>
              <p className="text-gray-600 text-md">{meal.strCategory}</p>
            </Link>

            <button
              onClick={() => handleFavorite(meal)}
              className={`rounded text-md transition cursor-pointer duration-300 ease-in-out fav_btn 
    ${
      isFavorite(meal.idMeal)
        ? "text-[#E23744]"
        : "text-[#fff] hover:text-[#E23744]"
    }`}
            >
              <FontAwesomeIcon
                icon={isFavorite(meal.idMeal) ? solidHeart : regularHeart}
              />
            </button>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No meals found.
        </p>
      )}
    </div>
  );
};

export default MealsCard;
