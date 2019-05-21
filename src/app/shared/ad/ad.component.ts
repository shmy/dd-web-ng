import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AdService} from '../../service/ad.service';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  ads: Observable<any>;
  constructor(
    private adService: AdService
  ) { }

  ngOnInit() {
    this.ads = fromPromise(this.adService.getHomeAd());
  }

}
