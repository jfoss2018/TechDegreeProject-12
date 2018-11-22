import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Profile = (props) => {
  if (props.loggedIn) {
    return (
      <p>Profile</p>
    );
  } else {
    return (
      <Redirect to={'/'} />
    );
  }
}

Profile.propTypes = {
  loggedIn: PropTypes.bool
}

export default Profile;
