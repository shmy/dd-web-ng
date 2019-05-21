import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from './video.service';
import {reject} from 'q';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get logged(): boolean {
    return !!UserService.token;
  }
  static token = '';

  constructor(private httpClient: HttpClient) {
  }

  login(body) {
    return this.httpClient.post(baseUrl + '/user/login', body);
  }

  register(body) {
    return this.httpClient.post(baseUrl + '/user/register', body);
  }
}
