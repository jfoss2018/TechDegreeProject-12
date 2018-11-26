import React from 'react';
import PropTypes from 'prop-types';

const DashboardPanel = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h3>{props.stateObj.currentUser}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <img src={props.stateObj.userImage} alt="" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          //Other info
          <p>Three</p>
        </div>
      </div>
    </div>
  );
}

DashboardPanel.proptypes = {
  stateObj: PropTypes.object
}

export default DashboardPanel;
