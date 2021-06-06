const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const convoSchema = new Schema({
  _id: String,
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    required: true,
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  lastUpdated: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Conversation', convoSchema);
