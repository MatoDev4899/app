import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/core/services/weather.service';
import { City } from 'src/app/shared/models/City.model';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  maxDate: Date = new Date();
  minDate: Date = new Date();

  constructor(
    private weatherService: WeatherService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.minDate.setDate(this.minDate.getDate() - 18250);
    this.maxDate.setDate(this.maxDate.getDate() - 8);
  }

  watchForStoredDate(): void {
    const cityString: string = localStorage.getItem('city');
    const startDate: string = sessionStorage.getItem('date');
    const city: City = JSON.parse(cityString);
    if (!city) {
      return;
    }
    const lat: string = city.lat.toString();
    const lon: string = city.lon.toString();
    if (startDate !== null) {
      this.weatherService.coordinatesSubject.next({
        lat: lat,
        lon: lon,
        startDate: startDate,
      });
    }
  }

  submitDates(form: FormGroup): void {
    const startDate: string = this.datePipe.transform(
      form.controls['selectedDate'].value,
      'yyyy-MM-dd'
    );
    sessionStorage.setItem('date', startDate);
    if (!form.controls['selectedCity'].value) {
      return;
    }
    if (this.router.url === '/weather-data') {
      this.refreshRoute('/weather-data');
    } else {
      this.refreshRoute('/chart');
    }
    const lat: string = form.controls['selectedCity'].value.lat;
    const lon: string = form.controls['selectedCity'].value.lon;
    localStorage.setItem(
      'city',
      JSON.stringify(form.controls['selectedCity'].value)
    );
    this.weatherService.coordinatesSubject.next({
      lat: lat,
      lon: lon,
      startDate: startDate,
    });
  }

  private refreshRoute(url: string): void {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  }
}
