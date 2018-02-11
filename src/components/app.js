import React, { Component } from 'react';
import MapLoader from '../containers/map-loader'

export default class App extends Component {
  render() {
    return (
      <div className="fullscreen">
        <MapLoader />
      </div>
    );
  }
}
