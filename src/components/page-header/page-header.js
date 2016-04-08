import React, { Component } from 'react';

import './page-header.scss';

export default class PageHeader extends Component {
  render() {
    return (
      <div className="page-header">
        <h1>{this.props.title} <span className="addition">{this.props.subtitle}</span></h1>
      </div>
    );
  }
}

PageHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string,
};
