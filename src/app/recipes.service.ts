import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http:HttpClient) { }

  getAllRecipes(){
    return this.http.get('http://localhost:3000/recipes');
  }
}
