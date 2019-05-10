import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../../service/video.service';
import {of, Subject} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {CircleBtnComponent} from '../../shared/circle-btn/circle-btn.component';
import Gitalk from 'gitalk';
import {SeoService} from '../../service/seo.service';
import {LowdbService} from '../../service/lowdb/lowdb.service';
import {Location} from '@angular/common';

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
  current: number[] = [0, 0];
  loadErr = false;
  getDetail = new Subject<string>();
  isElectron = environment.isElectron;
  showNextMask = false;
  resources = [];

  get nextTipText() {
    // todo
    // if (this.item.remote_url && this.item.remote_url[this.videoIndex + 1]) {
    //   return this.item.remote_url[this.videoIndex + 1].tag;
    // }
    return '';
  }
  get currentVideo() {
    if (this.resources.length < 1) {
      return {};
    }
    return this.resources[this.current[0]].playlist[this.current[1]];
  }
  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private videoService: VideoService,
    private lowdbService: LowdbService,
    private location: Location,
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
        this.resources = this.item.resources.map(item => ({
          source: item.source,
          playlist: item.links.split('#').map(curr => {
            curr = curr.split('$');
            return {
              tag: curr[0],
              url: curr[1],
            };
          })
        }));
        this.item.resources = '';
        this.createPlayer();
        if (!this.isElectron) {
          // 设置SEO
          this.seoService.setTitle(this.item.name + '[黑人视频全网免费视频在线观看]');
          this.seoService.setDescription(this.item.des);
          this.seoService.setKeywords([
            this.item.name,
            ...this.item.director,
            ...this.item.actor,
          ].join(','));
          // 分享功能
          // @ts-ignore
          socialShare('#share', {
            sites: ['wechat', 'qzone', 'qq', 'weibo'],
            url: window.location.href,
            source: 'https://v.shmy.tech',
            title: `《${this.item.name}》在线观看 - 黑人视频`,
            description: this.item.des,
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

![${this.item.name}](${this.item.pic})

>${this.item.des}

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

  playWithIndex(event: number[]) {
    if (this.current[0] === event[0] && this.current[1] === event[1]) {
      return;
    }
    this.current = event;
    this.destroyPlayer();
    setTimeout(() => {
      this.createPlayer();
    }, 0);
  }

  createPlayer() {
    this.circleBtn.doReset();
    this.showNextMask = false;
    const path = this.route.snapshot.url.map(segments => segments.path).join('/');
    this.location.replaceState('/' + path + '#' + this.current.join(','), '', null)
    const url = this.currentVideo.url;
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
        // todo
        // if (this.videoIndex < this.item.remote_url.length - 1) {
        //   this.showNextMask = true;
        //   this.circleBtn.doStart();
        // }
      });
      this.player.on('timeupdate', ({ detail }) => {
        if (detail.plyr.playing) {
          this.lowdbService.upsertLooekById(this.item.id, detail.plyr.currentTime, detail.plyr.duration, this.current);
        }
      });
      this.player.on('loadedmetadata', ({ detail }) => {
        const record = {
          id: this.item.id,
          name: this.item.name,
          thumbnail: this.item.pic,
          looek: detail.plyr.currentTime,
          total: detail.plyr.duration,
          current: this.current,
          created_at: new Date().getTime(),
          updated_at: new Date().getTime(),
        };
        this.lowdbService.upsertRecord(record);
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
    if (this.hls) {
      this.hls.destroy();
    }
    this.hls = null;
    // native
    this.videoElement.nativeElement.pause();
    this.videoElement.nativeElement.src = '';
  }

  handleConfirmNext() {
    // todo
    // this.playWithIndex(this.videoIndex + 1);
  }

  ngOnDestroy(): void {
    this.destroyPlayer();
  }
}
