import { Component, OnInit } from '@angular/core';
// @ts-ignore
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  handleDownload() {
    // @ts-ignore
    FluentFFmpeg('https://youku163.zuida-bofang.com/20180724/9929_c2e11975/index.m3u8')
      .on('progress', function(progress) {
        console.log('Processing: ' + progress.percent + '% done');
      })
      .on('error', error => {
        console.log(error);
      })
      .on('end', () => {
        console.log('end');
      })
      .inputOptions('-threads 100')
      .outputOptions('-c copy')
      .outputOptions('-bsf:a aac_adtstoasc')
      .output('/Users/shmy/code/angular/dd-web/1.mp4')
      .run();
  }

}
