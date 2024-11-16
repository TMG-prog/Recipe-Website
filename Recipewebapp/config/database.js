require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3000,
        dialect: 'mysql'
    }
);
console.log('Database name:', process.env.DB_NAME);
console.log('Database user:', process.env.DB_USER);
console.log('Database password:', process.env.DB_PASSWORD);
console.log('Database host:', process.env.DB_HOST);
console.log('Database port:', process.env.DB_PORT);
module.exports = sequelize;