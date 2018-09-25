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

  constructor(private recipesService: RecipesService, private router : Router, private fb: FormBuilder) { }

  ngOnInit() {
    //Passing in the component path to the service
    this.recipesService.getRecipes(this.router.url).subscribe(
      data => {this.recipes = data}
      );
    };

  onSubmit(){
      this.recipesService.getRecipes(this.router.url + "?search_term=" + this.search_form.get('search_term').value).subscribe(
        data => {this.recipes = data});
      };
  
}


