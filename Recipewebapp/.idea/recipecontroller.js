const Recipe = require('../.idea/Recipe');


exports.renderForm = (req, res) => {
    res.render('recipeForm');
};

// Handle form submission
exports.saveRecipe = async (req, res) => {
    try {
        const { recipe_name, recipe_owner, description, ingredients, tags } = req.body;
        const recipe_image = req.file ? req.file.path : null;

        await Recipe.create({
            recipe_name,
            recipe_owner,
            description,
            ingredients,
            recipe_image,
            tags
        });

        res.redirect('/recipes');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving recipe');
    }
};