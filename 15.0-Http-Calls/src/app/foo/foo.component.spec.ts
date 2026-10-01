import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FooComponent } from './foo.component';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
describe('Foo HTTP', () => {
 let http: HttpTestingController;
 beforeEach(() => { TestBed.configureTestingModule({ imports: [FooComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }); http = TestBed.inject(HttpTestingController); });
 afterEach(() => http.verify());
 it('GET mostra JSON e termina il caricamento', async () => {
  const fixture = TestBed.createComponent(FooComponent); fixture.detectChanges();
  fixture.nativeElement.querySelector('button').click();
  expect(fixture.componentInstance.loading).toBe(true);
  const request = http.expectOne('https://jsonplaceholder.typicode.com/posts/1');
  expect(request.request.method).toBe('GET');
  request.flush({ id: 1, userId: 1, title: 'Titolo', body: 'Testo' });
  await fixture.whenStable();
  expect(fixture.componentInstance.loading).toBe(false);
  expect(fixture.nativeElement.querySelector('pre').textContent).toContain('Titolo');
 });
 it('POST invia JSON con header corretto e riceve id 101', () => {
  const component = TestBed.createComponent(FooComponent).componentInstance;
  component.makeCompactPost();
  const request = http.expectOne('https://jsonplaceholder.typicode.com/posts');
  expect(request.request.method).toBe('POST');
  expect(request.request.headers.get('Content-Type')).toContain('application/json');
  expect(JSON.parse(request.request.body)).toEqual({ body: 'bar', title: 'foo', userId: 1 });
  request.flush({ id: 101, userId: 1, body: 'bar', title: 'foo' });
  expect(component.data?.id).toBe(101); expect(component.loading).toBe(false);
 });
 it('gestisce errori HTTP e permette un nuovo tentativo', () => {
  const component = TestBed.createComponent(FooComponent).componentInstance;
  component.makeRequest(); http.expectOne('https://jsonplaceholder.typicode.com/posts/1').flush('Errore', { status: 500, statusText: 'Server error' });
  expect(component.loading).toBe(false); expect(component.error).not.toBe('');
  component.makeRequest(); http.expectOne('https://jsonplaceholder.typicode.com/posts/1').flush({ id: 1 });
  expect(component.error).toBe('');
 });
});
