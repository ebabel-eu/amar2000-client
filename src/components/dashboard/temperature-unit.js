export default class TemperatureUnit {
  constructor(minimumTemperature, maximumTemperature) {
    this.minimumTemperature = minimumTemperature;
    this.maximumTemperature = maximumTemperature;
  }

  getText() {
    return `${this.minimumTemperature}\xB0 ${this.maximumTemperature}\xB0`;
  }
}
