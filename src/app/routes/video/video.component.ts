import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../../service/video.service';
import {of, Subject} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {FfmpegService} from '../../service/ffmpeg.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement;
  item: any = {};
  hls: any;
  player: any = null;
  videoIndex = -1;
  loadErr = false;
  getDetail = new Subject<string>();
  isElectron = environment.isElectron;
  isDownloadMode = false;
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private ffmpegService: FfmpegService,
    ) { }
  ngOnInit() {
    this.getDetail.pipe(
      tap(_ => this.loadErr = false),
      switchMap((id: string) => {
        return this.videoService.getVideoInfo(id).pipe(
          catchError(_ => {
            this.loadErr = true;
            return of({});
          })
        );
      }),
    ).subscribe(payload => {
      if (payload) {
        this.item = payload;
        this.playWithIndex(0);
      }
    });
    this.route.paramMap.subscribe(e => {
      this.item = {};
      const id: string = e.get('id');
      this.getDetail.next(id);
    });
  }
  handleRefresh() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getDetail.next(id);
  }
  playWithIndex(index: number) {
    if (this.isDownloadMode) {
      this.handleDoDownload(index);
      return;
    }
    if (this.videoIndex === index) {
      return;
    }
    this.destroyPlayer();
    setTimeout(() => {
      this.videoIndex = index;
      this.createPlayer();
    }, 0);
  }
  createPlayer() {
    const url = this.item.remote_url[this.videoIndex].url;
    const videoElement = this.videoElement.nativeElement;
    // @ts-ignore
    if (Hls.isSupported()) {
      // @ts-ignore
      this.player = new Plyr(videoElement);
      // @ts-ignore
      this.hls = new Hls();
      this.hls.loadSource(url);
      this.hls.attachMedia(videoElement);
      // @ts-ignore
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play();
      });
    } else {
      videoElement.src = url;
    }
  }
  destroyPlayer() {
    // if (this.player) {
    //   this.player.destroy();
    // }
    if (this.hls) {
      this.hls.destroy();
    }
    this.videoIndex = -1;
    // this.player = null;
    this.hls = null;
    // native
    this.videoElement.nativeElement.pause();
    this.videoElement.nativeElement.src = '';
  }
  handleDoDownload(index: number) {
    const item = this.item.remote_url[index];
    const name = this.item.name + '-' + item.tag + '-' + Math.random().toString(36).substr(2) + '.mp4';
    const url = item.url;
    this.ffmpegService.download(url, name);
  }
  ngOnDestroy(): void {
    this.destroyPlayer();
  }
}
