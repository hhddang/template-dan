import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatAppComponent } from './chat-app/chat-app.component';

export const templateRoutes: Routes = [
    { path: 'chat-app', component: ChatAppComponent },
];

@NgModule({
    imports: [RouterModule.forChild(templateRoutes)],
    exports: [RouterModule],
})
export class TemplatesRoutingModule { }