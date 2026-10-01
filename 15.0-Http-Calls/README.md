# http-calls
Progetto Angular standalone indipendente relativo alla consegna Chiamate HTTP.

## Avvio
Richiede Node.js 22.22.3 o successivo compatibile con Angular 22 (qui verificato con Node 24).
```bash
cd 15.0-Http-Calls
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
- `FooComponent` con attributi `data`, `loading`, `o` e HttpClient nel costruttore.
- Pulsanti `Make Request` (GET `/posts/1`) e `MakePost` (POST `/posts`).
- Variabile locale `dati` con `JSON.stringify`, header JSON esplicito e metodo `getData` passato a `subscribe`.
- `CommonModule`, `@if`, pipe `json`, messaggi di errore e annullamento al destroy.
- Risposte a tutte le domande in [RISPOSTE.md](RISPOSTE.md).
- Test GET, POST (payload e header) ed errore con successivo nuovo tentativo.
