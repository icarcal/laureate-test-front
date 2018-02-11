import React, { Component } from 'react';
import axios from 'axios';
import { API_URL, SEARCH_RADIUS, UBER_URL, UBER_TOKEN } from '../configuration';
import { connect } from 'react-redux';

class MarkerInfoWindow extends Component {
  constructor(props) {
    super(props);

    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  render() {
    return false;
  }

  componentDidMount() {
    const { marker } = this.props;
    google.maps.event.addListener(marker, 'click', this.onMarkerClick);
  }

  onMarkerClick() {
    const { place, map, marker } = this.props;
    const { lat, lng } = place.geometry.location;

    const infoWindow = new google.maps.InfoWindow();

    infoWindow.setContent('<i class="fa fa-spinner fa-spin"></i>');

    infoWindow.open(map, marker);
    
    const placeData = {
      latitude: lat(),
      longitude: lng(),
      radius: SEARCH_RADIUS,
      university: {
        name: place.name,
        vicinity: place.vicinity,
      },
    }

    // save the place
    axios.post(`${API_URL}/places`, placeData).then(() => {}, () => {});

    // get UBER fares
    axios.get(`${ UBER_URL }/estimates/price?start_latitude=${this.props.coords.latitude}&start_longitude=${this.props.coords.longitude}&end_latitude=${lat()}&end_longitude=${lng()}`, {headers: { Authorization: `Token ${UBER_TOKEN}` } }).then((response) => {
      const { prices } = response.data;

      infoWindow.setContent(
        `<strong>${place.name}</strong>
         <p>${place.vicinity}</p>
         ${ this.generatePricesTemplate(prices) }
         `
      );
    });
  }

  generatePricesTemplate(prices) {
    const pricesTemplate = prices.map(price => {
      return `<button class="btn btn-secondary btn-sm btn-block">${price.display_name} - Price: ${price.estimate}</button>`
    });

    return pricesTemplate.join('');
  }
}

function mapStateToProps({ coords }) {
  return { coords };
}

export default connect(mapStateToProps)(MarkerInfoWindow);