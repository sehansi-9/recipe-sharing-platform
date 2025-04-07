export const getRecipes = async () => {
    const response = await fetch('https://dummyjson.com/recipes');
    const data = await response.json();
    return data.recipes; 
  };
  
  
  export const searchRecipes = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.recipes; 
  };
  

  export const getRecipeById = async (id) => {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!response.ok) {
      throw new Error('Recipe not found');
    }
    const data = await response.json();
    return data;
  };
  
