import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormData from 'form-data';
import { validate } from '../formValidate.js';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      lat: '',
      lng: '',
      zoom: '',
      originalPassword: null,
      password: null,
      confirmPassword: null,
      formPassword: '',
      fileButton: props.stateObj.userImage,
      editButtonText: 'Edit',
      notEditting: true,
      showMsg: false
    }

    this.updateSubmit = this.updateSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.fileButtonChange = this.fileButtonChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.chooseFileField = React.createRef();
    this.cancelButton = React.createRef();
    this.modalForm = React.createRef();
    this.profileForm = React.createRef();
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

  editHandler = (e) => {
    if (e.target.innerHTML === 'Edit') {
      e.preventDefault();
      this.setState({
        notEditting: false,
        editButtonText: 'Save'
      });
    } else if (e.target.innerHTML === 'Save') {
      this.setState({
        notEditting: true,
        editButtonText: 'Edit'
      });
      this.submitHandler(e);
    }
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  cancelHandler = (e) => {
    this.setState({
      notEditting: true,
      editButtonText: 'Edit'
    });
  }

  updateSubmit = () => {
    axios({
      method: 'put',
      url: '/api/v1/users/' + this.props.stateObj.id,
      proxy: {
        host: '127.0.0.1',
        port: 3001
      },
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        userName: this.state.userName,
        originalPassword: this.state.originalPassword,
        newPassword: this.state.formPassword,
        email: this.state.email,
        lat: this.state.lat,
        lng: this.state.lng,
        zoom: this.state.zoom,
        imageURL: this.state.fileButton
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Made it back');
        console.log(response.data);
        console.log(response.data.user);
        /*this.loginForm[0].value = '';
        this.loginForm[1].value = '';*/
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
      }
    }).catch((error) => {
      console.log(error);
      console.log(error.response);
      /*this.props.updateUser({
        resMsg: error.response.data.message,
        resSuccess: 'Red'
      });
      this.setState({
        showMsg: true
      });*/
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    if (e.target.name === 'modalForm') {
      if (validate(this.modalForm)) {
        this.profileForm[6].value = this.modalForm[2].value;
        this.setState({
          formPassword: this.modalForm[2].value
        });
        document.querySelector('.hidden-div').hidden = false;
        document.getElementById('modal-close').click();
      }
    } else {
      if (validate(this.profileForm)) {
        this.updateSubmit();
      } else {
        console.log('invalid');
      }
    }
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
      <div className="container-fluid border border-dark rounded my-3 show-shadow">
        <div className="row bg-secondary justify-content-between">
          <div className="col-4 col-sm-6 my-2 text-white">
            <h3>Profile</h3>
          </div>
          <div className="col-4 col-sm-3">
            <button hidden={this.state.notEditting} className="btn btn-light my-2 btn-block" onClick={this.cancelHandler} ref={this.cancelButton}>Cancel</button>
          </div>
          <div className="col-4 col-sm-3">
            <button type="submit" form="profile-form" className="btn btn-light my-2 btn-block" onClick={this.editHandler}>{this.state.editButtonText}</button>
          </div>
        </div>
        <form ref={form => this.profileForm = form} id="profile-form" onSubmit={this.submitHandler}>
          <div className="row">
            <div className="col-12 col-md-7 pt-4">
              <div className="form-group">
                <label forhtml="userName">Username</label>
                <input type="text" className="form-control" minLength="4" maxLength="16" disabled={this.state.notEditting} onChange={this.handleOnChange} name="userName" id="userName" placeholder={this.props.stateObj.currentUser} />
                <span className="invalid-feedback"></span>
              </div>
              <div className="form-group">
                <label forhtml="email">Email</label>
                <input type="email" className="form-control" disabled={this.state.notEditting} onChange={this.handleOnChange} name="email" id="email" placeholder={this.props.stateObj.userEmail} />
                <span className="invalid-feedback"></span>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-sm-4 px-0 pr-sm-1">
                    <div className="form-group">
                      <label forhtml="lat">Latitude</label>
                      <input type="number" step="0.01" min="-90" max="90" className="form-control" disabled={this.state.notEditting} onChange={this.handleOnChange} name="lat" id="lat" placeholder={this.props.stateObj.userLat} />
                      <span className="invalid-feedback"></span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 px-0 px-sm-1">
                    <div className="form-group">
                      <label forhtml="lng">Longitude</label>
                      <input type="number" step="0.01" className="form-control" min="-180" max="180" disabled={this.state.notEditting} onChange={this.handleOnChange} name="lng" placeholder={this.props.stateObj.userLng} />
                      <span className="invalid-feedback"></span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 px-0 pl-sm-1">
                    <div className="form-group">
                      <label forhtml="zoom">Zoom</label>
                      <input type="number" step="0.01" className="form-control" min="3" max="16" disabled={this.state.notEditting} onChange={this.handleOnChange} name="zoom" id="zoom" placeholder={this.props.stateObj.userZoom} />
                      <span className="invalid-feedback"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group hidden-div" hidden>
                <label forhtml="formPassword">Password</label>
                <input type="password" className="form-control" minLength="8" maxLength="20" disabled onChange={this.handleOnChange} name="formPassword" id="formPassword" />
                <span className="invalid-feedback"></span>
              </div>
              <div className="form-group">
                <button ref={this.changePasswordField} type="button" data-toggle="modal" data-target=".bd-example-modal-sm" disabled={this.state.notEditting} className="btn btn-light mb-4 mb-md-2 mt-2 btn-block border border-dark">Change Password</button>

              </div>
            </div>
            <div className="col-12 col-md-5 border-left1 set-border-1 border-dark1">
              <div className="container-fluid">
                <div className="row border-bottom set-border-2 border-secondary">
                  <div className="col py-4 px-2">
                    <img className="img-fluid img-thumbnail mx-auto d-block rounded-circle" src={this.state.fileButton} alt="" />
                  </div>
                </div>
                <div className="row">
                  <div className="col pt-2">
                    <div className="form-group">
                      <label forhtml="exampleFormControlFile1">Upload a profile picture</label>
                      <input type="file" className="form-control-file" disabled={this.state.notEditting} ref={this.chooseFileField} id="exampleFormControlFile1" onChange={this.fileButtonChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" id="myModal" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Password</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form ref={form => this.modalForm = form} onSubmit={this.submitHandler} name="modalForm" noValidate>
                <div className="modal-body">
                  <div className="form-group">
                    <label forhtml="originalPassword">Current Password</label>
                    <input type="password" required minLength="8" maxLength="20" onChange={this.handleOnChange}className="form-control" name="originalPassword" id="originalPassword" />
                    <span className="invalid-feedback"></span>
                  </div>
                  <div className="form-group">
                    <label forhtml="newPassword">New Password</label>
                    <input type="password" required minLength="8" maxLength="20" onChange={this.handleOnChange}className="form-control" name="password" id="newPassword" name="password" />
                    <span className="invalid-feedback"></span>
                  </div>
                  <div className="form-group">
                    <label forhtml="confirmPassword">Confirm New Password</label>
                    <input type="password" required minLength="8" maxLength="20" onChange={this.handleOnChange} className="form-control" name="confirmPassword" id="confirmPassword" name="confirmPassword" />
                    <span className="invalid-feedback c-pass"></span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save changes</button>
                  <button type="button" className="btn btn-secondary" id="modal-close" data-dismiss="modal">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Profile.proptypes = {
  stateObj: PropTypes.object,
  updateUser: PropTypes.func
}

export default Profile;
