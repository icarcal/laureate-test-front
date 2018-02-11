import React, { Component } from 'react';
import axios from 'axios';
import { API_URL, SEARCH_RADIUS } from '../configuration';

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

    google.maps.event.addListener(marker, 'click', () => {
      const placeData = {
        latitude: place.geometry.location.latitude,
        longitude: place.geometry.location.latitude,
        radius: SEARCH_RADIUS,
        university: {
          name: place.name,
          vicinity: place.vicinity,
        },
      }


      axios.post(`${API_URL}/places`, placeData).then(() => {
        console.log('tudo ok');
      }, () => {
        console.log('zicou');
      });

      infoWindow.open(map, marker);
    });
  }
}

export default MarkerInfoWindow;