import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { AsideComponent } from './shared/aside/aside.component';
import {httpInterceptorProviders} from './shared/http-interceptors';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {RouteReuseStrategy} from '@angular/router';
import {SimpleRouteReuseStrategy} from './shared/route-reuse-strategy/route-reuse-strategy';
import {NotFoundComponent} from './routes/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {ClickOutsideModule} from 'ng-click-outside';
import {FormsModule} from '@angular/forms';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    NotFoundComponent,
    // VideoFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ClickOutsideModule,
    FormsModule,
    SnotifyModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production && !environment.isElectron }),
  ],
  providers: [
    httpInterceptorProviders,
    { provide: RouteReuseStrategy, useClass: SimpleRouteReuseStrategy },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
