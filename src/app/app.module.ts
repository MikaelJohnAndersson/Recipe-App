import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RecipesService } from './recipes.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeListDialogComponent } from './recipe-list/recipe-list.component';
import { NewRecipeFormComponent } from './new-recipe-form/new-recipe-form.component';
import {RouterModule, Routes} from "@angular/router";
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatAutocompleteModule, MatCardModule, MatChipsModule,MatMenuModule, MatTooltipModule, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { NgxMasonryModule } from 'ngx-masonry';


//TODO: Set up starting route/homepage properly
const appRoutes: Routes = [
  { path: '', component: RecipeListComponent, data: { title: 'Recipe Component' }}, 
  { path: 'addRecipe', component: NewRecipeFormComponent, data: { title: 'Add recipe Component' } }, 
  ];


@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    NewRecipeFormComponent,
    RecipeListDialogComponent
  ],
  entryComponents: [
    RecipeListDialogComponent
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
    MatAutocompleteModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatChipsModule, 
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    NgxMasonryModule
  ],
  providers: [RecipesService, 
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
