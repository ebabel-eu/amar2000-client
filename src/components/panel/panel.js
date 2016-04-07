import React, { Component } from 'react';

import classNames from 'classnames';
import ChartistGraph from 'react-chartist';

import './panel.scss';

export default class Panel extends Component {




  render() {
    const data = this.props.data;
    const ranges = this.props.ranges
    const type = this.props.type;
    const containerClass = classNames({
      'circle-container': true,
      'no-data': data === null,
      'safe': ranges.isSafe(data),
      'danger': ranges.isDanger(data),
      'warning':  ranges.isWarning(data)
    });
    const statusText = ranges.statusText(data, type);

    return (
      <div className={containerClass}>
        <div className="outer-circle">
            <div className="circle">
              <div className="text">
                <h3>{this.props.title}</h3>
                <h1>{data}</h1>
                <p>unit</p>
                <p className="condition">{statusText}</p>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

Panel.defaultProps = {
  type: 'temperature'
};

Panel.propTypes = {
  title: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
};
