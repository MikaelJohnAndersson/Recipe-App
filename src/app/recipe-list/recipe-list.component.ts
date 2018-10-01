import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router'; 
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes;
  public href : string; 
  private search_form: FormGroup = this.fb.group({search_term : ['']});

  private selectedNumberOfPortions;

  constructor(private recipesService: RecipesService, private router : Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.selectedNumberOfPortions = [];
    //Passing in the component path to the service
    //After getting recipes, populating component $recipes and setting corresponding 
    //select value for number of servings. This value changes as the user changes the servings-values
    this.recipesService.getRecipes(this.router.url).subscribe(
      data => {
        this.recipes = data;
        for(let i = 0; i < this.recipes.length; i++){
          this.selectedNumberOfPortions[i] = this.getRecipeServings(this.recipes[i]);
        }
      }
      );
    };

  onSubmit(){
      this.recipesService.getRecipes(this.router.url + "?search_term=" + this.search_form.get('search_term').value).subscribe(
        data => {
          this.recipes = data;
        });
      };

  totalAmountPerPortion(field: string, recipe: any){
    let total = 0;
        //Given the provided field, sums the field values for all the ingredients. 
        //Then, divide by 100 to get the value for the nutrient field per one gr. (As the nutrient values are per 100gr)
        //Then, multiplies this value with the recipe ingredient amount equivalent in gr. 
        //Then, dividing with the recipe no. of servings to get the correct value per portion
        for (let i = 0; i < recipe.ingredients.length; i++){
          total += (parseFloat(recipe.ingredients[i]["nutrient_data"][field]) / 100) * (parseFloat(recipe.ingredients[i].eq_grams) / parseFloat(recipe.servings));
        }
        //Rounding total to one decimal if more than 1
        if(total < 1)
        return total;
        else
        return Number((total).toFixed(1)); 
    }
    //Returning servings for given recipe
    getRecipeServings(recipe: any){
      return this.recipes.filter(obj => {return obj == recipe})[0].servings;
    }
  
}


