import { Component, OnInit } from '@angular/core';
import {VideoService} from '../../service/video.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  items: any[] = [];
  loadErr = false;
  loading = false;
  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.handleFetch();
  }
  handleFetch() {
    this.loadErr = false;
    this.loading = true;
    this.videoService.getRecommended().pipe(
      tap(_ => this.loading = false)
    )
      .subscribe((payload) => {
        this.items = payload.latest;
      }, _ => {
        this.loadErr = true;
      });
  }

}
