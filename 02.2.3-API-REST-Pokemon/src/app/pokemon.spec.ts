import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { CategoriesComponent } from './categories.component';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
describe('Navigazione Pokédex', () => {
 let http: HttpTestingController;
 beforeEach(() => { TestBed.configureTestingModule({ providers: [provideRouter(routes), provideHttpClient(), provideHttpClientTesting()] }); http = TestBed.inject(HttpTestingController); });
 afterEach(() => http.verify());
 it('mostra tre categorie, elenco e dettagli attraverso le rotte', async () => {
  const harness = await RouterTestingHarness.create();
  const categories = await harness.navigateByUrl('/', CategoriesComponent);
  http.expectOne('https://pokeapi.co/api/v2/type').flush({ results: ['normal','fire','water','grass'].map(name => ({ name, url: 'url' })) });
  harness.detectChanges(); expect(categories.types().map(type => type.name)).toEqual(['fire','water','grass']);
  expect(harness.routeNativeElement?.querySelectorAll('.card').length).toBe(3);
  const list = await harness.navigateByUrl('/categoria/fire', PokemonListComponent);
  http.expectOne('https://pokeapi.co/api/v2/type/fire/').flush({ id: 10, name: 'fire', pokemon: [{ slot: 1, pokemon: { name: 'charmander', url: 'url' } }] });
  harness.detectChanges(); expect(list.data()?.pokemon.length).toBe(1);
  expect(harness.routeNativeElement?.querySelector('a.card')?.getAttribute('href')).toBe('/pokemon/charmander?tipo=fire');
  const detail = await harness.navigateByUrl('/pokemon/charmander?tipo=fire', PokemonDetailComponent);
  http.expectOne('https://pokeapi.co/api/v2/pokemon/charmander/').flush({ id: 4, name: 'charmander', height: 6, weight: 85, base_experience: 62, sprites: { front_default: null }, types: [], abilities: [], stats: [] });
  harness.detectChanges(); expect(detail.backLink).toEqual(['/categoria','fire']);
  expect(harness.routeNativeElement?.textContent).toContain('0.6 m');
  expect(harness.routeNativeElement?.textContent).toContain('8.5 kg');
 });
 it('ricarica la stessa pagina al cambio di categoria e gestisce 404', async () => {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl('/categoria/fire', PokemonListComponent);
  http.expectOne('https://pokeapi.co/api/v2/type/fire/').flush({ pokemon: [] });
  const list = await harness.navigateByUrl('/categoria/unknown', PokemonListComponent);
  http.expectOne('https://pokeapi.co/api/v2/type/unknown/').flush('Missing', { status: 404, statusText: 'Not found' });
  harness.detectChanges(); expect(list.loading()).toBe(false); expect(list.data()).toBeNull(); expect(list.error()).not.toBe('');
 });
});
