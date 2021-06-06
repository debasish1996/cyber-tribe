const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  _id: String,
  friends: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  },
  blocked: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  },
  pending: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  },
});

module.exports = mongoose.model('Contact', contactSchema);
