export class HourlyUnits {
  constructor(
    public time: string,
    public temperature_2m: string,
    public relativehumidity_2m: string,
    public dewpoint_2m: string,
    public apparent_temperature: string,
    public surface_pressure: string,
    public precipitation: string,
    public windspeed_10m: string
  ) {}
}
