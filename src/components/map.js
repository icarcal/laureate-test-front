import React, { Component } from 'react';
import axios from 'axios';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map:  null,
        };

        this.setMarkers = this.setMarkers.bind(this);
    }

    render() {
        return (
            <div className="map" ref="map"></div>
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
        results.map((place) => {
            const infoWindow = new google.maps.InfoWindow();

            const marker = new google.maps.Marker({
                map: this.state.map,
                title: place.name,
                position: place.geometry.location
            });

            infoWindow.setContent(place.name);

            google.maps.event.addListener(marker, 'click', () => {
            });

            google.maps.event.addListener(marker, 'mouseover', () => {
                infoWindow.open(this.state.map, marker);
            });

            google.maps.event.addListener(marker, 'mouseout', () => {
                infoWindow.close();
            });
        });
    }
}

export default Map;