const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  cid: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Message', messageSchema);
