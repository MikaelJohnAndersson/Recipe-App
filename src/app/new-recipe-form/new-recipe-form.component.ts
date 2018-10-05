import {Component,OnInit,ViewChild} from '@angular/core';
import {IngredientService} from '../ingredient.service';
import {FormBuilder,FormGroup,Validators, FormControl} from '@angular/forms';
import {RecipesService} from '../recipes.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material';
import {MatTable} from '@angular/material';

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
  public validIngredients;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild(MatTable) table: MatTable < any > ;

  validation_messages = {
    recipe_name: [
      {type :"required", message: "Receptnamn måste anges!"},
      {type :"minlength", message: "Receptnamn måste vara minst 3 bokstäver!"},
      {type :"maxlength", message: "Receptnamn får vara max 25 bokstäver!"}
    ], 
    recipe_servings: [
      {type: "required", message: "Antal portioner måste anges!"}
    ], 
    ingredient_name: [
      {type :"required", message: "Ingrediensnamn måste anges!"},
      {type: "inValidIngredient", message: "Ingrediensen finns inte!"}
    ], 
    recipe_instr:[
      {type:"required", message:"Instruktioner måste anges!"}
    ]
  };

  constructor(private ingredientService: IngredientService, private fb: FormBuilder, private recipesService: RecipesService, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.add_recipe_form = this.fb.group({
      recipe_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      recipe_desc: [''],
      add_category: [''],
      recipe_servings: ['', Validators.required],
      ingredients: this.fb.group({
        name: ['',Validators.compose([this.inValidIngredient.bind(this), Validators.required])],
        units: ['', Validators.required],
        msr_unit: ['', Validators.required],
        eq_grams: ['', Validators.required]
      }),
      recipe_instr: ['', Validators.required],
      img_url: ['']
    });

    this.categories = [];
    this.addedIngredients = [];
    this.columnsToDisplay = ['name', 'units', 'msr_unit', 'eq_grams']; 
    this.getValidIngredients();
  }

  get form(){return this.add_recipe_form;}
  get ingredients(){return this.add_recipe_form.get('ingredients');}
  get recipe_servings(){return this.add_recipe_form.get('recipe_servings');}
  get ingredient_name(){return this.add_recipe_form.get('ingredients').get('name');}
  get recipe_instr(){return this.add_recipe_form.get('recipe_instr');}

  get recipe_name(){
    return this.add_recipe_form.get('recipe_name');
  }

  onIngredientInputEvent(event: any) {
    if(event.target.value){
    this.ingredientService.autoCompleteIngredientName(event.target.value).subscribe(
      data => {
        this.ingredientAutoCompleteValues = data;
      });
    }
  }

  //Pushing new group of ingredient form controls on add ingredient
  addIngredient() {
    this.addedIngredients.push(this.getValue("ingredients"));
    this.add_recipe_form.get('ingredients').reset();
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

  getValidIngredients(){
    this.ingredientService.getAllIngredientNames().subscribe(data =>{
      this.validIngredients = data;
    });
  }

  inValidIngredient(fc: FormControl){
    if(fc.touched && fc.value){
        if(!this.validIngredients.includes(fc.value))
        return ({inValidIngredient: true});
    }
    return (null);
  }
}
