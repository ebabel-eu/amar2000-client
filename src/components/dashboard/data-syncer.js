import DataConverter from './data-converter.js';
import raiseEvent from './raise-event.js';

export default class DataSyncer {
  constructor(url) {
    this.climate = $.connection.climateHub;
    $.connection.hub.url = url;
    $.connection.hub.start({ withCredentials: false });
  }

  start() {
    this.climate.client.updateZones = zones => {
      const dataConverter = new DataConverter(zones);
      const result = dataConverter.convert();

      // Raise an event so that other components listening
      // for this will be able to update their state.
      raiseEvent('sync-data', { result });
    };
  }
}
