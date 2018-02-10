import React, { Component } from 'react';
import Map from '../components/map';
import LocationButton from './location-button';
import { connect } from 'react-redux';

class MapLoader extends Component {
    render() {
        return (
            <div>
                <LocationButton />
                <Map coordinates={ this.props.coords } />
            </div>
        );
    }
}

function mapStateToProps({ coords }) {
    return { coords };
}

export default connect(mapStateToProps)(MapLoader);