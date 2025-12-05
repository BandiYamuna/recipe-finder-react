import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import RecipeDetails from "./components/RecipeDetails";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const scrollToResults = () => {
    const resultsSection = document.getElementById("results");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchMeals = async (url) => {
    if (!query.trim()) {
      setStatus("Please enter something to search.");
      return;
    }

    setStatus("Loading...");
    setMeals([]);

    const res = await fetch(url);
    const data = await res.json();

    if (!data.meals) {
      setStatus("No recipes found.");
      return;
    }

    setStatus("");
    setMeals(data.meals);
    setTimeout(scrollToResults, 200);
  };

  const searchByIngredient = () =>
    fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);

  const searchByName = () =>
    fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

  const openDetails = async (id) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    setSelectedMeal(data.meals[0]);
  };

  const closeDetail = () => {
    setSelectedMeal(null);
  };

  const toggleFavorite = (meal) => {
    const exists = favorites.some((fav) => fav.idMeal === meal.idMeal);

    let updated;
    if (exists) {
      updated = favorites.filter((fav) => fav.idMeal !== meal.idMeal);
    } else {
      updated = [...favorites, meal];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (id) =>
    favorites.some((fav) => fav.idMeal === id);

  return (
    <div className="app">
      <Navbar />
      <Hero />

      <SearchBar
        query={query}
        setQuery={setQuery}
        searchByIngredient={searchByIngredient}
        searchByName={searchByName}
      />

      <p style={{ textAlign: "center", fontWeight: "bold" }}>{status}</p>

      <div id="results" className="results-grid">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="meal"
            onClick={() => openDetails(meal.idMeal)}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>
          </div>
        ))}
      </div>

      {favorites.length > 0 && (
        <>
          <h2 className="favorites-title">⭐ Favorite Recipes</h2>
          <div className="results-grid">
            {favorites.map((meal) => (
              <div
                key={meal.idMeal}
                className="meal"
                onClick={() => openDetails(meal.idMeal)}
              >
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h3>{meal.strMeal}</h3>
              </div>
            ))}
          </div>
        </>
      )}

      <RecipeDetails
        meal={selectedMeal}
        closeDetail={closeDetail}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />

      <Footer />
    </div>
  );
}

export default App;
