import React, { Component } from 'react';

import PageHeader from '../page-header/page-header';
import Panel from '../panel/panel';
import DataFetcher from './data-fetcher.js';
import DataSyncer from './data-syncer.js';
import Ranges from './ranges.js';
import SplashScreen from './splashscreen';
import TemperatureUnit from './temperature-unit.js';
import TimerMixin from 'react-timer-mixin';

import USE_CAPTURE from '../../constants.js';

import './dashboard.scss';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.dataFetcher = new DataFetcher('//amar2000.azurewebsites.net/api/climate');
    this.dataSyncer = new DataSyncer('//amar2000.azurewebsites.net/signalr/hubs');
    this.state = {
      data: {
        co2: null,
        temperature: null,
        humidity: null,
        noise: null,
      },
    };
  }

  componentDidMount() {
    TimerMixin.setTimeout(() => {
      this.dataFetcher.fetch()
        .then(data => {
          this.setState({
            data,
          });
        })
        .catch(error => {
          throw new Error(error);
        });
    }, 5000);

    document.addEventListener('sync-data', this.syncData.bind(this), USE_CAPTURE);

    this.dataSyncer.start();
  }

  syncData(input) {
    const data = input.detail.result;
    this.setState({
      data,
    });
  }

  render() {
    const data = this.state.data;

    const co2Ranges = new Ranges(300, 400, 700, 800);
    const temperatureRanges = new Ranges(19, 21, 24, 26);
    const humidityRanges = new Ranges(30, 40, 60, 70);
    const noiseRanges = new Ranges(10, 30, 47, 68);

    const minimumTemperature = this.state.data.minimumTemperature;
    const maximumTemperature = this.state.data.maximumTemperature;
    const temperatureUnit = new TemperatureUnit(minimumTemperature, maximumTemperature);
    const temperatureUnitText = temperatureUnit.getText();

    if (data.co2 !== null) {
      return (
        <div className="container">
          <PageHeader title="Zone 1" subtitle="Circle A" />
          <div className="circles">
            <Panel title="CO2" type="co2" unit="ppm"
              data={this.state.data.co2} ranges={co2Ranges}
            />
            <Panel title="Temperature" type="temperature" unit={temperatureUnitText}
              data={this.state.data.temperature} ranges={temperatureRanges}
              dataUnit="°"
            />
            <Panel title="Humidity" type="humidity" unit="%"
              data={this.state.data.humidity} ranges={humidityRanges}
            />
            <Panel title="Noise" type="noise" unit="dB"
              data={this.state.data.noise} ranges={noiseRanges}
            />
          </div>
          <div className="zones">
            <h1>Condition Zones</h1>
            <span className="zone">zone1</span> <span className="dot">&middot; </span>Normal <br/>
            <span className="zone">zone1</span> <span className="dot warning">&middot;</span> Humidity high <br/>
            <span className="zone">zone1</span> <span className="dot danger">&middot; </span>Bad
          </div>
        </div>
      );
    }


    return (
      <div className="container">
        <SplashScreen />
      </div>
    );
  }
}
