import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import pic from './images/default.png';
import axios from 'axios';
import FormData from 'form-data';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      fileButton: props.stateObj.userImage,
      editButtonText: 'Edit',
      editting: true
    }

    this.fileButtonChange = this.fileButtonChange.bind(this);
    this.usernameField = React.createRef();
    this.emailField = React.createRef();
    this.latField = React.createRef();
    this.lngField = React.createRef();
    this.zoomField = React.createRef();
    this.changePasswordField = React.createRef();
    this.chooseFileField = React.createRef();
    this.cancelButton = React.createRef();
  }

  editHandler = (e) => {
    if (e.target.innerHTML === 'Edit') {
      this.setState({
        editting: false,
        editButtonText: 'Save'
      });
    } else if (e.target.innerHTML === 'Save') {

    }

  }

  cancelHandler = (e) => {
    this.setState({
      editting: true
    });
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
      <div className="container-fluid border border-dark rounded mt-3">
        <div className="row bg-secondary justify-content-between">
          <div className="col-6 my-2 text-white">
            <h3>Profile</h3>
          </div>
          <div className="col-3">
            <button hidden={this.state.editting} className="btn btn-light my-2 btn-block" onClick={this.cancelHandler} ref={this.cancelButton}>Cancel</button>
          </div>
          <div className="col-3">
            <button className="btn btn-light my-2 btn-block" onClick={this.editHandler}>{this.state.editButtonText}</button>
          </div>
        </div>
        <form>
          <div className="row">
            <div className="col-7 pt-4">
              <div className="form-group">
                <label forhtml="userName">Username</label>
                <input type="text" className="form-control" disabled={this.state.editting} ref={this.usernameField} id="userName" placeholder={this.props.stateObj.currentUser} />
              </div>
              <div className="form-group">
                <label forhtml="email">Email</label>
                <input type="email" className="form-control" disabled={this.state.editting} ref={this.emailField} id="email" placeholder={this.props.stateObj.userEmail} />
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col pl-0">
                    <div className="form-group">
                      <label forhtml="lat">Latitude</label>
                      <input type="number" className="form-control" disabled={this.state.editting} ref={this.latField} id="lat" placeholder={this.props.stateObj.userLat} />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label forhtml="lng">Longitude</label>
                      <input type="number" className="form-control" disabled={this.state.editting} ref={this.lngField} id="lng" placeholder={this.props.stateObj.userLng} />
                    </div>
                  </div>
                  <div className="col pr-0">
                    <div className="form-group">
                      <label forhtml="zoom">Zoom</label>
                      <input type="number" className="form-control" disabled={this.state.editting} ref={this.zoomField} id="zoom" placeholder={this.props.stateObj.userZoom} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <button ref={this.changePasswordField} type="button" data-toggle="modal" data-target=".bd-example-modal-sm" disabled={this.state.editting} className="btn btn-light my-2 btn-block border border-dark">Change Password</button>
                <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Create New Password</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label forhtml="originalPassword">Current Password</label>
                          <input type="password" className="form-control" id="originalPassword" />
                        </div>
                        <div className="form-group">
                          <label forhtml="newPassword">New Password</label>
                          <input type="password" className="form-control" id="newPassword" />
                        </div>
                        <div className="form-group">
                          <label forhtml="confirmPassword">Confirm New Password</label>
                          <input type="password" className="form-control" id="confirmPassword" />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Save changes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5 border-left border-dark">
              <div className="container-fluid">
                <div className="row border-bottom border-secondary">
                  <div className="col py-4 px-2">
                    <img className="img-fluid img-thumbnail mx-auto d-block rounded-circle" src={this.state.fileButton} alt="" />
                  </div>
                </div>
                <div className="row">
                  <div className="col pt-2">
                    <div className="form-group">
                      <label forhtml="exampleFormControlFile1">Upload a profile picture</label>
                      <input type="file" className="form-control-file" disabled={this.state.editting} ref={this.chooseFileField} id="exampleFormControlFile1" onChange={this.fileButtonChange} />
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
