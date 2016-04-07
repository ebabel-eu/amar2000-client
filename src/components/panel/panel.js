import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';



export default class Panel extends Component {

  render() {
      var data = {
          series: [40, 20, 30, 30]

      };
      var options = {
          donut: true,
          donutWidth: 10,
          startAngle: 270,
          total: 200,
          showLabel: false
      };

    return (
      <div className={this.props.panelType}>
        <div className="panel-heading">
          <h1 className="panel-title">{this.props.title}</h1>
        </div>
        <div className="panel-body">
            <div className="circle"></div>
            <ChartistGraph data={data} options={options} type={this.props.chartType} />
        </div>
      </div>
    );
  }
}

Panel.defaultProps = {
  panelType: 'panel panel-default',
    chartType: 'Bar'
};

Panel.propTypes = {
  title: React.PropTypes.string.isRequired,
  panelType: React.PropTypes.string,
};
