
const express = require('express');
const path = require('path');
var cors = require('cors')

var port = process.env.PORT || 3000;
const app = express();
app.use(cors())

const recipes = require('./server/routes/recipes');
app.use('/recipes', recipes);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req,res) => {res.sendFile(path.join(__dirname, 'dist/index.html'))});

app.listen(port, () => console.log(`RUNNING ON PORT: ${port}`));