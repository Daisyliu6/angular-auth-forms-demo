// user model uses Mongoose to define the scheme 
// for the users collection saved in MongoDB
// exported Mongoose model object gives full access 
// to perform CRUD operations on users in MongoDB

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: String,
    phoneNum: Number,
    role: String
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);

