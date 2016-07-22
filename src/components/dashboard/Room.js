import React, { Component } from 'react';

import PageHeader from '../page-header/page-header';
import Panel from '../panel/panel';
import Ranges from './ranges.js';
import TemperatureUnit from './temperature-unit.js';
import * as _ from '../../constants.js';
import TimerMixin from 'react-timer-mixin';

export default class Room extends Component {

    renderNoise(){

        const noiseRanges = new Ranges(
            _.NOISE_LOWEST,
            _.NOISE_LOW,
            _.NOISE_HIGH,
            _.NOISE_HIGHEST
        );
        console.log(this.props.data.sensors[0].noise);
        console.log('noise = '+this.props.data.sensors[0].noise);


        if(this.props.data.sensors[0].noise != null){
            return(<Panel title="Noise" type="noise" unit="dB" data={this.props.data.sensors[0].noise} ranges={noiseRanges} />)
        }
    }

    render() {
        console.log(this.props);
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


        const minimumTemperature = this.props.data.sensors[0].minimumTemperature;
        const maximumTemperature = this.props.data.sensors[0].maximumTemperature;
        const temperatureUnit = new TemperatureUnit(minimumTemperature, maximumTemperature);
        const temperatureUnitText = temperatureUnit.getText();

        return (
            <div >
                <PageHeader title="valtech_ a'dam" subtitle={this.props.data.name} />
                <div className="circles">
                    <Panel title="CO₂" type="co2" unit="ppm"
                           data={this.props.data.sensors[0].cO2} ranges={co2Ranges}
                    />
                    <Panel title="Temperature" type="temperature" unit={temperatureUnitText}
                           data={this.props.data.sensors[0].temperature} ranges={temperatureRanges}
                           dataUnit="°"
                    />
                    <Panel title="Humidity" type="humidity" unit="%"
                           data={this.props.data.sensors[0].humidity} ranges={humidityRanges}
                    />

                    {this.renderNoise()}

                </div>

            </div>
        );
    }
}

Room.propTypes = {
    // title: React.PropTypes.string.isRequired,
    // subtitle: React.PropTypes.string,
};
