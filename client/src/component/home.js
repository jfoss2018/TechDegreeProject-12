import React from 'react';

// The home component is the main body of the landing page when visiting this app.
// It shows a short video that depicts how to use this app.
const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-around bg-secondary h-100 set-row d-flex align-items-stretch">
        <div className="col-12 col-md-9 border-left border-right border-dark bg-white">
          <div className="row justify-content-around">
            <div className="col-12">
              <p>Home Page</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
