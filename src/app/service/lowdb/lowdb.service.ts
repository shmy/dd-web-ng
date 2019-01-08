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
    const row = this.db.get('records').find({ _id: record._id }).value();
    if (!row) {
      this.db.get('records').push(record).write();
    } else {
      this.upsertLooekById(record._id, record.looek, record.total);
    }
  }
  upsertLooekById(_id: string, looek: number, total: number) {
    this.db.get('records')
      .find({ _id })
      .assign({ looek, total, updated_at: new Date().getTime(), })
      .write();
  }
}
export interface Record {
  _id: string;
  name: string;
  tag: string;
  thumbnail: string;
  looek: number;
  total: number;
  created_at: number;
  updated_at: number;
}
