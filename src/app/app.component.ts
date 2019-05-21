import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {FfmpegService} from './service/ffmpeg.service';
import {SeoService} from './service/seo.service';
import {LowdbService} from './service/lowdb/lowdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSupportTouch = ('ontouchend' in document);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private ffmpegService: FfmpegService,
    private lowdbService: LowdbService,
  ) {
  }

  theCoreValuesOfChineseSocialism = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'];
  socialismIndex = 0;

  get core() {
    if (this.socialismIndex > this.theCoreValuesOfChineseSocialism.length - 1) {
      this.socialismIndex = 0;
    }
    return this.theCoreValuesOfChineseSocialism[this.socialismIndex];
  }

  ngOnInit(): void {
    if (!environment.isElectron && environment.production) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        tap(event => {
          // @ts-ignore
          _hmt.push(['_trackPageview', event.urlAfterRedirects]);
        }),
        map(() => this.route),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data),
      ).subscribe(data => {
        if (data.title) {
          this.seoService.setTitle(data.title);
        }
        if (data.description) {
          this.seoService.setDescription(data.description);
        }
        if (data.keywords) {
          this.seoService.setKeywords(data.keywords);
        }
      });
    }
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
    item.innerHTML = '<span class="">' + this.core + '</span>';
    this.socialismIndex++;
    item.addEventListener('animationend', () => {
      item.remove();
    });
    document.body.appendChild(item);
  }
}
