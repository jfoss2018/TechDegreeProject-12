import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// The NotFound component is displayed when a route does not exist. Ex. Error 404.
class NotFound extends Component {

  // This call to the API will return the user data is a user session exists, and update
  // the app's state with current user information.
  componentDidMount(props) {
    axios({
      method: 'get',
      url: `/api/v1/users`,
      proxy: {
        host: '127.0.0.1',
        port: 3001
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.props.updateUser({
        loggedIn: true,
        currentUser: response.data.userName,
        id: response.data._id,
        userImage: response.data.userImageURL,
        userEmail: response.data.email,
        userLat: response.data.userCoordinates.lat,
        userLng: response.data.userCoordinates.lng,
        userZoom: response.data.userZoom,
        resMsg: null,
        resSuccess: null
      });
    })
    .catch(err => {
      console.log(err.response.data.message);
    });
  }

  render() {
    return (
      <div className="container-fluid page-404">
        <div className="row h-100 set-row d-flex align-items-stretch justify-content-center">
          <div className="col-12 col-md-9 col-lg-8 col-xl-6">
            <p className="error-404 text-center">Error 404: Not Found</p>
          </div>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {
  updateUser: PropTypes.func
}

export default NotFound;
