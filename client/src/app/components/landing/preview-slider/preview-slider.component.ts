import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-preview-slider',
  templateUrl: './preview-slider.component.html',
  styleUrls: ['./preview-slider.component.css']
})
export class PreviewSliderComponent implements OnInit {

  // images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images = ["../../../../assets/images/slider/happypeople2.png", "../../../../assets/images/slider/happypeopleinthesupermarket.png", "../../../../assets/images/slider/sale.png", "../../../../assets/images/slider/online.png"]
  
  constructor(config: NgbCarouselConfig) { 
    // customize default values of carousels used by this component tree
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.wrap = true;
    config.showNavigationIndicators = false
  }
  ngOnInit(): void {
  }

}
