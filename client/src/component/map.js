import React, { Component } from 'react';
import PropTypes from 'prop-types';
import apiKeys from '../.config.js';

class Map extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      lat: props.stateObj.userLat,
      lng: props.stateObj.userLng,
      zoom: props.stateObj.userZoom
    }*/
  }




  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKeys.google}&callback=initMap`);
    window.initMap = this.initMap;
  }

  initMap = (props) => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: this.props.stateObj.userLat, lng: this.props.stateObj.userLng},
      zoom: this.props.stateObj.userZoom
    });

    map.addListener('click', function(e) {
      const latitude = (e.latLng.lat()).toFixed(2);
      const longitude = (e.latLng.lng()).toFixed(2);
      console.log(latitude + ', ' + longitude);
    });
  }



  render() {
    return(
      <main>
        <div id="map" className="map">
        </div>
      </main>
    );
  }
}

function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

Map.propTypes = {
  stateObj: PropTypes.object
}

export default Map;
