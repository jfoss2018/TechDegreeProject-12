import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DashboardPanel from './dashboardPanel.js';
import Map from './map.js';

const Dashboard = (props) => {
  if (props.loggedIn) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <DashboardPanel />
          </div>
          <div className="col-9">
            <Map />
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
  loggedIn: PropTypes.bool
}

export default Dashboard;
