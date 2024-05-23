import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragTheBoxesComponent } from './pages/drag-the-boxes/drag-the-boxes.component';
import { CarouselComponent } from './pages/carousel/carousel.component';
import { DragBarComponent } from './pages/drag-bar/drag-bar.component';

@NgModule({
  declarations: [DragTheBoxesComponent, CarouselComponent, DragBarComponent],
  imports: [CommonModule],
})
export class TricksModule { }
