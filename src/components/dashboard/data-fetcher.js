export default class DataFetcher {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    fetch() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: this.endpoint,
                async: false,
                contentType: "text/plain",
                dataType: 'json'
            })
              .done(()=> {
                  console.log( "success" );
              })
              .fail(()=> {
                  console.log( "error" );
              })
              .always(()=> {
                  console.log( "complete" );
              });
        });
    }
}