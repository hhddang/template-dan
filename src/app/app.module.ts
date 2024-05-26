import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TricksRoutingModule } from './tricks/tricks-routing.module';
import { TricksModule } from './tricks/tricks.module';
import { TemplatesRoutingModule } from './templates/templates-routing.module';
import { TemplatesModule } from './templates/templates.module';

@NgModule({
  declarations: [AppComponent, SidebarLayoutComponent, SidebarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    TricksRoutingModule,
    TricksModule,
    TemplatesRoutingModule,
    TemplatesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
