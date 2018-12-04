import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { apiKeys } from '../.config.js';

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
    loadScript(`https://maps.googleapis.com/maps/api/js?key=  nope   ${apiKeys.google}&callback=initMap`);
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
      <main className="border border-dark rounded my-3 show-shadow">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-white bg-secondary">
              <h3>Map</h3>
            </div>
            <div className="col-12 px-0">
              <div id="map" className="map">
              </div>
            </div>
          </div>
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
