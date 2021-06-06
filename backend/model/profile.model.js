const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  _id: String,
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  userId: {
    type: String,
    trim: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: String,
    default: 'OFFLINE',
  },
});

module.exports = mongoose.model('Profile', profileSchema);
