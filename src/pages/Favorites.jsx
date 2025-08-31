import { Link } from "react-router-dom";
import { useFavorites } from "../Hooks/Favorite";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">No favorite recipes yet.</p>
        <Link to="/" className="text-[#E23744] underline">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <div className="div">
      <h1 className="text-2xl font-bold mb-4 text-[#E23744]">
        My Favorite Recipes
      </h1>
        <Link to="/" className="text-[#FC8019] text-xl underline pl-15">
          Go back to Home
        </Link>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {favorites.map((meal) => (
          <div
            key={meal.idMeal}
            className="flex flex-col items-center border bg-[#FFF8F0] border-gray-200 rounded-md p-4 relative  "
          >
            <Link
              to={`/recipe/${meal.idMeal}`}
              state={{ from: "favorites" }}
              className="w-full flex flex-col items-center"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-90 h-60  object-cover rounded-lg"
              />
              <h2 className="mt-2 text-lg font-semibold text-center">
                {meal.strMeal}
              </h2>
            </Link>
            <button
              onClick={() => removeFavorite(meal.idMeal)}
              className="mt-2 px-3 py-1 rounded bg-[#E23744] cursor-pointer text-white hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
