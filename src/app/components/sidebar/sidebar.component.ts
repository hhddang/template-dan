import { Component } from '@angular/core';
import { ISidebarItem } from 'src/app/types';
import { TRICK_ITEM_LIST } from './data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpened: boolean = false;
  itemList: ISidebarItem[] = TRICK_ITEM_LIST;
  mode: 'trick' | 'template' = 'trick';

  public toggleIsOpened() {
    this.isOpened = !this.isOpened;
  }
}
