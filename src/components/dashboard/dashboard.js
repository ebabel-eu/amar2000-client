import React, { Component } from 'react';

import PageHeader from '../page-header/page-header';
import Panel from '../panel/panel';
import DataFetcher from './data-fetcher.js';
import Ranges from './ranges.js';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.dataFetcher = new DataFetcher('//amar2000.azurewebsites.net/api/climate');
    this.state = {
      data: {
        co2: null,
        temperature: null,
        humidity: null,
        noise: null,
      },
    };
  }
  componentWillMount() {
    this.dataFetcher.fetch()
      .then(data => {
        this.setState({
          data,
        });
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  render() {
    const data = this.state.data;

    const co2Ranges = new Ranges(300, 400, 700, 800);
    const temperatureRanges = new Ranges(19, 21, 24, 26);
    const humidityRanges = new Ranges(30, 40, 60, 70);
    const noiseRanges = new Ranges(10, 30, 47, 55);

    if (data) {
      return (
        <div className="container">
          <PageHeader title="AMAR2000" subtitle="Office environment monitoring" />

              <Panel title="CO2" type="co2" unit="ppm"
                data={this.state.data.co2} ranges={co2Ranges}
              />

              <Panel title="Temperature" type="temperature" unit="&deg;C"
                data={this.state.data.temperature} ranges={temperatureRanges}
              />

              <Panel title="Humidity" type="humidity" unit="%"
                data={this.state.data.humidity} ranges={humidityRanges}
              />

              <Panel title="Noise" type="noise" unit="dB"
                data={this.state.data.noise} ranges={noiseRanges}
              />

        </div>
      );
    }

    return (
      <div className="container">
        <p>Loading data...</p>
      </div>
    );
  }
}
