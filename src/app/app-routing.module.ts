import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { trickRoutes } from './tricks/tricks-routing.module';
import { DragTheBoxesComponent } from './tricks/pages/drag-the-boxes/drag-the-boxes.component';

const routes: Routes = [
  { path: '', component: DragTheBoxesComponent },
  { path: 'tricks', children: trickRoutes },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
