import { Component, OnInit } from '@angular/core';
import { AutocompleteIngredientNameService } from '../autocomplete-ingredient-name.service';

@Component({
  selector: 'app-new-recipe-form',
  templateUrl: './new-recipe-form.component.html',
  styleUrls: ['./new-recipe-form.component.css']
})
export class NewRecipeFormComponent implements OnInit {

  public autoCompleteValues;
  constructor(private autocompleteIngredientNameService: AutocompleteIngredientNameService) { }

  ngOnInit() {

  }

  onKey(event: any) { 
    this.autocompleteIngredientNameService.autoCompleteIngredientName(event.target.value).subscribe(
      data => {this.autoCompleteValues = data;}
    );
  }

}
