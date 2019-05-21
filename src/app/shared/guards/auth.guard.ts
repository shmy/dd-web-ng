import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../../service/user.service';
import {LoginComponent} from '../modal/login/login.component';
import {DynamicModalService} from '../dynamic-modal/dynamic-modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private dynamicModalService: DynamicModalService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.logged) {
      return true;
    }
    this.dynamicModalService.open(LoginComponent, {
      done: () => {
        const url = '/' + route.url.join('/');
        this.router.navigateByUrl(url);
      }
    });
    return false;
  }

}
