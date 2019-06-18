import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor() {
  }

  getHomeAd() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            type: AdType.TEXT,
            link: '/client',
            data: '黑人视频 安卓App 已发布 点击立即下载',
            bgcl: '#202124',
            ttcl: '#FEC402'
          }
        ]);
      }, 1000);
    });
  }
}

export enum AdType {
  TEXT = 1,
  IMAGE,
}
