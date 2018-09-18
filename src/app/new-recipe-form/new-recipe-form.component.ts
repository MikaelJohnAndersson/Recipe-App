import { Component, OnInit } from '@angular/core';
import { AutocompleteIngredientNameService } from '../autocomplete-ingredient-name.service';

@Component({
  selector: 'app-new-recipe-form',
  templateUrl: './new-recipe-form.component.html',
  styleUrls: ['./new-recipe-form.component.css']
})
export class NewRecipeFormComponent implements OnInit {

  public ingredientAutoCompleteValues;
  public ingredientCount;
  constructor(private autocompleteIngredientNameService: AutocompleteIngredientNameService) { }

  ngOnInit() {
    this.ingredientCount = 1;
  }
  
  onIngredientInputEvent(event: any) { 
    this.autocompleteIngredientNameService.autoCompleteIngredientName(event.target.value).subscribe(
      data => {this.ingredientAutoCompleteValues = data;}
    );
  }

  onAddNewIngredient(){
    this.ingredientCount++;
  }

  counter(){
    return new Array(this.ingredientCount);
  }

}
