import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRecipes, searchRecipes, getRecipeByTag } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(""); 


  const loadAllRecipes = async () => {
    setLoading(true);
    try {
      const data = await getRecipes(); 
      setRecipes(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load recipes...");
    } finally {
      setLoading(false);
    }
  };

  const loadRecipesByTag = async (tag) => {
    setLoading(true);
    try {
      const data = await getRecipeByTag(tag);
      setRecipes(data.recipes); 
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load recipes...");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    loadAllRecipes();
  }, []);

 
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;
    setLoading(true);
    try {
      const data = await searchRecipes(searchQuery);
      setRecipes(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search recipes...");
    } finally {
      setLoading(false);
    }
  };

 
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    loadRecipesByTag(tag); 
  };

  return (
    <div className="home">
     
      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for recipes..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="tag-buttons">
      <button onClick={loadAllRecipes}>All</button>
      <button onClick={() => handleTagClick("Chicken")}>Chicken</button>
      <button onClick={() => handleTagClick("Beef")}>Beef</button>
       <button onClick={() => handleTagClick("Vegetarian")}>Vegetarian</button>
     
       
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Loading State */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="recipe-grid">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))
          ) : (
            <p className="no-results">No recipes found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
