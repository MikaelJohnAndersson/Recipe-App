import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http:HttpClient) { }

  getRecipes(path : string){
    return this.http.get('http://localhost:3000/api' + path);
  }
}
