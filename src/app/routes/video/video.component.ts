import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../../service/video.service';
import {of, Subject} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {CircleBtnComponent} from '../../shared/circle-btn/circle-btn.component';
import Gitalk from 'gitalk';
import {SeoService} from '../../service/seo.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement;
  @ViewChild('circleBtn') circleBtn: CircleBtnComponent;
  item: any = {};
  hls: any;
  player: any = null;
  videoIndex = -1;
  loadErr = false;
  getDetail = new Subject<string>();
  isElectron = environment.isElectron;
  showNextMask = false;

  get nextTipText() {
    if (this.item.remote_url && this.item.remote_url[this.videoIndex + 1]) {
      return this.item.remote_url[this.videoIndex + 1].tag;
    }
    return '';
  }

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private videoService: VideoService,
  ) {
  }

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
        if (!this.isElectron) {
          // 设置SEO
          this.seoService.setTitle(this.item.name + '[黑人视频全网免费视频在线观看]');
          this.seoService.setDescription(this.item.introduce);
          this.seoService.setKeywords([
            this.item.name,
            this.item.latest,
            ...this.item.alias,
            ...this.item.director,
            ...this.item.starring,
          ].join(','));
          // 分享功能
          // @ts-ignore
          socialShare('#share', {
            sites: ['wechat', 'qzone', 'qq', 'weibo'],
            url: window.location.href,
            source: 'https://v.shmy.tech',
            title: `《${this.item.name}》在线观看 - 黑人视频`,
            description: this.item.introduce,
            image: this.item.thumbnail,
            wechatQrcodeTitle: '微信扫一扫：分享给朋友',
            wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本页面分享至朋友圈。</p>',
          });
          // 评论功能
          const gitalk = new Gitalk({
            clientID: 'a5911b5079acafacd845',
            clientSecret: 'fec6ba6c2177893b985a5de7c84787a0b3cd1e4f',
            repo: 'dd-web-comments',
            owner: 'shmy',
            admin: ['shmy'],
            title: this.item.name,
            id: this.route.snapshot.paramMap.get('id'),
            body: `### ${this.item.name}

![${this.item.name}](${this.item.thumbnail})

>${this.item.introduce}

[>>点击进入在线观看](${window.location.href})`,
            distractionFreeMode: false  // Facebook-like distraction free mode
          });

          gitalk.render('gitalk-container');
        }
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
    this.circleBtn.doReset();
    this.showNextMask = false;
    const url = this.item.remote_url[this.videoIndex].url;
    const videoElement = this.videoElement.nativeElement;
    // @ts-ignore
    if (Hls.isSupported()) {
      // @ts-ignore
      this.player = new Plyr(videoElement, {
        controls: [
          'play-large', // The large play button in the center
          'restart', // Restart playback
          'rewind', // Rewind by the seek time (default 10 seconds)
          'play', // Play/pause playback
          'fast-forward', // Fast forward by the seek time (default 10 seconds)
          'progress', // The progress bar and scrubber for playback and buffering
          'current-time', // The current time of playback
          'duration', // The full duration of the media
          'mute', // Toggle mute
          'volume', // Volume control
          'captions', // Toggle captions
          'settings', // Settings menu
          // 'pip', // Picture-in-picture (currently Safari only)
          'airplay', // Airplay (currently Safari only)
          // 'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
          'fullscreen', // Toggle fullscreen
        ],
      });
      this.player.on('ended', () => {
        if (this.videoIndex < this.item.remote_url.length - 1) {
          this.showNextMask = true;
          this.circleBtn.doStart();
        }
      });
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

  handleConfirmNext() {
    this.playWithIndex(this.videoIndex + 1);
  }

  ngOnDestroy(): void {
    this.destroyPlayer();
  }
}
