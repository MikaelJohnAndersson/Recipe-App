import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteIngredientNameService {

  constructor(private http: HttpClient) { }

  autoCompleteIngredientName(startOfName : string){
    return this.http.get('http://localhost:3000/autocomplete-ingredient-name/' + startOfName);
  }
}
