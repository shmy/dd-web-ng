import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../../service/video.service';
import {debounceTime, distinct, filter, flatMap, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';

const getDefaultParams = (pid: string = '') => ({
  pid,
  query: '2',
  year: '',
  area: '',
  sort: '1',
  source: '',
});
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('element') child;
  items: any[] = [];
  keyword = '';
  page = 1;
  per_page = 20;
  last_page = 2;
  loadErr = false;
  loading = false;
  filter = getDefaultParams();
  get noMore()  {
    return this.page >= this.last_page;
  }
  constructor(
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(e => {
      // this.child.nativeElement.scrollTop = 0;
      this.keyword = e.get('keyword');
      // setTimeout(() => {
      this.initialize();
      // }, 0);
    });
    this.bindEvent();
  }
  initialize() {
    this.items = [];
    this.last_page = 2;
    this.page = 1;
    this.handleFetch();
  }
  handleFetch() {
    this.getHttpStream().subscribe(payload => {
      this.last_page = payload.last_page;
      this.items.push.apply(this.items, payload.result);
    }, _ => this.loadErr = true);
  }
  getHttpStream() {
    this.loadErr = false;
    this.loading = true;
    return this.videoService.getVideoSearchResultByPaging(
      this.keyword,
      this.filter.pid,
      this.filter.sort,
      this.filter.area,
      this.filter.year,
      this.filter.source,
      this.filter.query,
      this.page,
      this.per_page).pipe(
      tap(_ => this.loading = false)
    );
  }
  bindEvent() {
    fromEvent(this.child.nativeElement, 'scroll')
      .pipe(
        filter(( { target }) => {
          return (
            (this.loading === false) &&
            (target.scrollTop !== 0) &&
            (target.scrollTop + target.clientHeight >= target.scrollHeight - 100)
          );
        }),
        debounceTime(200),
        distinct(),
        flatMap(_ => {
          this.page ++;
          this.loading = true;
          return this.getHttpStream();
        }),
        // debounceTime(500),
      )
      .subscribe(payload => {
        this.last_page = payload.last_page;
        this.items.push.apply(this.items, payload.result);
        this.loading = false;
      }, _ => this.loadErr = true);
  }
  handleFilterParamsChange() {
    this.page = 1;
    this.items = [];
    this.handleFetch();
  }
}
