import React, { Component } from 'react';
import axios from 'axios';
import MapMarker from './map-marker';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map:  null,
            markers: [],
        };

        this.setMarkers = this.setMarkers.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);
    }

    render() {
        return (
            <div className="map" ref="map">
                { this.renderMarkers() }
            </div>
        );
    }

    componentDidUpdate() {
        if (this.props.coordinates && !this.state.map && google) {
            const { coordinates } = this.props;

            const map = new google.maps.Map(this.refs.map, {
                zoom: 15,
                center: {
                    lat: coordinates.latitude,
                    lng: coordinates.longitude,
                }
            });
            
            this.setState({ map });

            const service = new google.maps.places.PlacesService(map);

            this.setState({ service });

            service.nearbySearch({
                location: {
                    lat: coordinates.latitude,
                    lng: coordinates.longitude,
                },
                radius: 5000,
                type: 'university'
            }, this.setMarkers);
        }
    }

    setMarkers(results, status, pagination) {
        this.setState({ markers: results });
    }

    renderMarkers() {
        return this.state.markers.map((place) => {
            return (
                <MapMarker key={ place.name } map={ this.state.map } place={ place } />
            );
        });
    }
}

export default Map;