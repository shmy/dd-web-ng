import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver, ComponentRef,
  Directive, Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ad-host]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss']
})
export class DynamicModalComponent implements OnInit {
  @Input() dynamicComponent: any;
  @Input() componentRef: any;
  @Input() data: any;
  backgroundClickDismiss = true;
  closeVisible = true;
  // @ts-ignore
  @ViewChild(AdDirective) adHost: AdDirective;

  constructor(private resolver: ComponentFactoryResolver, private appRef: ApplicationRef) {
  }

  ngOnInit() {
    const componentFactory = this.resolver.resolveComponentFactory(this.dynamicComponent);
    const cref = this.adHost.viewContainerRef.createComponent(componentFactory) as ComponentRef<DynamicModalComponentExtended>;
    cref.instance.data = this.data;
    cref.instance.close = () => this.close();
    cref.instance.setBackgroundClickDismiss = (v: boolean) => {
      this.backgroundClickDismiss = v;
    };
    cref.instance.setCloseVisible = (v: boolean) => {
      this.closeVisible = v;
    };
  }

  handleContainerClick(e) {
    if (e.currentTarget === e.target && this.backgroundClickDismiss) {
      this.close();
    }

  }

  close() {
    this.appRef.detachView.bind(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}

export class DynamicModalComponentExtended {
  data: any;

  close() {
  }

  setBackgroundClickDismiss(v: boolean) {
  }

  setCloseVisible(v: boolean) {
  }
}
