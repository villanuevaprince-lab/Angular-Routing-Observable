import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-generic',
  styleUrl: './generic.css',
  templateUrl: './generic.html',
})
export class Generic {
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(this.getRouterParam);
  }

  getRouterParam = (params: ParamMap) => {
    const uriParam = params.get('id'); // Ottengo l'id dalla ParamMap
    console.log(uriParam); // Stampo su console
    // this.service.getTrack();
  };
}
