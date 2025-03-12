import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon-list',
    pathMatch: 'full',
  },
  {
    path: 'pokemon-list',
    loadComponent: () =>
      import('./pages/pokemon-list/pokemon-list.component').then(
        (m) => m.PokemonListComponent
      ),
  },
  {
    path: 'search-pokemon',
    loadComponent: () =>
      import('./pages/pokemon-search/pokemon-search.component').then(
        (m) => m.PokemonSearchComponent
      ),
  },
];
