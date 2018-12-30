import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, interval, Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-circle-btn',
  templateUrl: './circle-btn.component.html',
  styleUrls: ['./circle-btn.component.scss']
})
export class CircleBtnComponent implements OnInit {
  sp: Subscription;
  percent = 0;
  circleColor = '#0af';
  isMouseenter = false;
  @ViewChild('circleLeft') circleLeft;
  @ViewChild('circleRight') circleRight;
  @ViewChild('nextBtn') nextBtn;
  @Output() OnConfirm = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
    fromEvent(this.nextBtn.nativeElement, 'mouseenter').subscribe(e => {
      this.isMouseenter = true;
    });
    fromEvent(this.nextBtn.nativeElement, 'mouseleave').subscribe(e => {
      this.isMouseenter = false;
    });
  }
  doReset() {
    if (this.sp) {
      this.sp.unsubscribe();
    }
    this.percent = 0;
    this.circleLeft.nativeElement.style.transform = `rotate(0deg)`;
    this.circleRight.nativeElement.style.transform = `rotate(0deg)`;
    this.circleRight.nativeElement.style.backgroundColor = '#eee';
  }
  doStart() {
    this.doReset();
    this.sp = interval(60).pipe(
      filter(() => !this.isMouseenter),
    ).subscribe(() => {
      this.percent ++;
      if (this.percent > 100) {
        this.sp.unsubscribe();
        this.OnConfirm.emit();
        return;
      }
      if (this.percent <= 50) {
        this.circleRight.nativeElement.style.transform = `rotate(${this.percent * 3.6}deg)`;
      } else {
        this.circleRight.nativeElement.style.transform = `rotate(0deg)`;
        this.circleRight.nativeElement.style.backgroundColor = this.circleColor;
        this.circleLeft.nativeElement.style.transform = `rotate(${(this.percent - 50) * 3.6}deg)`;
      }
    });
  }
}
