import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { PokemonService } from './pokemon.service';
import { PokemonType } from './models/pokemon';
@Component({ selector: 'app-pokemon-list', imports: [RouterLink], template: `
<h2>Pokémon di tipo {{ type() }}</h2>
@if (loading()) { <p role="status">Caricamento Pokémon…</p> }
@if (error()) { <p role="alert">{{ error() }}</p> }
@if (data(); as category) {
<p>{{ category.pokemon.length }} Pokémon. Seleziona un nome per vedere i dettagli.</p>
<div class="grid">@for (entry of category.pokemon; track entry.pokemon.name) { <a class="card" [routerLink]="['/pokemon', entry.pokemon.name]" [queryParams]="{ tipo: type() }">{{ entry.pokemon.name }}</a> } @empty { <p>Nessun Pokémon in questa categoria.</p> }</div>
}` })
export class PokemonListComponent {
 private api = inject(PokemonService); private route = inject(ActivatedRoute);
 data = signal<PokemonType | null>(null); type = signal(''); loading = signal(true); error = signal('');
 constructor() {
  // switchMap annulla la richiesta precedente quando cambia il parametro della rotta.
  this.route.paramMap.pipe(tap(params => { this.type.set(params.get('type') ?? ''); this.loading.set(true); this.error.set(''); this.data.set(null); }),
   switchMap(params => this.api.getType(params.get('type') ?? '').pipe(catchError(() => { this.error.set('Categoria non trovata o servizio non disponibile.'); return of(null); }))),
   takeUntilDestroyed(inject(DestroyRef))).subscribe(this.getData);
 }
 getData = (data: PokemonType | null): void => { this.data.set(data); this.loading.set(false); };
}
