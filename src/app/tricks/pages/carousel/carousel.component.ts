import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IMAGE_LIST } from './data';

@Component({
  selector: 'app-carousels',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {
  imageList = IMAGE_LIST;
  slidesPerShow: number = 3;
  direction: 'horizontal' | 'vertical' = 'horizontal';
  slideWidth: number = 300;
  slideHeight: number = 200;
  transitionTime: number = 300;

  private onDragging: boolean = false;
  private startSwipeEvent!: MouseEvent;
  private marginOffset: number = 0;
  private activeSlide: number = 0; // furthest to the left

  @ViewChild('carousel') carousel!: ElementRef<HTMLElement>;
  @ViewChild('viewbox') viewbox!: ElementRef<HTMLElement>;
  @ViewChild('slider') slider!: ElementRef<HTMLElement>;
  @ViewChild('slideBtnsWrapper') slideBtnsWrapper!: ElementRef<HTMLElement>;
  @ViewChildren('slideBtn') slideBtns!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('mobileSlideBtns') mobileSlideBtns!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.carousel.nativeElement.style.setProperty('--slide-width', this.slideWidth + 'px');
    this.carousel.nativeElement.style.setProperty('--slide-height', this.slideHeight + 'px');
    this.carousel.nativeElement.style.setProperty('--slide-per-show', this.slidesPerShow.toString());
    this.slider.nativeElement.style.marginLeft = '0px';
    this.slider.nativeElement.style.marginTop = '0px';
    this.slider.nativeElement.style.transition = `all ${this.transitionTime}ms`;

    if (window.innerWidth < 768) {
      this.setupCarousel('vertical');
    } else {
      this.setupCarousel('horizontal');
    }

    window.onresize = () => {
      if (window.innerWidth < 768) {
        this.setupCarousel('vertical');
      } else {
        this.setupCarousel('horizontal');
      }
    };
  }

  private setupCarousel(direction: 'horizontal' | 'vertical') {
    this.slider.nativeElement.style.transition = 'none';
    this.direction = direction;

    if (direction === 'vertical') {
      this.viewbox.nativeElement.style.width = this.slideWidth + 'px';
      this.viewbox.nativeElement.style.height = this.slideHeight * this.slidesPerShow + 'px';
      this.slider.nativeElement.style.flexDirection = 'column';
      this.slider.nativeElement.style.marginLeft = '0px';
      this.slideBtnsWrapper.nativeElement.style.flexDirection = 'column';
      this.mobileSlideBtns.nativeElement.style.display = 'flex';
      this.slideBtns.forEach(slideBtn => slideBtn.nativeElement.style.display = 'none');
    } else {
      this.viewbox.nativeElement.style.width = this.slideWidth * this.slidesPerShow + 'px';
      this.viewbox.nativeElement.style.height = this.slideHeight + 'px';
      this.slider.nativeElement.style.flexDirection = 'row';
      this.slider.nativeElement.style.marginTop = '0px';
      this.slideBtnsWrapper.nativeElement.style.flexDirection = 'row';
      this.mobileSlideBtns.nativeElement.style.display = 'none';
      this.slideBtns.forEach(slideBtn => slideBtn.nativeElement.style.display = 'block');
    }
    this.slideTo(this.activeSlide);
    setTimeout(() => {
      this.slider.nativeElement.style.transition = `all ${this.transitionTime}ms`;
    }, this.transitionTime);

    // this.slideTo(this.activeSlide);
  }

  handleSwipeStart(event: MouseEvent) {
    this.onDragging = true;
    this.startSwipeEvent = event;
  }

  handleSwipeMove(event: MouseEvent) {
    if (!this.onDragging) return;
    if (this.direction === 'vertical') {
      let offset = event.clientY - this.startSwipeEvent.clientY;
      this.slider.nativeElement.style.marginTop = this.marginOffset + offset + 'px';
    } else {
      let offset = event.clientX - this.startSwipeEvent.clientX;
      this.slider.nativeElement.style.marginLeft = this.marginOffset + offset + 'px';
    }
  }

  handleSwipeEnd(event: MouseEvent) {
    this.onDragging = false;

    if (this.direction === 'vertical') {
      this.marginOffset = Number(this.slider.nativeElement.style.marginTop.replace('px', ''));
      this.activeSlide = Math.round(this.marginOffset / this.slideHeight) * -1;
    } else {
      this.marginOffset = Number(this.slider.nativeElement.style.marginLeft.replace('px', ''));
      this.activeSlide = Math.round(this.marginOffset / this.slideWidth) * -1;
    }

    if (this.activeSlide < 0) this.activeSlide = 0;
    if (this.activeSlide > this.imageList.length - this.slidesPerShow) this.activeSlide = this.imageList.length - this.slidesPerShow;
    this.slideTo(this.activeSlide);
  }

  slideTo(index: number) {
    if (this.direction === 'vertical') {
      this.marginOffset = index * this.slideHeight * -1;
      this.slider.nativeElement.style.marginTop = this.marginOffset + 'px';
    } else {
      this.marginOffset = index * this.slideWidth * -1;
      this.slider.nativeElement.style.marginLeft = this.marginOffset + 'px';
    }
  }

  slidePrev() {
    if (this.activeSlide <= 0) return;
    this.activeSlide -= 1;
    this.slideTo(this.activeSlide);
  }

  slideNext() {
    if (this.activeSlide >= this.imageList.length - this.slidesPerShow) return;
    this.activeSlide += 1;
    this.slideTo(this.activeSlide);
  }
}
