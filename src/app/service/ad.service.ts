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
            link: '/',
            data: '为了维护资源的稳定性, <br> 本站于5月21日开启必须登录后才能观看, <br> 黑人视频免费注册进行中, 注册即可免费在线观看 !',
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
