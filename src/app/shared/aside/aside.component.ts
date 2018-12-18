import { Component, OnInit } from '@angular/core';
import {AsideService} from '../../service/aside/aside.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  asideItems: AsideItem[] = [
    {
      name: '首页',
      path: '/',
      icon: 'icon-home',
    },
    {
      name: '电影',
      path: '/type/5b1362ab30763a214430d036',
      icon: 'icon-movie',
    },
    {
      name: '电视剧',
      path: '/type/5b1fce6330025ae5371a6a8a',
      icon: 'icon-tv',
    },
    {
      name: '综艺',
      path: '/type/5b1fd85730025ae5371abaed',
      icon: 'icon-KTV',
    },
    {
      name: '动漫',
      path: '/type/5b1fdbee30025ae5371ac363',
      icon: 'icon-dongman',
    }
  ];
  constructor(public asideService: AsideService) { }

  ngOnInit() {
  }
}

export interface AsideItem {
  name: string;
  path: string;
  icon: string;
}
