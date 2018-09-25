
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

const BASE_URL = "/api"

const recipes = require('./server/routes/recipes');
app.use( BASE_URL + '/recipes', recipes);
const ingredients = require('./server/routes/ingredients');
app.use(BASE_URL + '/ingredients', ingredients);
const addRecipe = require('./server/routes/addRecipe');
app.use(BASE_URL + '/addRecipe', addRecipe);

app.get('*', (req,res) => {res.sendFile(path.join(__dirname, 'dist/index.html'))});

app.listen(port, () => console.log(`RUNNING ON PORT: ${port}`));