import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
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
import {LowdbService} from './service/lowdb/lowdb.service';
import {AdDirective, DynamicModalComponent} from './shared/dynamic-modal/dynamic-modal.component';
import { LoginComponent } from './shared/modal/login/login.component';
import { VaptchaComponent } from './shared/vaptcha/vaptcha.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    NotFoundComponent,
    DynamicModalComponent,
    LoginComponent,
    AdDirective,
    VaptchaComponent,
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
    // 当应用程序加载时，Angular将执行此标记提供的功能。
    // 如果函数返回promise，则angular将等待，直到promise被解析。这将使其成为在初始化应用程序之前执行某些初始化逻辑的理想位置。
    { provide: APP_INITIALIZER, multi: true, useFactory: () => LowdbService.initializeInstance },
    httpInterceptorProviders,
    { provide: RouteReuseStrategy, useClass: SimpleRouteReuseStrategy },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DynamicModalComponent, LoginComponent]
})
export class AppModule { }
