import { Component, OnInit } from '@angular/core';
import { AutocompleteIngredientNameService } from '../autocomplete-ingredient-name.service';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';

@Component({
  selector: 'app-new-recipe-form',
  templateUrl: './new-recipe-form.component.html',
  styleUrls: ['./new-recipe-form.component.css']
})
export class NewRecipeFormComponent implements OnInit {

  public ingredientAutoCompleteValues;
  private add_recipe_form: FormGroup; 

  constructor(private autocompleteIngredientNameService: AutocompleteIngredientNameService, private fb: FormBuilder) { }

  ngOnInit() {

    //Resetting FormGroup on init
    this.add_recipe_form = this.fb.group({
      recipe_name: [''],
      recipe_desc: [''],
      recipe_servings: [''],
      ingredients: this.fb.array([
        this.fb.group({
          ingredient_name: [''],
          ingredient_units: [''],
          ingredient_msr_unit: [''], 
          ingredient_eq_grams: ['']
        })
      ])
    });
  }
  
  onIngredientInputEvent(event: any) { 
    this.autocompleteIngredientNameService.autoCompleteIngredientName(event.target.value).subscribe(
      data => {this.ingredientAutoCompleteValues = data;}
    );
  }

  get aliases() {
    return this.add_recipe_form.get('ingredients') as FormArray;
  }

  //Pushing new group of ingredient form controls on add ingredient
  addIngredient() {
    this.aliases.push(this.fb.group({
      ingredient_name: [''],
      ingredient_units: [''],
      ingredient_msr_unit: [''], 
      ingredient_eq_grams: ['']
    }));
  }

}
