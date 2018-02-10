import React, { Component } from 'react';

class MarkerInfoWindow extends Component {
  render() {
    return false;
  }

  componentDidMount() {
    const { place, map, marker } = this.props;

    const infoWindow = new google.maps.InfoWindow();

    infoWindow.setContent(
      `<strong>${place.name}</strong>
            <p>${place.vicinity}</p>`
    );

    google.maps.event.addListener(marker, 'mouseover', () => {
      infoWindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', () => {
      infoWindow.close();
    });
  }
}

export default MarkerInfoWindow;