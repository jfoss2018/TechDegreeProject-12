import React from 'react';

// The Footer component is fixed to the bottom of the viewport.
const Footer = () => {
  return (
    <div className="container-fluid set-footer">
      <div className="row">
        <div className="col text-center font-weight-bold">
          <p className="set-text-size pt-3">Point & Click Weather App by James Foss 2018</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
