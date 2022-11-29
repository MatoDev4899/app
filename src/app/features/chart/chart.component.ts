import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Dataset } from 'src/app/shared/models/Dataset.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  showError: string;
  basicData: any;
  basicOptions: any;
  private componentDestroyed$: Subject<boolean> = new Subject();
  weatherDataLoading: boolean;

  constructor(
    private weatherService: WeatherService,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.weatherService
      .getWeatherData()
      .pipe(
        finalize(() => (this.weatherDataLoading = false)),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe({
        next: (historicalWeatherData) => {
          const temperatures = historicalWeatherData.hourly.temperature_2m;
          const times = historicalWeatherData.hourly.time.map((item) =>
            this.datePipe.transform(item, 'hh:mm')
          );

          this.basicData = {
            labels: times,
            datasets: [
              new Dataset('Temperature', temperatures, false, '#42A5F5', 0.4),
            ],
          };
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
