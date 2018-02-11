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
  }

  render() {
    if (!this.props.coords) {
      return (
        <div className="fullscreen-table">
          <div className="fullscreen-cell">
            <h1>Laureate challenge</h1>
            <button className="btn btn-secondary btn-lg" onClick={this.onButtonClick}>Click to enable your location</button>
            {this.renderMessage()}
          </div>
        </div>
      );
    }

    return null;
  }

  renderMessage() {
    if (this.state.message) {
      return <h5>{this.state.message}</h5>
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