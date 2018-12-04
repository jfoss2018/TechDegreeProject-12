import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => {
  return (
    <div className={props.msgColor ? "bg-success container-fluid" : "bg-danger container-fluid"}>
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
  msgColor: PropTypes.bool
}

export default Error;
