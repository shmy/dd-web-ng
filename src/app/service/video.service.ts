import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

const baseUrl = 'https://dd.shmy.tech/api/client';
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private http: HttpClient) { }
  getRecommended() {
    return this.http.get<any>(baseUrl + '/recommended');
  }
  getVideoInfo(id: string) {
    return this.http.get<any>(baseUrl + '/video/' + id);
  }
  getVideoListByPage(id: string, page: number = 1, per_page: number = 20) {
    return this.http.get<any>(baseUrl + '/classification/' + id, {
      params: {
        page: page.toString(),
        per_page: per_page.toString(),
      }
    });
  }
  getVideoSearchResult(keyword: string) {
    if (!keyword.trim()) {
      return of({ result: [] });
    }
    return this.http.get<any>(baseUrl + '/video/search', {
      params: {
        keyword,
        page: '1',
        per_page: '10',
        sort: '1',
      }
    });
  }
  getVideoSearchResultByPaging(keyword: string, page: number = 1, per_page: number = 20) {
    if (!keyword.trim()) {
      return of({ result: [] });
    }
    return this.http.get<any>(baseUrl + '/video/search', {
      params: {
        keyword,
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
    return this.http.get<any>(baseUrl + '/client/check-client-for-update', {
      params: {
        platform,
        arch,
        currentVersion,
      }
    });
  }
}
