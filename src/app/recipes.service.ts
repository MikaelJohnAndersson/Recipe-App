import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http:HttpClient) { }

  getRecipes(search: string, categories: any): Observable<any>{
    //If no search term or categories are provided, get all recipes
    if(!search && categories.length == 0)
    return this.http.get('http://localhost:3000/api/recipes');
    else if (categories.length == 0)
    //If no categories are provided, send search term as query param
    return this.http.get('http://localhost:3000/api/recipes?search_term=' + search);
    //Else make post req with search term query and categories posted in body
    else
    return this.http.post<any>('http://localhost:3000/api/recipes?search_term=' + search, categories, {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    });
  }
  addRecipe(data: any): Observable <any>{
    return this.http.post<any>('http://localhost:3000/api/addRecipe', data, {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    });
  }
  getCategories(){
    return this.http.get('http://localhost:3000/api/recipes/categories');
  }
}
