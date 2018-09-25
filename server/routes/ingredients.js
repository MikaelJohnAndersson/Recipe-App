const express = require('express'); 
const router = express.Router(); 
const mongojs = require('mongojs');
var db = mongojs("mongodb://localhost:27017/recipedb", ["recipes", "nutrients"]);

router.get('/autocomplete/:startOfName', function(req, res){
    let start = req.params.startOfName;
    db.nutrients.find({Namn: {'$regex' : '^' + start, '$options' : 'i'}}, function(err, recipes){
        if (err) throw err;
        res.json(recipes);
    });
}); 

module.exports = router;