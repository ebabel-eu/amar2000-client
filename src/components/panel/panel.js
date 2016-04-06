import React, { Component } from 'react';

export default class Panel extends Component {

  render() {
    return (
      <div className={this.props.panelType}>
        <div className="panel-heading">
          <h1 className="panel-title">{this.props.title}</h1>
        </div>
        <div className="panel-body">
          data goes here
        </div>
      </div>
    );
  }
}

Panel.defaultProps = {
  panelType: 'panel panel-default',
};

Panel.propTypes = {
  title: React.PropTypes.string.isRequired,
  panelType: React.PropTypes.string,
};
