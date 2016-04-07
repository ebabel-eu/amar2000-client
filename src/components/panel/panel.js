import React, { Component } from 'react';

import classNames from 'classnames';
import ChartistGraph from 'react-chartist';

import './panel.scss';

export default class Panel extends Component {




  render() {
    var data = this.props.data;
    var containerClass = classNames({
      'circle-container':true,
      'no-data': data === null,
      'safe': data !== null && (data > this.props.indicators[1] && data < this.props.indicators[2]),
      'danger': data !== null && (data > this.props.indicators[3] ||  data < this.props.indicators[0]),
      'warning':  data !== null && (data >= this.props.indicators[2] && data <= this.props.indicators[3] ||  data <= this.props.indicators[1] &&  data >= this.props.indicators[0])
    });
    return (
      <div className={containerClass}>
        <div className="outer-circle">
            <div className="circle">
              <div className="text">
                <h3>{this.props.title}</h3>
                <h1>{data}</h1>
                <p>unit</p>
                <p className="condition"></p>
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
