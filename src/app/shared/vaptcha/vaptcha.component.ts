import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-vaptcha',
  templateUrl: './vaptcha.component.html',
  styleUrls: ['./vaptcha.component.scss']
})
export class VaptchaComponent implements OnInit {
  @ViewChild('vaptchaContainer') vaptchaContainer;
  @Input('scene') scene = '01';
  vaptchaObj: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this.scene);
    // @ts-ignore
    window.vaptcha({
      // 配置参数
      vid: '5ce205cbfc650e0ab4eaed42', // 验证单元id
      type: 'click', // 展现类型 点击式
      https: true,
      scene: this.scene,
      container: this.vaptchaContainer.nativeElement // 按钮容器，可为Element 或者 selector
    }).then(vaptchaObj => {
      this.vaptchaObj = vaptchaObj;
      this.vaptchaObj.render(); // 调用验证实例 vaptchaObj 的 render 方法加载验证按钮
    });
  }

  reset() {
    this.vaptchaObj.reset();
  }

  getToken() {
    return this.vaptchaObj.getToken();
  }

}
