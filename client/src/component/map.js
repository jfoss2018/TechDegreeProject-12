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
      zoom: null
    }
    this.getWeather = this.getWeather.bind(this);
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
      console.log(response.data);
      const marker = new window.google.maps.Marker({
        position: {
          lat: response.data.coordinates.lat,
          lng: response.data.coordinates.lng
        },
        map: map,
        title: response.data.city
      });
      infoWindow.setContent(`
        <div class="container">
          <div class="row">
            <div class="col-6">
              <div class="row">
                <div class="col-12">
                  <img src="${response.data.gifURL}" alt="">
                </div>
                <div class="col-12">
                  <img src="uploads/giphy.gif" alt="">
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row">
                <div class="col-12">
                  <h4>${response.data.city || 'Unavailable'}</h4>
                </div>
                <div class="col-12 mt-1">
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
      /*if (response.status === 200) {
        this.profileForm[1].value = '';
        this.profileForm[2].value = '';
        this.profileForm[3].value = '';
        this.profileForm[4].value = '';
        this.profileForm[5].value = '';
        this.profileForm[6].value = '';
        this.profileForm[8].value = '';
        this.modalForm[0].value = '';
        this.modalForm[1].value = '';
        this.modalForm[2].value = '';
        document.querySelector('.hidden-div').hidden = true;
        this.props.updateUser({
          loggedIn: true,
          currentUser: response.data.user.userName,
          id: response.data.user._id,
          userImage: response.data.user.userImageURL,
          userEmail: response.data.user.email,
          userLat: response.data.user.userCoordinates.lat || 40.75,
          userLng: response.data.user.userCoordinates.lng || -74.02,
          userZoom: response.data.user.userZoom || 12,
          resMsg: response.data.message,
          resSuccess: response.data.success
        });
        this.setState({
          showMsg: true
        });
      }*/
    }).catch((err) => {
      console.log(err.response, 'browser');
      /*this.props.updateUser({
        resMsg: err.response.data.message,
        resSuccess: 'Red'
      });
      this.setState({
        showMsg: true
      });*/
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

    const infoWindow = new window.google.maps.InfoWindow();

    map.addListener('click', (e) => {
      const latitude = (e.latLng.lat()).toFixed(2);
      const longitude = (e.latLng.lng()).toFixed(2);
      console.log(latitude + ', ' + longitude);
      this.setState({
        currentLat: latitude,
        currentLng: longitude
      });
      this.getWeather(map, infoWindow);
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
