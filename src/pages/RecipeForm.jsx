import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMyRecipes } from "../contexts/MyRecipesContext";

const RecipeForm = () => {
    const [name, setName] = useState(''); 
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState(''); 
    const [cookTimeMinutes, setCookTimeMinutes] = useState('');  // Changed state to cookTimeMinutes
    const navigate = useNavigate();
    const { id } = useParams();
    const { addMyRecipe, updateMyRecipe, myRecipes } = useMyRecipes();

    useEffect(() => {
        if (id) {
            const recipeToEdit = myRecipes.find((recipe) => recipe.id === id);
            if (recipeToEdit) {
                setName(recipeToEdit.name); 
                setIngredients(recipeToEdit.ingredients);
                setInstructions(recipeToEdit.instructions);
                setImage(recipeToEdit.image);
                setCookTimeMinutes(recipeToEdit.cookTimeMinutes);  // Initialize cookTimeMinutes if editing
            }
        }
    }, [id, myRecipes]);

    const pageTitle = id ? <h2 className="text-center">Update Recipe</h2> : <h2 className="text-center">Add Recipe</h2>;

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const recipeData = {
            id: id || new Date().getTime().toString(),
            name,
            ingredients,
            instructions,
            image,
            cookTimeMinutes,  // Changed to cookTimeMinutes
        };
    
        if (id) {
            updateMyRecipe(recipeData); 
        } else {
            addMyRecipe(recipeData); 
        }
    
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
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter recipe name"
                                    value={name}
                                    className="form-control bg-dark text-light border-light"
                                    onChange={(event) => setName(event.target.value)} 
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
                                <label className="form-label">Cooking Time (in minutes)</label> {/* Updated label */}
                                <input
                                    type="number"
                                    placeholder="Enter cooking time"
                                    value={cookTimeMinutes}
                                    className="form-control bg-dark text-light border-light"
                                    onChange={(event) => setCookTimeMinutes(event.target.value)}  // Updated event handler
                                />
                            </div>


                            <div className="form-group mb-2">
                                <label className="form-label">Image (url)</label>
                                <input
                                    type="text"
                                    placeholder="Enter image URL"
                                    value={image}
                                    className="form-control bg-dark text-light border-light"
                                    onChange={(event) => setImage(event.target.value)}
                                />
                                {image && (
                                    <div className="mt-2">
                                        <img src={image} alt="Recipe" style={{ maxWidth: '100%', height: 'auto' }} />
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!name.trim() || !ingredients.trim() || !instructions.trim() || !image.trim() || !cookTimeMinutes.trim()}
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

export default RecipeForm;
