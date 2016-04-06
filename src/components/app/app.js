// React
import React from 'react';

export default function App() {
  return (
    <div>
      <p>Nav</p>
      {this.props.children}
      <p>Footer</p>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.object,
};
