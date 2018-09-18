const express = require('express'); 
const router = express.Router(); 
const mongojs = require('mongojs');
var db = mongojs("mongodb://localhost:27017/recipedb", ["recipes", "nutrients"]);

router.post('/', function(req, res){

    //Getting all ingredients
    //TODO: Implement a better solution for getting ingredient names
    let ingredientsArray = [];
    for(let i = 0; i <= req.body.ingredient_counter; i++){
        ingredientsArray.push(
            {name: req.body["ingredient_name" + i],
            units: req.body["ingredient_units" + i],
            msrUnit: req.body["ingredient_msr_unit" + i],
            mrsUnitEqInGrams: req.body["ingredient_eq_grams" + i]
        });
    }

    let newRecipe = {
        name: req.body.recipe_name, 
        desc: req.body.recipe_desc, 
        servings: req.body.recipe_servings, 
        instructions: req.body.recipe_instr, 
        ingredients: ingredientsArray,
        imgUrl: req.body.img_url
    }
}); 

module.exports = router;