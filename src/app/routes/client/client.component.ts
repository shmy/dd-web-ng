import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  appClients = [
    {
      platform: 'Android',
      icon: 'icon-android',
      color: '#79C05E',
      extension: 'apk',
      link: 'http://moqingchi.gz01.bdysite.com/dd_app/app-release.apk'
    },
    {
      platform: 'IOS',
      color: '#DF5095',
      icon: 'icon-apple',
      extension: 'ipa',
      link: ''
    },
  ];
  desktopClients = [
    {
      platform: 'Windows',
      color: '#0F69B5',
      icon: 'icon-windows',
      extension: 'exe',
      link: ''
    },
    {
      platform: 'Mac OS',
      icon: 'icon-macOS',
      color: '#0F151D',
      extension: 'dmg',
      link: ''
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}