import { Injectable } from '@angular/core';
import {DatabaseService} from '../database.service';

@Injectable({
  providedIn: 'root'
})
export class AsideService {
  isPackUp = true;
  constructor(private databaseService: DatabaseService) {
    databaseService.getItem('isPackUp').then(e => {
      this.isPackUp = !!e;
    });
  }
  switchPack() {
    this.isPackUp = !this.isPackUp;
    this._persistence();
  }
  packUp() {
    this.isPackUp = true;
    this._persistence();
  }
  unPackUp() {
    this.isPackUp = false;
    this._persistence();
  }
  _persistence() {
    this.databaseService.setItem('isPackUp', this.isPackUp);
  }
}
