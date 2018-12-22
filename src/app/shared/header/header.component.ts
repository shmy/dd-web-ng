import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {AsideService} from '../../service/aside/aside.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {VideoService} from '../../service/video.service';
import {ActivationStart, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {FfmpegService} from '../../service/ffmpeg.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchBox') searchBox;
  @ViewChild('searchResult') searchResult;
  keyword = '';
  searchResult$: Observable<any[]>;
  shouldBeShow = false;
  searchTerms = new Subject<string>();
  isElectron = environment.isElectron;
  isMaximized = false;
  isShowBack = false;
  constructor(
    private asideService: AsideService,
    private videoService: VideoService,
    private router: Router,
    private _location: Location,
    private ffmpegService: FfmpegService,
              ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => {
        return event instanceof ActivationStart;
      })
    ).subscribe((event: ActivationStart) => {
     this.isShowBack = event.snapshot.routeConfig.path === 'video/:id';
    });
    this.router.events.pipe(
      filter(event => {
        return event instanceof ActivationStart;
      }),
      filter((event: ActivationStart) => {
        return event.snapshot.routeConfig.path === 'search';
      })
    ).subscribe(e => {
      this.keyword = e.snapshot.queryParamMap.get('keyword');
    });
    this.searchResult$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((keyword: string) => this.videoService.getVideoSearchResult(keyword)),
      map(item => {
        return item.result;
      }),
      tap(ret => {
        this.shouldBeShow = ret.length !== 0;
        setTimeout(() => {
          this.searchResult.nativeElement.scrollTop = 0;
        });
      }),
    );
  }

  handleSwitchPack() {
    this.asideService.switchPack();
  }
  handleKeyEnter({ target }) {
    this.router.navigateByUrl('/search?keyword=' + target.value);
    this.shouldBeShow = false;
  }
  handleSearch() {
    this.searchTerms.next(this.keyword);
  }
  handleJump(id: string) {
    this.router.navigateByUrl(`/video/${id}`);
    this.shouldBeShow = false;
  }
  onClickedOutside({ target }) {
    if (target === this.searchBox.nativeElement) {
      return;
    }
    this.shouldBeShow = false;
  }
  handleMinimize() {
    // @ts-ignore
    Electron.remote.getCurrentWindow().minimize();
  }
  handleSwitchMaximize() {
    // @ts-ignore
    const win = Electron.remote.getCurrentWindow();
    if (win.isFullScreen()) {
      win.setFullScreen(false);

      this.isMaximized = false;
      return;
    }
    win.setFullScreen(true);
    this.isMaximized = true;
  }
  handleQuit() {
    const QueueCount = this.ffmpegService.QueueCount;
    if (QueueCount === 0) {
      this.doQuit();
      return;
    }
    if (confirm(`还有${QueueCount}项下载正在进行，退出后将停止下载，是否继续退出？`)) {
      this.ffmpegService.stopAll();
      setTimeout(() => {
        this.doQuit();
      });
    }
  }
  handleBackRouter() {
    this._location.back();
  }
  private doQuit() {
    // @ts-ignore
    Electron.remote.app.quit();
  }
}
