import React from 'react';

// The NotFound component is displayed when a route does not exist. Ex. Error 404.
const NotFound = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <p>Error 404: Not Found</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
