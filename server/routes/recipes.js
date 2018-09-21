const express = require('express'); 
const router = express.Router(); 
const mongojs = require('mongojs');
var db = mongojs("mongodb://localhost:27017/recipedb", ["recipes", "nutrients"]);

router.get('/', function(req, res){

    console.log(req.query.search_term);
    //Returning search result if request is a search
    if(req.query.search_term){
        db.recipes.find({name: {"$regex" : req.query.search_term}},function(err, recipes){
            if (err) throw err;
            res.json(recipes);
        });
    }
    //Else returning all
    else{
    db.recipes.find(function(err, recipes){
        if (err) throw err;
        res.json(recipes);
        });
    }
}); 

module.exports = router;