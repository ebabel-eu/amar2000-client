export default class TemperatureUnit {
  constructor(minimumTemperature, maximumTemperature) {
    this.minimumTemperature = minimumTemperature;
    this.maximumTemperature = maximumTemperature;
  }

  getText() {
    if (this.minimumTemperature && this.maximumTemperature) {
      return `\u2193${this.minimumTemperature}\xB0 \u2191${this.maximumTemperature}\xB0`;
    }

    return '';
  }
}
