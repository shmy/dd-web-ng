import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, zip} from 'rxjs';
import {environment} from '../../environments/environment';

export const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private httpClient: HttpClient) {
  }

  getRecommended() {
    return zip(
      // this.http.get<any>(baseUrl + '/video/new?pid=1'),
      // this.http.get<any>(baseUrl + '/video/new?pid=2'),
      // this.http.get<any>(baseUrl + '/video/new?pid=3'),
      // this.http.get<any>(baseUrl + '/video/new?pid=4'),
      this.httpClient.get<any>(baseUrl + '/video/hot?pid=1'),
      this.httpClient.get<any>(baseUrl + '/video/hot?pid=2'),
      this.httpClient.get<any>(baseUrl + '/video/hot?pid=3'),
      this.httpClient.get<any>(baseUrl + '/video/hot?pid=4'),
    );
  }

  getVideoInfo(id: string) {
    return this.httpClient.get<any>(baseUrl + '/video/detail/' + id);
  }

  getVideoListByPage(pid, sort, area, year, source: string, page: number = 1, per_page: number = 20) {
    return this.httpClient.get<any>(baseUrl + '/video/' + pid, {
      params: {
        sort,
        area,
        year,
        source,
        page: page.toString(),
        per_page: per_page.toString(),
      }
    });
  }

  getVideoSearchResult(keyword: string) {
    if (!keyword.trim()) {
      return of([]);
    }
    return this.httpClient.get<any>(baseUrl + '/video/search', {
      params: {
        keyword,
        page: '1',
        per_page: '10',
        sort: '1',
      }
    });
  }

  getVideoSearchResultByPaging(keyword, pid, sort, area, year, source, query: string, page: number = 1, per_page: number = 20) {
    if (!keyword.trim()) {
      return of({result: []});
    }
    return this.httpClient.get<any>(baseUrl + '/video/search', {
      params: {
        pid,
        sort,
        area,
        year,
        source,
        keyword,
        query,
        page: page.toString(),
        per_page: per_page.toString(),
      }
    });
  }

  checkClientForUpdate(platform, arch, currentVersion: string) {
    // latestVersion: string
    // canBeUpdated: boolean
    // releaseNotes: string
    // referenceLink: string
    return this.httpClient.get<any>(baseUrl + '/client/check-client-for-update', {
      params: {
        platform,
        arch,
        currentVersion,
      }
    });
  }
  getVideoPlayerControls() {
    return [
      'play-large', // The large play button in the center
      // 'restart', // Restart playback
      // 'rewind', // Rewind by the seek time (default 10 seconds)
      // 'play', // Play/pause playback
      // 'fast-forward', // Fast forward by the seek time (default 10 seconds)
      'progress', // The progress bar and scrubber for playback and buffering
      'current-time', // The current time of playback
      'duration', // The full duration of the media
      'mute', // Toggle mute
      'volume', // Volume control
      'captions', // Toggle captions
      // 'settings', // Settings menu
      // 'pip', // Picture-in-picture (currently Safari only)
      'airplay', // Airplay (currently Safari only)
      // 'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
      'fullscreen', // Toggle fullscreen
    ];
  }
}
