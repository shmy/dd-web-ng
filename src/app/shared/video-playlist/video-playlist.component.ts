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
  @Input('thumbnail') thumbnail: string;
  @Input('videoIndex') videoIndex: number;
  @Input('isSide') isSide = false;
  @Output() OnIndexChange = new EventEmitter<number>();
  isElectron = environment.isElectron;
  constructor(
    private ffmpegService: FfmpegService,
  ) { }

  ngOnInit() {
  }
  playWithIndex(index: number) {
    this.OnIndexChange.emit(index);
  }
  handelDoDownload(event: MouseEvent, index: number) {
    event.stopPropagation();
    const item = this.items[index];
    const name = this.name + '-' + item.tag + '-' + Math.random().toString(36).substr(2) + '.mp4';
    const url = item.url;
    this.ffmpegService.download(url, name);
  }

}
