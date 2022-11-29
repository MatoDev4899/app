import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherDataItem } from 'src/app/shared/models/WeatherDataItem.model';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  faTemperatureHigh,
  faClock,
  faPercent,
  faWind,
  faGem,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.scss'],
})
export class WeatherDataComponent implements OnInit, OnDestroy {
  showError: string;
  weatherData: WeatherDataItem[] = [];
  private componentDestroyed$: Subject<boolean> = new Subject();
  weatherDataLoading: boolean;
  temperatureIcon = faTemperatureHigh;
  timeIcon = faClock;
  humidityIcon = faPercent;
  windIcon = faWind;
  pressureIcon = faGem;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherDataLoading = true;
    this.weatherService
      .getWeatherData()
      .pipe(
        finalize(() => (this.weatherDataLoading = false)),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe({
        next: (historicalWeatherData) => {
          const temperatures = historicalWeatherData.hourly.temperature_2m;
          const times = historicalWeatherData.hourly.time;
          const humidities =
            historicalWeatherData.hourly.relativehumidity_2m || [];
          const windSpeeds = historicalWeatherData.hourly.windspeed_10m || [];
          const airPressures =
            historicalWeatherData.hourly.surface_pressure || [];

          temperatures.forEach((value, i) => {
            this.weatherData.push(
              new WeatherDataItem(
                temperatures[i],
                times[i],
                humidities[i],
                windSpeeds[i],
                airPressures[i]
              )
            );
          });
        },
        error: () =>
          (this.showError =
            'Something went wrong. Please try refreshing the page'),
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
