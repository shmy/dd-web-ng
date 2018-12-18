import {Component, OnInit, ViewChild} from '@angular/core';
import {AsideService} from '../../service/aside/aside.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {VideoService} from '../../service/video.service';
import {ActivatedRoute, ActivationStart, NavigationEnd, Router} from '@angular/router';

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
  constructor(
    private asideService: AsideService,
    private videoService: VideoService,
    private router: Router,
              ) { }

  ngOnInit() {
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
}
