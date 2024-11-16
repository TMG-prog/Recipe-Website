const express = require('express');
const multer = require('multer');
const path = require('path');
const Recipe = require('../models/Recipe');

const router = express.Router();

s
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  
    }
});

const upload = multer({ storage });


router.post('/add-recipe', upload.single('recipe_image'), async (req, res) => {
    const { recipeName, recipeOwner, ingredients, instructions } = req.body;

   
    console.log('Form Data:', req.body);
    console.log('Uploaded File:', req.file);

    const recipeData = {
        recipeName,
        recipeOwner,
        ingredients: ingredients.split(','),  
        instructions,
        image_path: req.file ? req.file.path : null  
    };

    try {
       
        const newRecipe = new Recipe(recipeData);
        await newRecipe.save();
        res.status(201).send('Recipe saved successfully!');
    } catch (error) {
        res.status(400).send('Error saving recipe: ' + error.message);
    }
});

module.exports = router;