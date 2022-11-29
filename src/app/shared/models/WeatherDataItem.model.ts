export class WeatherDataItem {
  constructor(
    public temperature: number,
    public time: string,
    public humidity: number,
    public wind: number,
    public pressure: number
  ) {}
}
