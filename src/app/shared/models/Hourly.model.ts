export class Hourly {
  constructor(
    public time: string[],
    public temperature_2m: number[],
    public relativehumidity_2m: number[],
    public dewpoint_2m: number[],
    public apparent_temperature: number[],
    public surface_pressure: number[],
    public precipitation: number[],
    public windspeed_10m: number[]
  ) {}
}
