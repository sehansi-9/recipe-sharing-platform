import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Load the recipe from localStorage if the id is provided (for editing)
    useEffect(() => {
        if (id) {
            const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
            const recipeToEdit = storedRecipes.find((recipe) => recipe.id === id);
            if (recipeToEdit) {
                setTitle(recipeToEdit.title);
                setIngredients(recipeToEdit.ingredients);
                setInstructions(recipeToEdit.instructions);
                setImageUrl(recipeToEdit.imageUrl);
            }
        }
    }, [id]);

    const pageTitle = id ? <h2 className="text-center">Update Recipe</h2> : <h2 className="text-center">Add Recipe</h2>;

    const handleSubmit = (event) => {
        event.preventDefault();

        const newRecipe = {
            id: id || new Date().getTime().toString(), // Generate a new ID or use the provided ID for editing
            title,
            ingredients,
            instructions,
            imageUrl,
        };

        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

        if (id) {
            // Update existing recipe
            recipes = recipes.map((recipe) =>
                recipe.id === id ? newRecipe : recipe
            );
        } else {
            // Add new recipe
            recipes.push(newRecipe);
        }

        // Save to localStorage
        localStorage.setItem('recipes', JSON.stringify(recipes));

        navigate('/profile'); 
    };

    return (
        <div className="container">
            <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 bg-dark text-light border-light">
                    {pageTitle}
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter recipe title"
                                    value={title}
                                    className="form-control bg-dark text-light border-light"
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Ingredients</label>
                                <input
                                    type="text"
                                    placeholder="Enter ingredients"
                                    value={ingredients}
                                    className="form-control bg-dark text-light border-light"
                                    onChange={(event) => setIngredients(event.target.value)}
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Instructions</label>
                                <input
                                    type="text"
                                    placeholder="Enter instructions"
                                    value={instructions}
                                    className="form-control bg-dark text-light border-light"
                                    onChange={(event) => setInstructions(event.target.value)}
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Image URL</label>
                                <input
                                    type="text"
                                    placeholder="Enter image URL"
                                    value={imageUrl}
                                    className="form-control bg-dark text-light border-light"
                                    onChange={(event) => setImageUrl(event.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!title.trim() || !ingredients.trim() || !instructions.trim() || !imageUrl.trim()}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;
