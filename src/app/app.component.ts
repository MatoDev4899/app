import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
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
  items: MenuItem[];

  constructor(private router: Router, private library: FaIconLibrary) {}

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

    this.items = [
      {
        label: 'Weather Data',
        icon: 'pi pi-fw pi-table',
        command: () => {
          this.router.navigate(['/weather-data']);
        },
      },
      {
        label: 'Chart',
        icon: 'pi pi-fw pi-chart-line',
        command: () => {
          this.router.navigate(['/chart']);
        },
      },
      {
        label: 'Heat Index Calculator',
        icon: 'pi pi-fw pi-calculator',
        command: () => {
          this.router.navigate(['/heat-index']);
        },
      },
    ];
  }
}
