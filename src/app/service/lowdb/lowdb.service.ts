import {Injectable} from '@angular/core';
import * as Lowdb from 'lowdb';
import {LocalforageAdapter} from './localforage.adapter';
import {UserService} from '../user.service';
// 客户端用文件 web端用LocalforageAdapter
// @ts-ignore
const adapter = new LocalforageAdapter('dd-db-v2');

@Injectable({
  providedIn: 'root'
})
export class LowdbService {
  private static _db: any;
  private get db() {
    return LowdbService._db;
  }

  constructor() {
  }

  static initializeInstance() {
    return new Promise((resolve, reject) => {
      if (!LowdbService._db) {
        Lowdb(adapter).then(instance => {
          LowdbService._db = instance;
          LowdbService._db.defaults({records: [], token: ''})
            .write();
          UserService.token = LowdbService._db.get('token').value();
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
  setToken(token: string) {
    UserService.token = token;
    this.db.set('token', token)
      .write();
  }
  clearToken() {
    UserService.token = null;
    this.db.set('token', null)
      .write();
  }
  getPage(page = 1, pageSize = 20) {
    return this.db.get('records')
      .orderBy('updated_at', 'desc')
      .take(pageSize)
      .value();
  }

  upsertRecord(record: Record) {
    const row = this.db.get('records').find({id: record.id}).value();
    if (!row) {
      this.db.get('records').push(record).write();
    } else {
      this.upsertLooekById(record.id, record.looek, record.total, record.current);
    }
  }

  upsertLooekById(id: string, looek: number, total: number, current: number[]) {
    this.db.get('records')
      .find({id})
      .assign({looek, total, current, updated_at: new Date().getTime(),})
      .write();
  }
}

export interface Record {
  id: string;
  name: string;
  current: number[];
  thumbnail: string;
  looek: number;
  total: number;
  created_at: number;
  updated_at: number;
}
