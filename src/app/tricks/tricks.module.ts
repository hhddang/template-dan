import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragTheBoxesComponent } from './pages/drag-the-boxes/drag-the-boxes.component';
import { CarouselComponent } from './pages/carousel/carousel.component';

@NgModule({
  declarations: [DragTheBoxesComponent, CarouselComponent],
  imports: [CommonModule],
})
export class TricksModule { }
