import { HourlyUnits } from './HourlyUnits.model';
import { Hourly } from './Hourly.model';

export class WeatherData {
  constructor(
    public latitude: number,
    public longitude: number,
    public generationtime_ms: number,
    public utc_offset_seconds: number,
    public timezone: string,
    public timezone_abbreviation: string,
    public elevation: number,
    public hourly_units: HourlyUnits,
    public hourly: Hourly
  ) {}
}
