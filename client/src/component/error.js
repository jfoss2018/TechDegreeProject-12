import React from 'react';
import PropTypes from 'prop-types';

// The Error component is displayed when a server response reponds with an error.
// The component lists the error message and is displayed with a background color
// of red. This component is also used for success messages and warning messages.
const Error = (props) => {
  let divClass;
  if (props.msgColor === 'Green') {
    // background color for success messages.
    divClass = "bg-success container-fluid";
  } else if (props.msgColor === 'Red') {
    // background color for error/failed messages.
    divClass = "bg-danger container-fluid";
  } else if (props.msgColor === 'Yellow') {
    // background color for warning messages.
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
