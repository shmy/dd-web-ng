import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLazyLoadDirective } from './image-lazy-load.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImageLazyLoadDirective],
  exports: [ImageLazyLoadDirective]
})
export class ImageLazyLoadModule { }
