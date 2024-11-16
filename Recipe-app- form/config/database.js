const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('recipes', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = sequelize;