import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';
// 缓存时间 秒
const cacheTime = 60 * 5;
export class SimpleRouteReuseStrategy implements RouteReuseStrategy {
  _cacheRouters: { [key: string]: any } = {};
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const c = this._cacheRouters[route.routeConfig.path];
    if (c) {
      return c.handle;
    }
    return null;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const c = this._cacheRouters[route.routeConfig.path];
    return c && +(Date.now() / 1000) - c.time < cacheTime;
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !!route.data.keep;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    this._cacheRouters[route.routeConfig.path] = {
      snapshot: route,
      handle: handle,
      time: +(Date.now() / 1000)
    };
  }
}
