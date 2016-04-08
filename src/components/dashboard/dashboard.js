import React, { Component } from 'react';

import PageHeader from '../page-header/page-header';
import Panel from '../panel/panel';
import DataFetcher from './data-fetcher.js';
import Ranges from './ranges.js';
import SplashScreen from './splashscreen';
import TemperatureUnit from './temperature-unit.js';
import TimerMixin from 'react-timer-mixin';

import './dashboard.scss';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.dataFetcher = new DataFetcher('//amar2000.azurewebsites.net/api/climate');
    this.state = {
      data: {
        co2: null,
        temperature: null,
        humidity: null,
        noise: null
      }
    };
  }

  componentDidMount() {

    TimerMixin.setTimeout(
      () => {

        this.dataFetcher.fetch()
          .then(data => {
            this.setState({
              data,
            });
          })
          .catch(error => {
            throw new Error(error);
          });
      },
      5000
    );


  }

  componentWillMount() {
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

    if (data.co2 !== null ) {
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
            <span>zone1 <span className="dot">&middot;</span> Normal</span>
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
