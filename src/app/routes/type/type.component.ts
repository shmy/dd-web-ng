import {Component, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime, distinct, filter, flatMap, tap} from 'rxjs/operators';
import {VideoService} from '../../service/video.service';
import {ActivatedRoute} from '@angular/router';
import {allClasses} from './types';
import {FilterParams} from '../../shared/video-filter/video-filter.component';

const getDefaultParams = (pid: string = '') => ({
  pid,
  year: '',
  area: '',
  sort: '1',
  source: '',
});

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
})
export class TypeComponent implements OnInit {
  @ViewChild('element') child;
  items: any[] = [];
  id = '';
  page = 1;
  per_page = 20;
  // last_page = 2;
  loadErr = false;
  loading = false;
  classes = [];
  filter: FilterParams = getDefaultParams();
  noMore = false;
  // get noMore() {
  //   return false;
  // }

  constructor(
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(e => {
      // this.child.nativeElement.scrollTop = 0;
      this.id = e.get('id');
      this.classes = allClasses[this.id].children;
      this.filter = getDefaultParams(this.classes[0].id);
      // console.log(this.types);
      // setTimeout(() => {
      this.initialize();
      // }, 0);
    });
    this.bindEvent();
  }

  initialize() {
    this.items = [];
    // this.last_page = 2;
    this.page = 1;
    this.handleFetch();
  }

  handleFetch() {
    this.getHttpStream().subscribe(payload => {
      // console.log(payload)
      // this.last_page = payload.last_page;
      if (payload.length === 0) {
        this.noMore = true;
        return;
      }
      this.items.push.apply(this.items, payload);
    }, _ => this.loadErr = true);
  }

  getHttpStream() {
    this.loadErr = false;
    this.loading = true;
    return this.videoService.getVideoListByPage(
      this.filter.pid,
      this.filter.sort,
      this.filter.area,
      this.filter.year,
      this.filter.source,
      this.page,
      this.per_page).pipe(
      tap(_ => this.loading = false)
    );
  }

  bindEvent() {
    fromEvent(this.child.nativeElement, 'scroll')
      .pipe(
        filter(({target}) => {
          return (
            (this.loading === false) &&
            (target.scrollTop !== 0) &&
            (target.scrollTop + target.clientHeight >= target.scrollHeight - 100)
          );
        }),
        debounceTime(200),
        distinct(),
        flatMap(_ => {
          this.page++;
          this.loading = true;
          return this.getHttpStream();
        }),
        // debounceTime(500),
      )
      .subscribe(payload => {
        // this.last_page = payload.last_page;
        this.items.push.apply(this.items, payload);
        this.loading = false;
      }, _ => this.loadErr = true);
  }

  handleFilterParamsChange() {
    this.items = [];
    this.page = 1;
    this.handleFetch();
  }
}
