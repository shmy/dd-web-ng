import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {FfmpegService} from './service/ffmpeg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSupportTouch = ('ontouchend' in document);
  constructor(
    private router: Router,
    private ffmpegService: FfmpegService,
  ) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => {
        return event instanceof NavigationEnd && !environment.isElectron && environment.production;
      })
    ).subscribe((event: NavigationEnd) => {
      // @ts-ignore
      _hmt.push(['_trackPageview', event.urlAfterRedirects]);
    });
    if (environment.isElectron) {
      this.ffmpegService.initList();
    }
    // if (this.isSupportTouch) {
    //   document.addEventListener('touchstart', this.listenTouch.bind(this), false);
    // } else {
    document.documentElement.addEventListener('click', this.listenClick.bind(this), true);
    // }
  }
  private listenClick(e: MouseEvent) {
    this.builtFlowers(e.clientX, e.clientY);
  }
  private listenTouch(e: TouchEvent) {
    // @ts-ignore
    for (const item of e.changedTouches) {
      this.builtFlowers(item.clientX, item.clientY);
    }
  }
  private builtFlowers(clientX, clientY: number) {
    const item = document.createElement('div');
    item.className = 'fixed-item';
    // @ts-ignore
    item.style.color = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
    let left = clientX - 20;
    if (left < 0) {
      left = 0;
    } else if (left > window.innerWidth - 40) {
      left = window.innerWidth - 40;
    }
    const top = clientY - 20;
    item.style.left = left + 'px';
    item.style.top = top + 'px';
    item.innerHTML = '<i class="iconfont icon-nianhuo"></i>';
    item.addEventListener('animationend', () => {
      item.remove();
    });
    document.body.appendChild(item);
  }
}
