import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TricksRoutingModule } from './tricks/tricks-routing.module';
import { TricksModule } from './tricks/tricks.module';

@NgModule({
  declarations: [AppComponent, SidebarLayoutComponent, SidebarComponent],
  imports: [BrowserModule, AppRoutingModule, TricksRoutingModule, TricksModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
