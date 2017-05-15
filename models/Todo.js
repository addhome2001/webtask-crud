const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  content: String,
  checked: Boolean,
  created_at: Date,
  id: mongoose.Schema.ObjectId
});
