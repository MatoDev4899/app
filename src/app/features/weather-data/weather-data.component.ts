import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherDataItem } from 'src/app/shared/models/WeatherDataItem.model';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.scss'],
})
export class WeatherDataComponent implements OnInit, OnDestroy {
  filterSwitch = '';
  errorMessage: string;
  weatherData: WeatherDataItem[] = [];
  private componentDestroyed$: Subject<boolean> = new Subject();
  weatherDataLoading: boolean;
  sliderValues: number[] = [0, 100];
  filterFields: string[] = [
    'time',
    'temperature',
    'humidity',
    'wind',
    'pressure',
    'direction',
    'precipitation.didRain',
    'rain',
    'cloudcover',
    'soilTemperature',
  ];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.filterFields = [
      'time',
      'temperature',
      'humidity',
      'wind',
      'pressure',
      'direction',
      'precipitation.didRain',
      'rain',
      'cloudcover',
      'soilTemperature',
    ];
    this.weatherDataLoading = true;
    this.weatherService
      .getWeatherDataForTable()
      .pipe(
        finalize(() => (this.weatherDataLoading = false)),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe({
        next: (historicalWeatherData: WeatherDataItem[]) => {
          this.weatherData = historicalWeatherData;
          this.weatherData.forEach((item: WeatherDataItem) => {
            item.direction = this.weatherService.convertWindDirection(
              parseFloat(item.direction)
            );
            item.precipitation = Object.assign({
              amount: item.precipitation,
              didRain: item.precipitation > 0,
            });
          });
        },
        error: (error: Error) => {
          this.errorMessage = `${error.name}. Check your connection or try refreshing the page`;
        },
      });
  }

  get windDirections(): Object[] {
    return this.weatherService.windDirections;
  }

  clearFilters(table: Table): void {
    table.clear();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
