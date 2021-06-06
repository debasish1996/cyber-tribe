const Conversation = require('../model/conversation.model');
const Direct = require('../model/direct.model');
const Message = require('../model/message.model');
const EventEmitter = require('events');
const channelUtil = require('../util/channel-util');
const Socket = require('./socket.controller');

const Stream = new EventEmitter();

/**
 * cid formula :

 * u1 = user1 id;
 * u2 = user2 id;
 *          if(a > b)
 *              cid = half of u1 + half of u2
 *          else
 *              cid = half of u2 + half of u1
 */
exports.getConvoByFid = async (req, res) => {
  try {
    // await Direct.collection.drop();
    // await Conversation.collection.drop();
    const uid = req.jwtPayload.uid;
    const fid = req.params.id;
    const cid = channelUtil.buildCid(uid, fid);
    const did = channelUtil.buildDid(uid, cid);
    // uid, fid, cid, did... LOL -> gid coming soon.. (>_<)
    const time = new Date().getTime();
    // get Conversation or create
    var conversation = await Conversation.findById(cid).populate('members');
    if (!conversation) {
      // create Conversation
      await new Conversation({
        _id: cid,
        members: [uid, fid],
        lastUpdated: time,
      }).save();
      conversation = await Conversation.findById(cid).populate('members');
      if (!conversation) return res.sendStatus(404);
    }

    //find direct list by uid or create
    var direct = await Direct.findById(did);
    if (!direct) {
      direct = await new Direct({
        _id: did,
        uid,
        person: fid,
        cid,
        lastUpdated: time,
      }).save();
      direct = await Direct.populate(direct, 'person');
      Socket.notifyDirect(uid, direct);
    }
    res.send(conversation);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

exports.getMessagesByFid = async (req, res) => {
  try {
    const uid = req.jwtPayload.uid;
    const fid = req.params.id;
    // build cid from fid
    const cid = channelUtil.buildCid(uid, fid);
    const messages = await Message.find({ cid }).sort({ time: -1 }).limit(40);
    if (!messages) res.sendStatus(404);
    res.send(messages);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.sendMessagesByFid = async (req, res) => {
  try {
    const uid = req.jwtPayload.uid;
    const fid = req.params.id;
    const message = req.body.message;
    // build cid from fid
    const cid = channelUtil.buildCid(uid, fid);
    const time = new Date().getTime();
    var conversation = await Conversation.findById(cid);
    if (!conversation) {
      // create Conversation
      await new Conversation({
        _id: cid,
        members: [uid, fid],
        isGroup: false,
        lastUpdated: time,
      }).save();
      conversation = await Conversation.findById(cid).populate('members');
      if (!conversation) return res.sendStatus(404);
    }
    conversation.lastUpdated = time;
    const newMessage = new Message({
      cid,
      message,
      time,
      createdBy: uid,
    });
    await Promise.all([conversation.save(), newMessage.save()]);
    res.send({ status: 'sent' });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.getDirects = async (req, res, next) => {
  try {
    const uid = req.jwtPayload.uid;
    const direct = await Direct.find({ uid }).populate('person');
    if (!direct) res.send(404);
    res.send(direct);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
