import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/shared/models/WeatherData.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      'https://archive-api.open-meteo.com/v1/era5?latitude=51.51&longitude=-0.13&start_date=2005-08-25&end_date=2005-08-25&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,surface_pressure,precipitation,windspeed_10m&timezone=Europe%2FLondon'
    );
  }
}
