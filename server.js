
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
const app = express();
app.use(cors())

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const recipes = require('./server/routes/recipes');
app.use('/recipes', recipes);
const autocompleteIngredientName = require('./server/routes/autocomplete-Ingredient-Name');
app.use('/autocomplete-ingredient-name', autocompleteIngredientName);
const addRecipe = require('./server/routes/addRecipe');
app.use('/addRecipe', addRecipe);

app.get('*', (req,res) => {res.sendFile(path.join(__dirname, 'dist/index.html'))});

app.listen(port, () => console.log(`RUNNING ON PORT: ${port}`));