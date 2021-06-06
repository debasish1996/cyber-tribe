const Profile = require('../model/profile.model');

exports.postCreateProfile = async (req, res, next) => {
  try {
    const uid = req.jwtPayload.uid;
    if (await Profile.findById(uid)) return res.sendStatus(403);
    const name = req.body.name;
    const imageUrl = req.body.imageUrl ? req.body.imageUrl : '';
    const email = req.jwtPayload.email;
    const usercount = await Profile.countDocuments();
    const user = new Profile({
      _id: uid,
      name,
      imageUrl,
      email,
      userId: '#' + usercount.toString().padStart(6, '0'),
      uid,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal error');
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const uid = req.jwtPayload.uid;
    const user = await Profile.findById(uid);
    if (!user) return res.sendStatus(404);
    res.send(user);
  } catch (error) {
    console.log(err);
    res.status(500).send('Internal error');
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const uid = req.params.id;
    const user = await Profile.findById(uid);
    if (!user) return res.sendStatus(404);
    res.send(user);
  } catch (error) {
    console.log(err);
    res.status(500).send('Internal error');
  }
};
