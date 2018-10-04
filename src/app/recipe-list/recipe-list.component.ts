import { Component, OnInit, Inject } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router'; 
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css', '../../../node_modules/ng-masonry-grid/ng-masonry-grid.css']
})
export class RecipeListComponent implements OnInit {

  public recipes;
  public categories;
  public addedCategories;
  public href : string; 
  
  private search_form: FormGroup = this.fb.group({search_term : ['']});
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  private selectedNumberOfPortions;

  constructor(private recipesService: RecipesService, private router : Router, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    this.addedCategories = [];
    this.selectedNumberOfPortions = [];
    //Passing in the component path to the service
    //After getting recipes, populating component $recipes and setting corresponding 
    //select value for number of servings. This value changes as the user changes the servings-values
    this.recipesService.getRecipes(this.search_form.get('search_term').value, this.addedCategories).subscribe(
      data => {
        this.recipes = data;
        for(let i = 0; i < this.recipes.length; i++){
          this.selectedNumberOfPortions[i] = this.getRecipeServings(this.recipes[i]);
        }
      }
      );
    };

  onSubmit(){
      this.recipesService.getRecipes(this.search_form.get('search_term').value, this.addedCategories).subscribe(
        data => {
          this.recipes = data;
        });
      };

    //Returning servings for given recipe
    getRecipeServings(recipe: any){
      return this.recipes.filter(obj => {return obj == recipe})[0].servings;
    }
    getCategories(){
      this.recipesService.getCategories().subscribe(
        data =>{
          this.categories = data;
        }
      );
    }
    addCategory(category: string){
      this.addedCategories.push(category);
      this.onSubmit();
    }
    removeAddedCategory(category: string){
      let index = this.addedCategories.indexOf(category);
      this.addedCategories.splice(index, 1);
      this.onSubmit();
    }

    openDialog(recipe: any): void {
      const dialogRef = this.dialog.open(RecipeListDialogComponent, {
        data: recipe
      });
    }
  
}

@Component({
  selector: 'recipe-list-dialog',
  templateUrl: './recipe-list-dialog.component.html',
})
export class RecipeListDialogComponent {

  constructor(public dialogRef: MatDialogRef<RecipeListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public recipe: any) {}

    totalAmountPerPortion(field: string){
      let total = 0;
          //Given the provided field, sums the field values for all the ingredients. 
          //Then, divide by 100 to get the value for the nutrient field per one gr. (As the nutrient values are per 100gr)
          //Then, multiplies this value with the recipe ingredient amount equivalent in gr. 
          //Then, dividing with the recipe no. of servings to get the correct value per portion
          for (let i = 0; i < this.recipe.ingredients.length; i++){
            total += (parseFloat(this.recipe.ingredients[i]["nutrient_data"][field]) / 100) * (parseFloat(this.recipe.ingredients[i].eq_grams) / parseFloat(this.recipe.servings));
          }
          //Rounding total to one decimal if more than 1
          if(total < 1)
          return total;
          else
          return Number((total).toFixed(1)); 
      }

    onOkClick(): void {
      this.dialogRef.close();
    }
}


