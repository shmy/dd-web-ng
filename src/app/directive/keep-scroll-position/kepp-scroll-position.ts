import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime, distinct, filter, map} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';

@Directive({
  selector: '[appKeepScroll]'
})
export class KeepScrollPositionDirective implements AfterViewInit {
  y = 0;
  x = 0;
  constructor(private el: ElementRef, private router: Router) {}

  ngAfterViewInit(): void {
    fromEvent(this.el.nativeElement, 'scroll').pipe(
      map(({ target }) => {
        return { x: target.scrollLeft, y: target.scrollTop };
      }),
      debounceTime(200),
      distinct(),
    ).subscribe(({ x, y }) => {
      this.x = x;
      this.y = y;
    });

    this.router.events.pipe(
      filter(event => {
        return event instanceof NavigationEnd;
      })
    ).subscribe(_ => {
      this.el.nativeElement.scrollLeft = this.x;
      this.el.nativeElement.scrollTop = this.y;
    });
  }
}
