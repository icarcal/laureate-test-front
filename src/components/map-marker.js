import React, { Component } from 'react';
import MarkerInfoWindow from './marker-info-window';

class MapMarker extends Component {
    constructor (props) {
        super(props);

        this.state = {
            marker: null,
        };
    }

    render() {
        return (
            <MarkerInfoWindow  marker={ this.state.marker } place={ this.props.place } />
        );
    }

    componentWillMount() {
        const { map, place } = this.props;

        const marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location,
        });

        // google.maps.event.addListener(marker, 'click', () => {
        //     this.saveUserClick(place);
        // });

        this.setState({ marker });
    }
}

export default MapMarker;