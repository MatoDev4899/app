import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { DatePipe } from '@angular/common';
import { ChartData } from 'src/app/shared/models/ChartData.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  errorMessage: string;
  chartData: ChartData = new ChartData([], []);
  private componentDestroyed$: Subject<boolean> = new Subject();
  weatherDataLoading: boolean;

  constructor(
    private weatherService: WeatherService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.weatherDataLoading = true;
    this.weatherService
      .getWeatherDataForChart()
      .pipe(
        finalize(() => (this.weatherDataLoading = false)),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe({
        next: (chartData: ChartData) => {
          const labels: string[] = chartData.labels.map((time: string) =>
            this.datePipe.transform(time, 'shortTime')
          );
          this.chartData = new ChartData(labels, chartData.datasets);
        },
        error: (error: Error) => {
          this.errorMessage = `${error.name}. Check your connection or try refreshing the page`;
        },
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
