import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragTheBoxesComponent } from './pages/drag-the-boxes/drag-the-boxes.component';
import { CarouselsComponent } from './pages/carousels/carousels.component';

@NgModule({
  declarations: [DragTheBoxesComponent, CarouselsComponent],
  imports: [CommonModule],
})
export class TricksModule {}
