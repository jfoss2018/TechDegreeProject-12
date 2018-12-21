import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { apiKeys } from '../.config.js';
import axios from 'axios';

// The Map component displays the Google Maps map.
class Map extends Component {
  // The Map Component keeps up with current search, map, and marker information in its state.
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

  // componentDidUpdate is used to clear any error message that is displayed when
  // state changes following a message being displayed.
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

  // Any error messages displayed will be removed when the map component unmounts.
  componentWillUnmount() {
    this.props.updateUser({
      resMsg: null,
      resSuccess: null
    });
  }

  // The getWeather function is called when the map is clicked on.
  getWeather = (map, infoWindow) => {
    // This function sends a post request to the /users/:id/searches api endpoint
    // with the latitude and longitude corresponding to the coordinates from the
    // location clicked on the map.
    axios({
      method: 'post',
      url: `/api/v1/users/${this.props.stateObj.id}/searches`,
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
      // When a response is received, a map marker is created.
      const marker = new window.google.maps.Marker({
        position: {
          lat: response.data.coordinates.lat,
          lng: response.data.coordinates.lng
        },
        map: map,
        title: response.data.city
      });
      this.state.markers.push(marker);
      // The info window corresponding to the created marker is filled with the following content.
      infoWindow.setContent(`
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-4">
              <div class="row">
                <div class="col-12">
                  <img src="${response.data.gifURL}" alt="">
                </div>
                <div class="col-12">
                  <img src="./giphy.gif" alt="">
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-8">
              <div class="row">
                <div class="col-12">
                  <h4>${response.data.city}</h4>
                </div>
                <div class="col-12 mt-2">
                  <p><strong>Current condition:</strong> ${response.data.weather.main} with ${response.data.weather.description}</p>
                </div>
                <div class="col-12">
                  <p class="white-space"><strong>Current temp:</strong> ${response.data.temperature.current} &#8457;  |  <strong>High:</strong> ${response.data.temperature.max} &#8457;  |  <strong>Low:</strong> ${response.data.temperature.min} &#8457;</p>
                </div>
                <div class="col-12">
                  <p><strong>Wind Speed:</strong> ${response.data.wind.speed} mph from the <strong>${response.data.wind.dir}</strong> direction</p>
                </div>
              </div>
            </div>
          </div>
        </div>`);
      // When the marker is clicked, the info window will open.
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
      // The info window will be opened directly after searching, and current search information will update
      // the state in App.js.
      infoWindow.open(map, marker);
      this.props.updateUser({
        city: response.data.city,
        weather: response.data.weather.main,
        temperature: response.data.temperature.current
      });
    }).catch((err) => {
      // If there is an error, the error message will be displayed in the Error component.
      this.props.updateUser({
        resMsg: err.response.data.message,
        resSuccess: err.response.data.success
      });
      this.setState({
        showMsg: true
      });
    });
  }

  // The setMapOnAll function loops over the markers array and setMap on all markers.
  // This function is used to clear the markers if desired.
  setMapOnAll = (map) => {
    for (let i = 0; i < this.state.markers.length; i += 1) {
      this.state.markers[i].setMap(map);
    }
  }

  // clearMarkers calls the setMapOnAll function will a null parameter.
  clearMarkers = () => {
    this.setMapOnAll(null);
  }

  // onClear is called when the clear button is clicked on the map component.
  // It calls the clearMarkers function and resets the markers array to empty.
  onClear = () => {
    this.clearMarkers();
    this.setState({
      markers: []
    });
  }

  // componentDidMount calls the renderMap function when the component mounts.
  componentDidMount() {
    this.renderMap();
  }

  // The renderMap function loads the required script on index.html for Google Map's Api, and
  // calls initMap.
  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKeys.google}&callback=initMap`);
    window.initMap = this.initMap;
  }

  // initMap creates a Google Map using the Google Maps API and uses the current User's preferred
  // center and zoom parameters if they are updated in the User's profile.
  initMap = (props) => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: this.props.stateObj.userLat, lng: this.props.stateObj.userLng},
      zoom: this.props.stateObj.userZoom
    });

    this.setState({
      map: map
    });

    // Only one infoWindow is created, because I felt that only being able to have one open
    // at a time created a cleaner look.
    const infoWindow = new window.google.maps.InfoWindow();

    // When the map is clicked, the Map component's state is updated and the getWeather function
    // is called.
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

// The loadScript function uses the window object to be able to create a script element on the DOM.
function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = url;
  script.id = 'google';
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

Map.propTypes = {
  stateObj: PropTypes.object
}

export default Map;
