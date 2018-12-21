import React from 'react';

// About Component gives an overview of this project.
const About = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-around bg-secondary h-100 set-row d-flex align-items-stretch">
        <div className="col-12 col-md-9 border-left border-right border-dark bg-white">
          <div className="row justify-content-center">
            <div className="col-11 border-top border-bottom border-dark text-center mb-3 mt-5 bg-light">
              <h1>About this Web App</h1>
            </div>
            <div className="col-11 col-xl-6 my-3">
              <div className="row">
                <div className="col-12">
                  <img className="mx-auto profile-image d-block" src="./profile.jpg" alt="" />
                </div>
                <div className="col-12">
                  <p className="text-center"><strong>- James Foss, Developer</strong></p>
                </div>
              </div>
            </div>
            <div className="col-11 col-xl-5 my-3">
              <p className="size-large mx-2 mb-4">Thank you for visiting my Full-Stack web app developed as my Capstone Project for the Full-Stack JavaScript Tech Degree Course for Team Treehouse.</p>
              <p className="size-large mx-2 mb-4">I am using this project to display the technologies and features I've learned along the way.</p>
              <p className="size-large mx-2 mb-4">Point & Click Weather App is an easy to understand and simple to use web app created using the MERN stack. The following will detail aspects of this project.</p>
              <p className="size-large mx-2 mb-4">Checkout my code on Git Hub <a href="https://github.com/jfoss2018/TechDegreeProject-12">here!</a></p>
            </div>
            <div className="col-11 my-3 p-0">
              <div className="row p-0 m-0 justify-content-around">
                <div className="col-12 mx-auto px-0 mb-4">
                  <h3 className="border-top border-bottom border-dark text-center py-2 bg-light">Back-End</h3>
                </div>
                <div className="col-12 col-lg-8 col-xl-9 mt-3">
                  <p className="size-large mx-2 mb-4">I used Node and Express to create this app's application server and API routes on the back-end which also connects to mlab to use a MongoDB database.</p>
                  <p className="size-large mx-2 mb-4">Using Express routing, I have created API enpoints that perform CRUD operations on user data and returns JSON responses in order to create a more RESTful API. My API, however, is not completely RESTful as it does keep up with state through user sessions. I also did not include any delete routes for this web app.</p>
                  <p className="size-large mx-2 mb-4">One of the features that this project includes is user authentication using Passport's Local Stategy. In addition, the Bcrypt module is used to hash users' passwords before they are saved to the database using a pre-save hook in Mongoose for increased security. This app does send unencrypted data from the front-end to the back-end using http, but in a commercial application, https would be used at login.</p>
                  <p className="size-large mx-2 mb-4">Mongoose is the ODM that I have used to connect to the MongoDB database. It provides easy to use, built-in input validators and methods that can be attached to each schema. I used both along with custom validators to ensure only correctly formatted and valid data can be saved in the database.</p>
                  <p className="size-large mx-2 mb-4">One of the requirements for this project is to use data from other websites by connectiong to their APIs. I have used Google Maps to provide a map to click and search, Open Weather API to return current weather reports based on search coordinates collected from Google Maps, and the Giphy API to display a fun gif using the weather condition as the search key. The gif may not align well with the weather report, but functionally, the API connection works.</p>
                  <p className="size-large mx-2 mb-4">Lastly, I utilize a couple middleware functions in Express. One checks whether the user has a session and is authenticated before forwarding them along to the protected API endpoint, and the other is custom middleware that I have written to prevent multiple searches with similar coordinates being sent to Open Weather API within a ten minute window. Open Weather API explicitly warns against sending multiple requests for the same city within ten minutes.</p>
                </div>
                <div className="col-12 col-lg-4 col-xl-3 p-0">
                  <div className="row p-0 m-0 justify-content-around">
                    <div className="col-12 text-center mt-4 mt-lg-3">
                      <h4 className="mb-4">Technologies, Features, & Modules:</h4>
                    </div>
                    <div className="col-6 col-lg-12">
                      <ul>
                        <li><p className="size-large">Node</p></li>
                        <li><p className="size-large">Express</p></li>
                        <li><p className="size-large">MongoDB</p></li>
                        <li><p className="size-large">Mongoose</p></li>
                        <li><p className="size-large">mLab</p></li>
                        <li><p className="size-large">Passport</p></li>
                        <li><p className="size-large">Bcrypt</p></li>
                        <li><p className="size-large">Session</p></li>
                        <li><p className="size-large">JSON</p></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-11 my-3 p-0">
              <div className="row p-0 m-0 justify-content-around">
                <div className="col-12 mx-auto px-0 mb-4">
                  <h3 className="border-top border-bottom border-dark text-center py-2 bg-light">Front-End</h3>
                </div>
                <div className="col-12 col-lg-8 col-xl-9 mt-3">
                  <p className="size-large mx-2 mb-4">Creat-React-App was used to setup the initial React App for this project. During development, I served the Front-End and the Back-End on separate ports and utilized a proxy URL, but in production, the server serves the React Front-End files as static files.</p>
                  <p className="size-large mx-2 mb-4">I have included React Router to make React more like a Front-End Framework than a library and to make this app an SPA. I've also included the history object to easily push redirects onto it for login forwarding to the dashboard.</p>
                  <p className="size-large mx-2 mb-4">One of the key features of this project is responsive design. Responsive design is an important part of web development today and I utilized Bootstrap 4 framework and a mobile-first approach to creating this web app. Almost all of the styling is done with Bootstrap and all of the web app's content is delivered with React's virtual DOM and written in JSX. There are several custom CSS rules for additional reponsive design and styling that I have also included for this web app.</p>
                  <p className="size-large mx-2 mb-4">Some of the features of this React app include client side validation using HTML5 form validation. On the user registration form and the user update form, I've included custom span element error message boxes than display when an input field is invalid. I have included input validation on the server side, but the client side validation creates a much more seamless experience when presented with input errors.</p>
                  <p className="size-large mx-2 mb-4">I have kept almost all state within this app at the highest level parent component. This made is easy to pass down state as props and send set state function calls back up when changing the state of this app as I did not use a state management library.</p>
                  <p className="size-large mx-2 mb-4">I wanted to make sure to display some specific skillsets that we have learned as students in the Full-Stack course in this project, and one clear example of that is pagination. I have included pagination on the search history modal. When the user's search history reaches eleven or more, the results will be paginated. Since the request to the server only happens when the modal is initially opened, the pagination is very fast. The app keeps the entire search results in its state until the search history modal is opened again.</p>
                </div>
                <div className="col-12 col-lg-4 col-xl-3 p-0">
                  <div className="row p-0 m-0 justify-content-around">
                    <div className="col-12 text-center mt-4 mt-lg-3">
                      <h4 className="mb-4">Technologies, Features, & Modules:</h4>
                    </div>
                    <div className="col-6 col-lg-12">
                      <ul>
                        <li><p className="size-large">React</p></li>
                        <li><p className="size-large">JavaScript</p></li>
                        <li><p className="size-large">Bootstrap 4</p></li>
                        <li><p className="size-large">JSX</p></li>
                        <li><p className="size-large">React Router</p></li>
                        <li><p className="size-large">SPA</p></li>
                        <li><p className="size-large">Axios</p></li>
                        <li><p className="size-large">Jquery</p></li>
                        <li><p className="size-large">CSS</p></li>
                        <li><p className="size-large">DOM</p></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-11 my-3 p-0">
              <div className="row p-0 m-0 justify-content-around">
                <div className="col-12 mx-auto px-0 mb-4">
                  <h3 className="border-top border-bottom border-dark text-center py-2 bg-light">Testing</h3>
                </div>
                <div className="col-12 col-lg-8 col-xl-9 mt-3">
                  <p className="size-large mx-2 mb-4">While I did not practice BDD when creating this app, I did include test code using the technologies listed here.</p>
                  <p className="size-large mx-2 mb-4">I was able to test all the API routes and the custom error functions that I wrote. When running npm test, the script sets the environment to test, which switches the database connection to a local mongoDB database. Since certain routes are protected, and require authentication to access, it was necessary to create a new user when testing the create route, login that user when testing the login route, test all other routes, and then log the user out when testing the logout route. I learned a lot about testing APIs during this project!</p>
                </div>
                <div className="col-12 col-lg-4 col-xl-3 p-0">
                  <div className="row p-0 m-0 justify-content-around">
                    <div className="col-12 text-center mt-4 mt-lg-3">
                      <h4 className="mb-4">Technologies, Features, & Modules:</h4>
                    </div>
                    <div className="col-6 col-lg-12">
                      <ul>
                        <li><p className="size-large">Mocha</p></li>
                        <li><p className="size-large">Chai</p></li>
                        <li><p className="size-large">Chai-http</p></li>
                        <li><p className="size-large">Superagent</p></li>
                        <li><p className="size-large">Supertest</p></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
