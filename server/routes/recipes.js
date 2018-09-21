const express = require('express'); 
const router = express.Router(); 
const mongojs = require('mongojs');
var db = mongojs("mongodb://localhost:27017/recipedb", ["recipes", "nutrients"]);

router.get('/', function(req, res){

    //Returning search result if request is a search
    if(req.query.search_term){
        let search = req.query.search_term;
        db.recipes.find({name: {"$regex" : "" + search.name}},function(err, recipes){
            if (err) throw err;
            console.log(recipes);
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

//TODO: Set up search based on text index
router.get('/', function(req, res){
    
}); 

module.exports = router;