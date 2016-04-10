import React, { Component } from 'react';

import PageHeader from '../page-header/page-header';
import Panel from '../panel/panel';
import DataFetcher from './data-fetcher.js';
import DataSyncer from './data-syncer.js';
import Ranges from './ranges.js';
import SplashScreen from './splashscreen';
import TemperatureUnit from './temperature-unit.js';
import TimerMixin from 'react-timer-mixin';

import * as _ from '../../constants.js';

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

    document.addEventListener('sync-data', this.syncData.bind(this), _.USE_CAPTURE);

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

    const co2Ranges = new Ranges(
      _.CO2_LOWEST,
      _.CO2_LOW,
      _.CO2_HIGH,
      _.CO2_HIGHEST
    );

    const temperatureRanges = new Ranges(
      _.TEMPERATURE_LOWEST,
      _.TEMPERATURE_LOW,
      _.TEMPERATURE_HIGH,
      _.TEMPERATURE_HIGHEST
    );

    const humidityRanges = new Ranges(
      _.HUMIDITY_LOWEST,
      _.HUMIDITY_LOW,
      _.HUMIDITY_HIGH,
      _.HUMIDITY_HIGHEST
    );

    const noiseRanges = new Ranges(
      _.NOISE_LOWEST,
      _.NOISE_LOW,
      _.NOISE_HIGH,
      _.NOISE_HIGHEST
    );

    const minimumTemperature = this.state.data.minimumTemperature;
    const maximumTemperature = this.state.data.maximumTemperature;
    const temperatureUnit = new TemperatureUnit(minimumTemperature, maximumTemperature);
    const temperatureUnitText = temperatureUnit.getText();

    if (data.co2 !== null) {
      return (
        <div className="container">
          <PageHeader title="Zone 1" subtitle="Circle A" />
          <div className="circles">
            <Panel title="CO₂" type="co2" unit="ppm"
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
            <div className="zoneblock">
              <span className="zone">zone1</span>
              <span className="dot"></span> Normal <br />
              <span className="zone">zone2</span>
              <span className="dot warning"></span> Humidity high <br />
              <span className="zone">zone3</span>
              <span className="dot danger"></span> Bad
            </div>

            <div className="zoneblock">
              <span className="zone">zone4</span>
              <span className="dot"></span> Normal <br />
              <span className="zone">zone5</span>
              <span className="dot warning"></span> Normal <br />
              <span className="zone">zone6</span>
              <span className="dot warning"></span> CO₂ average
            </div>
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
