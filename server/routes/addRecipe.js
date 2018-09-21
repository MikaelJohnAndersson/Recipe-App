const express = require('express'); 
const router = express.Router(); 
const mongojs = require('mongojs');
var db = mongojs("mongodb://localhost:27017/recipedb", ["recipes", "nutrients"]);

router.post('/', function(req, res){
    //Saving recipe to db
    db.recipes.save(req.body);
    res.json(req.body);
}); 

module.exports = router;