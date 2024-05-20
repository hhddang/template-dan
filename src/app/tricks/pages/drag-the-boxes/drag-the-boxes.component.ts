import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Box, CONTAINER_LIST } from './data';

@Component({
  selector: 'app-drag-the-boxes',
  templateUrl: './drag-the-boxes.component.html',
  styleUrls: ['./drag-the-boxes.component.scss'],
})
export class DragTheBoxesComponent {
  containerList = CONTAINER_LIST;
  onDragging: boolean = false;
  @ViewChildren('container') containerElements!: QueryList<ElementRef<HTMLElement>>;

  handleMouseDown() {
    this.onDragging = true;
  }

  handleTouchStart() {
    this.onDragging = true;
  }

  handleMouseMove(event: MouseEvent) {
    event.preventDefault();
    if (this.onDragging) {
      let targetBox = event.target as HTMLElement & { dragging: boolean; };
      targetBox.style.position = 'fixed';
      targetBox.style.left = event.clientX + 'px';
      targetBox.style.top = event.clientY + 'px';
      targetBox.style.transform = 'translate(-50%, -50%)';
      targetBox.style.width = '200px';
      targetBox.style.height = '50px';
      targetBox.style.borderRadius = '12px';
      targetBox.dragging = true;
    }
  }

  handleTouchMove(event: TouchEvent) {
    event.preventDefault();
    if (this.onDragging) {
      let targetBox = event.target as HTMLElement & { dragging: boolean; };
      targetBox.style.position = 'fixed';
      targetBox.style.left = event.touches[0].clientX + 'px';
      targetBox.style.top = event.touches[0].clientY + 'px';
      targetBox.style.transform = 'translate(-50%, -50%)';
      targetBox.style.width = '200px';
      targetBox.style.height = '50px';
      targetBox.style.borderRadius = '12px';
      targetBox.dragging = true;
    }
  }

  handleMouseUp(event: MouseEvent, box: Box) {
    let selectedContainerIndex = this.checkMouseInsideContainer(event.clientX, event.clientY);
    let currentContainer = this.containerList.filter(container => container.includes(box))[0];
    let currentIndex = this.containerList.indexOf(currentContainer);

    this.containerList[currentIndex] = currentContainer.filter(ibox => ibox !== box);
    if (selectedContainerIndex < 0) {
      this.containerList[currentIndex].push(box);
    } else {
      this.containerList[selectedContainerIndex].push(box);
    }

    this.onDragging = false;
  }

  handleTouchEnd(event: TouchEvent, box: Box) {
    let selectedContainerIndex = this.checkMouseInsideContainer(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    let currentContainer = this.containerList.filter(container => container.includes(box))[0];
    let currentIndex = this.containerList.indexOf(currentContainer);

    this.containerList[currentIndex] = currentContainer.filter(ibox => ibox !== box);
    if (selectedContainerIndex < 0) {
      this.containerList[currentIndex].push(box);
    } else {
      this.containerList[selectedContainerIndex].push(box);
    }

    this.onDragging = false;
  }

  checkMouseInsideContainer(x: number, y: number): number {
    let containerElement = this.containerElements.filter(containerElement => {
      let boundingContainerElement = containerElement.nativeElement.getBoundingClientRect();
      if (x > boundingContainerElement.left && x < boundingContainerElement.right && y > boundingContainerElement.top && y < boundingContainerElement.bottom) {
        return true;
      }
      return false;
    })[0];

    let selectedContainerIndex = this.containerElements.toArray().indexOf(containerElement);
    // If index < 0 (-1) then the mouse is out of the containers
    // Else index = 0, 1, 2 then the mouse is inside container index 0, 1, 2

    return selectedContainerIndex;
  }
}
