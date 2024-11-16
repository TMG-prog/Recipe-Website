const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.findAll({ order: [['id', 'ASC']] });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).send('Error fetching recipes: ' + error.message);
    }
});
// Update a recipe by ID
router.put('/recipe/:id', async (req, res) => {
    const recipeId = req.params.id;
    const { recipeName, recipeOwner, ingredients, instructions } = req.body;

    try {
        const recipe = await Recipe.findByPk(recipeId);
        
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        // Update the recipe with new data
        recipe.recipe_name = recipeName || recipe.recipe_name;
        recipe.recipe_owner = recipeOwner || recipe.recipe_owner;
        recipe.ingredients = ingredients ? ingredients.split(',') : recipe.ingredients;
        recipe.instructions = instructions || recipe.instructions;

        await recipe.save();
        res.status(200).send('Recipe updated successfully!');
    } catch (error) {
        res.status(500).send('Error updating recipe: ' + error.message);
    }
});
// Delete a recipe by ID
router.delete('/recipe/:id', async (req, res) => {
    const recipeId = req.params.id;

    try {
        const result = await Recipe.destroy({ where: { id: recipeId } });
        
        if (result === 0) {
            return res.status(404).send('Recipe not found');
        }

        res.status(200).send('Recipe deleted successfully!');
    } catch (error) {
        res.status(500).send('Error deleting recipe: ' + error.message);
    }
});

module.exports = router;