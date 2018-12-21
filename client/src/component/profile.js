import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormData from 'form-data';
import { validate } from '../formValidate.js';

// The Profile component allows the user to edit their profile information.
class Profile extends Component {
  // The state for the profile component is primarily used to update the show message
  // state upon update.
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

  // componentDidUpdate is used to remove the Error Component when the state
  // changes following the display of an error message.
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

  // The error component will be removed when the Profile component is unmounted.
  componentWillUnmount() {
    this.props.updateUser({
      resMsg: null,
      resSuccess: null
    });
  }

  // The editHandler function is called when the edit button is clicked. When in 'editting' mode,
  // the 'edit' button changes to the 'save' button. The 'save' button will submit the profile form
  // field information.
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

  // The handleOnChange function sets the Profile state whenever a form feild is changed.
  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // The 'cancel' button resets the 'editting' state which removes the 'cancel' button
  // and reverts the 'save' button to the 'edit' button.
  cancelHandler = (e) => {
    this.setState({
      notEditting: true,
      editButtonText: 'Edit'
    });
  }

  // The updateSubmit function updates the user's information corresponding to
  // the editted fields.
  updateSubmit = () => {
    // The function sends a put request to the /users/:id API endpoint with each
    // form feild's input values.
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
        // When a successful response is received, each form feild is cleared, and
        // the App.js state is updated with the user's new information.
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
          userLat: response.data.user.userCoordinates.lat,
          userLng: response.data.user.userCoordinates.lng,
          userZoom: response.data.user.userZoom,
          resMsg: response.data.message,
          resSuccess: response.data.success
        });
        this.setState({
          showMsg: true
        });
      }
    }).catch((err) => {
      // If there is an error, the Error component will be displayed with an error.
      this.props.updateUser({
        resMsg: err.response.data.message,
        resSuccess: 'Red'
      });
      this.setState({
        showMsg: true
      });
    });
  }

  // The submitHandler is called when the forms' submit buttons are clicked.
  submitHandler = (e) => {
    e.preventDefault();
    if (e.target.name === 'modalForm') {
      // If the modal popup form for password changes is called.
      if (validate(this.modalForm)) {
        // If the form fields' inputs are validated, a password field is added to the
        // profile form.
        this.profileForm[6].value = this.modalForm[2].value;
        this.setState({
          formPassword: this.modalForm[2].value
        });
        document.querySelector('.hidden-div').hidden = false;
        document.getElementById('modal-close').click();
      }
    } else {
      if (validate(this.profileForm)) {
        // If the profile form is submitted and all field's are validated, the updateSubmit function
        // is called.
        this.updateSubmit();
      }
    }
  }

  // The fileButtonChange function allows a user to add a profile image.
  fileButtonChange = (e) => {
    if (!e.target.files[0]) {
      this.setState({
        fileButton: this.props.stateObj.userImage
      });
      return;
    }
    let file = e.target.files[0];
    let data = new FormData();
    data.append('userImage', file);
    // The function sends a post request to the /user/userpic API endpoint including
    // multipart/form-data image.
    axios({
      method: 'post',
      url: '/api/v1/users/userpic',
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
        // If a successfully created response is received, the image is displayed
        // in the profile form.
        this.setState({
          fileButton: response.data.imageURL
        });
      }
    }).catch((err) => {
      // If there is and error, the Error component is displayed with the error
      // message.
      this.profileForm[8].value = '';
      this.props.updateUser({
        resMsg: err.response.data.message,
        resSuccess: 'Red'
      });
      this.setState({
        showMsg: true
      });
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
        {/*Profile Form*/}
        <form ref={form => this.profileForm = form} id="profile-form" onSubmit={this.submitHandler}>
          <div className="row">
            <div className="col-12 col-md-7 pt-4">
              <div className="form-group">
                <label forhtml="userName">Username</label>
                <input type="text" autoComplete="off" className="form-control" minLength="4" maxLength="16" disabled={this.state.notEditting} onChange={this.handleOnChange} name="userName" id="userName" placeholder={this.props.stateObj.currentUser} />
                <span className="invalid-feedback"></span>
              </div>
              <div className="form-group">
                <label forhtml="email">Email</label>
                <input type="email" autoComplete="off" className="form-control" disabled={this.state.notEditting} onChange={this.handleOnChange} name="email" id="email" placeholder={this.props.stateObj.userEmail} />
                <span className="invalid-feedback"></span>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-sm-4 px-0 pr-sm-1">
                    <div className="form-group">
                      <label forhtml="lat">Latitude</label>
                      <input type="number" autoComplete="off" step="0.01" min="-90" max="90" className="form-control" disabled={this.state.notEditting} onChange={this.handleOnChange} name="lat" id="lat" placeholder={this.props.stateObj.userLat} />
                      <span className="invalid-feedback"></span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 px-0 px-sm-1">
                    <div className="form-group">
                      <label forhtml="lng">Longitude</label>
                      <input type="number" autoComplete="off" step="0.01" className="form-control" min="-180" max="180" disabled={this.state.notEditting} onChange={this.handleOnChange} name="lng" placeholder={this.props.stateObj.userLng} />
                      <span className="invalid-feedback"></span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 px-0 pl-sm-1">
                    <div className="form-group">
                      <label forhtml="zoom">Zoom</label>
                      <input type="number" autoComplete="off" step="0.01" className="form-control" min="3" max="16" disabled={this.state.notEditting} onChange={this.handleOnChange} name="zoom" id="zoom" placeholder={this.props.stateObj.userZoom} />
                      <span className="invalid-feedback"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group hidden-div" hidden>
                <label forhtml="formPassword">Password</label>
                <input type="password" autoComplete="off" className="form-control" minLength="8" maxLength="20" disabled onChange={this.handleOnChange} name="formPassword" id="formPassword" />
                <span className="invalid-feedback"></span>
              </div>
              <div className="form-group">
                {/*Modal Button for Password Change*/}
                <button ref={this.changePasswordField} type="button" data-toggle="modal" data-target=".bd-example-modal-sm" disabled={this.state.notEditting} className="btn btn-light mb-4 mb-md-2 mt-2 btn-block border border-dark">Change Password</button>
              </div>
            </div>
            <div className="col-12 col-md-5 border-left1 set-border-1 border-dark1">
              {/*Profile Image Container*/}
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
        {/*Password Change Modal*/}
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
                    <input type="text" autoComplete="off" required minLength="8" maxLength="20" onChange={this.handleOnChange}className="form-control" name="originalPassword" id="originalPassword" />
                    <span className="invalid-feedback"></span>
                  </div>
                  <div className="form-group">
                    <label forhtml="newPassword">New Password</label>
                    <input type="text" autoComplete="off" required minLength="8" maxLength="20" onChange={this.handleOnChange} className="form-control" name="password" id="newPassword" />
                    <span className="invalid-feedback"></span>
                  </div>
                  <div className="form-group">
                    <label forhtml="confirmPassword">Confirm New Password</label>
                    <input type="text" autoComplete="off" required minLength="8" maxLength="20" onChange={this.handleOnChange} className="form-control" name="confirmPassword" id="confirmPassword" />
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
