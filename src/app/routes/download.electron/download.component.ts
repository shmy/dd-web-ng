import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';
import {NotificationSharedServiceService} from '../../service/notification-shared-service.service';
import {FfmpegService} from '../../service/ffmpeg.service';
const stateIcons = [
  'icon-wait',
  'icon-miaojiesellerwait',
  'icon-wancheng',
  'icon-error',
  'icon-error',
];
const stateTexts = [
  '正在准备',
  '下载中',
  '下载完毕',
  '下载出错',
  '停止下载',
];
// @ts-ignore
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  downloadItems = [];
  tabIndex = -1;
  constructor(
    private notificationSharedServiceService: NotificationSharedServiceService,
    private  ffmpegService: FfmpegService,
  ) { }

  ngOnInit() {
    interval(1000).pipe(
      map(_ => {
        // @ts-ignore
        let p = DB.get('d');
        if (this.tabIndex !== -1) {
          p = p.filter({ state: this.tabIndex });
        }
        return p.sortBy(item => -item.created_at).value();
      })
    ).subscribe(items => {
      this.downloadItems = items;
    });
  }
  handleLook(item) {
    // @ts-ignore
    Electron.shell.showItemInFolder(item.path);
  }
  handleStop(item) {
    this.ffmpegService.stop(item.url);
  }
  handleRemove(item) {
    // @ts-ignore
    DB.get('d').remove({ url: item.url }).write();
  }
  handleRetry(item) {
    this.ffmpegService.download(item.url, item.name);
  }
  // 0 准备中 1 下载中 2 下载成功 3 下载失败 4 已停止
  getIconClass(state: number) {
    return stateIcons[state];
  }
  getStateTexts(state: number) {
    return stateTexts[state];
  }
}
