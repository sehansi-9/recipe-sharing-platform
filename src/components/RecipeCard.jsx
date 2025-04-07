import "../css/RecipeCard.css";
function RecipeCard({ recipe }) {
 

  function onFavoriteClick(e) {
   
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
