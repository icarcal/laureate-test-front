import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCoords } from '../actions/fetch-coordinates';

class LocationButton extends Component {
    constructor(props) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    render() {
        if (!this.props.coords) {
            return (
                <div>
                    <button onClick={ this.onButtonClick }>Click to enable your location</button>
                </div>
            );
        }

        return (<div></div>);
    }

    onButtonClick(event) {
        event.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.props.fetchCoords(position.coords);
            });
        }
    }
}

function mapStateToProps({ coords }) {
    return { coords };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchCoords }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationButton);