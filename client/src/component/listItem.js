import React from 'react';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <li className="list-item">
      <div className="row border border-dark rounded">
        <div className="col">
          <p>{props.weather.city}</p>
        </div>
        <div className="col">
          <p>{props.weather.postedOn}</p>
        </div>
        <div className="col">
          <p>{props.weather.weather.main}</p>
        </div>
        <div className="col">
          <p>{props.weather.temperature.current}</p>
        </div>
      </div>
    </li>
  );
}

ListItem.propTypes = {
  weather: PropTypes.object
}

export default ListItem;
