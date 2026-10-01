import { Component } from '@angular/core';
import { FooComponent } from './foo/foo.component';
@Component({ selector: 'app-root', imports: [FooComponent], template: '<main><h1>Chiamate HTTP e Observable</h1><app-foo /></main>' })
export class AppComponent {}
