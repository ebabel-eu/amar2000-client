import React, { Component } from 'react';

import PageHeader from '../page-header/page-header';
import Panel from '../panel/panel';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <PageHeader title="AMAR2000" subtitle="Office environment monitoring" />
        <div className="row">
          <div className="col-md-6">
            <Panel title="Temperature" />
          </div>
          <div className="col-md-6">
            <Panel title="CO2" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Panel title="Humidity" />
          </div>
          <div className="col-md-6">
            <Panel title="Sound" />
          </div>
        </div>
      </div>
    );
  }
}
