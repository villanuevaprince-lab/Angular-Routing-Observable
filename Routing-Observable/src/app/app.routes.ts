import { Routes } from '@angular/router';
import { AnimalComponent } from './animal-component/animal-component';
import { FruitsComponent } from './fruits-component/fruits-component';
import { Generic as GenericComponent } from './generic/generic';

export const routes: Routes = [
    { path: '', redirectTo: '/animals', pathMatch: 'full' },
    { path: 'animals', component: AnimalComponent},
    { path: 'fruits', component: FruitsComponent},
    { path: 'generic/:id', component: GenericComponent }
];
