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
import CO2_LOWEST from '../../constants.js';
import CO2_LOW from '../../constants.js';
import CO2_HIGH from '../../constants.js';
import CO2_HIGHEST from '../../constants.js';
import TEMPERATURE_LOWEST from '../../constants.js';
import TEMPERATURE_LOW from '../../constants.js';
import TEMPERATURE_HIGH from '../../constants.js';
import TEMPERATURE_HIGHEST from '../../constants.js';
import HUMIDITY_LOWEST from '../../constants.js';
import HUMIDITY_LOW from '../../constants.js';
import HUMIDITY_HIGH from '../../constants.js';
import HUMIDITY_HIGHEST from '../../constants.js';
import NOISE_LOWEST from '../../constants.js';
import NOISE_LOW from '../../constants.js';
import NOISE_HIGH from '../../constants.js';
import NOISE_HIGHEST from '../../constants.js';

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

    const co2Ranges = new Ranges(CO2_LOWEST, CO2_LOW, CO2_HIGH, CO2_HIGHEST);
    const temperatureRanges = new Ranges(TEMPERATURE_LOWEST, TEMPERATURE_LOW, TEMPERATURE_HIGH, TEMPERATURE_HIGHEST);
    const humidityRanges = new Ranges(HUMIDITY_LOWEST, HUMIDITY_LOW, HUMIDITY_HIGH, HUMIDITY_HIGHEST);
    const noiseRanges = new Ranges(NOISE_LOWEST, NOISE_LOW, NOISE_HIGH, NOISE_HIGHEST);

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
              <span className="zone">zone1</span> <span className="dot"></span>Normal <br/>
              <span className="zone">zone2</span> <span className="dot warning"></span> Humidity high <br/>
              <span className="zone">zone3</span> <span className="dot danger"></span>Bad
            </div>

            <div className="zoneblock">
              <span className="zone">zone4</span> <span className="dot"></span>Normal <br/>
              <span className="zone">zone5</span> <span className="dot warning"></span> Normal <br/>
              <span className="zone">zone6</span> <span className="dot warning"></span>CO&sup2; average
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
