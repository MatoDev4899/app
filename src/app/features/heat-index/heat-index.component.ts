import { Component, OnInit } from '@angular/core';
import { Temperature } from 'src/app/shared/models/Temp.model';
import { HeatIndexService } from 'src/app/core/services/heat-index.service';

@Component({
  selector: 'app-heat-index',
  templateUrl: './heat-index.component.html',
  styleUrls: ['./heat-index.component.scss'],
})
export class HeatIndexComponent implements OnInit {
  haveResult: boolean = false;
  temperature: any;
  humidity: number;
  temps: Temperature[];
  selectedTemp: Temperature;
  result: number;
  resultComment: string;

  constructor(private heatIndexService: HeatIndexService) {
    this.temps = [
      {
        units: 'Celsius',
        code: 'C',
      },
      {
        units: 'Fahrenheit',
        code: 'F',
      },
    ];
  }

  ngOnInit(): void {}

  calculateHeatIndex(temperature: number, humidity: number) {
    this.haveResult = true;
    if (this.selectedTemp.code === 'C') {
      this.result = this.heatIndexService.calculateHeatIndexInCelsius(
        temperature,
        humidity
      );
    } else {
      this.result = this.heatIndexService.calculateHeatIndexInFahrenheit(
        temperature,
        humidity
      );
    }
  }

  determineEffectOfHeatIndexTemperature(result: number) {
    if (this.selectedTemp.code == 'C') {
      this.resultComment =
        this.heatIndexService.determineCommentWhenInCelsius(result);
    } else {
      this.resultComment =
        this.heatIndexService.determineCommentWhenInFahrenheit(result);
    }
  }

  reset() {
    this.haveResult = false;
    this.temperature = undefined;
    this.humidity = undefined;
  }
}
