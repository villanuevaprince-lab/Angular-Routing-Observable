# Risposte alle domande sulle chiamate HTTP

1. **Cosa serve per usare HTTP?** Importare `HttpClient` da `@angular/common/http` e registrare `provideHttpClient()` nei provider di `app.config.ts`. Nei progetti standalone è questa la configurazione usata.
2. **Attributi di Foo.** `data` conserva il JSON ricevuto; `loading` indica una richiesta in corso; `o` contiene l’`Observable<Post>` restituito da HttpClient, al quale ci si sottoscrive per ricevere la risposta.
3. **Importazione e dependency injection.** `import { HttpClient } from '@angular/common/http';` rende disponibile il tipo. `constructor(public http: HttpClient) {}` chiede ad Angular l’istanza configurata tramite i provider. Si invoca poi `this.http.get<Post>(url)` o `this.http.post<Post>(url, dati, opzioni)`.
4. **Due costruttori.** `constructor(public http: HttpClient) {}` dichiara e inizializza automaticamente la proprietà pubblica `http`. La versione estesa dichiara prima `http: HttpClient;` e poi assegna il parametro con `this.http = http;`. I due esempi hanno lo stesso effetto e sono alternative: non vanno scritti entrambi nella stessa classe.
5. **Observable di una GET.** `this.o = this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1');`. L’Observable è lazy: la richiesta parte quando viene eseguita la sottoscrizione.
6. **Sottoscrizione.** `this.o.subscribe(this.getData);` passa un metodo che RxJS chiama con i dati ricevuti. Nel progetto si usa `subscribe({ next: this.getData, error: this.handleError })` per gestire anche gli errori e `takeUntilDestroyed` per annullare la richiesta quando il componente viene distrutto.
7. **Commento riga per riga del metodo originale:**
```typescript
getData = (d: Object) => // Attributo che contiene una arrow function: d è la risposta e this rimane il componente.
{ // Inizio del corpo della funzione.
  this.data = new Object(d); // Assegna a data l'oggetto ricevuto; non realizza una copia profonda.
  this.loading = false; // La risposta è arrivata: termina l'indicatore di caricamento.
} // Fine del corpo della funzione.
```
Nel progetto si usa il modello `Post` e l’assegnazione diretta `this.data = d`, senza il wrapper `new Object`.
8. **Template.** `(click)="makeRequest()"` richiama il metodo al clic sul pulsante. `*ngIf="loading"` mostra il div soltanto quando loading è true; la consegna usa anche la forma moderna `@if (loading) { ... }`, adottata nel progetto. `<pre>{{ data | json }}</pre>` formatta il risultato come JSON, conservando spazi e righe. `CommonModule` rende disponibile la pipe `json`.
9. **POST e risposta.** `http.post<Post>(url, dati, opzioni)` restituisce un Observable; la sottoscrizione avvia l’invio. Qui `dati` contiene `JSON.stringify({ body: 'bar', title: 'foo', userId: 1 })` e si specifica l’header `Content-Type: application/json`. JSONPlaceholder restituisce i campi inviati e un nuovo id, normalmente 101. È un servizio di prova: il record non viene persistito. La risposta di una POST reale dipende dal contratto dell’API.
