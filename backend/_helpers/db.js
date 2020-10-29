// the MongoDB wrapper connects to MongoDB using Mongoose 
// exports an object containing all of the database model objects 
// an easy way to access any part of the database from a single point

const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

// Connecting to the database
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
// mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions)
//     .then(() => {
//     console.log("Successfully connected to the database");    
// }).catch(err => {
//     console.log('Could not connect to the database.', err);
//     process.exit();
// });
 
mongoose.Promise = global.Promise;
module.exports = {
    User: require('../users/user.model'),
    Role: require('../roles/role.model')
};