import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipesService.getAllRecipes().subscribe(
      data => {this.recipes = data; console.log(this.recipes)}, 
      err => console.log(err), 
      () => console.log("Done loading recipes"));
    };
    
}


