import { useState } from "react";

function RecipeDetails({ meal, closeDetail, toggleFavorite, isFavorite }) {
  if (!meal) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }
  }

  const youtubeId = meal.strYoutube?.split("v=")[1];

  return (
    <>
      <div className="popup-overlay" onClick={closeDetail}></div>

      <div className="detail-card">
        {/* Close Button */}
        <button className="close-btn" onClick={closeDetail}>✖</button>

        {/* Favorite Button */}
        <button
          className="fav-btn"
          onClick={() => toggleFavorite(meal)}
        >
          {isFavorite(meal.idMeal) ? "❤️ Remove Favorite" : "🤍 Add Favorite"}
        </button>

        {/* Image */}
        <img className="detail-image" src={meal.strMealThumb} alt={meal.strMeal} />

        <h2 className="detail-title">{meal.strMeal}</h2>

        <h3>🧂 Ingredients</h3>
        <ul className="ingredient-list">
          {ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>

        <h3>📌 Instructions</h3>
        <p className="instructions">{meal.strInstructions}</p>

        {youtubeId && (
          <>
            <h3>▶ Watch Tutorial</h3>
            <iframe
              className="recipe-video"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              frameBorder="0"
              allowFullScreen
              title="Recipe Video"
            ></iframe>
          </>
        )}
      </div>
    </>
  );
}

export default RecipeDetails;
