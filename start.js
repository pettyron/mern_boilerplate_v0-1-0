const mongoose = require('mongoose');

// check and be sure the application is running on node 7.6+
const[major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
    console.log('⚠ This application build environment requires Node version 7.6.x or higher!\nThe version in use will not support the features in use.\nPlease visit nodejs.org and download a version of Node equal to or greater than 7.6.');
    process.exit();
}

// import the environment variables from variables.env
require('dotenv').config({
    path: 'variables.env'
});

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`⛔ → ${err.message}`);
});

// import models

// start the app
const app = require('./app');
app.set('port', process.env.port || 3000);
const server = app.listen(app.get('port'), ()=> {
    console.log(`Express running on PORT ${server.address().port}`);
});
