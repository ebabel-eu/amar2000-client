// Convert the input from the web api with front-end objects.
export default class DataConverter {
  constructor(input) {
    this.input = input;
  }

  convert() {
    const result = {
      co2: this.input[0].sensors[0].cO2,
      temperature: this.input[0].sensors[0].temperature,
      minimumTemperature: this.input[0].sensors[0].minimumTemperature,
      maximumTemperature: this.input[0].sensors[0].maximumTemperature,
      humidity: this.input[0].sensors[0].humidity,
      noise: this.input[0].sensors[0].noise,
    };

    return result;
  }
}
