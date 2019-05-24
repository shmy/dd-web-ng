import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map, retry, timeout} from 'rxjs/operators';
import {UserService} from '../../service/user.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + UserService.token
      })
    });
    return next.handle(clonedRequest).pipe(
      timeout(10000),
      filter(event => {
        return event instanceof HttpResponse;
      }),
      map((event: HttpResponse<any>) => {
        const body = event.body;
        if (body['code'] !== 0) {
           throw new Error(body['info']);
        }
        return event.clone({
          body: event.body['data']
        });
      }),
      // retry(2),
      // catchError((err: HttpErrorResponse) => {
      //   return of(new HttpResponse({
      //     body: [null, err]
      //   }));
      // })
    );
  }
}

// export interface AfterResponse<T> extends Array<T|Error> {
//   0: T | null;
//   1: Error | null;
// }
