import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/shared/models/City.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  buttons: City[];

  constructor() {
    this.buttons = [
      new City('London', '51.51', '-0.13'),
      new City('Sydney', '-33.87', '151.21'),
      new City('New York', '40.71', '-74.01'),
      new City('Paris', '48.85', '2.35'),
      new City('Tokyo', '35.69', '139.69'),
      new City('Bratislava', '48.15', '17.11'),
    ];
  }

  ngOnInit(): void {}

  onCityButtonClick(button: Object): void {
    localStorage.setItem('city', JSON.stringify(button));
  }
}
