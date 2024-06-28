import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragTheBoxesComponent } from './tricks/pages/drag-the-boxes/drag-the-boxes.component';
import { trickRoutes } from './tricks/tricks-routing.module';
import { templateRoutes } from './templates/templates-routing.module';

const routes: Routes = [
  { path: '', component: DragTheBoxesComponent },
  { path: 'tricks', children: trickRoutes },
  { path: 'templates', children: templateRoutes },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }