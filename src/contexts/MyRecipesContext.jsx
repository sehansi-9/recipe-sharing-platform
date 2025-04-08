import { createContext, useContext, useState, useEffect } from "react";
import { useRecipeContext } from "./FavouriteContext"; 
const MyRecipesContext = createContext();

export function useMyRecipes() {
  return useContext(MyRecipesContext);
}

export function MyRecipesProvider({ children }) {
  const [myRecipes, setMyRecipes] = useState([]);
  const { removeFromFavorites } = useRecipeContext(); 

  
  useEffect(() => {
    const stored = localStorage.getItem("myRecipes");
    if (stored) {
      setMyRecipes(JSON.parse(stored));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("myRecipes", JSON.stringify(myRecipes));
  }, [myRecipes]);

  const addMyRecipe = (recipe) => {
    const newRecipe = { ...recipe, id: Date.now().toString() };
    setMyRecipes((prev) => [...prev, newRecipe]);
  };

  const updateMyRecipe = (updatedRecipe) => {
    setMyRecipes((prev) =>
      prev.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
    );
  };

  const deleteMyRecipe = (id) => {
    setMyRecipes((prev) => prev.filter((r) => r.id !== id));
    removeFromFavorites(id); // Immediately remove from favorites when deleting
  };

  return (
    <MyRecipesContext.Provider
      value={{ myRecipes, addMyRecipe, updateMyRecipe, deleteMyRecipe }}
    >
      {children}
    </MyRecipesContext.Provider>
  );
}
