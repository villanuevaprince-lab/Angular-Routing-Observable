import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonService } from './pokemon.service';
import { NamedResource, ResourceList } from './models/pokemon';
@Component({ selector: 'app-categories', imports: [RouterLink], template: `
<h2>Scegli un tipo di Pokémon</h2>
<p>Esplora tre categorie: fuoco, acqua ed erba.</p>
@if (loading()) { <p role="status">Caricamento categorie…</p> }
@if (error()) { <p role="alert">{{ error() }}</p><button (click)="load()">Riprova</button> }
<div class="grid">@for (type of types(); track type.name) { <a class="card" [routerLink]="['/categoria', type.name]">{{ type.name }}</a> }</div>` })
export class CategoriesComponent {
 private api = inject(PokemonService);
 private destroyRef = inject(DestroyRef);
 types = signal<NamedResource[]>([]); loading = signal(false); error = signal('');
 constructor() { this.load(); }
 load(): void {
  this.loading.set(true); this.error.set('');
  this.api.getTypes().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ next: this.getData, error: this.handleError });
 }
 getData = (data: ResourceList): void => { this.types.set(data.results.filter(type => ['fire', 'water', 'grass'].includes(type.name))); this.loading.set(false); };
 handleError = (): void => { this.error.set('Impossibile caricare le categorie. Controlla la connessione.'); this.loading.set(false); };
}
