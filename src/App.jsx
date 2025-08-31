
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import MealsCardDetails from './Components/MealsCardDetails'
import FavoritesPage from './pages/Favorites'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<MealsCardDetails />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App
