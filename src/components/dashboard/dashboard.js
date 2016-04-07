import React, { Component } from 'react';

import PageHeader from '../page-header/page-header';
import Panel from '../panel/panel';
import DataFetcher from './data-fetcher.js';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.dataFetcher = new DataFetcher('/dummy-data/everything.json');
  }

  render() {
    this.dataFetcher.fetch()
      .then(data => {
        this.setState({
          data
        });
      })
      .catch(error => {
        console.log(`An error ocurred: ${error}`);
      });

    return (
      <div className="container">
        <PageHeader title="AMAR2000" subtitle="Office environment monitoring"/>
        <div className="row">
          <div className="col-md-3">
            <Panel title="CO2" panelType="panel panel-warning" chartType="Pie" />
          </div>
          <div className="col-md-3">
            <Panel title="Temperature" panelType="panel panel-danger" />
          </div>
          <div className="col-md-3">
            <Panel title="Humidity" panelType="panel panel-warning" />
          </div>
          <div className="col-md-3">
            <Panel title="Noise" panelType="panel panel-success" />
          </div>
        </div>
      </div>
    );
  }
}
