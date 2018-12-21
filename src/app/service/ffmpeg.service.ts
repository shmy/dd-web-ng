import { Injectable } from '@angular/core';
import {NotificationSharedServiceService} from './notification-shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {

  constructor(
    private notificationSharedServiceService: NotificationSharedServiceService,
  ) { }
  download(url, name: string) {
    // @ts-ignore
    let defaultPath = Electron.remote.app.getPath('videos');
    // @ts-ignore
    defaultPath = Path.join(defaultPath, name);
    // @ts-ignore
    Electron.remote.dialog.showSaveDialog({
      title: '请选择保存目录',
      defaultPath,
    }, (filename: string | undefined) => {
      if (!filename) {
        return;
      }
      this.doDownload(url, filename, name);
      this.notificationSharedServiceService.successNotification('已添加下载');

    });
  }
  private doDownload(url, path, name: string) {
    // @ts-ignore
    DB.get('d')
      .remove({ url })
      .write();
    // @ts-ignore
    FluentFFmpeg(url)
      .on('start', () => {
        console.log('download start');
        // @ts-ignore
        DB.get('d').push({
          url,
          path,
          name,
          state: 0,
          percent: 0,
          created_at: Date.now(),
          updated_at: Date.now(),
        }).write();
      })
      .on('progress', progress => {
        if (!progress) {
          return;
        }
        console.log('download progress');
        let percent = +progress.percent.toFixed(2);
        if (percent > 100) {
          percent = 100;
        }
        // @ts-ignore
        DB.get('d')
          .find({ url })
          .assign({ state: 1, percent, updated_at: Date.now(), })
          .write();
      })
      .on('error', error => {
        console.log('download error', error);
        // @ts-ignore
        DB.get('d')
          .find({ url })
          .assign({ state: 3, updated_at: Date.now(), })
          .write();
      })
      .on('end', () => {
        console.log('download end');
        // @ts-ignore
        DB.get('d')
          .find({ url })
          .assign({ state: 2, updated_at: Date.now(), })
          .write();
      })
      .inputOptions('-threads 100')
      .outputOptions('-c copy')
      .outputOptions('-bsf:a aac_adtstoasc')
      .output(path)
      .run();
  }
}
