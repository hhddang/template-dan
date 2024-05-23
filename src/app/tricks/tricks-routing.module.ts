import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragTheBoxesComponent } from './pages/drag-the-boxes/drag-the-boxes.component';
import { CarouselComponent } from './pages/carousel/carousel.component';
import { DragBarComponent } from './pages/drag-bar/drag-bar.component';

export const trickRoutes: Routes = [
  { path: 'drag-the-boxes', component: DragTheBoxesComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'drag-bar', component: DragBarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(trickRoutes)],
  exports: [RouterModule],
})
export class TricksRoutingModule { }
