import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Box, CONTAINER_LIST } from './data';

@Component({
  selector: 'app-drag-the-boxes',
  templateUrl: './drag-the-boxes.component.html',
  styleUrls: ['./drag-the-boxes.component.scss'],
})
export class DragTheBoxesComponent implements AfterViewInit {
  containerList = CONTAINER_LIST;
  onDragging: boolean = false;
  @ViewChildren('container') containerElements!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.containerElements.forEach((a) => console.log(a.nativeElement));
  }

  handleMouseDown() {
    this.onDragging = true;
  }

  handleMouseMove(event: MouseEvent, box: Box) {
    event.preventDefault();
    if (this.onDragging) {
      let targetBox = event.target as HTMLElement;
      // targetBox.style.pointerEvents = 'none';
      targetBox.style.position = 'fixed';
      targetBox.style.top = event.clientY + 'px';
      targetBox.style.left = event.clientX + 'px';
      targetBox.style.transform = 'translate(-50%, -50%)';
      targetBox.style.width = '200px';
      targetBox.style.height = '50px';
      targetBox.style.borderRadius = '12px';

      let aaa = document.querySelector('.container-list')!;
      aaa.appendChild(targetBox);
    }
  }

  handleMouseUp() {
    this.onDragging = false;
    console.log(12345);
  }

  handleMouseEnter(id: string) {
    console.log('container ' + id);
    if (this.onDragging) {
    }
  }

  handleDragOver() {
    console.log('over');
  }
}
