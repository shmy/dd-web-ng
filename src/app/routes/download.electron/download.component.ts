import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';
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
  downloadItems: [];
  constructor(
  ) { }

  ngOnInit() {
    interval(1000).pipe(
      map(_ => {
        // @ts-ignore
        return DB.get('d').value();
      })
    ).subscribe(items => {
      this.downloadItems = items;
    });
    // @ts-ignore
    // console.log(DB.get('d').value());
  }
  // handleDownload() {
  //   // @ts-ignore
  //   Electron.remote.dialog.showOpenDialog({
  //     properties: ['openDirectory']
  //   }, (paths: string[] | undefined) => {
  //     if (!paths) {
  //       return;
  //     }
  //     // @ts-ignore
  //     const path = Path.join(paths[0], 'sss.mp4');
  //     this.handleDown('https://sohu.zuida-163sina.com/20181220/r8NPCuOs/index.m3u8', path);
  //   });
  // }
  // 0 准备中 1 下载中 2 下载成功 3 下载失败
  getIconClass(state: number) {
    return stateIcons[state];
  }
}
