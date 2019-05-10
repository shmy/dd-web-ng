import {Injectable} from '@angular/core';
import * as Lowdb from 'lowdb';
import {LocalforageAdapter} from './localforage.adapter';
// 客户端用文件 web端用LocalforageAdapter
// @ts-ignore
const adapter = new LocalforageAdapter('dd-db');

@Injectable({
  providedIn: 'root'
})
export class LowdbService {
  private db: any;

  constructor() {
  }

  initializeInstance() {
    if (!this.db) {
      Lowdb(adapter).then(instance => {
        this.db = instance;
        this.db.defaults({records: []})
          .write();
      });
    }
  }

  getPage(page = 1, pageSize = 20) {
    return this.db.get('records')
      .orderBy('updated_at', 'desc')
      .take(pageSize)
      .value();
  }
  upsertRecord(record: Record) {
    const row = this.db.get('records').find({ id: record.id }).value();
    if (!row) {
      this.db.get('records').push(record).write();
    } else {
      this.upsertLooekById(record.id, record.looek, record.total, record.current);
    }
  }
  upsertLooekById(id: string, looek: number, total: number, current: number[]) {
    this.db.get('records')
      .find({ id })
      .assign({ looek, total, current, updated_at: new Date().getTime(), })
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
