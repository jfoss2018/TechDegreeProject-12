import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DashboardPanel from './dashboardPanel.js';
import Map from './map.js';
import Profile from './profile.js';

const Dashboard = (props) => {
  let loadComponent;
  if (props.load === 'Map') {
    loadComponent = <Map stateObj={props.stateObj} />;
  } else if (props.load === 'Profile') {
    loadComponent = <Profile stateObj={props.stateObj} />;
  }

  if (props.stateObj.loggedIn) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 bg-dark text-light">
            <DashboardPanel stateObj={props.stateObj} />
          </div>
          <div className="col-9">
            {loadComponent}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Redirect to={'/'} />
    );
  }
};

Dashboard.proptypes = {
  stateObj: PropTypes.object,
  load: PropTypes.string
}

export default Dashboard;
