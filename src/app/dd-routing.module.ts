import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from './routes/index/index.component';
import {TypeComponent} from './routes/type/type.component';
import {VideoComponent} from './routes/video/video.component';
import {SearchComponent} from './routes/search/search.component';
import {IndexSectionComponent} from './shared/index-section/index-section.component';
import {ImageLazyLoadModule} from './directive/image-lazy-load/image-lazy-load.module';
import {ClickOutsideModule} from 'ng-click-outside';
import {VideoItemComponent} from './shared/video-item/video-item.component';
// import {DestroyPlayer} from './shared/guards/destroy-player';
import {RouterModule, Routes} from '@angular/router';
import {TimeAgoPipe} from './shared/time-ago.pipe';
import {KeepScrollPositionDirective} from './directive/keep-scroll-position/kepp-scroll-position';
import {ClientComponent} from './routes/client/client.component';
import {DownloadComponent} from './routes/download/download.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      keep: true,
    }
  },
  {
    path: 'type/:id',
    component: TypeComponent,
    data: {
      keep: true,
    }
  },
  {
    path: 'video/:id',
    component: VideoComponent,
    // canDeactivate: [DestroyPlayer]
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      keep: true,
    }
  },
  {
    path: 'client',
    component: ClientComponent,
  },
  {
    path: 'download',
    component: DownloadComponent,
    data: {
      keep: true,
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
    IndexSectionComponent,
    VideoItemComponent,
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
export class DdRoutingModule { }
