import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http:HttpClient) { }

  getRecipes(path : string){
    return this.http.get('http://localhost:3000/api' + path);
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
