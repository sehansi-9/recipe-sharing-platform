import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";
import { searchRecipes, getRecipes } from "../services/api";


function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
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

    loadRecipes();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    try {
      const results = await searchRecipes(searchQuery);
      setRecipes(results);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search recipes...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
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

      {error && <div className="error-message">{error}</div>}

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
