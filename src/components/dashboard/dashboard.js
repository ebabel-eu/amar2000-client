import React, { Component } from 'react';

import PageHeader from '../page-header/page-header';
import Panel from '../panel/panel';
import DataFetcher from './data-fetcher.js';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.dataFetcher = new DataFetcher('/dummy-data/latest.json');
    this.state= {
      data: {
        co2: null,
        temperature: null,
        humidity: null,
        noise: null
      }
    }
  }
  componentWillMount() {

    this.dataFetcher.fetch()
      .then(data => {
        this.setState({
          data
        });
      })
      .catch(error => {
        console.log(`An error occurred: ${error}`);
      });

  }

  render() {
    const data = this.state.data;

    const co2Indicators = [300,400,800,1000];
    const temperatureIndicators = [19,21,24,28];
    const humidityIndicators = [40,50,60,70];
    const noiseIndicators = [40,50,60,70];


    if(data){
      return (
        <div className="container">
          <PageHeader title="AMAR2000" subtitle="Office environment monitoring"/>
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <Panel title="CO2" type="co2" data={this.state.data.co2} indicators={co2Indicators} />
            </div>
            <div className="col-md-3 col-sm-6">
              <Panel title="Temperature"  type="temperature"  data={this.state.data.temperature} indicators={temperatureIndicators}/>
            </div>
            <div className="col-md-3 col-sm-6">
              <Panel title="Humidity" type="humidity" data={this.state.data.humidity} indicators={humidityIndicators} />
            </div>
            <div className="col-md-3 col-sm-6">
              <Panel title="Noise"  type="noise" data={this.state.data.noise} indicators={noiseIndicators} />
            </div>
          </div>
        </div>
      );
    }
    else{
      return(
        <div className="container">
          <p>Loading data...</p>
        </div>
      )
    }
  }
}
