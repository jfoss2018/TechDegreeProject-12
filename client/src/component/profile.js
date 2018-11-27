import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import pic from './images/default.png';
import axios from 'axios';
import FormData from 'form-data';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      fileButton: props.stateObj.userImage
    }

    this.fileButtonChange = this.fileButtonChange.bind(this);
  }

  fileButtonChange = (e) => {
    let file = e.target.files[0];
    let data = new FormData();
    data.append('userImage', file);
    axios({
      method: 'post',
      url: '/api/v1/userpic',
      proxy: {
        host: '127.0.0.1',
        port: 3001
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })
    .then(response => {
      if (response.status === 201) {
        console.log(response.data.imageURL);
        this.setState({
          fileButton: response.data.imageURL
        });
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  render(props) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h4>Profile</h4>
          </div>
        </div>
        <form>
          <div className="row">
            <div className="col-7">
              <div className="form-group">
                <label forhtml="userName">Username</label>
                <input type="text" className="form-control" id="userName" placeholder={this.props.stateObj.currentUser} />
              </div>
              <div className="form-group">
                <label forhtml="email">Another label</label>
                <input type="email" className="form-control" id="email" placeholder={this.props.stateObj.userEmail} />
              </div>
              <div className="form-group">
                <label forhtml="lat">Another label</label>
                <input type="number" className="form-control" id="lat" placeholder={this.props.stateObj.userLat} />
              </div>
              <div className="form-group">
                <label forhtml="lng">Another label</label>
                <input type="number" className="form-control" id="lng" placeholder={this.props.stateObj.userLng} />
              </div>
              <div className="form-group">
                <label forhtml="zoom">Another label</label>
                <input type="number" className="form-control" id="zoom" placeholder={this.props.stateObj.userZoom} />
              </div>
            </div>
            <div className="col-5">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <img className="img-fluid img-thumbnail rounded-circle" src={this.state.fileButton} alt="" />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label forhtml="exampleFormControlFile1">Example file input</label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={this.fileButtonChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Profile.proptypes = {
  stateObj: PropTypes.object
}

export default Profile;
