import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => {
        return event instanceof NavigationEnd && !environment.isElectron && environment.production;
      })
    ).subscribe((event: NavigationEnd) => {
      // @ts-ignore
      _hmt.push(['_trackPageview', event.urlAfterRedirects]);
    });
  }
}
