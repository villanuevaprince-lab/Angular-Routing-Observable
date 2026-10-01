import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewPost, Post } from '../models/post';
@Component({ selector: 'app-foo', imports: [CommonModule], templateUrl: './foo.component.html' })
export class FooComponent {
 data: Post | null = null;
 loading = false;
 o!: Observable<Post>;
 error = '';
 private destroyRef = inject(DestroyRef);
 private changeDetector = inject(ChangeDetectorRef);
 constructor(public http: HttpClient) {}
 makeRequest(): void {
  if (this.loading) return;
  this.loading = true; this.error = ''; this.data = null;
  this.o = this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
  this.o.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ next: this.getData, error: this.handleError });
 }
 makeCompactPost(): void {
  if (this.loading) return;
  this.loading = true; this.error = ''; this.data = null;
  const post: NewPost = { body: 'bar', title: 'foo', userId: 1 };
  // La consegna richiede una variabile separata con il JSON serializzato.
  const dati = JSON.stringify(post);
  this.o = this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', dati, {
   headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
  });
  // Nessuna arrow function dentro subscribe: riutilizziamo il metodo getData.
  this.o.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ next: this.getData, error: this.handleError });
 }
 // L'arrow function come attributo mantiene il riferimento a this quando viene chiamata da RxJS.
 getData = (d: Post): void => {
  this.data = d;
  this.loading = false;
  this.changeDetector.markForCheck();
 };
 handleError = (): void => {
  this.error = 'Richiesta fallita. Controlla la connessione e riprova.';
  this.loading = false;
  this.changeDetector.markForCheck();
 };
}
