import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { SliderComponent } from './components/slider/slider.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  imports: [
    CommonModule, 
    ButtonModule
  ],
  declarations: [
    BannerComponent,
    SliderComponent,
    GalleryComponent,
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    GalleryComponent
  ]
})
export class UiModule {}
