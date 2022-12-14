import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faTemperatureHigh,
  faClock,
  faPercent,
  faWind,
  faGem,
  faDirections,
  faWater,
  faCloud,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private library: FaIconLibrary) {}

  ngOnInit(): void {
    this.library.addIcons(
      faTemperatureHigh,
      faClock,
      faPercent,
      faWind,
      faGem,
      faDirections,
      faWater,
      faCloud
    );
  }
}
