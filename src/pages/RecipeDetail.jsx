import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";
import { useRecipeContext } from "../contexts/FavouriteContext";
import "../css/RecipeDetail.css";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useRecipeContext();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      // First, check if the recipe is in localStorage or context
      const storedRecipes = JSON.parse(localStorage.getItem("myRecipes")) || [];
      const recipeFromStorage = storedRecipes.find((r) => r.id === id);

      if (recipeFromStorage) {
        setRecipe(recipeFromStorage);
        setLoading(false);
      } else {
        try {
          const data = await getRecipeById(id);
          setRecipe(data);
          setError(null);
        } catch (err) {
          console.error(err);
          setError("Failed to load recipe details...");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecipeDetails();
  }, [id]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(0);
  };

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
        <br></br>
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
            <div className="recipe-info">
              <h3 className="recipe-facts">
                Cooking Time: {recipe.cookTimeMinutes} mins
              </h3>
              <h3 className="recipe-facts">Rating: {recipe.rating} ⭐</h3>
            </div>
          </div>

          <div className="recipe-right">
            <div className="timer-wrapper">
              <div className="timer-box">
                <span>{Math.floor(timer / 60)}:</span>
                <span>{timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}</span>
              </div>

              <div className="timer-controls">
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={resetTimer}>Reset</button>
              </div>
            </div>

            <h2>Ingredients</h2>
            {/* Check if ingredients is an array or a string */}
            {Array.isArray(recipe.ingredients) ? (
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            ) : (
              <p>{recipe.ingredients}</p> // Display as paragraph if it's a string
            )}

            <h2>Instructions</h2>
           
            {Array.isArray(recipe.instructions) ? (
              <ul>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            ) : (
              <p>{recipe.instructions}</p> 
            )}

            <div className="social-share">
              <p>Share:</p>
              <button
                className="share-btn facebook"
                onClick={() => alert("Shared on Facebook!")}
              >
                Facebook
              </button>
              <button
                className="share-btn twitter"
                onClick={() => alert("Shared on Twitter!")}
              >
                Twitter
              </button>
              <button
                className="share-btn whatsapp"
                onClick={() => alert("Shared on WhatsApp!")}
              >
                WhatsApp
              </button>
            </div>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
