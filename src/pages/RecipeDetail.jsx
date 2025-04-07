import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/api'; 
import { useRecipeContext } from '../contexts/RecipeContext';
import "../css/RecipeDetail.css"; 

function RecipeDetail() {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addToFavorites, removeFromFavorites } = useRecipeContext();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await getRecipeById(id); 
        setRecipe(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load recipe details...');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!recipe) return <div className="error-message">Recipe not found!</div>;

  const favorite = isFavorite(recipe.id);

  const onFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className="recipe-detail-wrapper">
      <div className="recipe-card">
        <h1>{recipe.name}</h1>
        <div className="recipe-detail-inner">
          <div className="recipe-left">
            <div className="recipe-poster">
              <img src={recipe.image} alt={recipe.name} />
              <div className="recipe-overlay">
                <button 
                  className={`favorite-btn ${favorite ? "active" : ""}`} 
                  onClick={onFavoriteClick}
                >
                  ♥
                </button>
              </div>
            </div>
          </div>
  
          <div className="recipe-right">
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
  
            <h2>Instructions</h2>
            <ul>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default RecipeDetail;
