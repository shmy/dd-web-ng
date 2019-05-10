import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FfmpegService} from '../../service/ffmpeg.service';


@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html',
  styleUrls: ['./video-playlist.component.scss']
})

export class VideoPlaylistComponent implements OnInit {
  @Input('name') name: string;
  @Input('items') items: any[];
  @Input('thumbnail') pic: string;
  @Input('current') current: number[] = [0, 0];
  @Input('isSide') isSide = false;
  @Output() OnChange = new EventEmitter<number[]>();
  isElectron = environment.isElectron;
  sourceIndex = 0;
  get resources() {
    if (!this.items || this.items.length < 1) {
      return [];
    }
    return this.items[this.sourceIndex].playlist;
  }
  constructor(
    private ffmpegService: FfmpegService,
  ) { }

  ngOnInit() {
  }
  playWithIndex(index: number) {
    this.OnChange.emit([this.sourceIndex, index]);
  }
  handelDoDownload(event: MouseEvent, index: number) {
    event.stopPropagation();
    const item = this.items[index];
    let name = this.name + '-' + Math.random().toString(36).substr(2).toUpperCase() + '-' + item.tag + '.mp4';
    name = name.replace(/\//g, '-')
      .replace(/\\/g, '-')
      .replace(/:/g, '-');
    const url = item.url;
    this.ffmpegService.download(url, name);
  }

}
