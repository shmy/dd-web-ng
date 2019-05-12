import { Component, OnInit } from '@angular/core';
import {LowdbService} from '../../service/lowdb/lowdb.service';
import {Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  result$: Observable<any[]>;
  sub = new Subject<number>();
  constructor(
    private lowdbService: LowdbService
  ) { }

  ngOnInit() {
    this.result$ = this.sub.pipe(
      map(page => this.lowdbService.getPage(page))
    );
    // this.result$.subscribe(e => console.log(e))
    setTimeout(() => {
      this.sub.next(1);
    }, 0);
  }
}
