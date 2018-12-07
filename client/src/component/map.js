import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { apiKeys } from '../.config.js';
import axios from 'axios';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLat: null,
      currentLng: null,
      zoom: null,
      map: null,
      markers: [],
      showMsg: false
    }
    this.getWeather = this.getWeather.bind(this);
    this.onClear = this.onClear.bind(this);
    this.setMapOnAll = this.setMapOnAll.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
  }

  componentDidUpdate(prevPops, prevState, snapshot) {
    if (this.state.showMsg === true && prevState.showMsg === true) {
      this.props.updateUser({
        resMsg: null,
        resSuccess: null
      });
      this.setState({
        showMsg: false
      });
    }
  }

  componentWillUnmount() {
    this.props.updateUser({
      resMsg: null,
      resSuccess: null
    });
  }

  getWeather = (map, infoWindow) => {
    axios({
      method: 'post',
      url: '/api/v1/users/' + this.props.stateObj.id + '/searches',
      proxy: {
        host: '127.0.0.1',
        port: 3001
      },
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        lat: this.state.currentLat,
        lng: this.state.currentLng
      }
    })
    .then(response => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: response.data.coordinates.lat,
          lng: response.data.coordinates.lng
        },
        map: map,
        title: response.data.city
      });
      this.state.markers.push(marker);
      infoWindow.setContent(`
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="row">
                <div class="col-12">
                  <img src="${response.data.gifURL}" alt="">
                </div>
                <div class="col-12">
                  <img src="uploads/giphy.gif" alt="">
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="row">
                <div class="col-12">
                  <h4>${response.data.city || 'Unavailable'}</h4>
                </div>
                <div class="col-12 mt-2">
                  <p><strong>Current condition:</strong> ${response.data.weather.main} with ${response.data.weather.description}</p>
                </div>
                <div class="col-12">
                  <p><strong>Current temp:</strong> ${response.data.temperature.current} &#8457; <strong>High:</strong> ${response.data.temperature.max} &#8457; <strong>Low:</strong> ${response.data.temperature.min} &#8457;</p>
                </div>
                <div class="col-12">
                  <p><strong>Wind Speed:</strong> ${response.data.wind.speed} mph in the <strong>${response.data.wind.dir}</strong> direction</p>
                </div>
              </div>
            </div>
          </div>
        </div>`);
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
      infoWindow.open(map, marker);
      this.props.updateUser({
        city: response.data.city,
        weather: response.data.weather.main,
        temperature: response.data.temperature.current
      });
    }).catch((err) => {
      console.log(err.response, 'browser');
      this.props.updateUser({
        resMsg: err.response.data.message,
        resSuccess: err.response.data.success
      });
      this.setState({
        showMsg: true
      });
    });
  }

  setMapOnAll = (map) => {
    for (let i = 0; i < this.state.markers.length; i += 1) {
      this.state.markers[i].setMap(map);
    }
  }

  clearMarkers = () => {
    this.setMapOnAll(null);
  }

  onClear = () => {
    this.clearMarkers();
    this.setState({
      markers: []
    });
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

    this.setState({
      map: map
    });

    const infoWindow = new window.google.maps.InfoWindow();

    map.addListener('click', (e) => {
      const latitude = (e.latLng.lat()).toFixed(2);
      const longitude = (e.latLng.lng()).toFixed(2);
      this.setState({
        currentLat: latitude,
        currentLng: longitude
      });
      this.getWeather(map, infoWindow);
    });




  }



  render(props) {
    return(
      <main className="border border-dark rounded my-3 show-shadow">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-white bg-secondary">
              <div className="row">
                <div className="col-4">
                  <h3 className="mt-1">Map</h3>
                </div>
                <div className="col-2 text-center align-bottom">
                  <span className="mt-1">Lat: {this.state.currentLat}</span>
                </div>
                <div className="col-2 text-center align-bottom">
                  <span className="mt-1">Lng: {this.state.currentLng}</span>
                </div>
                <div className="col-4">
                  <button type="button" className="btn btn-light float-right btn-sm mt-2" onClick={this.onClear}>Clear</button>
                </div>
              </div>
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
