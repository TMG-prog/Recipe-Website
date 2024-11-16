const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Sync Sequelize with the database
sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', recipeRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});