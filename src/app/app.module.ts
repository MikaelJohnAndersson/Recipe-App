import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RecipesService } from './recipes.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { NewRecipeFormComponent } from './new-recipe-form/new-recipe-form.component';
import {RouterModule, Routes} from "@angular/router";
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatAutocompleteModule } from '@angular/material';



const appRoutes: Routes = [
  { path: 'recipeList', component: RecipeListComponent, data: { title: 'Recipe Component' }},
  { path: '', component: RecipeListComponent, data: { title: 'Recipe Component' } }, 
  { path: 'addRecipe', component: NewRecipeFormComponent, data: { title: 'Add recipe Component' } }, 
  ];


@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    NewRecipeFormComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
