import { Routes } from '@angular/router';
import { AnimalComponent } from './animal-component/animal-component';
import { FruitsComponent } from './fruits-component/fruits-component';

export const routes: Routes = [
    { path: '', redirectTo: '/animals', pathMatch: 'full' },
    { path: 'animals', component: AnimalComponent},
    { path: 'fruits', component: FruitsComponent}
];
