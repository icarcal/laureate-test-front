import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCoords } from '../actions/fetch-coordinates';

class LocationButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }

        this.onButtonClick = this.onButtonClick.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    { this.renderButton() }
                    { this.renderMessage() }
                </div>
            </div>
        );
    }

    renderButton() {
        if (!this.props.coords) {
            return <button className="btn btn-primary center" onClick={ this.onButtonClick }>Click to enable your location</button>
        }

        return '';
    }

    renderMessage() {
        if (this.state.message) {
            return <p className="text-center">{ this.state.message }</p>
        }

        return '';
    }

    onButtonClick(event) {
        event.preventDefault();

        this.setState({ message: 'Aguarde, estamos tentando localizar sua posição atual :D' });

        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition((position) => {
                this.setState({ message: '' });
                this.props.fetchCoords(position.coords);
            }, (error) => {
                this.setState({ message: error.message })
            });
        }

        return this.setState({ message: 'Não é possível localizar sua posição com esse navegador D:' })
    }
}

function mapStateToProps({ coords }) {
    return { coords };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchCoords }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationButton);