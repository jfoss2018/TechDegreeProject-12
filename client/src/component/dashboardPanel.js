import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './listItem.js';
import ListBtnItem from './listBtnItem.js';

// The Dashboard Panel contains User and recent search information.
const DashboardPanel = (props) => {

  return (
    // User Info
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center py-3">
          {/* User's Username*/}
          <h3>{props.stateObj.currentUser}</h3>
        </div>
        <div className="col-6 col-sm-12 pb-4 pb-sm-0">
          {/*User's Profile Image*/}
          <img className="img-fluid img-thumbnail mx-auto d-block rounded-circle" src={props.stateObj.userImage} alt="" />
        </div>
        {/*End User Info*/}
        <div className="col-6 col-sm-12 pt-sm-5 pb-4 pb-sm-0">
          {/*Current Search Info*/}
          <div className="row border rounded border-light bg-white justify-content-center">
            <div className="col-12 bg-secondary border-bottom border-light pt-1 text-center">
              {/*Heading/Label*/}
              <h5>Current Search</h5>
            </div>
            <div className="col-12 px-sm-0 px-2 px-md-2 px-lg-3 mx-sm-0">
              <form>
                <div className="col-12 text-dark mt-2 current-box px-sm-0 mx-sm-0">
                  <div className="form-group">
                    {/*Current Search City*/}
                    <label htmlFor="city" className="text-dark">City:</label>
                    <input className="form-control" readOnly type="text" id="city" placeholder={props.stateObj.city} />
                  </div>
                  <div className="form-group">
                    {/*Current Search Weather*/}
                    <label htmlFor="weather" className="text-dark">Weather:</label>
                    <input className="form-control" readOnly type="text" id="weather" placeholder={props.stateObj.weather} />
                  </div>
                  <div className="form-group">
                    {/*Current Search Temperature*/}
                    <label htmlFor="temperature" className="text-dark">Temperature:</label>
                    <div className="input-group">
                      <input className="form-control" readOnly type="text" id="temperature" placeholder={props.stateObj.temperature} />
                      <div className="input-group-append">
                        <span className="input-group-text">&#8457;</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    {/*This button opens a modal that displays the search history for the current user.*/}
                    <button type="button" className="btn btn-primary btn-block text-sm-left text-md-center pl-sm-0" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={props.getSearches}>Search History</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*Modal for Search History*/}
      <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="container-fluid">
              <div className="row">
                {/*Modal Header*/}
                <div className="col-12">
                  <div className="modal-header">
                    <h5 className="modal-title text-dark">Search History</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
                {/*Modal Body*/}
                <div className="col-12 text-dark">
                  <div className="modal-body">
                    {/*Headings for Search History*/}
                    <div className="row text-center">
                      <div className="col-3 bg-white border border-dark px-0">
                        <p className="modal-text"><strong>City:</strong></p>
                      </div>
                      <div className="col-3 bg-white border border-dark px-0">
                        <p className="modal-text"><strong>Search Date:</strong></p>
                      </div>
                      <div className="col-3 bg-white border border-dark px-0">
                        <p className="modal-text"><strong>Weather:</strong></p>
                      </div>
                      <div className="col-3 bg-white border border-dark px-0">
                        <p className="modal-text"><strong>Temp:</strong></p>
                      </div>
                    </div>
                    <ul>
                      {/*Map over the list array in App.js state and return a list item for each list Value.*/}
                      {/*Each list item represents an individual search.*/}
                      {props.stateObj.list.map(function(listValue, i){
                        return <ListItem key={i} weather={listValue} />;
                      })}
                    </ul>
                  </div>
                </div>
                {/*Modal Footer contains page buttons if there is more than one page of search results. Page item count is limited to 10 items.*/}
                <div className="col-12">
                  <div>
                    <div className="row justify-content-center mb-3">
                      {/*Map over the btnList array in App.js state and return page buttons depending on the amount of items in the search history.*/}
                      {/*Each button has an onClick handler to refresh the list items displayed.*/}
                      {props.stateObj.btnList.map(function(listValue, i){
                        return <ListBtnItem pageNum={props.pageNum} paging={props.paging} key={i} btn={listValue} />;
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
  paging: PropTypes.func,
  pageNum: PropTypes.number
}

export default DashboardPanel;
