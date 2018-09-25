const express = require('express'); 
const router = express.Router(); 
const mongojs = require('mongojs');
var db = mongojs("mongodb://localhost:27017/recipedb", ["recipes", "nutrients"]);

router.get('/:name', function(req, res){
    let name = req.params.name;
    db.nutrients.find({Namn: name}, function(err, nutrients){
        if (err) throw err;
        let nutrientData = nutrients[0].Naringsvarden.Naringsvarde;
        let nutrientDataRes = {
            en_kcal: nutrientData.filter(obj => {return obj.Namn == "Energi (kcal)"})[0].Varde,
            protein: nutrientData.filter(obj => {return obj.Namn == "Protein"})[0].Varde,
            carbs: nutrientData.filter(obj => {return obj.Namn == "Kolhydrater"})[0].Varde,
            sat_fat: nutrientData.filter(obj => {return obj.Namn == "Summa mättade fettsyror"})[0].Varde,
            unsat_fat: nutrientData.filter(obj => {return obj.Namn == "Summa enkelomättade fettsyror"})[0].Varde,
            poly_unsat_fat: nutrientData.filter(obj => {return obj.Namn == "Summa fleromättade fettsyror"})[0].Varde,
            salt: nutrientData.filter(obj => {return obj.Namn == "Salt"})[0].Varde
        }
        res.json(nutrientDataRes);
    });
}); 

router.get('/autocomplete/:startOfName', function(req, res){
    let start = req.params.startOfName;
    db.nutrients.find({Namn: {'$regex' : '^' + start, '$options' : 'i'}}, function(err, nutrients){
        if (err) throw err;
        res.json(nutrients);
    });
}); 

module.exports = router;