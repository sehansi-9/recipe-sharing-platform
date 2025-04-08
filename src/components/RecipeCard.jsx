import "../css/RecipeCard.css";
import { useRecipeContext } from "../contexts/FavouriteContext";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useRecipeContext();
  const favorite = isFavorite(recipe.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(recipe.id);
    else addToFavorites(recipe);
  }

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
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
        <h3 className="recipe-name">{recipe.name}</h3>
        <p>Cooking Time: {recipe.cookTimeMinutes} mins</p>
        <p>Rating: {recipe.rating} ⭐</p>
      </div>
    </div>
    </Link>
  );
}

export default RecipeCard;
