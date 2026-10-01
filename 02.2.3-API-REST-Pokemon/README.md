# pokemon
Progetto Angular standalone indipendente relativo alla consegna API REST Pokémon.

## Avvio
Richiede Node.js 22.22.3 o successivo compatibile con Angular 22 (qui verificato con Node 24).
```bash
cd 02.2.3-API-REST-Pokemon
npm ci
npm start
```
Aprire http://localhost:4200. Per avviare entrambi, usare `npm start -- --port 4201` nel secondo progetto.

## Verifica
```bash
npm run build
npm test
```
Le chiamate reali richiedono una connessione Internet; i test HTTP usano risposte simulate.

## Requisiti realizzati
- `/`: richiesta GET all'elenco tipi e selezione di `fire`, `water`, `grass`.
- `/categoria/:type`: richiesta GET del tipo selezionato e lista completa dei suoi Pokémon, incluse le forme restituite dall'API.
- `/pokemon/:name`: dettagli del Pokémon con immagine (se disponibile), id, altezza in metri, peso in kg, tipi, abilità e statistiche.
- Collegamenti Angular `routerLink` e ritorno alla categoria tramite parametro di query `tipo`.
- Modelli tipizzati in `src/app/models/pokemon.ts`, servizio HTTP dedicato e indicatori di caricamento/errore.
- Test di navigazione categorie → lista → dettagli e cambio del parametro di rotta con errore 404.

La consegna contiene esempi di nomi e URL dei tipi non coerenti: il progetto usa sempre il nome effettivo restituito da PokeAPI.
