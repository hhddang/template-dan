import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-drag-bar',
  templateUrl: './drag-bar.component.html',
  styleUrls: ['./drag-bar.component.scss']
})
export class DragBarComponent implements AfterViewInit {
  onDrag: 'horizontal' | 'vertical' | null = null;
  containerBounding: DOMRect | null = null;

  @ViewChild('container') container!: ElementRef<HTMLElement>;
  @ViewChild('verticalBar') verticalBar!: ElementRef<HTMLElement>;
  @ViewChild('horizontalBar') horizontalBar!: ElementRef<HTMLElement>;
  @ViewChildren('top') topSections!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('bottom') bottomSections!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('left') leftSections!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('right') rightSections!: QueryList<ElementRef<HTMLElement>>;


  ngAfterViewInit(): void {
    this.containerBounding = this.container.nativeElement.getBoundingClientRect();
    window.onresize = () => {
      this.containerBounding = this.container.nativeElement.getBoundingClientRect();
    };
  }

  hanldeDragStart(direction: 'horizontal' | 'vertical') {
    this.onDrag = direction;
  }

  handleDragMove(event: MouseEvent) {
    if (!this.containerBounding) return;

    if (this.onDrag === 'horizontal') {
      let topOffsetRatio = (event.clientY - this.containerBounding.top) * 100 / this.containerBounding.height; // percent
      this.dragHorizontalByRatio(topOffsetRatio);
    } else if (this.onDrag === 'vertical') {
      let leftOffsetRatio = (event.clientX - this.containerBounding.left) * 100 / this.containerBounding.width; // percent
      this.dragVerticalByRatio(leftOffsetRatio);
    }
  }

  handleDragEnd() {
    this.onDrag = null;
  }

  dragHorizontalByRatio(topOffsetRatio: number) {
    if (topOffsetRatio > 10 && topOffsetRatio < 90) {
      this.horizontalBar.nativeElement.style.top = topOffsetRatio + '%';
      this.topSections.forEach(section => section.nativeElement.style.height = topOffsetRatio + '%');
      this.bottomSections.forEach(section => section.nativeElement.style.height = 100 - topOffsetRatio + '%');
    }
  }

  dragVerticalByRatio(leftOffsetRatio: number) {
    if (leftOffsetRatio > 10 && leftOffsetRatio < 90) {
      this.verticalBar.nativeElement.style.left = leftOffsetRatio + '%';
      this.leftSections.forEach(section => section.nativeElement.style.width = leftOffsetRatio + '%');
      this.rightSections.forEach(section => section.nativeElement.style.width = 100 - leftOffsetRatio + '%');
    }
  }
}
