import { Injectable } from '@angular/core';
import {SnotifyPosition, SnotifyService} from 'ng-snotify';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class NotificationSharedServiceService {

  constructor(
    private snotifyService: SnotifyService,
  ) { }
  successNotification(message: string) {
    setTimeout(() => {
      this.snotifyService.success(message, {
        position: SnotifyPosition.leftBottom,
      });
    });
  }
  warningNotification(message: string) {
    setTimeout(() => {
      this.snotifyService.warning(message, {
        position: SnotifyPosition.leftBottom,
      });
    });
  }
  infoNotification(message: string) {
    setTimeout(() => {
      this.snotifyService.info(message, {
        position: SnotifyPosition.leftBottom,
      });
    });
  }
  errorNotification(message: string) {
    setTimeout(() => {
      this.snotifyService.error(message, {
        position: SnotifyPosition.leftBottom,
      });
    });
  }
  confirmNotification(message: string, title: string = '提示') {
    return fromPromise(new Promise((resolve, reject) => {
      setTimeout(() => {
        this.snotifyService.confirm(message, title, {
          position: SnotifyPosition.leftBottom,
          buttons: [
            {text: '确定', action: (toast) => { resolve(); this.snotifyService.remove(toast.id); }, bold: false},
            {text: '忽略', action: (toast) => { reject(); this.snotifyService.remove(toast.id); }, bold: false},
          ]
        });
      });
    }));
  }
}
