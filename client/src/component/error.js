import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => {
  let divClass;
  if (props.msgColor === 'Green') {
    divClass = "bg-success container-fluid";
  } else if (props.msgColor === 'Red') {
    divClass = "bg-danger container-fluid";
  } else if (props.msgColor === 'Yellow') {
    divClass = "bg-warning container-fluid";
  }

  return (
    <div className={divClass}>
      <div className="row">
        <div className="col">
          <p className="pt-2 text-center font-weight-bold">{props.errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

Error.propTypes = {
  errorMessage: PropTypes.string,
  msgColor: PropTypes.string
}

export default Error;
