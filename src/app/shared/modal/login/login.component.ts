import {Component, OnInit, ViewChild} from '@angular/core';
import {DynamicModalComponentExtended} from '../../dynamic-modal/dynamic-modal.component';
import {SnotifyService} from 'ng-snotify';
import {UserService} from '../../../service/user.service';
import {VaptchaComponent} from '../../vaptcha/vaptcha.component';
import {LowdbService} from '../../../service/lowdb/lowdb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends DynamicModalComponentExtended implements OnInit {
  username: string;
  password: string;
  re_password: string;
  isLogin = true;
  fetching = false;
  @ViewChild('loginUsername') loginUsername;
  @ViewChild('registerUsername') registerUsername;
  @ViewChild('loginVaptcha') loginVaptcha: VaptchaComponent;
  @ViewChild('registerVaptcha') registerVaptcha: VaptchaComponent;

  constructor(private snotifyService: SnotifyService,
              private userService: UserService,
              private lowdbService: LowdbService) {
    super();
  }

  ngOnInit() {
    // this.setBackgroundClickDismiss(false);
    // this.setCloseVisible(false);
    this.handleSwitchToLogin();
  }

  async handleLoginSubmit() {
    if (!this.username) {
      this.showWarningMessage('用户名不能为空');
      return;
    }
    if (!this.password) {
      this.showWarningMessage('密码不能为空');
      return;
    }
    const vaptcha = this.loginVaptcha.getToken();
    if (!vaptcha) {
      this.showWarningMessage('请进行人机验证', false);
      return;
    }
    const body = {
      username: this.username,
      password: this.password,
      vaptcha,
    };
    this.pending();
    this.userService.login(body).subscribe((payload: string) => {
      // 设置token
      this.lowdbService.setToken(payload);
      // 重置验证码
      this.loginVaptcha.reset();
      // 解放
      this.waiting();
      // 调用传入的回调
      this.data.done();
      // 关闭窗口
      this.close();
    }, error => {
      this.waiting();
      this.snotifyService.warning(error.message);
      this.loginVaptcha.reset();
    });

  }

  waiting() {
    this.setBackgroundClickDismiss(true);
    this.setCloseVisible(true);
    this.fetching = false;
  }

  pending() {
    this.setBackgroundClickDismiss(false);
    this.setCloseVisible(false);
    this.fetching = true;
  }

  async handleRegisterSubmit() {
    if (!this.username) {
      this.showWarningMessageRegister('用户名不能为空');
      return;
    }
    if (!this.password) {
      this.showWarningMessageRegister('密码不能为空');
      return;
    }
    if (!this.re_password) {
      this.showWarningMessageRegister('确认密码不能为空');
      return;
    }
    if (this.password !== this.re_password) {
      this.showWarningMessageRegister('两次密码输入不一致');
      return;
    }
    const vaptcha = this.registerVaptcha.getToken();
    if (!vaptcha) {
      this.showWarningMessageRegister('请进行人机验证', false);
      return;
    }
    const body = {
      username: this.username,
      password: this.password,
      re_password: this.re_password,
      vaptcha,
    };
    this.pending();
    this.userService.register(body).subscribe(payload => {
      this.waiting();
      // 重置验证码
      this.registerVaptcha.reset();
      // 转到登录
      this.handleSwitchToLogin();
      this.password = '';
      this.re_password = '';
    }, error => {
      this.waiting();
      this.snotifyService.warning(error.message);
      this.registerVaptcha.reset();
    });
  }

  handleSwitchToLogin() {
    this.isLogin = true;
    setTimeout(() => {
      this.loginUsername.nativeElement.focus();
    });
  }

  handleSwitchToRegister() {
    this.isLogin = false;
    setTimeout(() => {
      this.registerUsername.nativeElement.focus();
    });
  }

  showWarningMessage(message: string, resetVaptcha: boolean = true) {
    this.snotifyService.warning(message);
    if (resetVaptcha) {
      this.loginVaptcha.reset();
    }
  }

  showWarningMessageRegister(message: string, resetVaptcha: boolean = true) {
    this.snotifyService.warning(message);
    if (resetVaptcha) {
      this.registerVaptcha.reset();
    }
  }
}
