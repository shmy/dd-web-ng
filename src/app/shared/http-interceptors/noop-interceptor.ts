import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, filter, timeout} from 'rxjs/operators';
import {UserService} from '../../service/user.service';
import {SnotifyService} from 'ng-snotify';
import {DynamicModalService} from '../dynamic-modal/dynamic-modal.service';
import {LoginComponent} from '../modal/login/login.component';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor(private snotifyService: SnotifyService, private dynamicModalService: DynamicModalService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + UserService.token
      })
    });
    return next.handle(clonedRequest).pipe(
      timeout(10000),
      filter(event => {
        return event instanceof HttpResponse;
      }),
      catchError((err: HttpErrorResponse) => {
        const error = err.error as any;
        if (err.status === 401) {
          this.snotifyService.warning('登录失效, 请重新登录');
          this.dynamicModalService.open(LoginComponent, {
            done: () => {
              window.location.reload();
            }
          });
        } else {
          this.snotifyService.warning(error.info);
        }

        return of(new HttpResponse({
          body: null
        }));
      })
    );
  }
}

// export interface AfterResponse<T> extends Array<T|Error> {
//   0: T | null;
//   1: Error | null;
// }
