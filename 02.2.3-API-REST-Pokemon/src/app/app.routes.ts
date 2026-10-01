import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail.component';
export const routes: Routes = [
 { path: '', component: CategoriesComponent },
 { path: 'categoria/:type', component: PokemonListComponent },
 { path: 'pokemon/:name', component: PokemonDetailComponent },
 { path: '**', redirectTo: '' }
];
