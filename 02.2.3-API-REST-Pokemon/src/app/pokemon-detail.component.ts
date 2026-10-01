import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './models/pokemon';
@Component({ selector: 'app-pokemon-detail', imports: [RouterLink], template: `
<a [routerLink]="backLink">← Torna alla lista</a>
@if (loading()) { <p role="status">Caricamento dettagli…</p> }
@if (error()) { <p role="alert">{{ error() }}</p> }
@if (data(); as pokemon) {
<h2>{{ pokemon.name }} · #{{ pokemon.id }}</h2>
@if (pokemon.sprites.front_default; as sprite) { <img [src]="sprite" [alt]="pokemon.name" width="180" height="180"> }
<p>Altezza: {{ pokemon.height / 10 }} m · Peso: {{ pokemon.weight / 10 }} kg</p>
<p>Esperienza base: {{ pokemon.base_experience ?? 'Non disponibile' }}</p>
<h3>Tipi</h3><ul>@for (entry of pokemon.types; track entry.slot) { <li><a [routerLink]="['/categoria', entry.type.name]">{{ entry.type.name }}</a></li> }</ul>
<h3>Abilità</h3><ul>@for (entry of pokemon.abilities; track entry.ability.name) { <li>{{ entry.ability.name }} {{ entry.is_hidden ? '(nascosta)' : '' }}</li> }</ul>
<h3>Statistiche</h3><ul>@for (entry of pokemon.stats; track entry.stat.name) { <li>{{ entry.stat.name }}: {{ entry.base_stat }}</li> }</ul>
}` })
export class PokemonDetailComponent {
 private api = inject(PokemonService); private route = inject(ActivatedRoute);
 data = signal<Pokemon | null>(null); loading = signal(true); error = signal('');
 get backLink(): string[] { const type = this.route.snapshot.queryParamMap.get('tipo'); return type ? ['/categoria', type] : ['/']; }
 constructor() {
  this.route.paramMap.pipe(tap(() => { this.loading.set(true); this.error.set(''); this.data.set(null); }),
   switchMap(params => this.api.getPokemon(params.get('name') ?? '').pipe(catchError(() => { this.error.set('Pokémon non trovato o servizio non disponibile.'); return of(null); }))),
   takeUntilDestroyed(inject(DestroyRef))).subscribe(this.getData);
 }
 getData = (data: Pokemon | null): void => { this.data.set(data); this.loading.set(false); };
}
