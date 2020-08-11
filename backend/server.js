// entry point into the api
// it configures application middleware
// binds controllers to routes and starts the Express web server for the api

require('rootpath')();
const express = require('express');
const app = express();
const config = require('config.json');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());
// app.use(express.static(__dirname + '/../'));
// api routes
app.use('/users', require('./users/user.controller'));
app.use('/role', require('./roles/role.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});