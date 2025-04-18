import "../css/Favorites.css";
import { useRecipeContext } from "../contexts/FavouriteContext";
import RecipeCard from "../components/RecipeCard";

function Favorites() {
  const { favorites } = useRecipeContext();

  // Check if favorites is null or an empty array
  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites">
        <h2>My Favourites</h2>
        
        <p>No favorites yet, heart recipies to add to your favourites!</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      <div className="recipe-grid">
        {favorites.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
