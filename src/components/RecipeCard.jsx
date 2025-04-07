import "../css/RecipeCard.css";
import { useRecipeContext } from "../contexts/RecipeContext";

function RecipeCard({ recipe }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useRecipeContext();
  const favorite = isFavorite(recipe.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(recipe.id);
    else addToFavorites(recipe);
  }

  return (
    <div className="recipe-card">
      <div className="recipe-poster">
        <img src={recipe.image} alt={recipe.name} />
        <div className="recipe-overlay">
          <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
            ♥
          </button>
        </div>
      </div>
      <div className="recipe-info">
        <h3>{recipe.name}</h3>
        <p>Cooking Time: {recipe.cookTimeMinutes} mins</p>
        <p>Rating: {recipe.rating} ⭐</p>
      </div>
    </div>
  );
}

export default RecipeCard;
