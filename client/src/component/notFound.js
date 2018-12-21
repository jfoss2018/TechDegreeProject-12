import React from 'react';

// The NotFound component is displayed when a route does not exist. Ex. Error 404.
const NotFound = () => {
  return (
    <div className="container-fluid page-404">
      <div className="row h-100 set-row d-flex align-items-stretch justify-content-center">
        <div className="col-12 col-md-9 col-lg-8 col-xl-6">
          <p className="error-404 text-center">Error 404: Not Found</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
