export default class DataFetcher {

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  fetch() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: this.endpoint,
        async: true,
        dataType: 'json',
      })
        .done(data => {
          const co2 = data[0].sensors[0].cO2;
          const temperature = data[0].sensors[0].temperature;
          const humidity = data[0].sensors[0].humidity;
          const noise = data[0].sensors[0].noise;

          resolve({
            co2,
            temperature,
            humidity,
            noise,
          });
        })
        .fail(jqXHR => {
          const error = jqXHR.error();
          reject(error);
          throw new Error(error);
        });
    });
  }
}
