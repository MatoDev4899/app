import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeatIndexService {
  calculateHeatIndexInFahrenheit(temperature: number, humidity: number) {
    let result =
      -42.379 +
      2.04901523 * temperature +
      10.14333127 * humidity -
      0.22475541 * temperature * humidity -
      0.00683783 * temperature * temperature -
      0.05481717 * humidity * humidity +
      0.00122874 * temperature * temperature * humidity +
      0.00085282 * temperature * humidity * humidity -
      0.00000199 * temperature * temperature * humidity * humidity;
    return result;
  }

  calculateHeatIndexInCelsius(temperature: number, humidity: number) {
    const temperatureToFahrenheit = (temperature * 9) / 5 + 32; // converts input to fahrenheit
    let result = this.calculateHeatIndexInFahrenheit(
      temperatureToFahrenheit,
      humidity
    );
    return ((result - 32) * 5) / 9; // converts result to celsius
  }

  determineCommentWhenInCelsius(result: number) {
    if (result >= 26 && result <= 32) {
      return 'Caution: fatigue is possible with prolonged exposure and activity. Continuing activity could result in heat cramps.';
    } else if (result > 32 && result <= 41) {
      return 'Extreme caution: heat cramps and heat exhaustion are possible. Continuing activity could result in heat stroke.';
    } else if (result > 42 && result <= 54) {
      return 'Danger: heat cramps and heat exhaustion are likely; heat stroke is probable with continued activity.';
    } else {
      return 'Extreme danger: heat stroke is imminent.';
    }
  }

  determineCommentWhenInFahrenheit(result: number) {
    if (result >= 80 && result <= 90) {
      return 'Caution: fatigue is possible with prolonged exposure and activity. Continuing activity could result in heat cramps.';
    } else if (result > 90 && result <= 105) {
      return 'Extreme caution: heat cramps and heat exhaustion are possible. Continuing activity could result in heat stroke.';
    } else if (result > 105 && result <= 130) {
      return 'Danger: heat cramps and heat exhaustion are likely; heat stroke is probable with continued activity.';
    } else {
      return 'Extreme danger: heat stroke is imminent.';
    }
  }

  constructor() {}
}
