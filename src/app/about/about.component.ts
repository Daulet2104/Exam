import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpServiceService } from '../http-service.service';

import { filmInerface, starshipsInterFace } from '../interfaces';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService,
    private activateRoute: ActivatedRoute
  ) {}
  allInfo: filmInerface | undefined;
  starships: any | undefined = [];
  people: any = [];
  planets: any = [];
  modal: boolean = false;
  i: any;
  ngOnInit(): void {
    this.film();
  }

  film() {
    this.activateRoute.params.subscribe((params: any) => {
      this.httpService
        .getFilm(+params['url.slice(-2, -1)'])
        .subscribe((res) => {
          this.allInfo = res;
          this.starships = this.httpService
            .getFullInform(this.allInfo.starships)
            .subscribe((a: any) => (this.starships = a));
          this.people = this.httpService
            .getFullInform(this.allInfo.characters)
            .subscribe((a: any) => (this.people = a));
          this.planets = this.httpService
            .getFullInform(this.allInfo.planets)
            .subscribe((a: any) => (this.planets = a));
        });
      console.log('Params: ', params);
    });
  }
  modalInfo(i: starshipsInterFace) {
    this.modal = true;
    this.i = i;
  }
}
