import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, PokemonType, ResourceList } from './models/pokemon';
@Injectable({ providedIn: 'root' })
export class PokemonService {
 private http = inject(HttpClient);
 private base = 'https://pokeapi.co/api/v2';
 getTypes(): Observable<ResourceList> { return this.http.get<ResourceList>(`${this.base}/type`); }
 getType(name: string): Observable<PokemonType> { return this.http.get<PokemonType>(`${this.base}/type/${encodeURIComponent(name)}/`); }
 getPokemon(name: string): Observable<Pokemon> { return this.http.get<Pokemon>(`${this.base}/pokemon/${encodeURIComponent(name)}/`); }
}
