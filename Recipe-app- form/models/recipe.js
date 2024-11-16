const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recipe = sequelize.define('Recipe', {
    recipe_name: { type: DataTypes.STRING, allowNull: false },
    recipe_owner: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    ingredients: { type: DataTypes.TEXT, allowNull: false },
    tags: { type: DataTypes.STRING },
    image_path: { type: DataTypes.STRING },
    instructions: { type: DataTypes.TEXT },

});

module.exports = Recipe;