import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drag-bar',
  templateUrl: './drag-bar.component.html',
  styleUrls: ['./drag-bar.component.scss']
})
export class DragBarComponent {
  onDrag: 'horizontal' | 'vertical' | null = null;

  @ViewChild('container') container!: ElementRef<HTMLElement>;
  @ViewChild('verticalBar') verticalBar!: ElementRef<HTMLElement>;
  @ViewChild('horizontalBar') horizontalBar!: ElementRef<HTMLElement>;

  hanldeDragStart(direction: 'horizontal' | 'vertical') {
    this.onDrag = direction;
  }

  handleDragMove(event: MouseEvent) {
    if (this.onDrag === 'horizontal') {
      this.horizontalBar.nativeElement.style.top = event.clientY - this.container.nativeElement.getBoundingClientRect().top + 'px';
    } else if (this.onDrag === 'vertical') {
      this.verticalBar.nativeElement.style.left = event.clientX - this.container.nativeElement.getBoundingClientRect().left + 'px';
    }
  }

  handleDragEnd() {
    this.onDrag = null;
  }
}
