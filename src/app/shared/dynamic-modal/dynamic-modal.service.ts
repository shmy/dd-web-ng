import {ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, TemplateRef, Type} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {DynamicModalComponent, DynamicModalComponentExtended} from './dynamic-modal.component';

export type Content<T> = string | TemplateRef<T> | Type<T>;

@Injectable({
  providedIn: 'root'
})
export class DynamicModalService {
  constructor(private resolver: ComponentFactoryResolver,
              private injector: Injector,
              private appRef: ApplicationRef,
              @Inject(DOCUMENT) private document: Document
  ) {
  }

  open<T>(content: Content<T>, data: any) {
    this.appendDialogComponentToBody(content, data);
  }

  private resolveNgContent<T>(content: Content<T>) {
    if (typeof content === 'string') {
      const element = this.document.createTextNode(content);
      return [[element]];
    }

    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(null);
      return [viewRef.rootNodes];
    }

    /** Otherwise it's a component */
    const factory = this.resolver.resolveComponentFactory(content);
    const componentRef = factory.create(this.injector);
    return [[componentRef.location.nativeElement]];
  }

  private appendDialogComponentToBody<T>(content: Content<T>, data: any) {
    const factory = this.resolver.resolveComponentFactory(DynamicModalComponent);
    const componentRef = factory.create(this.injector);
    componentRef.instance.componentRef = componentRef;
    componentRef.instance.dynamicComponent = content;
    componentRef.instance.data = data;
    this.appRef.attachView(componentRef.hostView);
    const {nativeElement} = componentRef.location;
    this.document.body.appendChild(nativeElement);
  }

}
