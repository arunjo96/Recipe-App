import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMealDetails } from "../Services/ServiceAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const MealsCardDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getMealDetails(id);
        setMeal(res.data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!meal) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 my-4 bg-white rounded-xl shadow-sm mealsCard_details">
      
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="rounded-xl w-full h-85 object-cover shadow-md"
        />
        <h1 className="text-3xl font-bold mt-4 text-[#1C1C1C]">
          {meal.strMeal}
        </h1>
        <p className="italic text-gray-600">
          {meal.strCategory} - {meal.strArea}
        </p>

        <h2 className="mt-4 pb-2 font-semibold text-xl text-[#E23744]">
          Instructions
        </h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {meal.strInstructions}
        </p>

        <h2 className="mt-6 pb-2 font-semibold text-xl text-[#E23744]">
          Ingredients
        </h2>
        <ul className="list-disc ml-6 text-gray-800 space-y-1">
          {Array.from({ length: 20 }, (_, i) => {
            const ingredient = meal[`strIngredient${i + 1}`];
            const measure = meal[`strMeasure${i + 1}`];
            return ingredient ? (
              <li key={i}>
                {ingredient} - {measure}
              </li>
            ) : null;
          })}
        </ul>

        {meal.strYoutube && (
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-6 text-[#FC8019] font-medium hover:underline"
          >
            <FontAwesomeIcon icon={faPlay} /> &nbsp; Watch on YouTube
          </a>
        )}

        <Link
          to="/"
          className="mt-6 block text-gray-700 font-medium hover:text-[#FC8019] transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Back to Recipes
        </Link>
      
    </div>
  );
};

export default MealsCardDetails;


