const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directSchema = new Schema({
  _id: String,
  cid: String,
  uid: String,
  person: { type: Schema.Types.ObjectId, ref: 'Profile' },
  lastUpdated: Number,
  isGroup: { type: Boolean, default: false },
  unseen: { type: Number, default: 0 },
});

module.exports = mongoose.model('Direct', directSchema);
