import React, { Component } from 'react';

import DataFetcher from './data-fetcher.js';
import DataSyncer from './data-syncer.js';
import SplashScreen from './splashscreen';
import Room from './Room';
import TimerMixin from 'react-timer-mixin';
import * as _ from '../../constants.js';


import './dashboard.scss';

export default class Dashboard extends Component {
  constructor() {
    super();
    // this.dataFetcher = new DataFetcher('//amar2000.azurewebsites.net/api/climate');
    // this.dataSyncer = new DataSyncer('//amar2000.azurewebsites.net/signalr/hubs');

    this.dataFetcher = new DataFetcher('//test-amar2000.azurewebsites.net/api/climate');
    this.dataSyncer = new DataSyncer('//test-amar2000.azurewebsites.net/signalr/hubs');


    this.state = {
      data: {

      },
      activeRoom: 0
    };
  }

  componentDidMount() {
    TimerMixin.setTimeout(() => {
      this.dataFetcher.fetch()
        .then(data => {
          // console.log('data = '+data)
          this.setState({
            data:data
          });

        })
        .catch(error => {
          throw new Error(error);
        });


    }, 1000);


    TimerMixin.setInterval(() => {
      var newroomindex =  this.state.activeRoom + 1;
      if( newroomindex == this.state.data.length ){
        newroomindex = 0;
      }
      this.setState({
        activeRoom: newroomindex
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
  // renderRoom(key){
  //   console.log('data key = ' +  this.state.data)
  //   return(<Room key={key} data={this.state.data[key]}/>)
  // }
  render() {
    // const data = this.state.data;
    // <div className="zones">
    //   <h1>Condition Zones</h1>
    //   <div className="zoneblock">
    //     <span className="zone">zone1</span>
    //     <span className="dot"></span> Normal <br />
    //     <span className="zone">zone2</span>
    //     <span className="dot warning"></span> Humidity high <br />
    //     <span className="zone">zone3</span>
    //     <span className="dot danger"></span> Bad
    //   </div>
    //
    //   <div className="zoneblock">
    //     <span className="zone">zone4</span>
    //     <span className="dot"></span> Normal <br />
    //     <span className="zone">zone5</span>
    //     <span className="dot warning"></span> Normal <br />
    //     <span className="zone">zone6</span>
    //     <span className="dot warning"></span> CO₂ average
    //   </div>
    // </div>
    // <div className="container">
    //
    //   {Object.keys(this.state.data).map(this.renderRoom.bind(this))}
    // </div>



    if (this.state.data.length > 0) {
      return (
          <div className="container">
            <Room data={this.state.data[ this.state.activeRoom ]}/>
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
