const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const cookie = require('cookie');

//---------LOG IN-----------//
exports.postLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userDoc = await User.findOne({ email: email });
    if (!userDoc) return res.send('User not found.');
    const match = await bcrypt.compare(password, userDoc.password);
    if (!match) return res.send('password not match.');
    const token = getToken(userDoc);
    res.cookie('ujt', token, { httpOnly: true });
    res.send({ uid: userDoc._id, state: 'loggedIn', isLoggedIn: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

//---------SIGN UP-----------//
exports.postSignUp = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userDoc = await User.findOne({ email: email });
    if (userDoc) return res.send('user already exist');
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
    });
    const userD = await user.save();
    const token = getToken(userD);
    res.cookie('ujt', token, { httpOnly: true });
    res.send({ uid: userD._id, state: 'loggedIn', isLoggedIn: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

//---------LOG OUT-----------//
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('ujt');
    res.send({ state: 'loggedOut' });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

//---------GET USER STATE-----------//
exports.state = async (req, res, next) => {
  try {
    res.send({
      uid: req.jwtPayload.uid,
      emial: req.jwtPayload.email,
      isLoggedIn: true,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

function getToken(user) {
  try {
    const payload = { uid: user._id };
    const options = { expiresIn: '2h' };
    const secret = process.env.SECRET + user.password;
    return jwt.sign(payload, secret, options);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

//---------CHECK JWT TOKEN-----------//
exports.validator = async (req, res, next) => {
  try {
    const bearer = req.cookies.ujt;
    const payload = jwt.decode(bearer);
    if (!payload) return res.sendStatus(401);
    const user = await User.findById(payload.uid);
    var decoded = jwt.verify(bearer, process.env.SECRET + user.password);
    if (!decoded) return res.send(401);
    decoded.email = user.email;
    req.jwtPayload = decoded;
    req.role = user.role;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.validateIO = async (socket) => {
  try {
    const bearer = cookie.parse(socket.handshake.headers.cookie).ujt;
    const payload = jwt.decode(bearer);
    const user = await User.findById(payload.uid);
    const decoded = jwt.verify(bearer, process.env.SECRET + user.password);
    return decoded ? decoded.uid : false;
  } catch (error) {
    return false;
  }
};

//   res.cookie('loggedIn', true, { maxAge: 900000, httpOnly: true });
//   res.setHeader('Set-Cookie', 'loggedIn=true');
