// 28 added
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
  role: String
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Role', schema);