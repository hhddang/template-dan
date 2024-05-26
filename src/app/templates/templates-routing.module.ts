import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowerShopComponent } from './pages/flower-shop/flower-shop.component';

export const templateRoutes: Routes = [
  { path: 'flower-shop', component: FlowerShopComponent },
];

@NgModule({
  imports: [RouterModule.forChild(templateRoutes)],
  exports: [RouterModule],
})
export class TemplatesRoutingModule {}
