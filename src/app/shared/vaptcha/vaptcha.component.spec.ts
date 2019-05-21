import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaptchaComponent } from './vaptcha.component';

describe('VaptchaComponent', () => {
  let component: VaptchaComponent;
  let fixture: ComponentFixture<VaptchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaptchaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
