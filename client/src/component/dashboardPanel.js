import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './listItem.js';
import ListBtnItem from './listBtnItem.js';

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
        <div className="col-6 col-sm-12 pt-sm-5 pb-4 pb-sm-0">
          <div className="row border rounded border-light bg-white justify-content-center">
            <div className="col-12 bg-secondary border-bottom border-light pt-1">
              <h5>Current Search</h5>
            </div>
            <form>
              <div className="col-12 text-dark mt-2">
                <div className="form-group">
                  <label htmlFor="city" className="text-dark">City:</label>
                  <input className="form-control" readOnly type="text" id="city" placeholder={props.stateObj.city} />
                </div>
                <div className="form-group">
                  <label htmlFor="weather" className="text-dark">Weather:</label>
                  <input className="form-control" readOnly type="text" id="weather" placeholder={props.stateObj.weather} />
                </div>
                <div className="form-group">
                  <label htmlFor="temperature" className="text-dark">Temperature:</label>
                  <input className="form-control" readOnly type="text" id="temperature" placeholder={props.stateObj.temperature} />
                </div>
                <div className="form-group">
                  <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={props.getSearches}>Search History</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="container-fluid">
              <div className="row">

                <div className="col-12">
                  <div className="modal-header">
                    <h5 className="modal-title text-dark">Search History</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>

                <div className="col-12 text-dark">
                  <div className="modal-body">
                    <ul>
                      {props.stateObj.list.map(function(listValue, i){
                        return <ListItem key={i} weather={listValue} />;
                      })}
                    </ul>
                  </div>
                </div>

                <div className="col-12">
                  <div>
                    <div className="row justify-content-center">
                      {props.stateObj.btnList.map(function(listValue, i){
                        return <ListBtnItem paging={props.paging} key={i} btn={listValue} />;
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

DashboardPanel.proptypes = {
  stateObj: PropTypes.object,
  updateUser: PropTypes.func,
  getSearches: PropTypes.func,
  paging: PropTypes.func
}

export default DashboardPanel;
