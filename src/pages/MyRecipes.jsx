// pages/MyRecipes.js
import "../css/Favorites.css";
import { useNavigate } from "react-router-dom";
import { useMyRecipes } from "../contexts/MyRecipesContext";
import RecipeCard from "../components/RecipeCard";

function MyRecipes() {
  const { myRecipes, deleteMyRecipe } = useMyRecipes();
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = (id) => {
    deleteMyRecipe(id);
  };

  const handleAddRecipe = () => {
    navigate("/add");
  };

  if (!myRecipes || myRecipes.length === 0) {
    return (
      <div className="favorites">
        <h2>My Recipes</h2>
        <div style={{ textAlign: "center", margin: "20px" }}>
          <button className="btn btn-light" onClick={handleAddRecipe}>
            + Add New Recipe
          </button>
        </div>
        <p>Click the button above to add your first recipe!</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>My Recipes</h2>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button className="btn add" onClick={handleAddRecipe}>
          + Add New Recipe
        </button>
      </div>

      <div className="recipe-grid">
        {myRecipes.map((recipe) => (
          <div key={recipe.id} style={{ position: "relative" }}>
            <RecipeCard recipe={recipe} />
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button className="btn btn-primary" onClick={() => handleUpdate(recipe.id)}>
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(recipe.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyRecipes;
