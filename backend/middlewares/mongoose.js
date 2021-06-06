const mongoose = require('mongoose');
// // const user = 'debasish';
// // const key = 'Vp4JtFiFrRXoEd2t';
// const user = 'subhan';
// const key = 'tgD5qG7rF8I1I0OU';
// // const key = '1234';
// const DB = 'cyber-tribe';
// // const uri = `mongodb+srv://${user}:${key}@cluster0.fpqxi.mongodb.net/${DB}?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${user}:${key}@cluster0.hg5rl.mongodb.net/${DB}?retryWrites=true&w=majority`;
const uri = process.env.MONGODB_URI
exports.connect = (callback) => {
  return mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(callback)
    .catch((err) => {
      console.log(err);
    });
};