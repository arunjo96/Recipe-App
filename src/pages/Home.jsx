import { useState, useEffect } from "react";
import Header from "../Components/Header"
import MealsCard from "../Components/MealsCard"
import { searchMeals } from "../Services/ServiceAPI";


const Home = () => {

    const [meals, setMeals] = useState([])

      useEffect(() => {
        const fetchDefault = async () => {
          const res = await searchMeals("");
          setMeals(res.data.meals || []);
        };
        fetchDefault();
      }, []);
  return (
      <>
          <Header setMeals={setMeals} />
          <MealsCard meals={meals} />
       
      
    </>
  )
}

export default Home
