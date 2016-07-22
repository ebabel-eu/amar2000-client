import DataConverter from './data-converter.js';

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
           // const dataConverter = new DataConverter(data);
           // const result = dataConverter.convert();

          resolve(data);


        })
        .fail(jqXHR => {
          const error = jqXHR.error();

          reject(error);

          throw new Error(error);
        });
    });
  }
}
