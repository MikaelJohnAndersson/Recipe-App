const express = require('express'); 
const router = express.Router(); 
const mongojs = require('mongojs');
var db = mongojs("mongodb://localhost:27017/recipedb", ["recipes", "nutrients"]);


router.get("/all", function(req, res){
    db.nutrients.find(function(err, nutrients){
        let names = nutrients.map(ingr => ingr.Namn);
        res.json(names);
    });
});

router.post('/nutrients', function(req, res){
    let ingredients = req.body;
    let names = ingredients.map(ingredient => ingredient.name);

    if(names){
    let names = ingredients.map(ingredient => ingredient.name);
    db.nutrients.find({Namn: {$in: names}}, function(err, nutrients){
        if (err) throw err;
        
        for (let i = 0; i < ingredients.length; i++){
            let nutrientData = nutrients[i].Naringsvarden.Naringsvarde;
            
            let nutrientDataRes = {
                en_kcal: nutrientData.filter(obj => {return obj.Namn == "Energi (kcal)"})[0].Varde,
                protein: nutrientData.filter(obj => {return obj.Namn == "Protein"})[0].Varde,
                carbs: nutrientData.filter(obj => {return obj.Namn == "Kolhydrater"})[0].Varde,
                sat_fat: nutrientData.filter(obj => {return obj.Namn == "Summa mättade fettsyror"})[0].Varde,
                unsat_fat: nutrientData.filter(obj => {return obj.Namn == "Summa enkelomättade fettsyror"})[0].Varde,
                poly_unsat_fat: nutrientData.filter(obj => {return obj.Namn == "Summa fleromättade fettsyror"})[0].Varde,
                salt: nutrientData.filter(obj => {return obj.Namn == "Salt"})[0].Varde
            }

            ingredients[i].nutrient_data = nutrientDataRes; 
        }

        res.json(ingredients);
        });
    }
    //Else returning empty object
    else{
        res.json({});
    }
    });

router.get('/autocomplete/:startOfName', function(req, res){
    let start = req.params.startOfName;
    if(start){
    db.nutrients.find({Namn: {'$regex' : '^' + start, '$options' : 'i'}}, function(err, nutrients){
        if (err) throw err;
        res.json(nutrients);
    });
    }
    else{
        res.json({});
    }
}); 

module.exports = router;