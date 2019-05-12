import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {reject} from 'q';

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
            link: '/',
            data: '黑人视频APP(安卓版)将于5月12日24:00进行关闭进入维护状态, <br> 具体开放时间请关注本站, 您可以继续在网页版使用其他功能',
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
