import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IMAGE_LIST } from './data';

@Component({
  selector: 'app-carousels',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  imageList = IMAGE_LIST;
  slidesPerShow: number = 3;
  direction: 'horizontal' | 'vertical' = 'horizontal';
  slideWidth: number = 300;
  slideHeight: number = 200;
  transitionTime: number = 300;
  autoPlay: number = 2500;

  onDragging: boolean = false;
  startSwipeEvent!: MouseEvent;
  marginOffset: number = 0;
  activeSlide: number = 0; // furthest to the left

  @ViewChild('slider') slider!: ElementRef<HTMLElement>;
  @ViewChild('slideList') slideList!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.setupCarouselOnResize();
    this.autoPlay && this.setupAutoPlay();
    window.onresize = () => {
      this.slideList.nativeElement.style.transition = 'none';
      this.setupCarouselOnResize();
    };
  }

  setupCarouselOnResize() {
    if (window.innerWidth < 768) {
      this.slidesPerShow = 3;
      if (window.innerHeight / (this.slideHeight * this.slidesPerShow) < 1.3) {
        this.slidesPerShow = 1;
      };
      this.setupCarousel('vertical');
    } else {
      this.slidesPerShow = 3;
      if (window.innerWidth / (this.slideWidth * this.slidesPerShow) < 1.1) {
        this.slidesPerShow = 2;
      }
      this.setupCarousel('horizontal');
    }
  }

  setupCarousel(direction: 'horizontal' | 'vertical') {
    this.slider.nativeElement.style.setProperty('--slide-width', this.slideWidth + 'px');
    this.slider.nativeElement.style.setProperty('--slide-height', this.slideHeight + 'px');
    this.slider.nativeElement.style.setProperty('--slide-per-show', this.slidesPerShow.toString());
    this.direction = direction;

    if (direction === 'vertical') {
      this.slider.nativeElement.style.width = this.slideWidth + 'px';
      this.slider.nativeElement.style.height = this.slideHeight * this.slidesPerShow + 'px';
      this.slideList.nativeElement.style.flexDirection = 'column';
      this.slideList.nativeElement.style.marginLeft = '0px';
    } else {
      this.slider.nativeElement.style.width = this.slideWidth * this.slidesPerShow + 'px';
      this.slider.nativeElement.style.height = this.slideHeight + 'px';
      this.slideList.nativeElement.style.flexDirection = 'row';
      this.slideList.nativeElement.style.marginTop = '0px';
    }

    this.slideTo(this.activeSlide);

    setTimeout(() => {
      this.slideList.nativeElement.style.transition = `all ${this.transitionTime}ms`;
    }, this.transitionTime);
  }

  handleSwipeStart(event: MouseEvent) {
    this.onDragging = true;
    this.startSwipeEvent = event;
  }

  handleSwipeMove(event: MouseEvent) {
    if (!this.onDragging) return;
    if (this.direction === 'vertical') {
      let offset = event.clientY - this.startSwipeEvent.clientY;
      this.slideList.nativeElement.style.marginTop =
        this.marginOffset + offset + 'px';
    } else {
      let offset = event.clientX - this.startSwipeEvent.clientX;
      this.slideList.nativeElement.style.marginLeft =
        this.marginOffset + offset + 'px';
    }
  }

  handleSwipeEnd(event: MouseEvent) {
    this.onDragging = false;

    if (this.direction === 'vertical') {
      this.marginOffset = Number(
        this.slideList.nativeElement.style.marginTop.replace('px', '')
      );
      this.activeSlide = Math.round(this.marginOffset / this.slideHeight) * -1;
    } else {
      this.marginOffset = Number(
        this.slideList.nativeElement.style.marginLeft.replace('px', '')
      );
      this.activeSlide = Math.round(this.marginOffset / this.slideWidth) * -1;
    }

    if (this.activeSlide < 0) this.activeSlide = 0;
    if (this.activeSlide > this.imageList.length - this.slidesPerShow)
      this.activeSlide = this.imageList.length - this.slidesPerShow;
    this.slideTo(this.activeSlide);
  }

  slideTo(index: number) {
    this.activeSlide = index;
    if (this.direction === 'vertical') {
      this.marginOffset = index * this.slideHeight * -1;
      this.slideList.nativeElement.style.marginTop = this.marginOffset + 'px';
    } else {
      this.marginOffset = index * this.slideWidth * -1;
      this.slideList.nativeElement.style.marginLeft = this.marginOffset + 'px';
    }
  }

  slidePrev() {
    this.activeSlide -= 1;
    if (this.activeSlide < 0) this.activeSlide = this.imageList.length - this.slidesPerShow;
    this.slideTo(this.activeSlide);
  }

  slideNext() {
    this.activeSlide += 1;
    if (this.activeSlide > this.imageList.length - this.slidesPerShow) this.activeSlide = 0;
    this.slideTo(this.activeSlide);
  }

  setupAutoPlay() {
    setInterval(() => {
      this.slideNext();
    }, this.autoPlay);
  }
}
