const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const sequelize = require('./config/database');  
const Recipe = require('./models/Recipe');      
const recipeRoutes = require('./routes/displayroutes');
const cors = require('cors');
const app = express();  
app.use(cors());

sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables dropped and recreated!');
    })
    .catch((err) => {
        console.error('Error during database sync:', err);
    });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  


app.use('/api', recipeRoutes);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'recipeForm.html'));
});

const storage = multer.diskStorage({
    destination: './uploads/', 
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

app.post('/new-recipe', upload.single('recipe_image'), async (req, res) => {
    const { recipe_name, recipe_owner, description, ingredients, tags, instructions } = req.body;
    const recipeImage = req.file ? '/uploads/' + req.file.filename : null;

    try {
        
        const newRecipe = await Recipe.create({
            recipe_name,
            recipe_owner,
            description,
            ingredients,
            tags,
            image_path: recipeImage, 
            instructions,
        });
        
        console.log("New Recipe Submitted:", {
            recipe_name, recipe_owner, description, ingredients, tags, instructions, recipeImage
        });

        res.send('Recipe submitted successfully!');
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).send('Failed to submit recipe.');
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});



const PORT = process.env.PORT || 3001;
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error synchronizing database:', err);
    });