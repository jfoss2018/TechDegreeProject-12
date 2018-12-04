import React from 'react';
import PropTypes from 'prop-types';

const DashboardPanel = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center py-3">
          <h3>{props.stateObj.currentUser}</h3>
        </div>
        <div className="col-6 col-sm-12 pb-4 pb-sm-0">
          <img className="img-fluid img-thumbnail mx-auto d-block rounded-circle" src={props.stateObj.userImage} alt="" />
        </div>
        <div className="col-6 col-sm-12 text-center pt-sm-5 pb-4 pb-sm-0">
          <div className="row">
            <div className="col-12">
              <p>Three</p>
            </div>
            <div className="col-12">
              <p>Three</p>
            </div>
            <div className="col-12">
              <p>Three</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardPanel.proptypes = {
  stateObj: PropTypes.object
}

export default DashboardPanel;
