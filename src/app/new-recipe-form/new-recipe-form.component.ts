import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  IngredientService
} from '../ingredient.service';
import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';
import {
  RecipesService
} from '../recipes.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  MatChipInputEvent
} from '@angular/material';
import {
  MatTable
} from '@angular/material';

@Component({
  selector: 'app-new-recipe-form',
  templateUrl: './new-recipe-form.component.html',
  styleUrls: ['./new-recipe-form.component.css']
})
export class NewRecipeFormComponent implements OnInit {

  public ingredientAutoCompleteValues;
  private add_recipe_form: FormGroup;
  private categories;
  public addedIngredients;
  public columnsToDisplay;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild(MatTable) table: MatTable < any > ;

  constructor(private ingredientService: IngredientService, private fb: FormBuilder, private recipesService: RecipesService, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.add_recipe_form = this.fb.group({
      recipe_name: [''],
      recipe_desc: [''],
      add_category: [''],
      recipe_servings: [''],
      ingredients: this.fb.group({
        name: [''],
        units: [''],
        msr_unit: [''],
        eq_grams: ['']
      }),
      recipe_instr: [''],
      img_url: ['']
    });

    this.categories = [];
    this.addedIngredients = [];
    this.columnsToDisplay = ['name', 'units', 'msr_unit', 'eq_grams']
  }

  onIngredientInputEvent(event: any) {
    this.ingredientService.autoCompleteIngredientName(event.target.value).subscribe(
      data => {
        this.ingredientAutoCompleteValues = data;
      }
    );
  }

  //Pushing new group of ingredient form controls on add ingredient
  addIngredient() {
    this.addedIngredients.push(this.getValue("ingredients"));
    this.table.renderRows();
  }
  removeIngredient(ingredient: any) {
    let index = this.addedIngredients.indexOf(ingredient);
    this.addedIngredients.splice(index, 1);
    this.table.renderRows();
  }

  addCategory(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our category
    if ((value || '').trim()) {
      let cat = value.trim();
      //Capitalizing string and pushing to categories
      this.categories.push(cat[0].toUpperCase() + cat.slice(1));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removeCategory(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  onSubmit() {

    let newRecipe = {
      name: this.getValue("recipe_name"),
      desc: this.getValue("recipe_desc"),
      categories: this.categories,
      servings: this.getValue("recipe_servings"),
      ingredients: this.addedIngredients,
      instructions: this.getValue("recipe_instr"),
      imgUrl: this.getValue("img_url") ? this.getValue("img_url") : "N/A"
    }

    this.ingredientService.getNutrients(newRecipe.ingredients).subscribe(ingredientsWithNutrients => {
      newRecipe.ingredients = ingredientsWithNutrients;
      this.recipesService.addRecipe(newRecipe).subscribe(data => this.snackBar.open("Recipe added!"));
      this.resetForm();
    });
  }

  getValue(field: string) {
    return this.add_recipe_form.get(field).value;
  }

  resetForm() {
    this.add_recipe_form.reset();
    this.categories = [];
    this.addedIngredients = [];
    this.table.renderRows();
  }

}