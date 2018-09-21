import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes;
  public href : string; 

  constructor(private recipesService: RecipesService, private router : Router) { }

  ngOnInit() {
    //Passing in the component path to the service
    this.recipesService.getRecipes(this.router.url).subscribe(
      data => {this.recipes = data}, 
      err => console.log(err), 
      () => console.log("Done loading recipes"));
    };
    
}


