import React from 'react';

// The home component is the main body of the landing page when visiting this app.
// It shows a short video that depicts how to use this app.
const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-around bg-secondary h-100 set-row d-flex align-items-stretch">
        <div className="col-12 col-md-9 border-left border-right border-dark bg-white">
          <div className="row justify-content-around">
            <div className="col-11 border-top border-bottom border-dark text-center mb-3 mt-5 bg-light">
              <h1>Home Page</h1>
            </div>
            <div className="col-10 my-5">
              <p className="size-large mx-2 mb-4">Welcome to Point & Click Weather App. This app is already easy to use, but I have provided a video tutorial below to show just how easy it can be!</p>
            </div>
            <div className="col-12 col-sm-11 mt-5">
              <video className="img-fluid border border-dark" controls>
                <source src="./TechDegreeProject-12.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
