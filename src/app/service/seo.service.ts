import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private suffix = '';

  constructor() {
  }

  setTitle(title: string) {
    document.title = title + this.suffix;
  }

  setDescription(description: string) {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description);
    }
  }

  setKeywords(keywords: string) {
    const meta = document.querySelector('meta[name="keywords"]');
    if (meta) {
      meta.setAttribute('content', keywords);
    }
  }

  checkIsAndroidDevice() {
    const u = window.navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
      return true;
    } else {
      return false;
    }
  }
}
