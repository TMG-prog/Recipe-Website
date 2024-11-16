const express = require('express');
const multer = require('multer');
const recipeController = require('../.idea/recipecontroller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/new-recipe', recipeController.renderForm);
router.post('/new-recipe', upload.single('recipe_image'), recipeController.saveRecipe);

module.exports = router;