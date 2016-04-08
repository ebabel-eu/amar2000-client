export default class DataSyncer {
  constructor() {
    this.climate = $.connection.climateHub;
    $.connection.hub.url = '//amar2000.azurewebsites.net/signalr/hubs';
    $.connection.hub.start({ withCredentials: false });
  }

  start() {
    this.climate.client.updateZones = zones => {
      console.log(zones);
    };
  }
}
