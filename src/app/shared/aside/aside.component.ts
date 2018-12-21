import { Component, OnInit } from '@angular/core';
import {AsideService} from '../../service/aside/aside.service';
import {environment} from '../../../environments/environment';
import {VideoService} from '../../service/video.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  asideItems: AsideItem[] = [
    {
      name: '首页',
      path: '/',
      icon: 'icon-home',
    },
    {
      name: '电影',
      path: '/type/5b1362ab30763a214430d036',
      icon: 'icon-movie',
    },
    {
      name: '电视剧',
      path: '/type/5b1fce6330025ae5371a6a8a',
      icon: 'icon-tv',
    },
    {
      name: '综艺',
      path: '/type/5b1fd85730025ae5371abaed',
      icon: 'icon-KTV',
    },
    {
      name: '动漫',
      path: '/type/5b1fdbee30025ae5371ac363',
      icon: 'icon-dongman',
    },
  ];
  auxiliaryItems: AsideItem[] = [
    {
      name: '客户端下载',
      path: '/client',
      icon: 'icon-yingyong',
    },
  ];
  isElectron = environment.isElectron;
  currentVersion = '';
  platform = '';
  arch = '';
  isChecking = false;
  constructor(
    public asideService: AsideService,
    private videoService: VideoService,
  ) { }
  ngOnInit() {
    if (this.isElectron) {
      this.auxiliaryItems.unshift({
        name: '下载列表',
        path: '/download',
        icon: 'icon-xiazai',
      });
      // @ts-ignore
      this.currentVersion = Electron.remote.app.getVersion();
      // @ts-ignore
      this.platform = process.platform;
      // @ts-ignore
      this.arch = process.arch;
      this.handleCheckForUpdates();
    }
  }

  handleCheckForUpdates() {
    if (this.isChecking) {
      return;
    }
    this.isChecking = true;
    this.videoService.checkClientForUpdate(this.platform, this.arch, this.currentVersion)
      .subscribe(payload => {
        this.isChecking = false;
        if (payload.canBeUpdated) {
          if (window.confirm(`发现新版本： v${payload.latestVersion}，是否前往下载？`)) {
            // @ts-ignore
            electron.shell.openExternal(payload.referenceLink);
          }
        } else {
          window.alert('你使用的已是最新版本！');
        }
      }, _ => {
        this.isChecking = false;
        window.alert('检查更新出错，请稍后再试！');
      });
  }

}

export interface AsideItem {
  name: string;
  path: string;
  icon: string;
}
