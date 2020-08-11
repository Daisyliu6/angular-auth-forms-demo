// the MongoDB wrapper connects to MongoDB using Mongoose 
// exports an object containing all of the database model objects 
// an easy way to access any part of the database from a single point

const config = require('config.json');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGODB_URI || config.connectionString, 
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});
 
module.exports = {
    User: require('../users/user.model'),
    Role: require('../roles/role.model')
};