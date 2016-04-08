import React, { Component } from 'react';

import classNames from 'classnames';

import './panel.scss';

export default class Panel extends Component {
  render() {
    const data = this.props.data;
    const dataUnit = this.props.dataUnit;
    const ranges = this.props.ranges;
    const type = this.props.type;
    const unit = this.props.unit;
    const averageUnit = type != "temperature" ? this.props.unit : '';
    //TODO: make the averaga data a property
    const averageData = data;

    const containerClass = classNames({
      'circle-container': true,
      'no-data': data === null,
      safe: ranges.isSafe(data),
      danger: ranges.isDanger(data),
      warning: ranges.isWarning(data),
    });
    const dotClass = classNames({
      'dot': true,
      'no-data': data === null,
      safe: ranges.isSafe(data),
      danger: ranges.isDanger(data),
      warning: ranges.isWarning(data),
    });

    const statusText = ranges.statusText(data, type);

    return (
      <div className={containerClass}>
        <div className="outer-circle">
          <div className="circle">
            <div className="text">
              <h3>{this.props.title}</h3>
              <h1>{data}{dataUnit}</h1>
              <p className="unit">{unit}</p>
              <h3 className="condition">{statusText}</h3>
            </div>
          </div>
        </div>
        <div className="average">
          <h4>Average for today </h4>
          <h2><span className={dotClass}>&middot;</span> {averageData}{dataUnit} {averageUnit}</h2>
        </div>
      </div>
    );
  }
}

Panel.defaultProps = {
  type: 'temperature',
};

Panel.propTypes = {
  title: React.PropTypes.string.isRequired,
  data: React.PropTypes.number,
  dataUnit: React.PropTypes.string,
  ranges: React.PropTypes.object.isRequired,
  type: React.PropTypes.string,
  unit: React.PropTypes.string.isRequired,
};
