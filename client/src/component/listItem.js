import React from 'react';
import PropTypes from 'prop-types';

// The ListItem Component returns the individual search history items as list items.
const ListItem = (props) => {
  // The following creates the desired date string based on the date string created
  // and returned from the database.
  let d = props.weather.postedOn;
  let newD;
  newD = `${d.substr(5,2)}/${d.substr(8,2)}/${d.substr(0,4)} at ${d.substr(11,8)}`

  return (
    <li className="list-item">
      <div className="row m-0 p-0 text-center">
        <div className="col-3 bg-white border border-dark px-0">
          <p className="modal-text">{props.weather.city}</p>
        </div>
        <div className="col-3 bg-white border border-dark px-0">
          <p className="modal-text">{newD}</p>
        </div>
        <div className="col-3 bg-white border border-dark px-0">
          <p className="modal-text">{props.weather.weather.main}</p>
        </div>
        <div className="col-3 bg-white border border-dark px-0">
          <p className="modal-text">{props.weather.temperature.current} &#8457;</p>
        </div>
      </div>
    </li>
  );
}

ListItem.propTypes = {
  weather: PropTypes.object
}

export default ListItem;
