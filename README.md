# TechDegreeProject-12

This project uses Node.js, Express, MongoDB and React to create a Full-Stack web application including a semi-RESTful API that enables users to save and retrieve user and search information in a database.

### Prerequisites

This web requires API keys, database configuration, and session configuration to work properly.

Under the 'TechDegreeProject-12/client/src' directory, create a '.config.js' file and include the following code:

```
const apiKeys = {};
apiKeys.google = '  [Enter your Google Maps API Key within the quotes]  ';

module.exports.apiKeys = apiKeys;
```

Under the 'TechDegreeProject-12' directory, create a '.config.js' file and include the following code. Note that mLab is used for a MongoDB connection in this project for both development and production. A local MongoDB connection is used for testing.

```
const apiKeys = {};
apiKeys.openWeather = '  [Enter your Open Weather API Key within the quotes]  ';
apiKeys.giphy = '  [Enter your Giphy API Key within the quotes]  ';

const databaseKey = {};
databaseKey.user = '  [Enter your mLab username within the quotes]  ';
databaseKey.password = '  [Enter your mLab password within the quotes]  ';

const secret = '  [Enter any secret phrase for express-session within the quotes]  ';

module.exports.apiKeys = apiKeys;
module.exports.databaseKey = databaseKey;
module.exports.secret = secret;
```

This app also includes a tutorial video on the home page that is too large to commit to Git Hub, so this repository will not contain that video file. Fortunately, this app is very easy to use.

### Installing

Once you have downloaded this project, navigate to the folder in which the project is stored in your command-line or terminal and run

```
npm install
```

This will install all the dependencies for the server-side of this project. You will also need to install all the dependencies for the React from-end by navigating into the client folder and installing once again:

```
cd client
```
then
```
npm install
```

Once everything is installed, navigate back to the project folder:

```
cd ..
```

If you would like to start this application in a development environment, note that the front-end and back-end are served on separate ports, 3000 & 3001 respectively, and use a proxy URL in order to make http requests. You can startup the development environment by running:

```
npm run dev
```

For a production build, run:

```
npm start
```

### Testing

You will need to make sure that the mongoDB daemon is running in order to run the test script for this project. Navigate to the folder in which the MongoDB executables are and run

```
mongod.exe
```

This will start up the MongoDB daemon. Then run:

```
npm test
```
