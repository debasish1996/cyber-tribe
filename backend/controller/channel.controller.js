const auth = require('./auth.controller');
const Conversation = require('../model/conversation.model');
const Message = require('../model/message.model');
const channelUtil = require('../util/channel-util');
const Direct = require('../model/direct.model');
const Socket = require('./socket.controller');

//---------- Socket Handlers ----------//
exports.handleMessage = (socket, uid) => {
  socket.on('message', async (fid, { message }) => {
    Socket.notifyContact(fid, 'hello');
    try {
      const cid = channelUtil.buildCid(uid, fid);
      const time = new Date().getTime();
      this.handleMessageAsync({ cid, uid, fid, time });
      const newMessage = new Message({
        cid,
        message,
        time,
        createdBy: uid,
      });
      await newMessage.save();
      socket.broadcast.to(cid).emit('message', newMessage);
      socket.emit('message', newMessage);
    } catch (error) {
      console.log(error);
      socket.emit('error', error);
    }
  });
};

exports.handleMessageAsync = async ({ cid, uid, fid, time }) => {
  time = time ? time : new Date().getTime();
  var conversation = await Conversation.findById(cid);
  // if (!conversation) {
  //   // create Conversation
  //   conversation = new Conversation({
  //     _id: cid,
  //     members: [uid, fid],
  //     isGroup: false,
  //     lastUpdated: time,
  //   });
  // }
  conversation.lastUpdated = time;
  conversation.save();
  conversation.members.forEach((m) => {
    const did = channelUtil.buildDid(m, cid);
    Direct.findById(did)
      .populate('person')
      .then(async (d) => {
        if (!d) {
          d = await new Direct({
            _id: did,
            uid: m,
            person: uid,
            cid,
            lastUpdated: time,
            unseen: 1,
          }).save();
          d = await Direct.populate(d, 'person');
          Socket.notifyDirect(m, d);
        } else {
          d.lastUpdated = time;
          if (m != uid) d.unseen += 1;
          d.save();
          Socket.notifyDirect(m, d);
        }
      });
  });
};

exports.handleJoinChannel = (socket, uid) => {
  socket.on('join-channel', async (fid) => {
    const cid = channelUtil.buildCid(uid, fid);
    console.log(uid + ' connected at ' + cid);
    await Message.find({ cid });
    socket.join(cid);
    socket.to(cid).emit('user-connected', uid);
  });
};
