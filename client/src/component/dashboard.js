import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DashboardPanel from './dashboardPanel.js';
import Map from './map.js';
import Profile from './profile.js';

// The Dashboard component lays out the bootstrap containers for its children
// components. It includes the Dashboard Panel and either the Profile or Map
// component depending on which page is selected from the dropdown in the Nav
// component.
const Dashboard = (props) => {

    let loadComponent;
    if (props.load === 'Map') {
      // If Dashboard is selected from the dropdown in the Nav component.
      loadComponent = <Map updateUser={props.updateUser} stateObj={props.stateObj} />;
    } else if (props.load === 'Profile') {
      // If Profile is selected from the dropdown in the Nav component.
      loadComponent = <Profile updateUser={props.updateUser} stateObj={props.stateObj} />;
    }

    if (props.stateObj.loggedIn) {
      // The Dashboard component will only return the 'dashboard' if the loggedIn state of App.js is true.
      return (
        <div className="container-fluid">
          <div className="row h-100 set-row d-flex align-items-stretch">
            <div className="col-12 col-sm-3 bg-dark text-white">
              <DashboardPanel pageNum={props.pageNum} paging={props.paging} getSearches={props.getSearches} updateUser={props.updateUser} stateObj={props.stateObj} />
            </div>
            <div className="col-12 col-sm-9">
              {loadComponent}
            </div>
          </div>
        </div>
      );
    } else {
      // If the loggedIn state of App.js is false, the user will be redirected to the home route when attempting to access /dashboard.
      return (
        <Redirect to={'/'} />
      );
    }
};

Dashboard.proptypes = {
  stateObj: PropTypes.object,
  load: PropTypes.string,
  updateUser: PropTypes.func,
  getSearches: PropTypes.func,
  paging: PropTypes.func,
  pageNum: PropTypes.number
}

export default Dashboard;
