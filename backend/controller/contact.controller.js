const Profile = require('../model/profile.model');
const Contact = require('../model/contact.model');
const EventEmitter = require('events');
const Socket = require('./socket.controller');
const Direct = require('../model/direct.model');
const Message = require('../model/message.model');

const Stream = new EventEmitter();

exports.getContact = async (req, res, next) => {
  try {
    const uid = req.jwtPayload.uid;
    let contact = await Contact.findById(uid).populate([
      'friends',
      'blocked',
      'pending',
    ]);
    if (contact) return res.send(contact);
    contact = await createContact(uid);
    res.send(contact);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.sendFriendRequest = async (req, res, next) => {
  try {
    const uid = req.jwtPayload.uid;
    const friendId = req.params.friendId || req.body.friendId;

    const friend = await Profile.findOne({ userId: friendId });
    if (!friend) return res.sendStatus(404);

    if (friend._id == uid) return res.sendStatus(406);

    const friendContact = await Contact.findById(friend._id);
    const isvalid = validateFriendReq(friendContact, uid);
    if (!isvalid.status) return res.status(406).send(isvalid.msg);

    friendContact.pending.push(uid);
    await friendContact.save();
    res.send({ status: 'friend request sent' });
    handleNotifyContact(friend._id);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.acceptFriendReq = async (req, res, next) => {
  try {
    const uid = req.jwtPayload.uid;
    const friendUid = req.params.uid || req.body.uid;

    if (friendUid == uid) return res.sendStatus(406);
    const friendContact = await Contact.findById(friendUid);
    if (!friendContact) return res.sendStatus(404);

    friendContact.friends.push(uid);
    const contact = await Contact.findById(uid);
    contact.friends.push(friendUid);
    contact.pending = contact.pending.filter((c) => c != friendUid);
    res.send({ status: 'added to friend list.' });
    await contact.save();
    handleNotifyContact(uid);
    await friendContact.save();
    handleNotifyContact(friendUid);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.reset = async (req, res) => {
  try {
    const uid = req.jwtPayload.uid;
    var contacts = await Contact.find();
    contacts.forEach((c) => {
      c.friends = [];
      c.pending = [];
      c.blocked = [];
      c.save();
    });
    await Direct.collection.drop();
    await res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

async function createContact(uid) {
  const userContact = new Contact({
    _id: uid,
    friend: [],
    pending: [],
    blocked: [],
  });
  return await userContact.save();
}

async function handleNotifyContact(id) {
  const data = await Contact.findById(id).populate([
    'friends',
    'blocked',
    'pending',
  ]);
  Socket.notifyContact(id, data);
}

/**
 *
 * @param {Contact} friendContact : returns {status: Boolean}
 */
function validateFriendReq(friendContact, uid) {
  const isBlocked = !!friendContact.blocked.find((b) => b == uid);
  if (isBlocked) return { status: false, msg: 'blocked' };

  const isFriend = !!friendContact.friends.find((f) => f == uid);
  if (isFriend) return { status: false, msg: 'already a friend' };

  const isRequested = !!friendContact.pending.find((p) => p == uid);
  if (isRequested) return { status: false, msg: 'alredy requested' };
  return { status: true };
}
