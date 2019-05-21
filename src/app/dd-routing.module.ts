import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './routes/index/index.component';
import {TypeComponent} from './routes/type/type.component';
import {VideoComponent} from './routes/video/video.component';
import {SearchComponent} from './routes/search/search.component';
import {IndexSectionComponent} from './shared/index-section/index-section.component';
import {ImageLazyLoadModule} from './directive/image-lazy-load/image-lazy-load.module';
import {ClickOutsideModule} from 'ng-click-outside';
import {VideoItemComponent} from './shared/video-item/video-item.component';
import {RouterModule, Routes} from '@angular/router';
import {TimeAgoPipe} from './shared/time-ago.pipe';
import {KeepScrollPositionDirective} from './directive/keep-scroll-position/kepp-scroll-position';
import {ClientComponent} from './routes/client/client.component';
import {DownloadComponent} from './routes/download/download.component';
import {VideoPlaylistComponent} from './shared/video-playlist/video-playlist.component';
import {VideoFilterComponent} from './shared/video-filter/video-filter.component';
import {CircleBtnComponent} from './shared/circle-btn/circle-btn.component';
import {HistoryComponent} from './routes/history/history.component';
import {AdComponent} from './shared/ad/ad.component';
import {AuthGuard} from './shared/guards/auth.guard';

const title = '黑人视频全网免费视频在线观看';
const keywords = '黑人视频,免费视频,免费电影,免费电视剧,免费综艺,免费动漫';
const description = '黑人视频是一款免费播放全网电影电视剧综艺和动漫的应用，跨平台，多体验！';
const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      keep: true,
      title,
      description,
      keywords,
    }
  },
  {
    path: 'type/:id',
    component: TypeComponent,
    data: {
      keep: true,
      title: '视频分类',
      description,
      keywords,
    }
  },
  {
    path: 'video/:id',
    component: VideoComponent,
    canActivate: [AuthGuard],
    // canDeactivate: [DestroyPlayer]
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      keep: true,
      title,
      description,
      keywords,
    }
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {
      keep: true,
      title: '历史记录',
      description,
      keywords,
    }
  },
  {
    path: 'client',
    component: ClientComponent,
    data: {
      title: '客户端下载',
      description,
      keywords,
    }
  },
  {
    path: 'download',
    component: DownloadComponent,
    data: {
      keep: true,
      title,
      description,
      keywords,
    }
  }
];

@NgModule({
  declarations: [
    IndexComponent,
    TypeComponent,
    VideoComponent,
    SearchComponent,
    ClientComponent,
    DownloadComponent,
    HistoryComponent,
    IndexSectionComponent,
    VideoItemComponent,
    VideoPlaylistComponent,
    VideoFilterComponent,
    CircleBtnComponent,
    AdComponent,
    KeepScrollPositionDirective,
    TimeAgoPipe,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ImageLazyLoadModule,
    ClickOutsideModule,
  ],
  providers: [
    // DestroyPlayer,
  ],
})
export class DdRoutingModule {
}
