import { Component } from '@angular/core';
import { ISidebarItem } from 'src/app/types';
import { TRICK_LIST, TEMPLATE_LIST } from './data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpened: boolean = false;
  trickList: ISidebarItem[] = TRICK_LIST;
  templateList: ISidebarItem[] = TEMPLATE_LIST;
  mode: 'trick' | 'template' = 'trick';

  public toggleIsOpened() {
    this.isOpened = !this.isOpened;
  }
}