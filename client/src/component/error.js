import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => {
  return (
    <div className="container-fluid bg-danger">
      <div className="row">
        <div className="col">
          <p className="pt-2 text-center font-weight-bold">{props.errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

Error.propTypes = {
  errorMessage: PropTypes.string
}

export default Error;
