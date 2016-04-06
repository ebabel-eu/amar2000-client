import React, { Component } from 'react';

export default class Panel extends Component {

  render() {
    return (
      <article className="panel panel-default">
        <header className="panel-header">
          <h1 className="panel-title">{this.props.title}</h1>
        </header>
        <div className="panel-body">
          data goes here
        </div>
      </article>
    );
  }
}

Panel.propTypes = {
  title: React.PropTypes.string.isRequired,
};
