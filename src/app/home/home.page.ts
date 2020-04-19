import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('slides', {static: false}) slides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  sIndex = 0 ;
  constructor() {}

  slideIndex() {
    this.slides.getActiveIndex().then(index => {
      this.sIndex = index;
    });

  }

  nextSlide() {
     this.slides.slideNext();
  }

  prevSlide() {
    this.slides.slidePrev();
  }

}
