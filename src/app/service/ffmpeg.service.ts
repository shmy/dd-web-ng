import { Injectable } from '@angular/core';
import {NotificationSharedServiceService} from './notification-shared-service.service';
import * as PrettyBytes from './pretty-bytes';
@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
  ffQueues = {};
  constructor(
    private notificationSharedServiceService: NotificationSharedServiceService,
  ) { }
  get QueueCount() {
    return Object.keys(this.ffQueues).length;
  }
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
  initList() {
    // @ts-ignore
    const items = DB.get('d').value();
    items.forEach(item => {
      if ([0, 1].indexOf(item.state) !== -1) {
        // @ts-ignore
        DB.get('d')
          .find({ url: item.url })
          .assign({ state: 4, updated_at: Date.now(), })
          .write();
      }
    });
  }
  private doDownload(url, path, name: string) {
    // @ts-ignore
    DB.get('d')
      .remove({ url })
      .write();
    // @ts-ignore
    const f = FluentFFmpeg(url)
      .on('start', () => {
        this.notificationSharedServiceService.infoNotification(`${name} 已开始下载！`);
        // @ts-ignore
        DB.get('d').push({
          url,
          path,
          name,
          state: 0,
          percent: 0,
          total: '0 B',
          loaded: '0 B',
          created_at: Date.now(),
          updated_at: Date.now(),
        }).write();
      })
      .on('progress', progress => {
        if (!progress.percent) {
          return;
        }
        // console.log('download progress');
        let loaded = progress.targetSize;
        let total = +((loaded / (progress.percent / 100)).toFixed(2));
        loaded = PrettyBytes(loaded * 1024);
        total = PrettyBytes(total * 1024);
        let percent = +(progress.percent.toFixed(2));
        if (percent > 100) {
          percent = 100;
          loaded = total;
        }
        // @ts-ignore
        DB.get('d')
          .find({ url })
          .assign({ state: 1, percent, loaded, total, updated_at: Date.now(), })
          .write();
      })
      .on('error', _ => {
        this.notificationSharedServiceService.errorNotification(`${name} 下载失败！`);
        // @ts-ignore
        DB.get('d')
          .find({ url })
          .assign({ state: 3, updated_at: Date.now(), })
          .write();
      })
      .on('end', () => {
        delete this.ffQueues[url];
        // @ts-ignore
        const p = DB.get('d').find({ url }).value();
        if (p.percent !== 100) {
          // @ts-ignore
          DB.get('d')
            .find({ url })
            .assign({ state: 4, updated_at: Date.now(), })
            .write();
          this.notificationSharedServiceService.successNotification(`${name} 已停止！`);
          return;
        }
        this.notificationSharedServiceService.successNotification(`${name} 下载完毕！`);
        // @ts-ignore
        DB.get('d')
          .find({ url })
          .assign({ state: 2, updated_at: Date.now(), })
          .write();
      })
      .inputOptions('-threads 100')
      .outputOptions('-c copy')
      .outputOptions('-bsf:a aac_adtstoasc')
      .output(path);
    this.ffQueues[url] = f;
    f.run();
  }
  stop(url: string) {
    const f = this.ffQueues[url];
    if (this.ffQueues[url]) {
      f.ffmpegProc.stdin.write('q');
    }
  }
  stopAll() {
    Object.keys(this.ffQueues).forEach(key => {
      this.ffQueues[key].ffmpegProc.stdin.write('q');
    });
  }
}
