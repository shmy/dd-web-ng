import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {VideoComponent} from '../../routes/video/video.component';

@Injectable()
export class DestroyPlayer implements CanDeactivate<VideoComponent> {
  canDeactivate(component: VideoComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // 销毁 播放器
    component.destroyPlayer();
    return true;
  }
}
