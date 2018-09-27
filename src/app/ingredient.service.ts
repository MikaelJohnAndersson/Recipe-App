import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  autoCompleteIngredientName(startOfName : string){
    return this.http.get('http://localhost:3000/api/ingredients/autocomplete/' + startOfName);
  }

  getNutrients(ingredients : any): Observable <any>{
    return this.http.post<any>('http://localhost:3000/api/ingredients/nutrients', ingredients, {headers: new HttpHeaders({'Content-Type':  'application/json'})});
  }
}