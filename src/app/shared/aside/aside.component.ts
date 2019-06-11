import {Component, OnInit} from '@angular/core';
import {AsideService} from '../../service/aside/aside.service';
import {environment} from '../../../environments/environment';
import {VideoService} from '../../service/video.service';
import {NotificationSharedServiceService} from '../../service/notification-shared-service.service';
import {UserService} from '../../service/user.service';
import {Observable} from 'rxjs';
import {LoginComponent} from '../modal/login/login.component';
import {DynamicModalComponent} from '../dynamic-modal/dynamic-modal.component';
import {DynamicModalService} from '../dynamic-modal/dynamic-modal.service';
import {LowdbService} from '../../service/lowdb/lowdb.service';

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
      path: '/type/1',
      icon: 'icon-movie',
    },
    {
      name: '电视剧',
      path: '/type/2',
      icon: 'icon-tv',
    },
    {
      name: '综艺',
      path: '/type/3',
      icon: 'icon-KTV',
    },
    {
      name: '动漫',
      path: '/type/4',
      icon: 'icon-dongman',
    },
    // {
    //   name: '历史记录',
    //   path: '/history',
    //   icon: 'icon-lishijilu',
    // },
  ];
  auxiliaryItems: AsideItem[] = [
    {
      name: '历史记录',
      path: '/history',
      icon: 'icon-lishijilu',
    },
    // {
    //   name: '客户端下载',
    //   path: '/client',
    //   icon: 'icon-yingyong',
    // },
  ];
  isElectron = environment.isElectron;
  currentVersion = '';
  platform = '';
  arch = '';
  isChecking = false;
  info$: Observable<any>;

  constructor(
    public asideService: AsideService,
    private videoService: VideoService,
    private notificationSharedServiceService: NotificationSharedServiceService,
    public userService: UserService,
    private dynamicModalService: DynamicModalService,
    private lowdbService: LowdbService,
  ) {
  }

  ngOnInit() {

    // this.notificationSharedServiceService.infoNotification('检查更新是出错，请稍后再试！');
    // this.notificationSharedServiceService.warningNotification('检查更新是出错，请稍后再试！');
    // this.notificationSharedServiceService.errorNotification('检查更新是出错，请稍后再试！');
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
    this.info$ = this.userService.me();

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
          this.notificationSharedServiceService.confirmNotification(`发现新版本： v${payload.latestVersion}，是否前往下载？`)
            .subscribe(e => {
              // @ts-ignore
              Electron.shell.openExternal(payload.referenceLink);
            }, _ => {
            });
        } else {
          this.notificationSharedServiceService.successNotification('你使用的已是最新版本！');
        }
      }, _ => {
        this.isChecking = false;
        this.notificationSharedServiceService.errorNotification('检查更新时出错，请稍后再试！');
      });
  }
  handleLogin() {
    this.dynamicModalService.open(LoginComponent, {
      done: () => {
        //
      }
    });
  }
  handleLogout() {
    this.lowdbService.clearToken();
  }

}

export interface AsideItem {
  name: string;
  path: string;
  icon: string;
}
