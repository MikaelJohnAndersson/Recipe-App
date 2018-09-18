import { TestBed } from '@angular/core/testing';

import { AutocompleteIngredientNameService } from './autocomplete-ingredient-name.service';

describe('AutocompleteIngredientNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutocompleteIngredientNameService = TestBed.get(AutocompleteIngredientNameService);
    expect(service).toBeTruthy();
  });
});
