import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';
import {NotificationSharedServiceService} from '../../service/notification-shared-service.service';
const stateIcons = [
  'icon-wait',
  'icon-miaojiesellerwait',
  'icon-wancheng',
  'icon-error',
];
// @ts-ignore
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  downloadItems = [];
  tabIndex = 1;
  constructor(
    private notificationSharedServiceService: NotificationSharedServiceService,
  ) { }

  ngOnInit() {
    interval(1000).pipe(
      map(_ => {
        if (this.tabIndex === 1) {
          // @ts-ignore
          return DB.get('d').filter(item => [0, 1].indexOf(item.state) !== -1).sortBy(item => -item.created_at).value();
        }
        if (this.tabIndex === 2) {
          // @ts-ignore
          return DB.get('d').filter({ state: 2 }).sortBy(item => -item.updated_at).value();
        }
        if (this.tabIndex === 3) {
          // @ts-ignore
          return DB.get('d').filter({ state: 3 }).sortBy(item => -item.updated_at).value();
        }
        // @ts-ignore
        return DB.get('d').sortBy(item => -item.created_at).value();
      })
    ).subscribe(items => {
      this.downloadItems = items;
    });
    // @ts-ignore
    // console.log(DB.get('d').value());
  }
  handleItemClick(index: number) {
    const item: any = this.downloadItems[index];
    if (item) {
      switch (item.state) {
        case 0:
          this.notificationSharedServiceService.infoNotification('正在准备下载');
          break;
        case 1:
          this.notificationSharedServiceService.infoNotification('正在下载');
          break;
        case 2:
          // @ts-ignore
          Electron.shell.showItemInFolder(item.path);
          break;
        case 3:
          this.notificationSharedServiceService.confirmNotification(`${name} 下载失败！是否从列表删除？`)
            .subscribe(_ => {
              // @ts-ignore
              DB.get('d').remove({ url: item.url }).write();
            }, _ => {});
          break;
      }
    }
  }
  // 0 准备中 1 下载中 2 下载成功 3 下载失败
  getIconClass(state: number) {
    return stateIcons[state];
  }
}
