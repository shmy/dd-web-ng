import { Injectable } from '@angular/core';
import * as LocalForage from 'localforage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }
  setItem(key: string, val: any) {
    return LocalForage.setItem(key, val);
  }
  getItem(key: string) {
    return LocalForage.getItem(key);
  }
}
