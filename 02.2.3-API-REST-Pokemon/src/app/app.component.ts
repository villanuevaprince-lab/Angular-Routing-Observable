import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({ selector: 'app-root', imports: [RouterLink, RouterOutlet], template: `<main><h1>Pokédex</h1><nav><a routerLink="/">Tutte le categorie</a></nav><router-outlet /></main>` })
export class AppComponent {}
