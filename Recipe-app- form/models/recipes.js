
const apiEndpoint = 'http://localhost:3001/api/recipes';


async function displayRecipes() {
    try {
        const response = await fetch(apiEndpoint);
        const recipes = await response.json();
        
        const container = document.getElementById('recipe-container');
        container.innerHTML = ''; 

       
        if (recipes.length === 0) {
            container.innerHTML = '<p>No recipes found.</p>';
            return;
        }

       
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            
            recipeElement.innerHTML = `
                <h2>${recipe.recipe_name}</h2>
                <p><strong>Owner:</strong> ${recipe.recipe_owner}</p>
                <p><strong>Description:</strong> ${recipe.description}</p>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                <img src="${recipe.image_path ? recipe.image_path : 'placeholder.jpg'}" alt="${recipe.recipe_name}" style="width: 200px;">
                <hr>
            `;

            container.appendChild(recipeElement);
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}


document.addEventListener('DOMContentLoaded', displayRecipes);